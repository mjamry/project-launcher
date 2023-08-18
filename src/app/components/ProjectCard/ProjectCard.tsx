import React, {
  useEffect,
  useMemo, useState,
} from 'react';
import { ProjectCardContainer } from '../ProjectItem/ProjectStyledComponents';
import ProjectCardContent from './ProjectCardContent';
import ProjectCardTitle from './ProjectCardTitle';
import ProjectCardContext from './ProjectCardContext';

type ProjectCardProps = {
  isDefaultCollapsed?: boolean,
  children: React.ReactElement | React.ReactElement[];
};

function ProjectCard(props: ProjectCardProps) {
  const { children, isDefaultCollapsed } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(isDefaultCollapsed || false);
  }, [isDefaultCollapsed]);

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
