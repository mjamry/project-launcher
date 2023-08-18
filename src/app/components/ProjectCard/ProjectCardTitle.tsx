import React, { useContext } from 'react';
import styled from '@emotion/styled';
import CollapseButton from '../CollapseButton';
import ProjectCardContext from './ProjectCardContext';

const Root = styled('div')({
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'row',
});

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '8px',
});

type ProjectCardTitleProps = {
  children: React.ReactElement | React.ReactElement[],
};

function ProjectCardTitle({ children }: ProjectCardTitleProps) {
  const { isCollapsed, setIsCollapsed } = useContext(ProjectCardContext);

  return (
    <Root>
      <CollapseButton
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <Container>
        {children}
      </Container>
    </Root>
  );
}

export default ProjectCardTitle;
