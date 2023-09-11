import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { Project, ProjectFileName } from '../../shared/dto/ProjectDto';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { AppSettings } from '../../shared/dto/AppSettings';
import { appSettingsState, appThemeState } from '../state/AppSettingsState';
import { projectsConfigFileNameState, projectsState } from '../state/ProjectState';
import appDetailsState from '../state/AppDetailsState';
import { AppDetails } from '../../shared/dto/AppDetails';

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);
  const setProjectsFileName = useSetRecoilState(projectsConfigFileNameState);
  const setAppSettings = useSetRecoilState(appSettingsState);
  const setAppTheme = useSetRecoilState(appThemeState);
  const setAppDetails = useSetRecoilState(appDetailsState);

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appInit_settingsLoaded, (event: any, data: AppSettings) => {
      setAppSettings(data);
      setAppTheme(data.theme);
    });

    ipcRenderer.on(IpcChannelTypes.appInit_projectsConfigsLoaded, (event: any, data: Project[]) => {
      setProjects(data.filter((p) => p.id !== undefined && p.id !== '' && p.name !== undefined && p.name !== ''));
    });

    ipcRenderer.on(
      IpcChannelTypes.appInit_projectsFileNameLoaded,
      (event: any, data: ProjectFileName[]) => {
        setProjectsFileName(data);
      },
    );

    ipcRenderer.on(IpcChannelTypes.appInit_appDetails, (event: any, data: AppDetails) => {
      setAppDetails(data);
    });
  }, [
    setProjects,
    setAppSettings,
    setProjectsFileName,
    setAppTheme,
    setAppDetails,
  ]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
