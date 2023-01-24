import React from "react";
import {render, screen} from "@testing-library/react";
import Loader from "../components/Loader";

describe("Loader", () => {
  test("should render Loader component", async () => {
    render(<Loader />);
    const loaderText = screen.getByTestId("loading-text");
    expect(loaderText).toBeInTheDocument();
  });
});
