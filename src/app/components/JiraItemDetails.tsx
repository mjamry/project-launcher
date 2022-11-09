import {
  Box, Collapse, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { JiraIssue } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState } from '../state/JiraState';

const KeyboardArrowUpIcon = styled(KeyboardArrowDownIcon)({
  transform: 'rotate(180deg)',
});

type Props = {
  item: JiraIssue;
  projectKey: string;
  updated: boolean;
};

function JiraUpdateItem(props: Props) {
  const { item, updated, projectKey } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updatedProjectIssues = useRecoilValue(jiraUpdatesState)
    .find((u) => u.project === projectKey);

  const [updates, setUpdates] = useRecoilState(jiraUpdatesState);

  const handleRowClick = () => {
    setIsOpen(!isOpen);
    const filteredIssues = updatedProjectIssues!.issues.filter((i) => i.id !== item.id);
    const filteredProjects = updates.filter((i) => i.project !== projectKey);

    setUpdates([...filteredProjects, { project: projectKey, issues: filteredIssues }]);
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Field</TableCell>
                    <TableCell>Content</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.changes?.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell component="th" scope="item" width="10%">
                        {change.created.toLocaleString()}
                      </TableCell>
                      <TableCell width="10%">{change.author}</TableCell>
                      <TableCell width="10%">{change.field}</TableCell>
                      <TableCell width="40%">{change.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default JiraUpdateItem;
