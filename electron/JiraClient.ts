/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import { dialog } from 'electron/main';
import useRestClient from '../src/shared/RestClient';
import { AppSettings } from '../src/shared/dto/AppSettings';
import { JiraChangelogItem, JiraIssue, JiraUpdate } from '../src/shared/dto/JiraTypes';

enum JiraIssueFields {
  key = 'key',
  summary = 'summary',
  description = 'description',
  assignee = 'assignee',
  status = 'status',
  issueType = 'issuetype',
  updated = 'updated',
  created = 'created',
  priority = 'priority',
  comment = 'comment',
}

type JiraResponse = {
  issues: JiraIssue[],
};

type IJiraClient = {
  getUpdatesForProject: (project: string) => Promise<JiraUpdate>;
  getHistoryForProject: (project: string) => Promise<JiraUpdate>;
};

const useJiraClient = (appSettings: AppSettings): IJiraClient => {
  const restClient = useRestClient({ token: appSettings.jiraToken });

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
      dialog.showErrorBox('JiraGettingUpdateError', ex);
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
          url: issue.self,
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
      dialog.showErrorBox('JiraUpdateError', ex);
    }

    return {
      project: projectKey,
      issues: output.sort((a, b) => b.updated.getTime() - a.updated.getTime()),
    };
  };

  const getUpdatesForProject = (projectKey: string) => {
    return composeUpdatesForProject(projectKey, appSettings.jiraRefreshTimeoutInMinutes);
  };

  const getHistoryForProject = (projectKey: string) => {
    return composeUpdatesForProject(projectKey, appSettings.jiraHistoryTimeInMinutes);
  };

  return {
    getUpdatesForProject,
    getHistoryForProject,
  };
};

export default useJiraClient;
