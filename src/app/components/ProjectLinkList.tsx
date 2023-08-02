import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { useLinkLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';
import { ProjectLink } from '../../shared/dto/ProjectDto';

type Props = {
  links: ProjectLink[];
};

function ProjectLinkList({ links }: Props) {
  const linkLauncher = useLinkLaunchService();

  const render = () => (
    <ProjectCard>
      <ProjectCardHeader
        avatar={<LinkIcon />}
        title="Links"
      />
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
    </ProjectCard>
  );

  return (
    <>{ render() }</>
  );
}

export default ProjectLinkList;
