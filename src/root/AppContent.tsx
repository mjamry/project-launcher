import styled from '@emotion/styled';
import React from 'react';
import { Routes, Route } from 'react-router';
import RouteTypes from '../common/RouteTypes';
import MainMenu from '../components/MainMenu';
import DashboardPage from '../pages/DashboardPage';

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
      <MainMenu />
      <Content>
        <Routes>
          <Route
            path={RouteTypes.root}
            element={<DashboardPage />}
          />
        </Routes>
      </Content>
    </PageLayout>
  );
}

export default AppContent;