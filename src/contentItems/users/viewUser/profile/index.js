import React from "react";
import style from "./style";

const Profile = ({ user }) => {
  const { firstName, lastName, username, role } = user;
  const classes = style();
  return (
    <div className={classes.root}>
      <div className={classes.profileCard}>
        <h4 className={classes.name}>{firstName + " " + lastName}</h4>
        <h5 className={classes.username}>{username}</h5>
        <span className={classes.roleTag}>{role}</span>
      </div>
    </div>
  );
};

export default Profile;
