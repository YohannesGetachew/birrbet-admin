import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import tableStyle from "./style";

// ...rest = data, title, columns
const Table = ({ ...rest }) => {
  const style = tableStyle();
  const defaultOptions = {
    selectableRows: "none",
    filterType: "textField",
    enableNestedDataAccess: ".",
  };

  return (
    <div className={style.root}>
      <MUIDataTable {...rest} options={defaultOptions} />
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string,
};

export default Table;
