export const SettingsFileName = 'appSettings.json';

export type AppTheme = {
  primaryBackgroundColor: string;
  primaryColor: string,
  secondaryBackgroundColor: string;
  secondaryColor: string;
  background: string;
};

export const DefaultTheme = {
  primaryBackgroundColor: '#000',
  primaryColor: '#fff',
  secondaryBackgroundColor: '#333',
  secondaryColor: '#777',
  background: '#444',
};

export type AppSettings = {
  isDevelopment: boolean;
  jiraUrl: string;
  jiraToken: string;
  jiraRefreshTimeoutInMinutes: number;
  jiraHistoryTimeInMinutes: number;
  jiraChangelogFields: string[];
  theme: AppTheme;
};

export const DefaultAppSettings: AppSettings = {
  isDevelopment: false,
  jiraUrl: '',
  jiraToken: '',
  jiraRefreshTimeoutInMinutes: 1,
  jiraHistoryTimeInMinutes: 600,
  jiraChangelogFields: ['assignee', 'status', 'priority', 'type'],
  theme: DefaultTheme,
};
