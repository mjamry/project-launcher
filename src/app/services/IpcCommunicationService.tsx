import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { Project, ProjectFileName } from '../../shared/dto/ProjectDto';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { AppSettings } from '../../shared/dto/AppSettings';
import { appSettingsState, appThemeState } from '../state/AppSettingsState';
import { JiraUpdate } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState, jiraHistoryState } from '../state/JiraState';
import { projectsConfigFileNameState, projectsState } from '../state/ProjectState';
import appDetailsState from '../state/AppDetailsState';
import { AppDetails } from '../../shared/dto/AppDetails';
import useAppUpdateService from './AppUpdateService';
import { AppUpdateDetails } from '../../shared/AppUpdateDetails';

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);
  const setProjectsFileName = useSetRecoilState(projectsConfigFileNameState);
  const setAppSettings = useSetRecoilState(appSettingsState);
  const setJiraUpdates = useSetRecoilState(jiraUpdatesState);
  const setJiraHistory = useSetRecoilState(jiraHistoryState);
  const setAppTheme = useSetRecoilState(appThemeState);
  const setAppDetails = useSetRecoilState(appDetailsState);
  const appUpdater = useAppUpdateService();

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appSettingsLoaded, (event: any, data: AppSettings) => {
      setAppSettings(data);
      setAppTheme(data.theme);
    });

    ipcRenderer.on(IpcChannelTypes.projectsConfigsLoaded, (event: any, data: Project[]) => {
      setProjects(data.filter((p) => p.id !== undefined && p.id !== '' && p.name !== undefined && p.name !== ''));
    });

    ipcRenderer.on(
      IpcChannelTypes.projectsFileNameLoaded,
      (event: any, data: ProjectFileName[]) => {
        setProjectsFileName(data);
      },
    );

    ipcRenderer.on(IpcChannelTypes.jiraUpdate, (event: any, data: JiraUpdate[]) => {
      setJiraUpdates(data);
    });

    ipcRenderer.on(IpcChannelTypes.jiraHistory, (event: any, data: JiraUpdate[]) => {
      setJiraHistory(data);
    });

    ipcRenderer.on(IpcChannelTypes.appDetails, (event: any, data: AppDetails) => {
      setAppDetails(data);
    });

    ipcRenderer.on(IpcChannelTypes.autoUpdateNewVersion, (event: any, data: AppUpdateDetails) => {
      // eslint-disable-next-line no-console
      console.log(`update: ${data.version}`);
      appUpdater.updateAvailable(data);
    });

    ipcRenderer.on(IpcChannelTypes.autoUpdateDownloaded, (event: any, data: AppUpdateDetails) => {
      // eslint-disable-next-line no-console
      console.log(`update: ${data.version}`);
      appUpdater.updateDownloaded(data);
    });
  }, [
    setProjects,
    setAppSettings,
    setJiraUpdates,
    setJiraHistory,
    setProjectsFileName,
    setAppTheme,
    setAppDetails,
    appUpdater,
  ]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
