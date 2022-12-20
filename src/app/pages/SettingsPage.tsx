import {
  Accordion, AccordionSummary, Typography, AccordionDetails, styled, TextField, Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRecoilState } from 'recoil';
import appSettingsState from '../state/AppState';
import { projectsState } from '../state/ProjectState';
import useSettingsFileWriterService from '../services/SettingsFileWriterService';

const Root = styled('div')({
  margin: '10px',
  textAlign: 'left',
});

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  '&:before': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  margin: '10px',
});

const FileContent = styled(TextField)(({ theme }) => ({
  width: '100%',
  border: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));

const Title = styled(Typography)({
  fontWeight: 'bold',
});

type ProjectSettings = {
  id: string;
  settings: string;
};

const SpacesInJSONView = 2;

function SettingsPage() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [appSettings] = useRecoilState(appSettingsState);
  const [projectSettings] = useRecoilState(projectsState);
  const settingsFileWriter = useSettingsFileWriterService();

  const [editedAppSettings, setEditedSettings] = useState<string>(
    JSON.stringify(appSettings, undefined, SpacesInJSONView),
  );

  const [editedProjectsSettings, setEditedProjectsSettings] = useState<any>([]);

  useEffect(() => {
    const output: ProjectSettings[] = [];
    projectSettings.forEach((project) => {
      output.push({
        id: project.id,
        settings: JSON.stringify(project, undefined, SpacesInJSONView),
      });
    });
    setEditedProjectsSettings(output);
  }, [projectSettings]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleProjectSettingsEdit = (projectId: string, value: string) => {
    setEditedProjectsSettings([...projectSettings.filter((p) => p.id !== projectId), {
      id: projectId,
      settings: value,
    }]);
  };

  const handleAppSettingsSave = () => {
    settingsFileWriter.writeAppSettingsFile(editedAppSettings);
  };

  const handleProjectSettingsSave = (projectId: string) => {
    settingsFileWriter.writeProjectSettingsFile(
      projectId,
      editedProjectsSettings.find((p: any) => p.id === projectId)!.settings,
    );
  };

  return (
    <Root>
      <StyledAccordion
        expanded={expanded === 'appSettings'}
        onChange={handleChange('appSettings')}
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Title>
            App Settings
          </Title>
        </AccordionSummary>
        <AccordionDetails>
          <FileContent
            id="outlined-multiline-static"
            multiline
            defaultValue={editedAppSettings}
            onChange={(e) => setEditedSettings(e.target.value)}
          />
        </AccordionDetails>
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={() => handleAppSettingsSave()}
          >
            Save
          </Button>
        </ButtonContainer>
      </StyledAccordion>
      {projectSettings && projectSettings.map((project) => (
        <StyledAccordion
          expanded={expanded === project.id}
          onChange={handleChange(project.id)}
          square
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>
              {project.name}
            </Title>
          </AccordionSummary>
          <AccordionDetails>
            <FileContent
              id="outlined-multiline-static"
              multiline
              defaultValue={JSON.stringify(project, undefined, 4)}
              onChange={(e) => handleProjectSettingsEdit(project.id, e.target.value)}
            />
            <Button value="Save" />
          </AccordionDetails>
          <ButtonContainer>
            <Button
              variant="contained"
              onClick={() => handleProjectSettingsSave(project.id)}
            >
              Save
            </Button>
          </ButtonContainer>
        </StyledAccordion>
      ))}
    </Root>
  );
}

export default SettingsPage;
