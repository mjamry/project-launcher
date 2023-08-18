import React from 'react';
import { useRecoilValue } from 'recoil';
import { jiraHistoryState } from '../state/JiraState';
import { ProjectCardContainer } from './ProjectItem/ProjectStyledComponents';
import JiraItems from './JiraItems';
import EnhancedTable from './EnhancedTable/EnhancedTable';
import { HeadCell } from './EnhancedTable/EnhancedTableTypes';

type Props = {
  projectKey: string;
};

const headCells: HeadCell[] = [
  {
    id: 'id',
    disablePadding: true,
    disableSorting: true,
    label: '',
  },
  {
    id: 'id',
    disablePadding: false,
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

function JiraItemsTable(props: Props) {
  const { projectKey } = props;
  const issues = useRecoilValue(jiraHistoryState)
    .find((u) => u.project === projectKey)?.issues;

  return (
    <>
      { issues
      && (
      <ProjectCardContainer>
        <EnhancedTable
          data={issues}
          headCells={headCells}
        >
          <JiraItems projectKey={projectKey} />
        </EnhancedTable>
      </ProjectCardContainer>
      )}
    </>
  );
}

export default JiraItemsTable;
