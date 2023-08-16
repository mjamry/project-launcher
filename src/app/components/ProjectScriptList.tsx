import React, { useState } from 'react';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Collapse, styled } from '@mui/material';
import { ProjectScript } from '../../shared/dto/ProjectDto';
import { useScriptLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';
import CollapseButton from './CollapseButton';

const Icon = styled(TerminalIcon)({
  margin: '10px',
});

type Props = {
  scripts: ProjectScript[];
  isDefaultCollapsed?: boolean;
};

function ProjectScriptList(props: Props) {
  const { scripts, isDefaultCollapsed } = props;
  const [isCollapsed, setIsCollapsed] = useState(
    isDefaultCollapsed !== undefined ? isDefaultCollapsed : true,
  );
  const scriptLauncher = useScriptLaunchService();

  const render = () => (
    <ProjectCard>
      <ProjectCardHeader
        avatar={(
          <>
            <CollapseButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              isDefaultCollapsed={false}
            />
            <Icon />
          </>
        )}
        title="Scripts"
      />
      <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
        <ProjectCardContent>
          {scripts.map((l) => (
            <ProjectListItem
              variant="contained"
              key={l.name}
              onClick={() => scriptLauncher.launch(l.path)}
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

export default ProjectScriptList;
