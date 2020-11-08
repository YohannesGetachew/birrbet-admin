const getMuiDatatableOverride = (palette) => ({
  MUIDataTable: {
    root: {
      color: palette.secondary.light,
    },
    paper: {
      // boxShadow: "none",
      // backgroundColor: `${palette.secondary.light}44`,
      // padding: "5px",
    },
  },
  MuiToolbar: {
    root: {
      backgroundColor: `${palette.primary.dark}dd`,
      color: palette.secondary.main,
      "& .MuiIconButton-root": {
        color: palette.secondary.main,
      },
      "& .MuiIconButton-root:hover": {
        color: palette.secondary.dark,
      },
    },
  },
  MUIDataTableHeadCell: {
    fixedHeader: {
      backgroundColor: `${palette.primary.dark}dd`,
      color: `${palette.secondary.light}`,
      // borderTop: "1px solid #000000",
    },
  },

  MUIDataTableBodyRow: {
    root: {
      "&:nth-child(odd)": {
        backgroundColor: palette.primary.light,
        "&:hover": {
          backgroundColor: palette.primary.dark,
        },
      },
      "&:nth-child(even)": {
        backgroundColor: `${palette.accentOne.light}0B`,
        "&:hover": {
          backgroundColor: palette.primary.dark,
        },
      },
    },
  },
  MUIDataTableBodyCell: {
    root: {
      // backgroundColor: "#E6EBF6",
      // padding: "3px 8px 3px 8px",
      color: `${palette.secondary.main}`,
      "@media print": {
        backgroundColor: "#ffffff",
      },
    },
  },
  MuiTableFooter: {
    root: {
      backgroundColor: palette.primary.dark,
      "& .MuiToolbar-root": {
        backgroundColor: palette.primary.dark,
      },
    },
  },
});

export default getMuiDatatableOverride;
