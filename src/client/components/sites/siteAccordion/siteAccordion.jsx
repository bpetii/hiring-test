import React from "react";
import { Accordion, Heading, Button } from "~gui-library";
import { Link } from "react-router-dom";
import OilRigs from "../../oil-rigs/oil-rigs";

export const SiteAccordion = ({ name, id, country, oilRigs }) => {
  const siteOilRigs = {
    name: "Oil Rigs",
    actions: [],
    items: oilRigs.map((oilRig, index) => {
      return { id: index, name: oilRig, actions: [] };
    }),
  };

  // There are many ways to navigate to other view, here I used the Link components with 'to' property.
  // I used other ways to do so in this project.

  return (
    <Accordion
      heading={
        <Heading data-testid="site-information">
          {name} - ({country})
        </Heading>
      }
      bordered
      managed
    >
      <OilRigs list={siteOilRigs} />
      <Link to={`/site-detail/${id}`}>
        <Button
          data-testid="button"
          colored
          name="example"
          label="View site"
          inverted
        />
      </Link>
    </Accordion>
  );
};

export default SiteAccordion;
