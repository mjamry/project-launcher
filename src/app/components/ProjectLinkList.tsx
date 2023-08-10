import React, { useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Collapse } from '@mui/material';
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
            />
            <LinkIcon />
          </>
        )}
        title="Links"
      />
      <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
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
      </Collapse>

    </ProjectCard>
  );

  return (
    <>{ render() }</>
  );
}

export default ProjectLinkList;
