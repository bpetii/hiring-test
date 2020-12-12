import React from "react";
import { Heading, Page } from "~gui-library";
import SiteDetails from "~client/components/site-details/site-details";

export const Details = () => {
  return (
    <Page left={0}>
      <Heading top>Site details</Heading>
      <SiteDetails />
    </Page>
  );
};
