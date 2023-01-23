import React from "react";
import "./Header.css";
import {Journey} from "../helpers/types";

type Props = {
	busLine: Journey;
	navigateBusLines: (step: number) => void;
	navigateBusLineIndex: number;
};

const Header = ({busLine, navigateBusLines, navigateBusLineIndex}: Props) => {
	const {line, direction, destination} = busLine;
	return (
		<div className="headerDiv">
			<button
				className="navButtons"
				disabled={navigateBusLineIndex === 0}
				onClick={() => navigateBusLines(navigateBusLineIndex - 1)}
			>
				Föregående
			</button>
			<span className="headerText">
				Busslinje: {line}, riktning: {direction}, slutstation: {destination}
			</span>
			<button
				className="navButtons"
				disabled={navigateBusLineIndex === 9}
				onClick={() => navigateBusLines(navigateBusLineIndex + 1)}
			>
				Nästa
			</button>
		</div>
	);
};

export default Header;
