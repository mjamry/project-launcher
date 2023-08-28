import React from 'react';
import { useSnackbar } from 'notistack';

type ISnackbarService = {
  showError: (msg: string) => void,
  showInfo: (msg: string) => void,
  showInfoWithAction: (msg: string, action: React.ReactElement) => void,
};

function useSnackbarService(): ISnackbarService {
  const { enqueueSnackbar } = useSnackbar();

  const showError = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error' });
  };

  const showInfo = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error' });
  };

  const showInfoWithAction = (msg: string, action: React.ReactElement) => {
    enqueueSnackbar(msg, { variant: 'error', action });
  };

  return {
    showError,
    showInfo,
    showInfoWithAction,
  };
}

export default useSnackbarService;
