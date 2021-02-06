import React from "react";
import { List } from "~gui-library";

// I modified this component, and I know it does not make any sense to use a component for listing,
// however I assume that this component will be expanded by adding new elements,
// so this component will handle the changes as welcome changes

export const OilRigs = ({ list }) => {
  return <List data-testid='oil-rig-list' list={list} bordered allWhite />;
};

export default OilRigs;
