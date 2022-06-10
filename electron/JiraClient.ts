/* eslint-disable no-console */
import useRestClient from '../src/shared/RestClient';
import { AppSettings } from '../src/shared/dto/AppSettings';

enum JiraIssueFields {
  key = 'key',
  description = 'description',
  assignee = 'assignee',
  status = 'status',
  issueType = 'issuetype',
  updated = 'updated',
  created = 'created',
  priority = 'priority',
  comments = 'comment',
}

type JiraIssue = {
  id: string,
  url: string,
  assignee: string,
  status: string,
  description: string,
  updated: Date,
  isNew: boolean,
  priority: string,
  changes?: JiraChangelogItem[]
};

type JiraChangelogItem = {
  author: string;
  created: Date;
  field: string;
  content?: string;
};

type JiraResponse = {
  issues: JiraIssue[],
};

type JiraUpdate = {
  project: string;
  issues: JiraIssue[];
};

type IJiraClient = {
  getUpdatesForProject: (project: string) => Promise<JiraUpdate>;
};

const useJiraClient = (appSettings: AppSettings): IJiraClient => {
  const restClient = useRestClient({ token: appSettings.jiraToken });

  const getJiraDataForProject = async (projectKey: string): Promise<JiraResponse> => {
    const requestData = {
      jql: `project=${projectKey} AND updated > -${appSettings.jiraRefreshTimeoutInMinutes}m`,
      fields: Object.keys(JiraIssueFields),
      expand: ['changelog'],
    };

    const response = await restClient.post<JiraResponse>(`${appSettings.jiraUrl}/rest/api/2/search`, requestData);
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
            author: history.author.name,
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
          author: comment.author.name,
          created: updated,
          field: 'comment',
          content: comment.body,
        });
      });
    }

    return comments;
  };

  const getUpdatesForProject = async (projectKey: string): Promise<JiraUpdate> => {
    const response = await getJiraDataForProject(projectKey);

    const output: JiraIssue[] = [];
    response.issues.forEach((issue: any) => {
      const changes = getIssueChanges(issue);
      const comments = getIssueComments(issue);

      output.push({
        id: issue[JiraIssueFields.key],
        url: issue.self,
        assignee: issue.fields[JiraIssueFields.assignee] ? issue.fields[JiraIssueFields.assignee].key : '',
        status: issue.fields[JiraIssueFields.status].name,
        description: issue.fields[JiraIssueFields.description],
        updated: new Date(issue.fields[JiraIssueFields.updated]),
        isNew: issue.fields[JiraIssueFields.updated] === issue.fields[JiraIssueFields.created],
        priority: issue.fields[JiraIssueFields.priority].name,
        changes: [...comments, ...changes],
      });
    });

    return {
      project: projectKey,
      issues: output,
    };
  };

  return {
    getUpdatesForProject,
  };
};

export default useJiraClient;
