const defaultOptions = (theme) => ({
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    labels: {
      fontColor: theme.palette.primary.main,
      fontSize: 10,
    },
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          zeroLineColor: theme.palette.primary.main,
        },
        ticks: {
          fontColor: theme.palette.primary.main,
        },
      },
    ],
    yAxes: [
      {
        display: true,
        gridLines: {
          zeroLineColor: theme.palette.primary.main,
        },
        ticks: {
          fontColor: theme.palette.primary.main,
          fontSize: 10,
        },
      },
    ],
  },
});

export default defaultOptions;
