import React, { useContext } from 'react';
import CollapseButton from '../CollapseButton';
import { ProjectCardHeader } from '../ProjectItem/ProjectStyledComponents';
import ProjectCardContext from './ProjectCardContext';

type ProjectCardTitleProps = {
  title?: React.ReactElement | string,
  icon?: React.ReactElement,
};

function ProjectCardTitle({ title, icon }: ProjectCardTitleProps) {
  const { isCollapsed, setIsCollapsed } = useContext(ProjectCardContext);

  return (
    <ProjectCardHeader
      avatar={(
        <>
          <CollapseButton
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
          {icon}
        </>
          )}
      title={title}
    />
  );
}

export default ProjectCardTitle;
