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

export const Sites = ({ list, loading, sitesLoaded }) => {
  const [isAsc, setIsAsc] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [filteredSortedList, setFilteredSortedList] = useState(list);

  useEffect(() => {
    onSortByName();
    onfilterList();
  }, [isAsc, list, userInput]);

  const onfilterList = () => {
    if (userInput) {
      setFilteredSortedList(
        list
          .slice()
          .filter((site) =>
            site.name.toUpperCase().startsWith(userInput.toUpperCase())
          )
      );
    }
  };

  const onSortByName = () => {
    if (isAsc) {
      setFilteredSortedList(
        list.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        })
      );
    } else {
      setFilteredSortedList(
        list.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        })
      );
    }
  };

  const loadForm = loading && (
    <Loader text="Loading sites..." width="100%" height="100px">
      <Spinner />
    </Loader>
  );

  const siteList = filteredSortedList.length ? (
    <ul>
      {filteredSortedList.map((site, i) => (
        <li key={i}>
          <SiteAccordion {...site} />
        </li>
      ))}
    </ul>
  ) : (
    <em>None loaded</em>
  );

  const sortButton = list.length ? (
    <Button
      name="example"
      label="Sort by name"
      onClick={() => {
        setIsAsc((prevState) => !prevState);
      }}
      colored
      width="200px"
    />
  ) : null;

  // I created a plus function for more user-friendly outlook, where the users can filter the sites by name
  const searchForm = list.length ? (
    <Input
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      name="example"
      placeholder="Filter by name"
    />
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
          {loadForm}
          <div className={styles.sitesList}>{siteList}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
