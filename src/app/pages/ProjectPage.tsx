import React from 'react';
import { styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import RouteTypes from '../common/dto/RouteTypes';
import ProjectLinkList from '../components/ProjectItem/ProjectLinkList';
import { ProjectCardContainer } from '../components/ProjectItem/ProjectStyledComponents';
import JiraItemsTable from '../components/JiraItemsTable';
import { projectsState } from '../state/ProjectState';
import ProjectScriptList from '../components/ProjectItem/ProjectScriptList';

const Root = styled('div')({
  margin: '20px',
});

const RowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '20px',
  justifyContent: 'space-between',
  alignContent: 'stretch',
  alignItem: 'stretch',
});

const RowItem = styled('div')({
  flexGrow: 1,
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
        <ProjectCardContainer>
          <Typography variant="h6">
            {project!.name}
          </Typography>
        </ProjectCardContainer>
        <RowContainer>
          <RowItem>
            {project.links && project.links.length > 0
              ? (
                <ProjectLinkList links={project.links} />
              )
              : <></>}
          </RowItem>
          <RowItem>
            {project.scripts && project.scripts.length > 0
              ? (
                <ProjectScriptList scripts={project.scripts} />
              )
              : <></>}
          </RowItem>
        </RowContainer>
        <JiraItemsTable projectKey={project.jiraId ? project.jiraId : ''} />
      </Root>
    );
  };

  return render();
}

export default ProjectPage;
