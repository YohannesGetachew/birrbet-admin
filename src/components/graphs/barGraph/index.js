import React from "react";
import { Doughnut } from "react-chartjs-2";

const BarGraph = () => {
  const data = {
    labels: ["Basketball", "Rugby", "Soccer", "Golf"],
    datasets: [
      {
        label: "Deposits",
        data: [10, 50, 40, 20],
        backgroundColor: ["#E6EBF6", "#45008A", "#405568", "#57d986"],
        borderColor: ["#ffffff"],
      },
    ],
  };
  return (
    <div>
      <Doughnut
        height={null}
        width={null}
        data={data}
        options={{
          legend: {
            labels: {
              fontColor: "#E6EBF6",
              fontSize: 10,
            },
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
