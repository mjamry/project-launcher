import {
  Box, Button, Collapse, IconButton, styled, TableCell, TableRow,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { JiraIssue } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState } from '../state/JiraState';
import JiraItemDetails from './JiraItemDetails';
import EnhancedTable from './EnhancedTable/EnhancedTable';
import { HeadCell } from './EnhancedTable/EnhancedTableTypes';
import { appThemeState } from '../state/AppState';
import { useLinkLaunchService } from '../services/IpcLaunchServices';

const KeyboardArrowUpIcon = styled(KeyboardArrowDownIcon)({
  transform: 'rotate(180deg)',
});

const ItemLink = styled(Button)({
  fontWeight: 'bold',
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
};

function JiraItemDetailsTable(props: Props) {
  const { item, projectKey } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const appTheme = useRecoilValue(appThemeState);
  const linkLauncher = useLinkLaunchService();

  const updatedProjectIssues = useRecoilValue(jiraUpdatesState)
    .find((u) => u.project === projectKey)?.issues;

  const [allUpdates, setUpdates] = useRecoilState(jiraUpdatesState);

  useEffect(() => {
    setIsOpen(false);
  }, [projectKey]);

  useEffect(() => {
    if (updatedProjectIssues && updatedProjectIssues.find((upi) => upi.id === item.id)) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [item.id, updatedProjectIssues]);

  const handleRowClick = () => {
    setIsOpen(!isOpen);

    if (isUpdated) {
      const filteredIssues = updatedProjectIssues
        ? updatedProjectIssues.filter((i) => i.id !== item.id) : [];
      const filteredProjects = allUpdates.filter((i) => i.project !== projectKey);

      setUpdates([...filteredProjects, { project: projectKey, issues: filteredIssues }]);
    }
  };

  const getThemeColors = () => ({
    color:
        isUpdated
          ? appTheme.highlightColor
          : appTheme.secondaryColor,
    backgroundColor:
        isUpdated
          ? appTheme.highlightBackgroundColor
          : appTheme.secondaryBackgroundColor,
    '.MuiTableCell-root': {
      color:
          isUpdated
            ? appTheme.highlightColor
            : appTheme.secondaryColor,
    },
  });

  return (
    <>
      <TableRow sx={getThemeColors()}>
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
          <ItemLink
            sx={getThemeColors()}
            onClick={() => linkLauncher.launch(item.url)}
          >
            {item.id}
          </ItemLink>
        </TableCell>
        <TableCell>{item.summary}</TableCell>
        <TableCell align="right">{item.status}</TableCell>
        <TableCell align="right">{item.priority}</TableCell>
        <TableCell align="right">{item.updated.toLocaleString()}</TableCell>
        <TableCell align="right">{item.assignee}</TableCell>
      </TableRow>
      <TableRow sx={getThemeColors()}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <EnhancedTable
                title={item.id}
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
