import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  avatarNnotifiC: {
    alignItems: "center",
    justifyContent: (props) =>
      props.navCollapsed ? "center" : "space-between",
    height: "100%",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "8px",
    padding: "2px 10px",
    boxShadow: `0 0 10px ${theme.palette.secondary.light}`,
    position: "relative",
  },
  avatar: {
    width: "27px",
    height: "27px",
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.secondary.light,
    cursor: "pointer",
  },
  badgeC: {
    display: (props) => (props.navCollapsed ? "none" : "inline-block"),
  },
  badge: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
  userInfo: {
    display: (props) => (props.expanded ? "block" : "none"),
    position: "absolute",
    bottom: "45px",
    left: "2px",
    right: "2px",
    backgroundColor: theme.palette.primary.light,
    boxShadow: `0 0 20px ${theme.palette.secondary.light}`,
    borderRadius: "2px",
  },
  userSettingC: {
    margin: "4px 0",
    padding: (props) => (props.navCollapsed ? "2px 0" : "2px 0 2px 10px"),
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  userSettingIcon: {
    fontSize: "20px",
    margin: (props) => (props.navCollapsed ? "0 auto" : "0 10px 0 0"),
  },
  userSettingText: {
    fontSize: "14px",
    fontWeight: "500",
    display: (props) => (props.navCollapsed ? "none" : "inline-block"),
  },
  notification: {
    padding: "4px",
    fontSize: "13px",
  },
}));

export default style;
