import React from 'react';
import { useSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';

const { ipcRenderer } = window.require('electron');

type ISnackbarService = {
  showError: (msg: string) => void,
  showInfo: (msg: string) => void,
  showInfoWithAction: (msg: string, action: React.ReactElement) => void,
  showInfoWithRestartAction: (msg: string) => void;
};

function useSnackbarService(): ISnackbarService {
  const { enqueueSnackbar } = useSnackbar();

  const restartAction = () => {
    const action = (snackbarId: SnackbarKey) => (
      <>
        <Button variant="contained" onClick={() => { ipcRenderer.send(IpcChannelTypes.appRestart); }}>Restart</Button>
        <Button variant="text" onClick={() => { closeSnackbar(snackbarId); }}>Dismiss</Button>
      </>
    );

    return action;
  };

  const showError = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', style: { whiteSpace: 'pre-line' } });
  };

  const showInfo = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'success', style: { whiteSpace: 'pre-line' } });
  };

  const showInfoWithAction = (msg: string, action: React.ReactElement) => {
    enqueueSnackbar(msg, { variant: 'success', style: { whiteSpace: 'pre-line' }, action });
  };

  const showInfoWithRestartAction = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'success',
      persist: true,
      style: { whiteSpace: 'pre-line' },
      action: restartAction(),
    });
  };

  return {
    showError,
    showInfo,
    showInfoWithAction,
    showInfoWithRestartAction,
  };
}

export default useSnackbarService;
