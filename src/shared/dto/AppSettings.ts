export const SettingsFileName = 'appSettings.json';

export type AppTheme = {
  primaryBackgroundColor: string;
  primaryColor: string,
  secondaryBackgroundColor: string;
  secondaryColor: string;
  background: string;
  highlightBackgroundColor: string;
  highlightColor: string;
};

export const DefaultTheme = {
  primaryBackgroundColor: '#000',
  primaryColor: '#fff',
  secondaryBackgroundColor: '#333',
  secondaryColor: '#777',
  background: '#444',
  highlightBackgroundColor: '#222',
  highlightColor: '#ddd',
};

export type AppSettings = {
  isDevelopment: boolean;
  jiraUrl: string;
  jiraToken: string;
  jiraUserEmail: string,
  isJiraCloud: boolean,
  jiraRefreshTimeoutInMinutes: number;
  jiraHistoryTimeInMinutes: number;
  jiraChangelogFields: string[];
  theme: AppTheme;
};

export const DefaultAppSettings: AppSettings = {
  isDevelopment: false,
  jiraUrl: '',
  jiraToken: '',
  jiraUserEmail: '',
  isJiraCloud: false,
  jiraRefreshTimeoutInMinutes: 1,
  jiraHistoryTimeInMinutes: 600,
  jiraChangelogFields: ['assignee', 'status', 'priority', 'type'],
  theme: DefaultTheme,
};
