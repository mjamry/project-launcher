import {
  Box, Collapse, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { JiraIssue } from '../../shared/dto/JiraTypes';

const KeyboardArrowUpIcon = styled(KeyboardArrowDownIcon)({
  transform: 'rotate(180deg)',
});

type Props = {
  item: JiraIssue;
};

function JiraUpdateItem(props: Props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand item"
            size="small"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="item">
          {item.id}
        </TableCell>
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
                    <TableRow key={change.created.getTime()}>
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
