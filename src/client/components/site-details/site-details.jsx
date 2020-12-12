import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Card, Row, Column, Heading, Divider } from "~gui-library";
import { oilRigsLoaded } from "~store/entities/oil-rigs/oil-rigs";

const SiteDetails = ({ siteList, oilRigsList, history, oilRigsLoaded }) => {
  const { id } = useParams();
  const siteId = id;
  const [formattedRigList, setFormattedRigList] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);

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
  }, [siteList, oilRigsList]);

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
      {selectedSite ? (
        <div style={{ paddingTop: "20px" }}>
          <h1>
            Name: <em>{selectedSite.name}</em>
          </h1>
          <h1>
            Country: <em>{selectedSite.country}</em>
          </h1>
        </div>
      ) : null}
      <Divider />
      <Card heading={<Heading>List of oil Rigs of </Heading>}>
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
