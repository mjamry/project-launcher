import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { jiraHistoryState, jiraUpdatesState } from '../state/JiraState';
import JiraUpdateItem from './JiraItemDetails';
import { ProjectCard } from './ProjectStyledComponents';

type Props = {
  projectKey: string;
};

function JiraUpdates(props: Props) {
  const { projectKey } = props;
  const issues = useRecoilValue(jiraHistoryState)
    .find((u) => u.project === projectKey)?.issues;
  const updatedIssues = useRecoilValue(jiraUpdatesState)
    .find((u) => u.project === projectKey)?.issues;

  return (
    <>
      { issues
      && (
      <ProjectCard>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Issue Id</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Updated</TableCell>
                <TableCell align="right">Assignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <JiraUpdateItem
                  item={issue}
                  key={issue.id}
                  updated={updatedIssues?.find((i) => i.id === issue.id) !== undefined}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ProjectCard>
      )}
    </>
  );
}

export default JiraUpdates;
