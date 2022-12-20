import {
  Accordion, AccordionSummary, Typography, AccordionDetails, styled, TextField, Button,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRecoilState } from 'recoil';
import appSettingsState from '../state/AppState';
import projectsState from '../state/ProjectState';

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

function SettingsPage() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [appSettings] = useRecoilState(appSettingsState);
  const [projectSettings] = useRecoilState(projectsState);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
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
            defaultValue={JSON.stringify(appSettings, undefined, 4)}
          />
        </AccordionDetails>
        <ButtonContainer>
          <Button variant="contained">Save</Button>
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
            />
            <Button value="Save" />
          </AccordionDetails>
          <ButtonContainer>
            <Button variant="contained">Save</Button>
          </ButtonContainer>
        </StyledAccordion>
      ))}
    </Root>
  );
}

export default SettingsPage;
