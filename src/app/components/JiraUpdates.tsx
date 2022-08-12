import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import jiraUpdatesState from '../state/JiraUpdatesState';
import JiraUpdateItem from './JiraUpdateItem';
import { ProjectCard } from './ProjectStyledComponents';

type Props = {
  projectKey: string;
};

function JiraUpdates(props: Props) {
  const { projectKey } = props;
  const issues = useRecoilValue(jiraUpdatesState)
    .find((u) => u.project === projectKey)?.issues;

  // eslint-disable-next-line no-console
  console.log(issues);

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
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Updated</TableCell>
                <TableCell align="right">Assignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <JiraUpdateItem item={issue} key={issue.id} />
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
