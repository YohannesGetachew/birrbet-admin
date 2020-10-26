import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
  },
  formRow: {
    padding: "8px",
  },
  section: {
    marginBottom: "16px",
    backgroundColor: `${theme.palette.primary.main}CC`,
    borderRadius: "4px",
    padding: "20px",
  },
  header: {
    color: `${theme.palette.secondary.main}ee`,
    fontSize: "24px",
    justifyContent: "space-between",
  },

  field: {
    padding: "0 8px 8px 8px",
  },
  action: {
    marginLeft: "auto",
    right: 0,
  },
  submitButtonC: {
    justifyContent: "flex-end",
    padding: "20px",
  },
  contact: {
    alignItems: "flex-end",
  },
  removeContact: {
    marginLeft: 20,
    padding: 0,
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.warning.main,
  },
}));

export default style;
