import React from 'react';
import {
  TableHead, TableRow, TableCell, TableSortLabel, Box, styled,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { HeadCell, Order } from './EnhancedTableTypes';

const TableSortContainer = styled(TableSortLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '& .MuiTableSortLabel-icon': {
    color: `${theme.palette.text.primary} !important`,
  },
}));

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
                <TableSortContainer
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
                </TableSortContainer>
              )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
