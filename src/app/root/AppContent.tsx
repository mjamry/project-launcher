import styled from '@emotion/styled';
import React from 'react';
import { Routes, Route } from 'react-router';
import RouteTypes from '../common/dto/RouteTypes';
import MainMenu from '../components/MainMenu';
import ProjectPage from '../pages/ProjectPage';
import SettingsPage from '../pages/SettingsPage';

const PageLayout = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
});

const Content = styled('div')({
  flexGrow: 1,
});

function AppContent() {
  return (
    <PageLayout>
      <div>
        <MainMenu />
      </div>
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
        </Routes>
      </Content>
    </PageLayout>
  );
}

export default AppContent;
