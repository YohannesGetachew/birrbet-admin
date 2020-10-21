import { useTheme } from "@material-ui/core";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoghnutGraph = ({ data }) => {
  const theme = useTheme();
  const defaultOptions = {
    legend: {
      labels: {
        fontColor: theme.palette.accentOne.main,
        fontSize: 10,
      },
    },
  };
  return (
    <div>
      <Doughnut
        height={null}
        width={null}
        data={data}
        options={defaultOptions}
      />
    </div>
  );
};

export default DoghnutGraph;
