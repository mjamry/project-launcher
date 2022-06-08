import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ipcRenderer } from 'electron';
import { Project } from '../../shared/dto/ProjectDto';
import projectsState from '../state/ProjectState';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appStarted, (event: any, data: Project[]) => {
      setProjects(data);
    });
  }, [setProjects]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
