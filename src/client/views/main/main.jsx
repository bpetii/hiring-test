import React from "react";
import { Heading, Page, Button } from "~gui-library";
import { Sites } from "~client/components/sites/sites";

export const Main = ({ history }) => {
  return (
    <Page left={0}>
      <Heading top>Hiring Challenge</Heading>
      <Sites />

      <Button
        onClick={() => {
          history.push("/chart");
        }}
        label="View Chart"
      ></Button>
    </Page>
  );
};
