import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { useLinkLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';
import { ProjectLink } from '../../shared/dto/ProjectDto';

type Props = {
  links?: ProjectLink[];
};

function ProjectLinkList({ links: scripts }: Props) {
  const linkLauncher = useLinkLaunchService();

  const render = () => {
    if (scripts && scripts.length > 0) {
      return (
        <ProjectCard>
          <ProjectCardHeader
            avatar={<LinkIcon />}
            title="Links"
          />
          <ProjectCardContent>
            {scripts.map((l) => (
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
    }
    return <></>;
  };

  return (
    <>{ render() }</>
  );
}

export default ProjectLinkList;
