const muiDatatableOverride = {
  MUIDataTable: {
    root: {
      color: "#405568",
    },
    paper: {
      boxShadow: "none",
      backgroundColor: "#A0ABB344",
      padding: "5px",
    },
  },
  MuiToolbar: {
    root: {
      backgroundColor: "#E6EBF6",
      color: "#405568",
      "& .MuiIconButton-root": {
        color: "#405568",
      },
      "& .MuiIconButton-root:hover": {
        color: "#405568",
      },
    },
  },
  MUIDataTableHeadCell: {
    fixedHeader: {
      backgroundColor: "#E6EBF6",
      color: "#405568AA",
      // borderTop: "1px solid #000000",
    },
  },

  MUIDataTableBodyRow: {
    root: {
      "&:nth-child(odd)": {
        backgroundColor: "#F4F5F7",
      },
      "&:nth-child(even)": {
        backgroundColor: "#E6EBF6DD",
      },
    },
  },
  MUIDataTableBodyCell: {
    root: {
      // backgroundColor: "#E6EBF6",
      // padding: "3px 8px 3px 8px",
      color: "#405568CC",
      "@media print": {
        backgroundColor: "#ffffff",
      },
    },
  },
  MuiTableFooter: {
    root: {
      backgroundColor: "#E6EBF6",
      "& .MuiToolbar-root": {
        backgroundColor: "#E6EBF6",
      },
    },
  },
};

export default muiDatatableOverride;
