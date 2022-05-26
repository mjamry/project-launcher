import { ThemeProvider } from '@emotion/react';
import { createTheme, responsiveFontSizes, StyledEngineProvider } from '@mui/material';
import React from 'react';
import './App.css';
import IpcCommunicationService from './app/components/IpcCommunicationService';
import AppContent from './app/root/AppContent';
import DebugStateObserver from './app/state/DebugStateObserver';

let theme = createTheme({
  palette: {
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#29b6f6',
    },
    text: {
      primary: '#fff',
    },
  },
});
theme = responsiveFontSizes(theme);

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
