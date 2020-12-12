import React from "react";
import { connect } from "react-redux";
import { Button, Card, Heading, Column, Row, List } from "~gui-library";
import { oilRigsLoaded } from "~store/entities/oil-rigs/oil-rigs";
import styles from "./oil-rigs.module.less";

const OilRigs = ({ list }) => {
  return <List list={list} bordered allWhite />;
};

export default OilRigs;
