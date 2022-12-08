import {
  Box, Collapse, IconButton, styled, TableCell, TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { JiraIssue } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState } from '../state/JiraState';
import { EnhancedTable, HeadCell } from './EnhancedTable';
import JiraItemDetails from './JiraItemDetails';

const KeyboardArrowUpIcon = styled(KeyboardArrowDownIcon)({
  transform: 'rotate(180deg)',
});

const headCells: HeadCell[] = [
  {
    id: 'date',
    disablePadding: false,
    disableSorting: true,
    label: 'Date',
  },
  {
    id: 'author',
    disablePadding: false,
    disableSorting: true,
    label: 'Author',
  },
  {
    id: 'field',
    disablePadding: false,
    disableSorting: true,
    label: 'Field',
  },
  {
    id: 'content',
    disablePadding: false,
    disableSorting: true,
    label: 'Content',
  },
];

type Props = {
  item: JiraIssue;
  projectKey: string;
  updated: boolean;
};

function JiraItemDetailsTable(props: Props) {
  const { item, updated, projectKey } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updatedProjectIssues = useRecoilValue(jiraUpdatesState)
    .find((u) => u.project === projectKey);

  const [updates, setUpdates] = useRecoilState(jiraUpdatesState);

  const handleRowClick = () => {
    setIsOpen(!isOpen);
    const filteredIssues = updatedProjectIssues
      ? updatedProjectIssues.issues.filter((i) => i.id !== item.id) : [];
    const filteredProjects = updates.filter((i) => i.project !== projectKey);

    setUpdates([...filteredProjects, { project: projectKey, issues: filteredIssues }]);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand item"
            size="small"
            onClick={() => handleRowClick()}
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="item">
          {item.id}
          {updated ? '*' : ''}
        </TableCell>
        <TableCell>{item.summary}</TableCell>
        <TableCell align="right">{item.status}</TableCell>
        <TableCell align="right">{item.priority}</TableCell>
        <TableCell align="right">{item.updated.toLocaleString()}</TableCell>
        <TableCell align="right">{item.assignee}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <EnhancedTable
                data={item.changes ? item.changes : []}
                headCells={headCells}
              >
                <JiraItemDetails />
              </EnhancedTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default JiraItemDetailsTable;
