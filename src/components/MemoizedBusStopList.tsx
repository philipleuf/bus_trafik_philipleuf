import React from "react";
import BusStop from "./BusStop";
import type {Journey} from "../helpers/types";
import "./MemoizedBusStopList.css";

type Props = {
	busArr: Journey;
};

const BusStopList = ({busArr}: Props) => (
	<div className="busStopListDiv">
		{busArr?.stopPointList.map((busStop) => (
			<BusStop key={busStop} stop={busStop} />
		))}
	</div>
);

export const MemoizedBusStopList = React.memo(BusStopList);
