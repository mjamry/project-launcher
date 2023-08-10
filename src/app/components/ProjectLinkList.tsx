import React, { useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { useLinkLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';
import { ProjectLink } from '../../shared/dto/ProjectDto';
import CollapseButton from './CollapseButton';

type Props = {
  links: ProjectLink[];
};

function ProjectLinkList({ links }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const linkLauncher = useLinkLaunchService();

  const render = () => (
    <ProjectCard>
      <ProjectCardHeader
        avatar={(
          <>
            <CollapseButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              isDefaultCollapsed={false}
            />
            <LinkIcon />
          </>
        )}
        title="Links"
      />
      {!isCollapsed
        ? (
          <ProjectCardContent>
            {links.map((l) => (
              <ProjectListItem
                variant="contained"
                key={l.name}
                onClick={() => linkLauncher.launch(l.url)}
                title={l.description}
              >
                {l.name}
              </ProjectListItem>
            ))}
          </ProjectCardContent>
        )
        : <></>}

    </ProjectCard>
  );

  return (
    <>{ render() }</>
  );
}

export default ProjectLinkList;
