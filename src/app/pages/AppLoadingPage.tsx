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
  const [counter, setCounter] = useState<number>(0);
  const [canSendRequest, setCanSendRequest] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

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
      case AppState.ready:
        setProgress(100);
        break;
      default:
        setProgress(0);
    }
  }, [appState]);

  useEffect(() => {
    setCounter(Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    if (appState === AppState.init) {
      // eslint-disable-next-line no-console
      console.debug('Init state');
      setAppLoadingState(AppState.loadingConfigs);
      if (canSendRequest) {
        ipcRenderer.send(IpcChannelTypes.appInitialized);
        setCanSendRequest(false);
      }
      setDescription('Reading configuration');
    }
  }, [appState, canSendRequest, setAppLoadingState]);

  useEffect(() => {
    if (appState === AppState.loadingConfigs) {
      // eslint-disable-next-line no-console
      console.log(counter);
      // eslint-disable-next-line no-console
      console.debug('loading configs state');
      if (appSettings !== undefined && projectsConfig !== undefined) {
      // eslint-disable-next-line no-console
        console.debug('App can load: ', counter);
        setAppLoadingState(AppState.readingHistory);
        setDescription('Reading Jira history');
      } else {
      // eslint-disable-next-line no-console
        console.debug('App can NOT load: ');
      }
    }
  }, [appSettings, appState, counter, projectsConfig, setAppLoadingState]);

  useEffect(() => {
    if (appState === AppState.readingHistory) {
      // eslint-disable-next-line no-console
      console.log(counter);
      // eslint-disable-next-line no-console
      console.debug('read history state');
      if (jiraHistory !== undefined) {
        setAppLoadingState(AppState.ready);
      }
    }
  }, [appState, counter, jiraHistory, setAppLoadingState]);

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
