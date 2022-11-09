import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import projectsState from '../state/ProjectState';
import appSettingsState from '../state/AppState';
import useJiraClient from './JiraClient';
import { JiraUpdate, JiraIssue } from '../../shared/dto/JiraTypes';
import { jiraUpdatesState, jiraHistoryState } from '../state/JiraState';

function JiraDataProvider() {
  const [projects] = useRecoilState(projectsState);
  const [appSettings] = useRecoilState(appSettingsState);
  const [updateStates, setJiraUpdates] = useRecoilState(jiraUpdatesState);
  const setJiraHistory = useSetRecoilState(jiraHistoryState);

  const jiraClient = useJiraClient(appSettings);

  function createIssue(): JiraIssue {
    return {
      id: faker.helpers.arrayElement(['SMDXG-15', 'SMDXG-27', 'SMDXG-28', 'SMDXG-29']),
      summary: faker.hacker.phrase(),
      url: faker.internet.url(),
      assignee: faker.internet.email(),
      status: faker.helpers.arrayElement(['Open', 'Closed', 'Resolved', 'Waiting For Release']),
      description: faker.lorem.lines(2),
      updated: faker.date.recent(1),
      isNew: faker.datatype.boolean(),
      priority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    };
  }

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
    // TODO for testing purposes Only
    const jiraTestUpdates: JiraUpdate = {
      project: 'SMDXG',
      issues: [createIssue()],
    };

    await Promise.all(projects.map(async (project) => {
      if (project.jiraId) {
        const updates = await jiraClient.getUpdatesForProject(project.jiraId);
        if (jiraTestUpdates.project === updates.project) {
          updates.issues.push(jiraTestUpdates.issues[0]);
        }
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
