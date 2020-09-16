import React from 'react';
import { TableRow, TableCell } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tableCell: {
        fontSize: '10px',
        color: '#cdd3d8',
    }
}));

const RateRows = (props) => {
    const classes = useStyles();
    const { rows, page, rowsPerPage } = props;

    return (
        rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
                <TableRow key={row.currency}>
                    <TableCell className={classes.tableCell}>{row.currency}</TableCell>
                    <TableCell className={classes.tableCell}>{row.rate}</TableCell>
                    <TableCell className={classes.tableCell}>{row.bid}</TableCell>
                    <TableCell className={classes.tableCell}>{row.ask}</TableCell>
                    <TableCell className={classes.tableCell}>{row.high}</TableCell>
                    <TableCell className={classes.tableCell}>{row.low}</TableCell>
                    <TableCell className={classes.tableCell}>{row.open}</TableCell>
                    <TableCell className={classes.tableCell}>{row.close}</TableCell>
                    <TableCell className={classes.tableCell}>{row.timestamp}</TableCell>
                </TableRow>
            ))
    );
}

export default RateRows;