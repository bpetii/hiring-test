import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Sites } from "./sites.jsx";
import siteAccordion from "./siteAccordion/siteAccordion";
import { sitesLoaded } from "../../store/entities/sites/sites";
import { Button, Input } from "~gui-library";
import { render, cleanup } from "@testing-library/react";

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

describe("<Sites/>", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
    fetch.resetMocks();
  });

  it("should renders load sites button", () => {
    const { getByTestId } = render(<Sites />);
    getByTestId("loadButton").toHaveTextContent = "Load sites";
  });

  it("should renders sort button and filter input after the load sites button clicked ", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<Sites />);
    fireEvent.click(getByTestId("loadButton"));
    expect(getByText("Sort by name")).toBeTruthy();
    expect(getByPlaceholderText("Filter by name")).toBeTruthy();
  });

  it("should renders 2 <siteAccordion/> elements after the load sites button clicked", () => {
    const { container, getByTestId } = render(<Sites />);
    fireEvent.click(getByTestId("loadButton"));
    const accordionComponents = container.querySelector(
      '[data-test="accordion"]'
    );
    store.dispatch({ type: "api/CallSuccess", payload: mockSites });
    expect(accordionComponents).toHaveLength(2);
  });
});

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
    wrapper.setProps({list:fakeData})
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
    wrapper.setProps({ list: fakeData });
  });
}); */
