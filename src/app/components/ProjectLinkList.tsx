import { Grid } from '@mui/material';
import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { ProjectLink } from '../../shared/dto/ProjectDto';
import { useLinkLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';

type Props = {
  links?: ProjectLink[];
};

function ProjectLinkList({ links: scripts }: Props) {
  const scriptLauncher = useLinkLaunchService();

  const render = () => {
    if (scripts && scripts.length > 0) {
      return (
        <Grid item xs={12} sm={6}>
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
                  onClick={() => scriptLauncher.launch(l.url)}
                  title={l.description}
                >
                  {l.name}
                </ProjectListItem>
              ))}
            </ProjectCardContent>
          </ProjectCard>
        </Grid>
      );
    }
    return <></>;
  };

  return (
    <>{ render() }</>
  );
}

export default ProjectLinkList;
