import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Loader,
  Spinner,
  Input,
} from "~gui-library";
import { sitesLoaded } from "~store/entities/sites/sites";
import styles from "./sites.module.less";

import SiteAccordion from "./siteAccordion/siteAccordion";

const Sites = ({ list, loading, sitesLoaded }) => {
  const sortButton = list.length ? (
    <Button name="example" label="Sort by name" colored width="200px" />
  ) : null;

  const searchForm = list.length ? (
    <Input  name="example" placeholder="Filter by name" />
  ) : null;

  return (
    <Card heading={<Heading>List of oil sites</Heading>}>
      <Row>
        <Column width={200}>
          <Button
            label="Load sites"
            onClick={sitesLoaded}
            loading={loading}
            disabled={loading}
          />
        </Column>
        <Column>
          <Row>
            <Column span={1 / 3}>{sortButton}</Column>
            <Column span={2 / 3}>{searchForm}</Column>
          </Row>

          {!loading ? (
            <div className={styles.sitesList}>
              {list.length ? (
                <ul>
                  {list.map((site, i) => (
                    <li key={i}>
                      <SiteAccordion {...site} />
                    </li>
                  ))}
                </ul>
              ) : (
                <em>None loaded</em>
              )}
            </div>
          ) : (
            <Loader text="Loading sites..." width="100%" height="100px">
              <Spinner />
            </Loader>
          )}
        </Column>
      </Row>
    </Card>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites } = entities;
  return {
    loading: sites.loading,
    list: sites.list,
  };
};

const mapDispatchToProps = {
  sitesLoaded,
};

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(Sites);
export { ConnectedSites as Sites };
