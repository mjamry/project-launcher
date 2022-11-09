import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import projectsState from '../state/ProjectState';
import appSettingsState from '../state/AppState';
import useJiraClient from './JiraClient';
import { JiraUpdate } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState, jiraHistoryState } from '../state/JiraState';

function JiraDataProvider() {
  const [projects] = useRecoilState(projectsState);
  const [appSettings] = useRecoilState(appSettingsState);
  const [updateStates, setJiraUpdates] = useRecoilState(jiraUpdatesState);
  const setJiraHistory = useSetRecoilState(jiraHistoryState);

  const jiraClient = useJiraClient(appSettings);

  const getJiraHistory = useCallback(async () => {
    const projectHistory: JiraUpdate[] = [];
    await Promise.all(projects.map(async (project) => {
      if (project.jiraId) {
        const updates = await jiraClient.getHistoryForProject(project.jiraId);
        projectHistory.push(updates);
      }
    }));

    setJiraHistory(projectHistory);
  }, [jiraClient, projects, setJiraHistory]);

  const getJiraUpdates = useCallback(async () => {
    const incomingUpdates: JiraUpdate[] = [];

    await Promise.all(projects.map(async (project) => {
      if (project.jiraId) {
        const updates = await jiraClient.getUpdatesForProject(project.jiraId);
        incomingUpdates.push(updates);
      }
    }));

    const finalUpdates: JiraUpdate[] = [];
    projects.forEach((project) => {
      const currentUpdates = updateStates.find((p) => p.project === project.jiraId)?.issues || [];

      const onlyNewUpdates = incomingUpdates
        .find((p) => p.project === project.jiraId)?.issues
        .filter((nu) => currentUpdates.findIndex((cu) => cu.id === nu.id) === -1) || [];

      finalUpdates.push({
        project: project.jiraId!,
        issues: [...currentUpdates, ...onlyNewUpdates],
      });
    });

    setJiraUpdates(finalUpdates);
  }, [jiraClient, projects, setJiraUpdates, updateStates]);

  useEffect(() => {
    getJiraHistory();
  }, [getJiraHistory]);

  useEffect(() => {
    let interval: any = null;
    if (appSettings !== undefined) {
      interval = setInterval(async () => {
        await getJiraUpdates();
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [appSettings, getJiraUpdates]);

  return <></>;
}

export default JiraDataProvider;
