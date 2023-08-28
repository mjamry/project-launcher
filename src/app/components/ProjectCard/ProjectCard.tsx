import React, {
  useEffect,
  useMemo, useState,
} from 'react';
import ProjectCardContent from './ProjectCardContent';
import ProjectCardTitle from './ProjectCardTitle';
import ProjectCardContext from './ProjectCardContext';

type ProjectCardProps = {
  isDefaultCollapsed?: boolean,
  children: React.ReactElement | React.ReactElement[];
};

function ProjectCard(props: ProjectCardProps) {
  const { children, isDefaultCollapsed } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsCollapsed(isDefaultCollapsed || true);
  }, [isDefaultCollapsed]);

  const contextValue = useMemo(
    () => ({ isCollapsed, setIsCollapsed }),
    [isCollapsed],
  );

  return (
    <ProjectCardContext.Provider value={contextValue}>
      {children}
    </ProjectCardContext.Provider>
  );
}

ProjectCard.Content = ProjectCardContent;
ProjectCard.Title = ProjectCardTitle;
export default ProjectCard;
