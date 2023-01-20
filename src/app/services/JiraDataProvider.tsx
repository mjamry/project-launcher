import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { appSettingsState } from '../state/AppState';
import useJiraClient from './JiraClient';
import { JiraIssue, JiraUpdate } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState, jiraHistoryState } from '../state/JiraState';
import { projectsState } from '../state/ProjectState';

function JiraDataProvider() {
  const [projects] = useRecoilState(projectsState);
  const [appSettings] = useRecoilState(appSettingsState);
  const [updateStates, setJiraUpdates] = useRecoilState(jiraUpdatesState);
  const [historyState, setJiraHistory] = useRecoilState(jiraHistoryState);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

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

  const refreshHistory = useCallback(() => {
    const refreshedHistory: JiraUpdate[] = [];
    if (historyState && historyState.length > 0) {
      historyState.forEach((project) => {
        const updateStateIssues = updateStates.find((us) => us.project === project.project)?.issues;
        const newItems = (updateStateIssues && updateStateIssues
          .filter((usi) => project.issues
            .findIndex((hi) => usi.id === hi.id) === -1)) || [];

        const withUpdates = project.issues
          .map((hi) => updateStateIssues && (updateStateIssues
            .find((usi) => usi.id === hi.id) || hi));

        refreshedHistory.push({
          project: project.project,
          issues: [...newItems, ...withUpdates] as JiraIssue[],
        });
      });

      setJiraHistory(refreshedHistory);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateStates]);

  useEffect(() => {
    getJiraHistory();
  }, [getJiraHistory]);

  useEffect(() => {
    let interval: any = null;
    if (appSettings !== undefined) {
      interval = setInterval(async () => {
        await getJiraUpdates();
        refreshHistory();
      }, appSettings.jiraRefreshTimeoutInMinutes * 60 * 1000);
    }
    return () => clearInterval(interval);
  }, [appSettings, getJiraUpdates, refreshHistory]);

  return <></>;
}

export default JiraDataProvider;
