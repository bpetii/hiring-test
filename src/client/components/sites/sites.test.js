import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Sites } from "./sites";
import siteAccordion from "./siteAccordion/siteAccordion";
import { sitesLoaded } from "../../store/entities/sites/sites";

/* describe("<Sites/>", () => {
  it("should have 0 <siteAccordion/> elements before loads site button clicked", () => {
    render(<Sites />);
    expect(screen.getByRole("siteAccordion")).toBeNull();
  });
}); */

const fakeData = [
  {
    name: "Site-name-1",
    country: "Site country",
    oilRigs: ["oilrigs-id1", "oilrigs-id2"],
  },
  {
    name: "Site-name-2",
    country: "Site-country",
    oilRigs: ["oilrigs-id3", "oilrigs-id4"],
  },
];

configure({ adapter: new Adapter() });

describe("<Sites/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Sites />);
  });

  it("Test click event", () => {
    const mockCallBack = jest.fn();

    wrapper.find("Button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("should handle click correctly", () => {
    expect(wrapper.find("Button").length).toBe(1);

    expect(wrapper.state().name).toEqual("Random Value");
    wrapper.find("button").simulate("click");
    expect(wrapper.update().state().name).toEqual("peter");
  });

  it("should have 0 <siteAccordion/> elements before loads site button clicked", () => {
    expect(wrapper.find(siteAccordion)).toHaveLength(0);
  });

  it("should have 2 <siteAccordion/> elements after loads site button clicked", () => {
    wrapper.setProps({ list: fakeData });
  });
});
