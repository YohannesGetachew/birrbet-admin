import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    padding: "10px",
    borderRadius: "4px",
  },
  table: {
    minWidth: 650,
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    padding: "3px",
  },
  tableTitle: {
    color: theme.palette.primary.main,
    fontWeight: "normal",
    opacity: "0.9",
    marginBottom: "3px",
  },
  tableBody: {
    color: theme.palette.primary.main,
  },
}));

function createData(name, sport, league, betNumber) {
  return { name, sport, league, betNumber };
}

const rows = [
  createData("Double chance", "Soccer", "Premier league", 24),
  createData("Draw", "Soccer", "Champions league", 10),
  createData("Win-Lose", "Basketball", "Playoffs", 15),
  createData("Corner kick", "Soccer", "Premier league", 5),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className={classes.root}
    >
      <h3 className={classes.tableTitle}>Favorite Fixtures</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableBody}>Fixture name</TableCell>
              <TableCell className={classes.tableBody} align="right">
                Sport
              </TableCell>
              <TableCell className={classes.tableBody} align="right">
                League
              </TableCell>
              <TableCell className={classes.tableBody} align="right">
                Bets
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {rows.map((row) => (
              <TableRow key={row.name} className={classes.tableBody}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableBody}
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableBody} align="right">
                  {row.sport}
                </TableCell>
                <TableCell className={classes.tableBody} align="right">
                  {row.league}
                </TableCell>
                <TableCell className={classes.tableBody} align="right">
                  {row.betNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
}
