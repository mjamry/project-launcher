import styled from '@emotion/styled';
import { Collapse } from '@mui/material';
import React, { useContext } from 'react';
import ProjectCardContext from './ProjectCardContext';

const ContentContainer = styled('div')({
  padding: '10px 20px',
});

type ProjectCardContentProps = {
  children: React.ReactElement | React.ReactElement[],
};

function ProjectCardContent({ children }: ProjectCardContentProps) {
  const { isCollapsed } = useContext(ProjectCardContext);

  return (
    <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
      <ContentContainer>
        { children }
      </ContentContainer>
    </Collapse>
  );
}

export default ProjectCardContent;
