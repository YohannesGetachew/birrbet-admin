import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@material-ui/core";
import defaultOptions from "./defaultOptions";

const LineGraph = ({ data }) => {
  const theme = useTheme();
  const options = defaultOptions(theme);
  return (
    <div style={{ height: "210px" }}>
      <Line data={data} width={null} height={null} options={options} />
    </div>
  );
};

export default LineGraph;
