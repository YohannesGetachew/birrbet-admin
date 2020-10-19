import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
  const data = {
    labels: ["10-23-12", "11-23-12", "12-23-12"],
    datasets: [
      {
        label: "Deposits",
        data: [10, 50, 40, 20],
        backgroundColor: ["transparent"],
        borderColor: ["#ffffff"],
      },
      {
        label: "Withdrawals",
        data: [45, 30, 10, 40],
        backgroundColor: ["transparent"],
        borderColor: ["#942AFF"],
      },
    ],
  };
  return (
    <div style={{ height: "210px" }}>
      <Line
        data={data}
        width={null}
        height={null}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: "#E6EBF6",
              fontSize: 10,
            },
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  zeroLineColor: "#fff",
                },
                ticks: {
                  fontColor: "rgba(255,255,255,0.7)",
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  zeroLineColor: "#fff",
                },
                ticks: {
                  fontColor: "rgba(255,255,255,0.7)",
                  fontSize: 10,
                },
              },
            ],
          },
        }}
      />
    </div>
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
