import React, { useState } from 'react';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Collapse } from '@mui/material';
import { ProjectScript } from '../../shared/dto/ProjectDto';
import { useScriptLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';
import CollapseButton from './CollapseButton';

type Props = {
  scripts: ProjectScript[];
};

function ProjectScriptList({ scripts }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
            <TerminalIcon />
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
