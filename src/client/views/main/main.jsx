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
 
// As the TODO states the Main view should consist of only Sites list, 
// that is why I moved to oil rigs to other view with some modification.

// The third way to navigate by using the history props/state.