import React from "react";
import { SiteDetails } from "./site-details";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const mockSites = [
  {
    name: "Site-name-1",
    country: "Site country-1",
    oilRigs: ["oilrigs-id1", "oilrigs-id2"],
    id: "Site-id-1",
  },
  {
    name: "Site-name-2",
    country: "Site-country-2",
    oilRigs: ["oilrigs-id3", "oilrigs-id4"],
    id: "Site-id-2",
  },
];
const mockOilRigs = [
  {
    name: "Oil-rig-name",
    manufacturer: "Oil-rig-manufacturer",
    id: "oilrigs-id-1",
  },
];

describe("<Sites/>", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
    fetch.resetMocks();
    fetch.mockClear();
    store.dispatch({ type: "sites/sitesReceived", payload: mockSites });
    store.dispatch({ type: "oilRigs/oilRigsReceived", payload: mockOilRigs });
  });

  afterEach(() => {
    cleanup();
  });

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({ id: "Site-id-2" }),
  }));

  it("should render 'Sort by name' button", () => {
    const { getByTestId } = render(<SiteDetails />);
    expect(getByTestId("sort-button")).toHaveTextContent("Sort by name");
  });

  it("should render the name and country of the selected site ", () => {
    const { getByTestId } = render(<SiteDetails />);
    expect(getByTestId("name-label")).toHaveTextContent("Site-name-2");
    expect(getByTestId("country-label")).toHaveTextContent("Site-country-2");
  });
});
