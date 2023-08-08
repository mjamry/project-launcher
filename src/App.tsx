import { ThemeProvider } from '@emotion/react';
import { styled, StyledEngineProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { useRecoilValue } from 'recoil';
import IpcCommunicationService from './app/services/IpcCommunicationService';
import AppContent from './app/root/AppContent';
import DebugStateObserver from './app/state/DebugStateObserver';
import { getTheme } from './app/theme/mainTheme';
import JiraDataProvider from './app/services/JiraDataProvider';
import AppLoadingPage from './app/pages/AppLoadingPage';
import appLoadingState from './app/state/AppLoadingState';
import { appSettingsState } from './app/state/AppSettingsState';
import AppState from './shared/dto/AppState';
import WindowSizeMonitor from './app/root/WindowSizeMonitor';

const AppContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

function App() {
  const appState = useRecoilValue(appLoadingState);
  const appSettings = useRecoilValue(appSettingsState);

  return (
    <>
      <WindowSizeMonitor />
      <IpcCommunicationService />
      <JiraDataProvider />
      {appState !== AppState.ready
        ? <AppLoadingPage />
        : (
          <>
            {appSettings && appSettings.isDevelopment
              ? <DebugStateObserver />
              : <></>}
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
