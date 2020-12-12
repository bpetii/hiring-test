import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Card, Row, Column, Heading, Divider } from "~gui-library";
import { oilRigsLoaded } from "~store/entities/oil-rigs/oil-rigs";
import styles from "./site-details.module.less";

// In this component, I used the oil-rigs prebuild component.
// It was unclear to me, that I should move the list of Oil rigs should be moved to other view,
// because I detialed them literally everywhere.
// That is why I needed to use the oilRigsLoaded action in the UseEffect like the componentDidMount.
// Of course I could create a OilRigs view where the users can fetch all the oil rigs,
// but seeing it from the view of users, I did not feel that it is a good way, that is why I chose this one.

// Other way to do it is to leave the Oil-rigs component in the Main view and the whole website would work propertly
// if the users click the two Load button. But it was stated that the Main view should consist of only the Site list.

//Here I used the WithRouter function to navigate to a particular site properly.
// Furthermore I used useParams to get the dynamic url parameters. A better and more elegant way would be use API for this case
// And of course I am able to do it by my own.

const SiteDetails = ({ siteList, oilRigsList, history, oilRigsLoaded }) => {
  const { id } = useParams();
  const siteId = id;
  const [formattedRigList, setFormattedRigList] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isAsc, setIsAsc] = useState(true);

  console.log(formattedRigList);

  useEffect(() => {
    oilRigsLoaded();
  }, []);

  useEffect(() => {
    if (siteList && oilRigsList) {
      const site = siteList && siteList.find((site) => site.id === siteId);
      const rigList =
        site &&
        site.oilRigs.map((siteRig) =>
          oilRigsList.find((o) => o.id === siteRig)
        );
      setSelectedSite(site);
      setFormattedRigList(rigList);
    }
  }, [siteList, oilRigsList, isAsc]);

  useEffect(() => {
    onSortByName();
  }, [isAsc]);

  const onSortByName = () => {
    if (isAsc) {
      setFormattedRigList(
        formattedRigList.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        })
      );
    } else {
      setFormattedRigList(
        formattedRigList.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        })
      );
    }
  };

  const sortButton = formattedRigList && (
    <Button
      name="example"
      width="125px"
      label="Sort by name"
      onClick={() => {
        setIsAsc((prevState) => !prevState);
      }}
      colored
    />
  );

  return (
    <>
      <Row spacing={0}>
        <Column>
          <Button
            colored
            label="Back to Main"
            onClick={() => history.push("/")}
          ></Button>
        </Column>
      </Row>
      {selectedSite && (
        <div className={styles.siteInformation}>
          <h1>
            Name: <em>{selectedSite.name}</em>
          </h1>
          <h1>
            Country: <em>{selectedSite.country}</em>
          </h1>
        </div>
      )}
      <Divider />
      <Card heading={<Heading>List of oil Rigs of </Heading>}>
        <Row >
          <Column padding="10px">{sortButton}</Column>
        </Row>

        <Row>
          <Column span={1 / 3}>
            <Heading top>Name</Heading>
          </Column>
          <Column span={1 / 3}>
            <Heading top>Manufacturer</Heading>
          </Column>
          <Column span={1 / 3}>
            <Heading top>Id</Heading>
          </Column>
        </Row>

        {formattedRigList &&
          formattedRigList.map((oil) => {
            return (
              oil && (
                <Card key={oil.id}>
                  <Row>
                    <Column span={1 / 3}>{oil.name}</Column>
                    <Column span={1 / 3}> {oil.manufacturer}</Column>
                    <Column span={1 / 3}>{oil.id}</Column>
                  </Row>
                </Card>
              )
            );
          })}
      </Card>
    </>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites, oilRigs } = entities;
  return {
    loading: sites.loading,
    siteList: sites.list,
    oilRigsList: oilRigs.list,
  };
};

const mapDispatchToProps = {
  oilRigsLoaded,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SiteDetails));
