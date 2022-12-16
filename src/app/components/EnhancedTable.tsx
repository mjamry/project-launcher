import {
  TableContainer,
  Paper,
  Table,
  TablePagination,
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableBody,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { visuallyHidden } from '@mui/utils';
import Search from './Search';

const TableHeaderTools = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '5px',
});

const TableTitle = styled('div')({
  marginLeft: '20px',
  fontWeight: 'bold',
});

function descendingComparator(a: any, b: any, orderBy: keyof any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';
type Align = 'right' | 'left';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: string | Date },
    b: { [key in Key]: string | Date },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  disableSorting?: boolean;
  id: keyof any;
  label: string;
  align?: Align;
}

interface EnhancedTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[]
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    order, orderBy, onRequestSort, headCells,
  } = props;
  // eslint-disable-next-line max-len
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.align ? headCell.align : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting
              ? headCell.label
              : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

type Props = {
  title: string;
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

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('id');

  useEffect(() => {
    setFilteredData(data);
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

  const handleSearchValueChanged = (searchValue: string) => {
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
  };

  return (
    <>
      <TableHeaderTools>
        <TableTitle>
          {title}
        </TableTitle>
        <Search handleSearch={handleSearchValueChanged} />
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

export { EnhancedTable };
export type { HeadCell };
