import {
  TableRow, TableCell,
} from '@mui/material';
import React from 'react';
import { JiraChangelogItem } from '../../shared/dto/JiraTypes';

type Props = {
  data?: JiraChangelogItem[],
};

function JiraItemDetails(props: Props) {
  const { data: changes } = props;

  return (
    <>
      {changes?.map((change) => (
        <TableRow key={change.id}>
          <TableCell component="th" scope="item" width="10%">
            {change.created.toLocaleString()}
          </TableCell>
          <TableCell width="10%">{change.author}</TableCell>
          <TableCell width="10%">{change.field}</TableCell>
          <TableCell width="40%">{change.content}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default JiraItemDetails;
