import {
  TableRow, TableCell,
} from '@mui/material';
import React from 'react';
import { JiraChangelogItem } from '../../shared/dto/JiraTypes';
import ReducedContent from './ReducedContent';
import JiraIssueFields from '../../shared/dto/JiraIssueFields';

type Props = {
  data?: JiraChangelogItem[],
};

function JiraItemDetails(props: Props) {
  const { data: changes } = props;

  return (
    <>
      {changes?.map((change) => (
        <TableRow key={change.id}>
          <TableCell component="th" scope="item" width="20%">
            {change.created.toLocaleString()}
          </TableCell>
          <TableCell width="10%">{change.author}</TableCell>
          <TableCell width="10%">{change.field}</TableCell>
          <TableCell width="50%">
            {change.field === JiraIssueFields.comment
              ? <ReducedContent content={change.content} maxLength={300} />
              : <>{change.content}</>}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default JiraItemDetails;
