type ProjectItem = {
  name: string;
  description?: string;
};

type ProjectLink = ProjectItem & {
  url: string;
};

type ProjectScript = ProjectItem & {
  path: string;
};

type Project = {
  id: string;
  name: string;
  iconUrl?: string;
  jiraId?: string;
  links?: ProjectLink[];
  scripts?: ProjectScript[];
};

type ProjectFileName = {
  id: string;
  fileName: string;
};

export type {
  ProjectItem, ProjectLink, ProjectScript, Project, ProjectFileName,
};
