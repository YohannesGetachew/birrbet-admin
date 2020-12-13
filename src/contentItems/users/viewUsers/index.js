import React from "react";
import { useTheme } from "@material-ui/core";
import Table from "../../../components/table";
import getUsersTableColumns from "./usersTableColumns";
import { useHistory } from "react-router-dom";
import useGetCurrentUserRole from "../../../customHooks/helpers/useGetCurrentUserRole";

const ViewUsers = ({ users }) => {
  const history = useHistory();
  const reorganizedUsers = users.map((user) => {
    return {
      _id: user._id,
      nameAndPic: {
        name: `${user.firstName} ${user.lastName}`,
        pic: user.profileImage,
      },
      isVerified: user.isVerified,
      role: user.role,
      username: user.username,
    };
  });
  const theme = useTheme();
  const currentUserRole = useGetCurrentUserRole();
  const usersColumn = getUsersTableColumns(theme, history, currentUserRole);
  return <Table data={reorganizedUsers} columns={usersColumn} />;
};
export default ViewUsers;
