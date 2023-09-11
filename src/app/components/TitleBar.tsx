import React from 'react';
import { Typography, styled } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';

const Logo = styled('div')(({ theme }) => ({
  textAlign: 'center',
  border: '2px solid',
  borderRadius: '10px',
  height: '24px',
  width: '24px',
  color: theme.palette.text.primary,
  marginRight: '10px',
}));

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100vw',
  height: '3.5rem',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  position: 'fixed',
  top: 0,
  zIndex: 999,
  userSelect: 'none',
  '-webkit-app-region': 'drag',
}));

const Title = styled('div')({
  fontSize: '20px',
  paddingLeft: '14px',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'row',
});

const Buttons = styled('div')({
  height: '40px',
  display: 'flex',
  flexDirection: 'row',
});

const Button = styled('div')(({ theme }) => ({
  height: '40px',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.secondary,
  },
  '-webkit-app-region': 'no-drag',
}));

function TitleBar() {
  return (
    <Root>
      <Title>
        <Logo>
          <RocketLaunchIcon fontSize="small" />
        </Logo>
        <Typography>
          {process.env.REACT_APP_NAME}
        </Typography>
      </Title>
      <Buttons>
        <Button>
          <RemoveIcon
            fontSize="small"
            onClick={() => { ipcRenderer.send(IpcChannelTypes.appMinimize); }}
          />
        </Button>
        <Button>
          <CropSquareIcon
            fontSize="small"
            onClick={() => { ipcRenderer.send(IpcChannelTypes.appToggleMaximize); }}
          />
        </Button>
        <Button>
          <CloseIcon
            fontSize="small"
            onClick={() => { ipcRenderer.send(IpcChannelTypes.appClose); }}
          />
        </Button>
      </Buttons>
    </Root>
  );
}

export default TitleBar;
