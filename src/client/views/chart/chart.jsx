import React from "react";
import { Heading, Page } from "~gui-library";
import ChartComponent from "~client/components/chartComponent/chartComponent";

export const Chart = () => {
  return (
    <Page left={0}>
      <Heading top>Hiring Challenge</Heading>
      <ChartComponent />
    </Page>
  );
};
