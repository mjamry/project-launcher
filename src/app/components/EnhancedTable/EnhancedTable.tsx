import {
  TableContainer,
  Paper,
  Table,
  TablePagination,
  TableBody,
  styled,
} from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import Search from './Search';
import EnhancedTableHead from './EnhancedTableHead';
import { HeadCell, Order, getComparator } from './EnhancedTableTypes';

const TableHeaderTools = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  marginBottom: '5px',
});

const TableTitle = styled('div')({
  marginLeft: '20px',
  fontWeight: 'bold',
});

const SearchContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

type Props = {
  title?: string | React.ReactElement;
  data: any[];
  children: React.ReactElement;
  headCells: HeadCell[];
};

function EnhancedTable(props: Props) {
  const {
    data, children, headCells, title,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filteredData, setFilteredData] = useState<any[]>(data);

  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<any>('updated');

  useEffect(() => {
    setFilteredData(data);
    setPage(0);
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchValueChanged = useCallback((searchValue: string) => {
    const output = searchValue === ''
      ? data
      : data.filter((item) => {
        const keys = Object.keys(item);
        let hasItemValue = false;
        keys.every((key) => {
          if (typeof item[key] === 'string') {
            hasItemValue = item[key].toLowerCase().includes(searchValue);
          }
          return !hasItemValue;
        });

        return hasItemValue;
      });

    setFilteredData(output);
  }, [data]);

  return (
    <>
      <TableHeaderTools>
        <TableTitle>
          {title}
        </TableTitle>
        <SearchContainer>
          <Search handleSearch={handleSearchValueChanged} />
        </SearchContainer>
      </TableHeaderTools>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {children && React.cloneElement(
              children,
              {
                data: [...filteredData]
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default EnhancedTable;
