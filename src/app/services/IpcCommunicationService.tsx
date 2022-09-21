import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { Project } from '../../shared/dto/ProjectDto';
import projectsState from '../state/ProjectState';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { AppSettings } from '../../shared/dto/AppSettings';
import appSettingsState from '../state/AppState';
import { JiraUpdate } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState, jiraHistoryState } from '../state/JiraUpdatesState';

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);
  const setAppSettings = useSetRecoilState(appSettingsState);
  const setJiraUpdates = useSetRecoilState(jiraUpdatesState);
  const setJiraHistory = useSetRecoilState(jiraHistoryState);

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appSettingsLoaded, (event: any, data: AppSettings) => {
      setAppSettings(data);
    });

    ipcRenderer.on(IpcChannelTypes.projectsConfigsLoaded, (event: any, data: Project[]) => {
      setProjects(data);
    });

    ipcRenderer.on(IpcChannelTypes.jiraUpdate, (event: any, data: JiraUpdate[]) => {
      setJiraUpdates(data);
    });

    ipcRenderer.on(IpcChannelTypes.jiraHistory, (event: any, data: JiraUpdate[]) => {
      setJiraHistory(data);
    });
  }, [setProjects, setAppSettings, setJiraUpdates, setJiraHistory]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
