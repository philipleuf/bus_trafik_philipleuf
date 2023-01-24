import * as apiHandler from "../helpers/apiHandler";
import {JourneyPatternChunk, StopPointChunk, SiteChunk} from "../mockData";
import {buildObjectsArray, makeBusStopArray} from "../helpers/appHelper";


describe("appHelper", () => {
  const fetchSpy = jest.spyOn(apiHandler, "fetchData");

  test("buildObjectsArray(): b", () => {
    const jl = JourneyPatternChunk.ResponseData.Result;
    const sp = StopPointChunk.ResponseData.Result;
    const site = SiteChunk.ResponseData.Result;
    buildObjectsArray(jl, sp, site);
    const mockLine = "Line_1_Direction_1";
    const busLine = makeBusStopArray(jl, sp, site);    
    expect(busLine[mockLine].destination).toMatch("Kampementsbacken");
  });
  
  test("fetchInitalData(): should fetch data from 3 api and return them in an object", async () => {
    await Promise.all([apiHandler.fetchData(apiHandler.endPoints.JourneyPattern), apiHandler.fetchData(apiHandler.endPoints.StopPoint), apiHandler.fetchData(apiHandler.endPoints.Site)]);
    
    expect(fetchSpy).toHaveBeenCalledWith(apiHandler.endPoints.JourneyPattern);
    expect(fetchSpy).toHaveBeenCalledWith(apiHandler.endPoints.StopPoint);
    expect(fetchSpy).toHaveBeenCalledWith(apiHandler.endPoints.Site);
  });
});

