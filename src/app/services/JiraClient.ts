/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import { AppSettings } from '../../shared/dto/AppSettings';
import JiraIssueFields from '../../shared/dto/JiraIssueFields';
import { JiraChangelogItem, JiraIssue, JiraUpdate } from '../../shared/dto/JiraTypes';
import useLoggerService from '../common/LoggerService';
import useRestClientAdapter from './RestClientAdapter';

type JiraResponse = {
  issues: JiraIssue[],
};

type IJiraClient = {
  getUpdatesForProject: (project: string) => Promise<JiraUpdate>;
  getHistoryForProject: (project: string) => Promise<JiraUpdate>;
};

const oneMinuteInMS = 60000;

const useJiraClient = (appSettings: AppSettings): IJiraClient => {
  const restClient = useRestClientAdapter({
    token: appSettings.jiraToken,
    user: appSettings.jiraUserEmail,
    isCloudService: appSettings.isJiraCloud,
  });
  const logger = useLoggerService('JiraClient');

  const getJiraDataForProject = async (projectKey: string, timeout: number):
  Promise<JiraResponse> => {
    const requestData = {
      jql: `project=${projectKey} AND updated > -${timeout}m`,
      fields: Object.keys(JiraIssueFields),
      expand: 'changelog',
    };

    let response: JiraResponse = { issues: [] };
    try {
      const requestUrl = `${appSettings.jiraUrl}/rest/api/2/search`
        .concat('?jql=', requestData.jql)
        .concat('&fields=', requestData.fields.join(','))
        .concat('&expand=', requestData.expand);
      response = await restClient.get<JiraResponse>(requestUrl);
    } catch (ex: any) {
      logger.debug('JiraGettingUpdateError', ex);
    }
    return response;
  };

  const isHistoryAnUpdate = (history: any, timeout: number) => {
    const now = Date.now();
    const created = Date.parse(history.created);

    const passedMinutes = (now - created) / oneMinuteInMS;

    return passedMinutes <= timeout;
  };

  const getIssueChanges = (issue: any, timeout: number): JiraChangelogItem[] => {
    const changes: JiraChangelogItem[] = [];

    issue.changelog.histories.forEach((history: any) => {
      history.items.forEach((change: any) => {
        if (isHistoryAnUpdate(history, timeout)) {
          const fieldName = change.field;
          if (appSettings.jiraChangelogFields.some((field) => field === fieldName)) {
            const changeTime = new Date(history.created);

            changes.push({
              id: change.id,
              author: history.author.displayName,
              created: changeTime,
              field: fieldName,
              content: `${change.fromString} -> ${change.toString}`,
            });
          }
        }
      });
    });

    return changes;
  };

  const getIssueComments = (issue: any): JiraChangelogItem[] => {
    const comments: JiraChangelogItem[] = [];

    if (issue.fields.comment && appSettings.jiraChangelogFields.includes(JiraIssueFields.comment)) {
      issue.fields.comment.comments.forEach((comment: any) => {
        const updated = new Date(comment.updated);
        comments.push({
          id: issue.fields.comment.id,
          author: comment.author.displayName,
          created: updated,
          field: 'comment',
          content: comment.body,
        });
      });
    }

    return comments;
  };

  const composeUpdatesForProject = async (projectKey: string, timeout: number):
  Promise<JiraUpdate> => {
    const response = await getJiraDataForProject(projectKey, timeout);
    const output: JiraIssue[] = [];
    try {
      response.issues.forEach((issue: any) => {
        const changes = getIssueChanges(issue, timeout);
        const comments = getIssueComments(issue);

        output.push({
          id: issue[JiraIssueFields.key],
          summary: issue.fields[JiraIssueFields.summary],
          url: `${appSettings.jiraUrl}\\browse\\${issue[JiraIssueFields.key]}`,
          assignee: issue.fields[JiraIssueFields.assignee] ? issue.fields[JiraIssueFields.assignee].displayName : '',
          status: issue.fields[JiraIssueFields.status].name,
          description: issue.fields[JiraIssueFields.description],
          updated: new Date(issue.fields[JiraIssueFields.updated]),
          isNew: issue.fields[JiraIssueFields.updated] === issue.fields[JiraIssueFields.created],
          priority: issue.fields[JiraIssueFields.priority].name,
          changes: [...comments, ...changes]
            .sort((a, b) => b.created.getTime() - a.created.getTime()),
        });
      });
    } catch (ex:any) {
      logger.debug('JiraUpdateError', ex);
    }

    return {
      project: projectKey,
      issues: output.sort((a, b) => b.updated.getTime() - a.updated.getTime()),
    };
  };

  const getUpdatesForProject = async (projectKey: string) => {
    return composeUpdatesForProject(projectKey, appSettings.jiraRefreshTimeoutInMinutes);
  };

  const getHistoryForProject = async (projectKey: string) => {
    return composeUpdatesForProject(projectKey, appSettings.jiraHistoryTimeInMinutes);
  };

  return {
    getUpdatesForProject,
    getHistoryForProject,
  };
};

export default useJiraClient;
