import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid, styled, Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import LinkIcon from '@mui/icons-material/Link';
import TerminalIcon from '@mui/icons-material/Terminal';
import RouteTypes from '../common/RouteTypes';
import projectsState from '../state/ProjectState';
import { Project } from '../common/dto/ProjectDto';

const { shell } = window.require('electron');

const Root = styled('div')({
  margin: '10px',
});

const ProjectCard = styled(Card)(({ theme }) => ({
  padding: '10px',
  backgroundColor: theme.palette.secondary.main,
}));

const ProjectCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
});

const ProjectListItem = styled(Button)({
  marginTop: '5px',
});

type RouteParams = {
  projectId: string;
};

function ProjectPage() {
  const projects = useRecoilValue(projectsState);
  const { projectId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const renderLinks = (project: Project): JSX.Element => {
    if (project.links && project.links.length > 0) {
      return (
        <Grid item xs={12} sm={6}>
          <ProjectCard>
            <CardHeader
              avatar={<LinkIcon />}
              title="Links"
            />
            <ProjectCardContent>
              {project.links.map((l) => (
                <ProjectListItem
                  variant="contained"
                  key={l.name}
                  onClick={() => shell.openExternal(l.url)}
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

  const renderScripts = (project: Project) => {
    if (project.scripts && project.scripts.length > 0) {
      return (
        <Grid item xs={12} sm={6}>
          <ProjectCard>
            <CardHeader
              avatar={<TerminalIcon />}
              title="Scripts"
            />
            <ProjectCardContent>
              {project.scripts.map((l) => (
                <ProjectListItem
                  variant="contained"
                  key={l.name}
                  onClick={() => shell.openPath(l.path)}
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

  const render = () => {
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      navigate(RouteTypes.root);
      return <></>;
    }
    return (
      <Root>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectCard>
              <Typography variant="h6">
                {project!.name}
              </Typography>
            </ProjectCard>
          </Grid>
          { renderLinks(project) }
          { renderScripts(project) }
        </Grid>
      </Root>
    );
  };

  return render();
}

export default ProjectPage;
