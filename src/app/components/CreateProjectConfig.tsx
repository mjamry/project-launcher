import {
  Button, Popover, TextField, styled,
} from '@mui/material';
import React, { useState } from 'react';
import useSettingsFileWriterService from '../services/SettingsFileWriterService';

const Root = styled('div')({
  margin: '10px',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'center',
});

const Form = styled('div')({
  margin: '10px',
  width: '350px',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-around',
});

function CreateProjectConfig() {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const settingsFileWriter = useSettingsFileWriterService();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const createNewConfigFile = () => {
    const projectData: string = `{"id": "${fileName}","name": "${fileName}","avatarUrl": "","jiraId": "","description": "","links": [],"scripts": []}`;
    settingsFileWriter.createProjectSettingsFile(
      fileName,
      projectData,
    );

    handlePopoverClose();
  };

  return (
    <Root>
      <Button id="popoverButton" variant="contained" onClick={handlePopoverOpen}>
        Create new project config
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Form>
          <TextField label="File name" variant="outlined" onChange={(e) => setFileName(e.target.value)} />
          <Button
            variant="contained"
            onClick={() => createNewConfigFile()}
          >
            Create file
          </Button>
        </Form>
      </Popover>
    </Root>
  );
}

export default CreateProjectConfig;
