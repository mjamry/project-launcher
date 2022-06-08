export type AppSettings = {
  isDevelopment: boolean;
  jiraUrl: string;
  jiraToken: string;
};

export const DefaultAppSettings: AppSettings = {
  isDevelopment: false,
  jiraUrl: '',
  jiraToken: '',
};
