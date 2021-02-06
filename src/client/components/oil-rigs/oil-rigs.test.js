import React from "react";
import { OilRigs } from "./oil-rigs";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const mockOilRigs = [
  {
    name: "Oil-rig-name-1",
    manufacturer: "Oil-rig-manufacturer-1",
    id: "oilrigs-id-1",
  },
  {
    name: "Oil-rig-name-2",
    manufacturer: "Oil-rig-manufacturer-2",
    id: "oilrigs-id-2",
  },
];

const siteOilRigs = {
  name: "Oil Rigs",
  actions: [],
  items: mockOilRigs,
};

describe("<OilRigs/>", () => {
  it("should render the oil rig lists", () => {
    const { getByTestId } = render(<OilRigs list={list} />);
    const list = getByTestId("oil-rig-list");
    expect(list).toHaveAttribute("list", siteOilRigs);
  });
});
