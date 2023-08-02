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

const useJiraClient = (appSettings: AppSettings): IJiraClient => {
  const restClient = useRestClientAdapter({ token: appSettings.jiraToken });
  const logger = useLoggerService('JiraClient');

  const getJiraDataForProject = async (projectKey: string, timeout: number):
  Promise<JiraResponse> => {
    const requestData = {
      jql: `project=${projectKey} AND updated > -${timeout}m`,
      fields: Object.keys(JiraIssueFields),
      expand: ['changelog'],
    };

    let response: JiraResponse = { issues: [] };
    try {
      response = await restClient.post<JiraResponse>(`${appSettings.jiraUrl}/rest/api/2/search`, requestData);
    } catch (ex: any) {
      logger.debug('JiraGettingUpdateError', ex);
    }
    return response;
  };

  const getIssueChanges = (issue: any): JiraChangelogItem[] => {
    const changes: JiraChangelogItem[] = [];

    issue.changelog.histories.forEach((history: any) => {
      history.items.forEach((change: any) => {
        const fieldName = change.field;
        if (appSettings.jiraChangelogFields.some((field) => field === fieldName)) {
          const changeTime = new Date(history.created);

          changes.push({
            id: change.id,
            author: history.author.name.split('@')[0],
            created: changeTime,
            field: fieldName,
            content: `${change.fromString} -> ${change.toString}`,
          });
        }
      });
    });

    return changes;
  };

  const getIssueComments = (issue: any): JiraChangelogItem[] => {
    const comments: JiraChangelogItem[] = [];

    if (issue.fields.comment) {
      issue.fields.comment.comments.forEach((comment: any) => {
        const updated = new Date(comment.updated);
        comments.push({
          id: issue.fields.comment.id,
          author: comment.author.name.split('@')[0],
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
        const changes = getIssueChanges(issue);
        const comments = getIssueComments(issue);

        output.push({
          id: issue[JiraIssueFields.key],
          summary: issue.fields[JiraIssueFields.summary],
          url: `${appSettings.jiraUrl}\\browse\\${issue[JiraIssueFields.key]}`,
          assignee: issue.fields[JiraIssueFields.assignee] ? issue.fields[JiraIssueFields.assignee].name.split('@')[0] : '',
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
