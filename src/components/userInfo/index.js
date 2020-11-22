import React, { useState, useContext } from "react";
import { Notifications, ExitToAppOutlined } from "@material-ui/icons";
import { Avatar, Grid, Badge } from "@material-ui/core";
import { AuthContext, Actions } from "../../contexts/auth";
import { CollapseContext } from "../../contexts/collapse";
import userInfoStyle from "./style";

const UserInfo = () => {
  const [expanded, setExpanded] = useState(null);
  const {
    collapseData: { collapsed: navCollapsed },
  } = useContext(CollapseContext);
  const handleExpand = (clickedIcon) => {
    setExpanded((prevState) =>
      prevState === clickedIcon ? null : clickedIcon
    );
  };
  const { dispatch } = useContext(AuthContext);
  const profileImage = localStorage.getItem("profileImage");
  const logout = () => dispatch(Actions.removeAuthData());
  const style = userInfoStyle({ expanded, navCollapsed });
  return (
    <Grid container className={style.avatarNnotifiC}>
      <div className={style.userInfo}>
        {expanded === "AVATAR" ? (
          <Grid container onClick={logout} className={style.userSettingC}>
            <ExitToAppOutlined className={style.userSettingIcon} />
            <span className={style.userSettingText}>Logout</span>
          </Grid>
        ) : (
          <p className={style.notification}>No notifications for now</p>
        )}
      </div>
      <Grid item>
        <Avatar
          src={profileImage}
          className={style.avatar}
          onClick={() => handleExpand("AVATAR")}
        />
      </Grid>
      <Grid item className={style.badgeC}>
        <Badge
          variant="dot"
          overlap="circle"
          children={<Notifications />}
          color="error"
          className={style.badge}
          onClick={() => handleExpand("BADGE")}
        />
      </Grid>
    </Grid>
  );
};

export default UserInfo;
