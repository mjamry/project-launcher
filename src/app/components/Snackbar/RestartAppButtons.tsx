import { SnackbarKey, closeSnackbar } from 'notistack';
import React from 'react';
import { Button } from '@mui/material';

type Props = {
  snackbarKey: SnackbarKey,
  onClick: () => void;
};

function RestartAppButtons({ snackbarKey, onClick }: Props) {
  return (
    <>
      <Button variant="contained" onClick={onClick}>Restart</Button>
      <Button variant="text" onClick={() => { closeSnackbar(snackbarKey); }}>Dismiss</Button>
    </>
  );
}

export default RestartAppButtons;
