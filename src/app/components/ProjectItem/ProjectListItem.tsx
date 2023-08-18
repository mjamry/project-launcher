import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import { ProjectItem } from '../../../shared/dto/ProjectDto';

export const Item = styled(Button)({
  marginTop: '8px',
});

type Props<T> = {
  item: T,
  onClick: () => void,
};

function ProjectListItem<T extends ProjectItem>(props: Props<T>) {
  const { item, onClick } = props;

  return (
    <Item
      variant="contained"
      key={item.name}
      onClick={onClick}
      title={item.description}
    >
      {item.name}
    </Item>
  );
}

export default ProjectListItem;
