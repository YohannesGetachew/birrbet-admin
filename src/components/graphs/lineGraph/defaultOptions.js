const defaultOptions = (theme) => ({
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    labels: {
      fontColor: theme.palette.secondary.dark,
      fontSize: 10,
    },
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          zeroLineColor: theme.palette.secondary.main,
        },
        ticks: {
          fontColor: theme.palette.secondary.main,
        },
      },
    ],
    yAxes: [
      {
        display: true,
        gridLines: {
          zeroLineColor: theme.palette.secondary.main,
        },
        ticks: {
          fontColor: theme.palette.secondary.main,
          fontSize: 10,
        },
      },
    ],
  },
});

export default defaultOptions;
