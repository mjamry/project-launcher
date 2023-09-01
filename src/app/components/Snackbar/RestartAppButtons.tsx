import { SnackbarKey, closeSnackbar } from 'notistack';
import React from 'react';
import { Button } from '@mui/material';
import IpcChannelTypes from '../../../shared/dto/IpcChannelTypes';

const { ipcRenderer } = window.require('electron');

type Props = {
  snackbarKey: SnackbarKey,
};

function RestartAppButtons({ snackbarKey }: Props) {
  return (
    <>
      <Button variant="contained" onClick={() => { ipcRenderer.send(IpcChannelTypes.appRestart); }}>Restart</Button>
      <Button variant="text" onClick={() => { closeSnackbar(snackbarKey); }}>Dismiss</Button>
    </>
  );
}

export default RestartAppButtons;
