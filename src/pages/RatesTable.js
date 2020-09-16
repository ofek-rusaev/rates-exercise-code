import React, { useEffect } from 'react';

// @material-ui/core components
import { Table, TableHead, TableRow, TableBody, TableCell, TableContainer, TablePagination } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Services
import { ratesService, REFRESH_TIME } from '../services/rates.service';

// Components
import CircularIndeterminate from '../components/CircularIndeterminate';
import RateRows from '../components/RateRows';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 480,
    },
    tableHead: {
        backgroundColor: '#2F3B4B',

    },
    tableBody: {
        backgroundColor: '#252C36',
    },
    tableCell: {
        fontSize: '10px',
        color: '#cdd3d8',
    },
    active: {
        color: '#1dd120'
    },
    canceled: {
        color: '#e81b37'
    }

}));

export default function RatesTable() {
    const classes = useStyles();

    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [isFetching, setIsFetching] = React.useState(true);

    useEffect(() => {
        async function getRows() {
            setIsFetching(true);
            let data = await ratesService.query();
            setIsFetching(false);
            setRows(data);
        }
        getRows();
        const intervalId = setInterval(getRows, REFRESH_TIME);
        return () => clearInterval(intervalId);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        (isFetching) ? <CircularIndeterminate /> :
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableCell}>CURRENCY</TableCell>
                                <TableCell className={classes.tableCell}>RATE</TableCell>
                                <TableCell className={classes.tableCell}>BID</TableCell>
                                <TableCell className={classes.tableCell}>ASK</TableCell>
                                <TableCell className={classes.tableCell}>HIGH</TableCell>
                                <TableCell className={classes.tableCell}>LOW</TableCell>
                                <TableCell className={classes.tableCell}>OPEN</TableCell>
                                <TableCell className={classes.tableCell}>CLOSE</TableCell>
                                <TableCell className={classes.tableCell}>TIME STAMP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            <RateRows rows={rows} page={page} rowsPerPage={rowsPerPage}></RateRows>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>

    );
}
