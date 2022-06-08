import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { Project } from '../../shared/dto/ProjectDto';
import projectsState from '../state/ProjectState';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { AppSettings } from '../../shared/dto/AppSettings';
import appSettingsState from '../state/AppState';

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);
  const setAppSettings = useSetRecoilState(appSettingsState);

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appSettingsLoaded, (event: any, data: AppSettings) => {
      setAppSettings(data);
    });

    ipcRenderer.on(IpcChannelTypes.projectsConfigsLoaded, (event: any, data: Project[]) => {
      setProjects(data);
    });
  }, [setProjects, setAppSettings]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
