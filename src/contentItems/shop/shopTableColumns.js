import React from "react";
import { CustomIconButton } from "../../components/buttons/iconButtons";

const getShopTableColumns = (history) => [
  {
    name: "branchName",
    label: "Branch name",
  },
  {
    name: "admin",
    label: "Admin",
    options: {
      customBodyRender: (value) => `${value.firstName} ${value.lastName}`,
    },
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => {
        return (
          <CustomIconButton
            type="edit"
            handleClick={() => history.push(`/admin/shops/edit/${value}`)}
          />
        );
      },
    },
  },
];

export default getShopTableColumns;
