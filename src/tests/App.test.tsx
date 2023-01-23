import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../components/App";
import {JourneyPattern, StopPoint, Site} from "../mockData";
/*
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({test: 100}),
	})
) as jest.Mock;

jest
	.spyOn(global, "fetch")
	.mockImplementation(jest.fn(() => Promise.resolve({json: () => Promise.resolve({data: 100})})) as jest.Mock);

test("should render App component", () => {
	render(<App />);
	const appDiv = screen.getByTestId("app-div");
	// const loaderText = screen.getByTestId('loading-text');
	expect(appDiv).toBeInTheDocument();
});

describe("Testing the Assets Service", () => {
	let fetchMock: any = undefined;

	beforeEach(() => {
		fetchMock = jest
			.spyOn(global, "fetch")
			.mockImplementation(jest.fn(() => Promise.all({json: () => Promise.resolve()})) as jest.Mock);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should render App component", () => {
		const baseUrl = "https://myurl.com";
		fetchAssets(baseUrl);
		expect(fetchMock).toHaveBeenCalled();
		expect(fetchMock).toHaveBeenCalledWith(baseUrl);
	});
});

*/
