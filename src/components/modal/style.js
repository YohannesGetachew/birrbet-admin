import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  modalContainer: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 102,
    alignItems: "center",
    justifyContent: "center",
  },

  backdrop: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 102,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  contentC: {
    // position: 'relative',
    zIndex: 103,
    maxHeight: "80vh",
    overflowY: "hidden",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    "scrollbar-width": "none",
  },
  closeButtonC: {
    textAlign: "right",
  },
  closeIcon: {
    padding: "4px",
    color: theme.palette.primary.light,
    opacity: "0.7",
    transition: "opacity 0.3s",
    fontSize: "30px",
    cursor: " pointer",
    "&:hover": {
      opacity: "1",
    },
  },
  childrenC: {
    boxShadow: theme.shadows[20],
    maxHeight: "70vh",
    overflowY: "auto",
  },
}));
export default style;
