export type AppSettings = {
  isDevelopment: boolean;
  jiraUrl: string;
  jiraToken: string;
  jiraRefreshTimeoutInMinutes: number;
  jiraChangelogFields: string[];
};

export const DefaultAppSettings: AppSettings = {
  isDevelopment: false,
  jiraUrl: '',
  jiraToken: '',
  jiraRefreshTimeoutInMinutes: 1,
  jiraChangelogFields: ['assignee', 'status', 'priority', 'type'],
};
