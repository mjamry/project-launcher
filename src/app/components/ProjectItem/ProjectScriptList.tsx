import React from 'react';
import TerminalIcon from '@mui/icons-material/Terminal';
import { styled } from '@mui/material';
import { ProjectScript } from '../../../shared/dto/ProjectDto';
import { useScriptLaunchService } from '../../services/IpcLaunchServices';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectListItem from './ProjectListItem';
import { ContentAsColumn } from './ProjectStyledComponents';

const Icon = styled(TerminalIcon)({
  margin: '8px',
});

type Props = {
  scripts: ProjectScript[];
};

function ProjectScriptList(props: Props) {
  const { scripts } = props;
  const scriptLauncher = useScriptLaunchService();

  return (
    <ProjectCard>
      <ProjectCard.Title
        title="Scripts"
        icon={<Icon />}
      />
      <ProjectCard.Content>
        <ContentAsColumn>
          {scripts.map((script) => (
            <ProjectListItem
              item={script}
              onClick={() => scriptLauncher.launch(script.path)}
            />
          ))}
        </ContentAsColumn>
      </ProjectCard.Content>
    </ProjectCard>
  );
}

export default ProjectScriptList;
