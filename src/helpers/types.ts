export type Journey = {
	destination: string | undefined;
	stopPointList: Array<string>;
	line: string;
	direction: string;
};

export type JourneyList = {
	LineNumber: string;
	DirectionCode: string;
	JourneyPatternPointNumber: string;
	LastModifiedUtcDateTime: string | Date;
	ExistsFromDate: string | Date;
};

export type SiteList = {
	SiteId: string;
	SiteName: string;
	StopAreaNumber: string;
	LastModifiedUtcDateTime: string;
	ExistsFromDate: string;
};

export type StopPointList = {
	StopPointNumber: string;
	StopPointName: string;
	StopAreaNumber: string;
	LocationNorthingCoordinate: string;
	LocationEastingCoordinate: string;
	ZoneShortName: string;
	StopAreaTypeCode: string;
	LastModifiedUtcDateTime: string | Date;
	ExistsFromDate: string | Date;
};

export type Endpoints = {
	JourneyPattern: string;
	StopPoint: string;
	Site: string;
};
