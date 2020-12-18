import React from "react";
import { Sites } from "./sites.jsx";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ChartComponent } from "./chartComponent.jsx";

afterEach(cleanup);

const mockSites = [
  {
    name: "Site-name-1",
    country: "Site country",
    oilRigs: ["oilrigs-id1", "oilrigs-id2"],
    id: "Site-id-1",
  },
  {
    name: "Site-name-2",
    country: "Site-country",
    oilRigs: ["oilrigs-id3", "oilrigs-id4"],
    id: "Site-id-2",
  },
];

describe("<ChartComponent/>", () => {
  it("should renders the cards correctly", () => {
    const { getByTestId } = render(<ChartComponent list={mockSites} />);
    getByTestId("number-of-sites").toHaveTextContent = "2";
    getByTestId("number-of-rig-oils").toHaveTextContent = "4";
  });

  it("should checkbox works correctly", () => {
    const { getByTestId } = render(<Sites />);
    const checkbox = getByTestId("checkbox");
    expect(checkbox.checked).toEqual(true);
    expect(getByTestId("bar-chart")).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    expect(getByTestId("line-chart")).toBeTruthy();
  });
});