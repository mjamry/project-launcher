import React from 'react';
import TerminalIcon from '@mui/icons-material/Terminal';
import { ProjectScript } from '../../../shared/dto/ProjectDto';
import { useScriptLaunchService } from '../../services/IpcLaunchServices';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectListItem from './ProjectListItem';
import { ContentAsColumn, ProjectCardContainer } from './ProjectStyledComponents';

type Props = {
  scripts?: ProjectScript[];
};

function ProjectScriptList(props: Props) {
  const { scripts } = props;
  const scriptLauncher = useScriptLaunchService();

  return (
    <ProjectCard isDefaultCollapsed>
      {scripts !== undefined && scripts.length > 0
        ? (
          <ProjectCardContainer>
            <ProjectCard.Title>
              <TerminalIcon />
              <div>Scripts</div>
              <div />
            </ProjectCard.Title>
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
          </ProjectCardContainer>
        )
        : <></>}
    </ProjectCard>
  );
}

export default ProjectScriptList;
