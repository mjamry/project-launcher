import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import './App.css';
import IpcCommunicationService from './app/services/IpcCommunicationService';
import AppContent from './app/root/AppContent';
import DebugStateObserver from './app/state/DebugStateObserver';
import { theme } from './app/theme/mainTheme';

function App() {
  return (
    <div className="App">
      <IpcCommunicationService />
      <DebugStateObserver />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
