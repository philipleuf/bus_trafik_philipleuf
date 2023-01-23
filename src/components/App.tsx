import React from 'react';
import {fetchData, endPoints} from '../helpers/apiHandler';
import Header from './Header';
import {MemoizedBusStopList} from './MemoizedBusStopList';
import Loader from './Loader';
import {Journey, JourneyList, SiteList, StopPointList} from '../helpers/types';
// mock data
// import { JourneyPattern, StopPoint, Site } from '../mockData';
import {sortedArrayByStopPointCounts, makeBusStopArray} from '../helpers/appHelper';
import './App.css';

function App() {
	const [navigateBusLineIndex, setNavigateBusLineIndex] = React.useState<number>(-1);
	const [top10ListOfBusLines, setTop10ListOfBusLines] = React.useState<Journey[]>([]);

	/** mock data, to not stress the api
		const journeyList = JourneyPattern;
		const siteList = Site;
		const stopPointList = StopPoint;
	*/

	React.useEffect(() => {
		const fetcher = async () => {
			/**
			 * Careful using api, only 5 calls per minute and 500 per hour. Otherwise the apikey gets blocked
			 * Bring back line const [jour... and buildObjectsArray.. for real data. Use setTimeout block for mock data
			 * Using setTimeout to imitate the fetch of the three APIs
			 */

			const [journeyList, stopPointList, siteList] = await Promise.all([
				fetchData(endPoints.JourneyPattern),
				fetchData(endPoints.StopPoint),
				fetchData(endPoints.Site),
			]);
			buildObjectsArray(
				journeyList?.ResponseData?.Result,
				stopPointList?.ResponseData?.Result,
				siteList?.ResponseData?.Result
			);
			/*
			setTimeout(() => {
				buildObjectsArray(journeyList?.ResponseData?.Result, stopPointList?.ResponseData?.Result, siteList?.ResponseData?.Result);
			}, 3000);
			*/
		};

		fetcher().catch((err) => console.error(err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function buildObjectsArray(
		journeyList: Array<JourneyList>,
		stopPointList: Array<StopPointList>,
		siteList: Array<SiteList>
	) {
		const busLines = makeBusStopArray(journeyList, stopPointList, siteList);
		const sortedList = sortedArrayByStopPointCounts(Object.values(busLines));
		setTop10ListOfBusLines(sortedList.slice(0, 10));
		// trigger first render for memoized toplist array after building array
		setNavigateBusLineIndex(0);
	}

	function navigateBusLines(step: number) {
		if (step >= 0 && step <= 9) {
			return setNavigateBusLineIndex(step);
		}
	}

	// Maybe a little bit overkill to use useMemo here... :)
	const busArrMemo = React.useMemo(() => top10ListOfBusLines[navigateBusLineIndex], [navigateBusLineIndex]);
	return (
		<div className='App'>
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
