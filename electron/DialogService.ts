// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, dialog, app } from 'electron';

type IDialogService = {
  fileSavedRestartAppQuestion: (fileName: string) => void;
};

const useDialogService = (win: BrowserWindow):IDialogService => {
  const fileSavedRestartAppQuestion = async (fileName: string) => {
    const ConfirmationButtonIndex = 0;
    const options = {
      type: 'question',
      buttons: ['Yes, please', 'No, thanks'],
      defaultId: 2,
      title: `File ${fileName} successfully saved`,
      message: 'Do you want to restart the app to apply changes ?',
    };

    const result = await dialog.showMessageBox(win, options);
    if (result.response === ConfirmationButtonIndex) {
      app.relaunch();
      app.exit();
    }
  };

  return {
    fileSavedRestartAppQuestion,
  };
};

export default useDialogService;
