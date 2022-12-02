import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  TableSortLabel,
} from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { visuallyHidden } from '@mui/utils';
import { jiraHistoryState, jiraUpdatesState } from '../state/JiraState';
import JiraUpdateItem from './JiraItemDetails';
import { ProjectCard } from './ProjectStyledComponents';

type Props = {
  projectKey: string;
};

type JiraItemDataDTO = {
  id: string,
  summary: string,
  assignee: string,
  status: string,
  updated: Date,
  priority: string,
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
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
  id: keyof JiraItemDataDTO;
  label: string;
  align?: Align;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'summary',
    disablePadding: false,
    label: 'Summary',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
    align: 'right',
  },
  {
    id: 'priority',
    disablePadding: false,
    label: 'Priority',
    align: 'right',
  },
  {
    id: 'updated',
    disablePadding: false,
    label: 'Updated',
    align: 'right',
  },
  {
    id: 'assignee',
    disablePadding: false,
    label: 'Assignee',
    align: 'right',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof JiraItemDataDTO) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order, orderBy, onRequestSort,
  } = props;
  // eslint-disable-next-line max-len
  const createSortHandler = (property: keyof JiraItemDataDTO) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
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
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function JiraUpdates(props: Props) {
  const { projectKey } = props;
  const issues = useRecoilValue(jiraHistoryState)
    .find((u) => u.project === projectKey)?.issues;
  const updatedIssues = useRecoilValue(jiraUpdatesState)
    .find((u) => u.project === projectKey)?.issues;

  // enhancedTable
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof JiraItemDataDTO>('id');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof JiraItemDataDTO,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
      { issues
      && (
      <ProjectCard>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {[...issues]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((issue) => (
                  <JiraUpdateItem
                    item={issue}
                    projectKey={projectKey}
                    key={issue.id}
                    updated={updatedIssues?.find((i) => i.id === issue.id) !== undefined}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={issues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ProjectCard>
      )}
    </>
  );
}

export default JiraUpdates;
