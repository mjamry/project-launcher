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
  name: string;
  iconUrl?: string;
  jiraId?: string;
  links?: ProjectLink[];
  scripts?: ProjectScript[];
};

export type ProjectFileName = {
  id: string;
  fileName: string;
};
