import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Project } from '../../../shared/dto/ProjectDto';
import projectsState from '../state/ProjectState';

const { ipcRenderer } = window.require('electron');

function IpcCommunicationService() {
  const setProjects = useSetRecoilState(projectsState);

  useEffect(() => {
    ipcRenderer.on('test', (event: any, data: Project[]) => {
      setProjects(data);
    });
  }, [setProjects]);

  return (
    <></>
  );
}

export default IpcCommunicationService;
