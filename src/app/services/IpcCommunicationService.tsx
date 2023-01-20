import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { Project, ProjectFileName } from '../../shared/dto/ProjectDto';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { AppSettings } from '../../shared/dto/AppSettings';
import { appSettingsState, appThemeState } from '../state/AppState';
import { JiraUpdate } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState, jiraHistoryState } from '../state/JiraState';
import { projectsConfigFileNameState, projectsState } from '../state/ProjectState';

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);
  const setProjectsFileName = useSetRecoilState(projectsConfigFileNameState);
  const setAppSettings = useSetRecoilState(appSettingsState);
  const setJiraUpdates = useSetRecoilState(jiraUpdatesState);
  const setJiraHistory = useSetRecoilState(jiraHistoryState);
  const setAppTheme = useSetRecoilState(appThemeState);

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appSettingsLoaded, (event: any, data: AppSettings) => {
      setAppSettings(data);
      setAppTheme(data.theme);
    });

    ipcRenderer.on(IpcChannelTypes.projectsConfigsLoaded, (event: any, data: Project[]) => {
      setProjects(data);
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
  }, [
    setProjects,
    setAppSettings,
    setJiraUpdates,
    setJiraHistory,
    setProjectsFileName,
    setAppTheme,
  ]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
