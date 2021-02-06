import React from "react";
import { Sites } from "./sites";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

/* describe("<Sites/>", () => {
  it("should have 0 <siteAccordion/> elements before loads site button clicked", () => {
    render(<Sites />);
    expect(screen.getByRole("siteAccordion")).toBeNull();
  });
}); */

afterEach(cleanup);

const mockSites = [
  {
    name: "Site-name-1",
    country: "Site country-1",
    oilRigs: ["oilrigs-id1", "oilrigs-id2"],
    id: "Site-id-1",
  },
  {
    name: "Filtered-name-2",
    country: "Site-country-2",
    oilRigs: ["oilrigs-id-3", "oilrigs-id-4"],
    id: "Site-id-2",
  },
];

/* global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () =>
      Promise.resolve(
        store.dispatch({ type: "sites/sitesReceived", payload: mockSites })
      ),
  });
}); */

describe("<Sites/>", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
    fetch.resetMocks();
    fetch.mockClear();
  });

  const sitesSlice = () => store.getState().entities.sites;

  it("should render load sites button", () => {
    const { getByTestId } = render(<Sites />);
    expect(getByTestId("loadButton")).toHaveTextContent("Load sites");
  });

  it("Test click event", () => {
    const { getByTestId } = render(<Sites />);
    const mockOnClick = jest.fn();
    fireEvent.click(getByTestId("loadButton"));
    expect(mockOnClick.mock.calls.length).toEqual(1);
  });

  it("should renders sort button and filter input after the load sites button clicked ", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<Sites />);
    fireEvent.click(getByTestId("loadButton"));
    expect(getByText("Sort by name")).toBeTruthy();
    expect(getByPlaceholderText("Filter by name")).toBeTruthy();
  });

  it("should renders 2 <siteAccordion/> elements after the load sites button clicked", async () => {
    const { container, getByTestId } = render(<Sites />);
    const mockOnLoadSites = jest.fn();
    fireEvent.click(getByTestId("loadButton"));
    store.dispatch({ type: "sites/sitesReceived", payload: MockSites });

    /*  fetch().mockImplementationOnce(() => Promise.resolve(mockSites)); */

    const accordionComponents = container.querySelector(
      '[data-test="accordion"]'
    );
    expect(mockOnLoadSites).toHaveBeenCalledTimes(1);
    expect(mockSites.sort()).toEqual(sitesSlice().list.sort());
    expect(accordionComponents).toHaveLength(2);
  });

  it("should the filter input element updates on change", () => {
    const { container, getByPlaceholderText } = render(<Sites />);
    fireEvent.click(getByTestId("loadButton"));
    store.dispatch({ type: "sites/sitesReceived", payload: MockSites });

    const filterInput = getByPlaceholderText("Filter by name");
    fireEvent.change(filterInput, {
      target: { value: "f" },
    });
    expect(filterInput.value).toBe("f");
    const filteredSites = container.querySelector('[data-test="accordion"]');
    expect(filteredSites).toHaveLength(1);
    expect(filteredSites).toHaveProperty(["site", "name"], "Filtered-name-2");
  });

  it("should call the sort by name button", () => {
    const { getByTestId } = render(<Sites />);
    const mockOnSort = jest.fn();

    store.dispatch({ type: "sites/sitesReceived", payload: MockSites });
    fireEvent.click(getByTestId("sortButton"));
    expect(mockOnSort).toHaveBeenCalled();
  });
});

//-------------------------- ENZYME -------------------------//
//just for reference, I started with this.
/* 
configure({ adapter: new Adapter() });

describe("<Sites/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Sites />);
  });

  it("Test click event", () => {
    const mockCallBacK = jest.fn();

    wrapper.find("Button").simulate("click");
    expect(mockCallBacK.mock.calls.length).toEqual(1);
  });

  it("should handle click correctly", async () => {
    expect(wrapper.find(Button).length).toBe(1);

    expect(wrapper.props().list).toHaveSize(0);

    wrapper.find("button").simulate("click");
    await Promise.resolve();
    wrapper.setProps({list:mockSites})
    expect(wrapper.props().list).toHaveSize(2);
  });

  it('should have an search field and sort button after loads site clicked', () => {
    expect(wrapper.find(Button).length).toEqual(2);
    expect(wrapper.find(Input).length).toEqual(1);
  });

  it("should have 0 <siteAccordion/> elements before loads site button clicked", () => {
    expect(wrapper.find(siteAccordion)).toHaveLength(0);
  });

  it("should have 2 <siteAccordion/> elements after loads site button clicked", () => {
    wrapper.setProps({ list: mockSites });
  });
}); */
