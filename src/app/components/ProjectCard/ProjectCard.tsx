import React, {
  useMemo, useState,
} from 'react';
import { ProjectCardContainer } from '../ProjectItem/ProjectStyledComponents';
import ProjectCardContent from './ProjectCardContent';
import ProjectCardTitle from './ProjectCardTitle';
import ProjectCardContext from './ProjectCardContext';

type ProjectCardProps = {
  children: React.ReactElement | React.ReactElement[];
};

function ProjectCard(props: ProjectCardProps) {
  const {
    children,
  } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const contextValue = useMemo(
    () => ({ isCollapsed, setIsCollapsed }),
    [isCollapsed],
  );

  return (
    <ProjectCardContainer>
      <ProjectCardContext.Provider value={contextValue}>
        {children}
      </ProjectCardContext.Provider>
    </ProjectCardContainer>
  );
}

ProjectCard.Content = ProjectCardContent;
ProjectCard.Title = ProjectCardTitle;
export default ProjectCard;
