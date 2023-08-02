import React from 'react';
import TerminalIcon from '@mui/icons-material/Terminal';
import { ProjectScript } from '../../shared/dto/ProjectDto';
import { useScriptLaunchService } from '../services/IpcLaunchServices';
import {
  ProjectCard, ProjectCardContent, ProjectCardHeader, ProjectListItem,
} from './ProjectStyledComponents';

type Props = {
  scripts: ProjectScript[];
};

function ProjectScriptList({ scripts }: Props) {
  const scriptLauncher = useScriptLaunchService();

  const render = () => (
    <ProjectCard>
      <ProjectCardHeader
        avatar={<TerminalIcon />}
        title="Scripts"
      />
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
    </ProjectCard>
  );

  return (
    <>{ render() }</>
  );
}

export default ProjectScriptList;
