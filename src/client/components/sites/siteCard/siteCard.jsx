import React, { useState } from "react";
import styles from "./siteCard.module.less";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Accordion, Heading, Button, List } from "~gui-library";
import { Link } from "react-router-dom";
import { OilRigs } from "../../oil-rigs/oil-rigs";

const SiteCard = ({ name, id, country, oilRigs }) => {
  const items = {
    name: "Oil Rigs",
    actions: [],
    items: oilRigs.map((oilRig, index) => {
      return { id: index, name: oilRig, actions: [] };
    }),
  };
  return (
    <Accordion
      heading={
        <Heading>
          {name}- ({country})
        </Heading>
      }
      bordered
      managed
    >
      <Link to={`/site-detail/${id}`}>
        <Button colored name="example" label="View site" inverted />
      </Link>
    </Accordion>
  );
};

const mapStateToProps = ({ router }) => {
  const { location, action } = router;
  return {
    location: location,
    action: action,
  };
};

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location));
  },
  siteSelection: (selectedSite) => {
    dispatch(selectedSite);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteCard);
