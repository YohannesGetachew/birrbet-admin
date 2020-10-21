import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { motion } from "framer-motion";
import fixtureTableStyle from "./style";

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
  const classes = fixtureTableStyle();

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      className={classes.root}
    >
      <h3 className={classes.tableTitle}>Favorite Fixtures</h3>
      <TableContainer>
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
