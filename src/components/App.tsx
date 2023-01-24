import React from "react";
import Loader from "./Loader";
import Header from "./Header";
import {MemoizedBusStopList} from "./MemoizedBusStopList";
import {Journey} from "../helpers/types";
import {makeTopListFromApiResponse} from "../helpers/appHelper";
import "./App.css";

function App() {
  const [navigateBusLineIndex, setNavigateBusLineIndex] = React.useState<number>(0);
  const [top10ListOfBusLines, setTop10ListOfBusLines] = React.useState<Journey[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    const fetchInitalData = async () => {
      // Careful using api, only 5 calls per minute and 500 per hour.
      // Otherwise the apikey gets blocked. Cached on second run for 25 hours.
      const top10List = await makeTopListFromApiResponse();
      setTop10ListOfBusLines(top10List);
    };

    fetchInitalData().catch((err) => {
      console.error(err);
      setErrorMessage("Något gick fel när datan skulle hämtas försök igen");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigateBusLines(step: number) {
    if (step >= 0 && step <= 9) {
      return setNavigateBusLineIndex(step);
    }
  }

  // Maybe a little bit overkill to use useMemo here... :)
  const busArrMemo = React.useMemo(
    () => top10ListOfBusLines[navigateBusLineIndex],
    [top10ListOfBusLines, navigateBusLineIndex]
  );
  return (
    <div className="App" data-testid="app-div">
      <span className="errorMessageText">{errorMessage}</span>
      {top10ListOfBusLines.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Header
            busLine={busArrMemo}
            navigateBusLines={(step: number) => navigateBusLines(step)}
            navigateBusLineIndex={navigateBusLineIndex}
          />
          <MemoizedBusStopList busArr={busArrMemo} />
        </>
      )}
    </div>
  );
}

export default App;
