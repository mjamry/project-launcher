import { styled } from '@mui/material/styles';
import React from 'react';
import { Routes, Route } from 'react-router';
import RouteTypes from '../common/dto/RouteTypes';
import MainMenu from '../components/MainMenu';
import AboutPage from '../pages/AboutPage';
import ProjectPage from '../pages/ProjectPage';
import SettingsPage from '../pages/SettingsPage';
import TitleBar from '../components/TitleBar';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const PageLayout = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  marginTop: '3.5rem',
});

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: 'calc(100vh - 3.5rem)',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.primary.main,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function AppContent() {
  return (
    <Root>
      <TitleBar />
      <PageLayout>
        <MainMenu />
        <Content>
          <Routes>
            <Route
              path={RouteTypes.project}
              element={<ProjectPage />}
            />
            <Route
              path={RouteTypes.settings}
              element={<SettingsPage />}
            />
            <Route
              path={RouteTypes.about}
              element={<AboutPage />}
            />
          </Routes>
        </Content>
      </PageLayout>
    </Root>
  );
}

export default AppContent;
