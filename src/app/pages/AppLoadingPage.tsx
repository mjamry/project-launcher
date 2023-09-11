import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { useRecoilState, useRecoilValue } from 'recoil';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import styled from '@emotion/styled';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import LoaderComponent from '../components/LoaderComponent';
import appLoadingState from '../state/AppLoadingState';
import AppState from '../../shared/dto/AppState';
import { appSettingsState } from '../state/AppSettingsState';
import { jiraHistoryState } from '../state/JiraState';
import { projectsState } from '../state/ProjectState';
import useLoggerService from '../common/LoggerService';

const Logo = styled('div')({
  textAlign: 'center',
  border: '3px solid darkgrey',
  borderRadius: '10px',
  height: '45px',
  width: '60px',
  color: 'lightgray',
  marginBottom: '50px',
  paddingTop: '10px',
});

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
});

function AppLoadingPage() {
  const appSettings = useRecoilValue(appSettingsState);
  const projectsConfig = useRecoilValue(projectsState);
  const [appState, setAppLoadingState] = useRecoilState(appLoadingState);
  const jiraHistory = useRecoilValue(jiraHistoryState);

  const [description, setDescription] = useState<string>('');
  const [canSendRequest, setCanSendRequest] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const logger = useLoggerService('ALP');

  useEffect(() => {
    switch (appState) {
      case AppState.init:
        setProgress(25);
        break;
      case AppState.loadingConfigs:
        setProgress(50);
        break;
      case AppState.readingHistory:
        setProgress(75);
        break;
      case AppState.initDone:
        setProgress(100);
        break;
      default:
        setProgress(0);
    }
  }, [appState]);

  useEffect(() => {
    if (appState === AppState.init) {
      logger.debug('Init state');
      setAppLoadingState(AppState.loadingConfigs);
      if (canSendRequest) {
        ipcRenderer.send(IpcChannelTypes.appInit_ready);
        setCanSendRequest(false);
      }
      logger.debug('Reading configuration');
      setDescription('Reading configuration');
    }
  }, [appState, canSendRequest, logger, setAppLoadingState]);

  useEffect(() => {
    if (appState === AppState.loadingConfigs) {
      if (appSettings !== undefined && projectsConfig !== undefined) {
        setAppLoadingState(AppState.readingHistory);
        logger.debug('Reading Jira history');
        setDescription('Reading Jira history');
      }
    }
  }, [appSettings, appState, logger, projectsConfig, setAppLoadingState]);

  useEffect(() => {
    if (appState === AppState.readingHistory) {
      if (jiraHistory !== undefined) {
        setAppLoadingState(AppState.initDone);
        ipcRenderer.send(IpcChannelTypes.appInit_done);
        logger.debug('App fully loaded');
      }
    }
  }, [appState, jiraHistory, logger, setAppLoadingState]);

  return (
    <Root>
      <Logo>
        <RocketLaunchIcon fontSize="large" />
      </Logo>
      <LoaderComponent title="Loading" description={description} progress={progress} />
    </Root>
  );
}

export default AppLoadingPage;
