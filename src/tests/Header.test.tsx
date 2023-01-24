import React from "react";
import {Journey} from "../helpers/types";
import {render, screen} from "@testing-library/react";
import Header from "../components/Header";

const mockBusLine: Journey = {
  line: "554",
  direction: "1",
  destination: "Abborrsjön",
  stopPointList: ["Addeboda"],
};

describe("Header", () => {
  test("should render Header component with mock data", () => {
    render(<Header busLine={mockBusLine} navigateBusLines={() => jest.fn()} navigateBusLineIndex={0} />);
    const headerDiv = screen.getByTestId("header-div");
    expect(headerDiv).toBeInTheDocument();
    const headerText = screen.getByTestId("header-text-id");
    expect(headerText).toHaveTextContent("Abborrsjön");
    expect(headerText).not.toHaveTextContent("Genesarets sjö");
  });
});
