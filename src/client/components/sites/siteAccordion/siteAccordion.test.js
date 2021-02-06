import React from "react";
import { SiteAccordion } from "./site-accordion";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

const mockSite = {
  name: "Site-name-1",
  country: "Site-country-1",
  oilRigs: ["oilrigs-id1", "oilrigs-id2"],
  id: "Site-id-1",
};

describe("<SiteAccordion/>", () => {
  it("should render the oil rig lists", () => {
    const { getByTestId } = render(<SiteAccordion {...mockSite} />);
    const heading = getByTestId("site-information");
    expect(heading).toHaveTextContent("Site-name-1 - (Site-country-1)");
  });

  it("should button called properly", () => {
    const { getByTestId } = render(<SiteAccordion {...mockSite} />);
    const mockOnClcik = jest.fn();
    const button = getByTestId("button");
    fireEvent.click(button);
    expect(mockOnClcik).toHaveBeenCalledTimes(1);
  });
});
