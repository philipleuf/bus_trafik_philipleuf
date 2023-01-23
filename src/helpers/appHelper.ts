import {uniq} from 'lodash';
import {Journey, JourneyList, SiteList, StopPointList} from './types';

// Sort array highest to lowest b - a, to get the most busstops lines from top 0...10
const sortedArrayByStopPointCounts = (busLineArray: Journey[]) =>
	busLineArray.sort((a: Journey, b: Journey) => b.stopPointList.length - a.stopPointList.length);

// look for name that matches JourneyPoint ID in both StopPoint and Site API
const findSitePointName = (journeyPointId: string, stopPointList: Array<StopPointList>, siteList: Array<SiteList>) =>
	stopPointList.find((o: StopPointList) => o.StopPointNumber === journeyPointId)?.StopPointName ||
	siteList.find((o: SiteList) => o.StopAreaNumber === journeyPointId)?.SiteName;

// uses function to scope the function (not needed here though)and arrow-functions () => for small / oneliners / helpers where they dont need to be scoped
function makeBusStopArray(
	journeyList: Array<JourneyList>,
	stopPointList: Array<StopPointList>,
	siteList: Array<SiteList>
) {
	const busLines: {[key: string]: Journey} = {};
	for (const item of journeyList) {
		const key = `Line_${item.LineNumber}_Direction_${item.DirectionCode}`;
		const stopPointName = findSitePointName(item.JourneyPatternPointNumber, stopPointList, siteList);
		/**
		 * Do lookup on object since it's faster than using find/findIndex on array.
		 * Checking for stopPointName since the data is not complete and some JourneyPoints doesnt have names
		 * Check for names matching JourneyPoint in both StopPoint and Site since data is not complete
		 * Check if object already exists then add data to it, otherwise go to else if
		 * Using for loop since it's quicker than map / forEach, other options could be reduce but less readable
		 */
		if (busLines[key] && stopPointName) {
			// Array of stoppoints for each busline object
			busLines[key].stopPointList.push(stopPointName);
			// needs to run uniq to get rid of duplicates from api
			busLines[key] = {
				destination: stopPointName,
				line: item.LineNumber,
				direction: item.DirectionCode,
				stopPointList: uniq(busLines[key].stopPointList),
			};
		} else if (stopPointName) {
			// First hit, finds a matching name, creates new object
			busLines[key] = {
				destination: stopPointName,
				line: item.LineNumber,
				direction: item.DirectionCode,
				stopPointList: [stopPointName],
			};
		}
	}
	return busLines;
}

export {sortedArrayByStopPointCounts, makeBusStopArray};
