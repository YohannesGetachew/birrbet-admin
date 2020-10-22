import React from "react";
import { useTheme } from "@material-ui/core";
import Table from "../../../components/table";
import getUsersTableColumns from "./usersTableColumns";
import { useHistory } from "react-router-dom";

const ViewUsers = ({ users }) => {
  const history = useHistory();
  const reorganizedUsers = users.map((user) => {
    return {
      _id: user._id,
      nameAndPic: {
        name: `${user.firstName} ${user.lastName}`,
        pic: user.profileImage,
      },
      isActive: user.isActive,
      role: user.role,
      username: user.username,
    };
  });
  const theme = useTheme();
  const usersColumn = getUsersTableColumns(theme, history);
  return <Table data={reorganizedUsers} columns={usersColumn} />;
};
export default ViewUsers;
