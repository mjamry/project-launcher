import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { useLinkLaunchService } from '../../services/IpcLaunchServices';
import { ProjectLink } from '../../../shared/dto/ProjectDto';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectListItem from './ProjectListItem';
import { ContentAsColumn, ProjectCardContainer } from './ProjectStyledComponents';

type Props = {
  links?: ProjectLink[];
};

function ProjectLinkList(props: Props) {
  const { links } = props;
  const linkLauncher = useLinkLaunchService();

  return (
    <ProjectCard isDefaultCollapsed>
      {links !== undefined && links.length > 0
        ? (
          <ProjectCardContainer>
            <ProjectCard.Title>
              <LinkIcon />
              <div>Links</div>
              <div />
            </ProjectCard.Title>
            <ProjectCard.Content>
              <ContentAsColumn>
                {links.map((link) => (
                  <ProjectListItem
                    item={link}
                    onClick={() => linkLauncher.launch(link.url)}
                  />
                ))}
              </ContentAsColumn>
            </ProjectCard.Content>
          </ProjectCardContainer>
        )
        : <></>}
    </ProjectCard>
  );
}

export default ProjectLinkList;
