import React from "react";
import "./BusStop.css";

type Props = {
  stop: string;
};

const BusStop = ({stop}: Props) => (
  <div className="busStopDiv">
    <div className="busStopDot" />
    <span key={stop} className="busStopText">
      {stop}
    </span>
  </div>
);

export default BusStop;
