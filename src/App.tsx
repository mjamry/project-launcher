import { ThemeProvider } from '@emotion/react';
import { styled, StyledEngineProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { useRecoilState } from 'recoil';
import IpcCommunicationService from './app/services/IpcCommunicationService';
import AppContent from './app/root/AppContent';
// import DebugStateObserver from './app/state/DebugStateObserver';
import { getTheme } from './app/theme/mainTheme';
import JiraDataProvider from './app/services/JiraDataProvider';
import appSettingsState from './app/state/AppState';
import { projectsState } from './app/state/ProjectState';

const AppContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

function App() {
  const [appSettings] = useRecoilState(appSettingsState);
  const [projectsConfig] = useRecoilState(projectsState);

  const canLoad = (): boolean => {
    if (appSettings !== undefined && projectsConfig !== undefined) {
      return true;
    }
    return false;
  };

  return (
    <>
      {!canLoad()
        ? 'loading'
        : (
          <>
            <IpcCommunicationService />
            <JiraDataProvider />
            {/* <DebugStateObserver /> */}
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={getTheme(appSettings.theme)}>
                <AppContainer>
                  <AppContent />
                </AppContainer>
              </ThemeProvider>
            </StyledEngineProvider>
          </>
        )}
    </>
  );
}

export default App;
