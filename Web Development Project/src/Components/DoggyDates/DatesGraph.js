import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDoggyDates } from "/src/Common/Services/DoggyService"; /* import functions from service */
import moment from "moment";
import Chart from "react-apexcharts";

/* STATEFUL PARENT COMPONENT */
const DatesGraph = ({ first, last }) => {
  const username = useParams();

  // Variables in the state to hold data
  const [graph, setGraph] = useState([]);

  // UseEffect to run when the page loads to
  // obtain ASYNC data and RENDER real time
  useEffect(() => {
    //display top list "Upcoming Events" for open dates
    getAllDoggyDates().then((doggyDates) => {
      setGraph(
        doggyDates.reduce(
          (acc, date) => {
            const weekIndex = moment(date.get("day")).day();
            acc[weekIndex]++;
            return acc;
          },
          [0, 0, 0, 0, 0, 0, 0]
        )
      ); // Each 0 corresponds to a day of the week
      // setDoggyDates(doggyDates);
    });
  }, []);

  return (
    <div>
      <div id="upcomingEvents">
        {/* As long as doggyDates array exists*/}
        <Chart
          options={{
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ]
            },
            title: {
              text: "Doggy Dates",
              align: "center"
            },
            yaxis: [
              {
                title: {
                  text: "Number of Dates"
                }
              }
            ],
            colors: ["#dae7f1"],
            dataLabels: {
              style: {
                colors: ["#808080"]
              }
            }
          }}
          series={[
            {
              name: "Doggy Dates",
              data: graph
            }
          ]}
          type="bar"
          width="500"
        />
      </div>
    </div>
  );
};

export default DatesGraph;
