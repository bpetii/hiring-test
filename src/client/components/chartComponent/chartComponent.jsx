import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { Button, Card, Heading, CheckBox } from "~gui-library";
import { connect } from "react-redux";
import CountUp from "react-countup";

// For more user-friendly outlook, I make the website more intuitive by enabling the user to handle the Charts on their own.
// Users are very unique with peculiar decision, that is why my task is to satisty all the users who visit this page
// by providing more opportunities to display the information.

export const ChartComponent = ({ list, history }) => {
  const [isBar, setIsBar] = useState(true);
  const barChart = (
    <Bar
      data-testid="bar-chart"
      height={100}
      data={{
        labels: list.map((site) => site.name),
        datasets: [
          {
            label: "Oil Rigs",
            backgroundColor: [
              "rgba(255, 106, 14, 0.7)",
              "rgba(255, 106, 14, 0.7)",
              "rgba(255, 106, 14, 0.7)",
              "rgba(255, 106, 14, 0.7)",
              "rgba(255, 106, 14, 0.7)",
            ],
            data: list.map((item) => item.oilRigs.length),
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                max: list
                  ? Math.max(...list.map((item) => item.oilRigs.length))
                  : 1,
                min: 0,
                stepSize: 1,
              },
            },
          ],
        },
        legend: { display: false },
        title: { display: true, text: `Number of rig oils` },
      }}
    />
  );

  const lineChart = (
    <Line
      data-testid="line-chart"
      height={100}
      data={{
        labels: ["0", ...list.map((site) => site.name)],
        datasets: [
          {
            data: [0, ...list.map((item) => item.oilRigs.length)],
            label: "Number of rig oils",
            borderColor: "rgba(255, 106, 14, 0.7)",
            fill: true,
          },
        ],
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true,
            labels: {
              boxWidth: 50,
              fontSize: 10,
              fontColor: "#bbb",
              padding: 5,
            },
          },

          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                },
              },
            ],
          },
        },
      }}
    ></Line>
  );

  return (
    <div>
      <Button
        label="Back to Main"
        colored
        onClick={() => {
          history.push("/");
        }}
      />
      <div
        style={{
          display: "flex",
          textAlign: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Card raised heading={<Heading>Number of Sites</Heading>}>
          <CountUp
            data-testid="number-of-sites"
            start={0}
            end={list.length}
            duration={5}
            separator=","
          />
        </Card>
        <Card raised heading={<Heading>Number of Oil rigs</Heading>}>
          <CountUp
            data-testid="number-of-rig-oils"
            start={0}
            end={list
              .map((item) => item.oilRigs.length)
              .reduce((acc, curr) => {
                return acc + curr;
              }, 0)}
            duration={5}
            separator=","
          />
        </Card>
      </div>
      <CheckBox
        data-testid="checkbox"
        label="Bar chart"
        checked={isBar}
        onChange={() => setIsBar((prev) => !prev)}
      />
      <div style={{ height: "500px", width: "100%" }}>
        {list.length
          ? isBar
            ? barChart
            : lineChart
          : "none of loaded - Please load the sites"}
      </div>
    </div>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites } = entities;
  return {
    list: sites.list,
  };
};

export default connect(mapStateToProps)(withRouter(ChartComponent));
