import muiDatatableOverride from "./mui-datatable-override";
export const appThemeLight = {
  palette: {
    primary: {
      light: "#ffffff",
      main: "#F4F5F7",
      dark: "#E6EBF6",
    },
    secondary: {
      light: "#A0ABB3",
      main: "#405568",
      dark: "#102940",
    },
    accentOne: {
      light: "#797979",
      main: "#353535",
      dark: "#181818",
    },
    // accentTwo: {
    //   light: "#ffd659",
    //   main: "#eba000",
    //   dark: "#db8700",
    // },
    accentTwo: {
      light: "#942AFF",
      main: "#6D0DCD",
      dark: "#45008A",
    },
    error: {
      light: "#fc035e",
      main: "#fc0352",
      dak: "#fc0345",
    },
  },
  overrides: {
    ...muiDatatableOverride,
  },
};
