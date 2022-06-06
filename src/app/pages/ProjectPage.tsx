import {
  Grid, styled, Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import RouteTypes from '../common/dto/RouteTypes';
import projectsState from '../state/ProjectState';
import ProjectScriptList from '../components/ProjectScriptList';
import ProjectLinkList from '../components/ProjectLinkList';
import { ProjectCard } from '../components/ProjectStyledComponents';

const Root = styled('div')({
  margin: '10px',
});

type RouteParams = {
  projectId: string;
};

function ProjectPage() {
  const projects = useRecoilValue(projectsState);
  const { projectId } = useParams<RouteParams>();
  const navigate = useNavigate();

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
          <ProjectLinkList links={project.links} />
          <ProjectScriptList scripts={project.scripts} />
        </Grid>
      </Root>
    );
  };

  return render();
}

export default ProjectPage;