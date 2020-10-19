import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
  const data = {
    labels: ["12-23-12", "11-23-12", "10-23-12"],
    datasets: [
      {
        label: "Deposits",
        data: [34589, 5689, 3456, 2345],
        backgroundColor: ["transparent"],
        borderColor: ["#ffffff"],
      },
      {
        label: "Withdrawals",
        data: [23456, 32456, 51627, 33874],
        backgroundColor: ["transparent"],
        borderColor: ["#942AFF"],
      },
    ],
  };
  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: false,
      }}
      width={null}
      height={null}
    />
  );
};

export default LineGraph;

// backgroundColor: [
//   "rgba(255, 99, 132, 0.2)",
//   "rgba(54, 162, 235, 0.2)",
//   "rgba(255, 206, 86, 0.2)",
//   "rgba(75, 192, 192, 0.2)",
//   "rgba(153, 102, 255, 0.2)",
//   "rgba(255, 159, 64, 0.2)",
// ],
// borderColor: [
//   "rgba(255, 99, 132, 1)",
//   "rgba(54, 162, 235, 1)",
//   "rgba(255, 206, 86, 1)",
//   "rgba(75, 192, 192, 1)",
//   "rgba(153, 102, 255, 1)",
//   "rgba(255, 159, 64, 1)",
// ],
// borderWidth: 1,
