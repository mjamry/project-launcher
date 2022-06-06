export type ProjectLink = {
  name: string;
  url: string;
  description?: string;
};

export type ProjectScript = {
  name: string;
  path: string;
  description?: string;
};

export type Project = {
  id: string;
  avatarUrl: string;
  name: string;
  jiraId?: string;
  description?: string;
  imageUrl: string;
  jiraUrl?: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  links: ProjectLink[];
  scripts: ProjectScript[];
};
