import React, { useEffect, useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Collapse, styled } from '@mui/material';
import { useLinkLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';
import { ProjectLink } from '../../shared/dto/ProjectDto';
import CollapseButton from './CollapseButton';

const Icon = styled(LinkIcon)({
  margin: '10px',
});

type Props = {
  links: ProjectLink[];
  isDefaultCollapsed?: boolean;
};

function ProjectLinkList(props: Props) {
  const { links, isDefaultCollapsed } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const linkLauncher = useLinkLaunchService();

  useEffect(() => {
    setIsCollapsed(isDefaultCollapsed !== undefined ? isDefaultCollapsed : true);
  }, [isDefaultCollapsed]);

  const render = () => (
    <ProjectCard>
      <ProjectCardHeader
        avatar={(
          <>
            <CollapseButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              isDefaultCollapsed={isCollapsed}
            />
            <Icon />
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
