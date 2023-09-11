import { SnackbarAction, useSnackbar } from 'notistack';

type ISnackbarService = {
  showError: (msg: string) => void,
  showInfo: (msg: string) => void,
  showInfoWithAction: (
    msg: string,
    action: SnackbarAction
  ) => void,
};

function useSnackbarService(): ISnackbarService {
  const { enqueueSnackbar } = useSnackbar();

  const showError = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', style: { whiteSpace: 'pre-line' } });
  };

  const showInfo = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'success', style: { whiteSpace: 'pre-line' } });
  };

  const showInfoWithAction = (msg: string, action: SnackbarAction) => {
    enqueueSnackbar(msg, {
      persist: true,
      variant: 'success',
      style: { whiteSpace: 'pre-line' },
      action,
    });
  };

  return {
    showError,
    showInfo,
    showInfoWithAction,
  };
}

export default useSnackbarService;
