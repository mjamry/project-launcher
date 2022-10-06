type JiraIssue = {
  id: string,
  summary: string,
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

type JiraUpdate = {
  project: string;
  issues: JiraIssue[];
};

export type { JiraChangelogItem, JiraUpdate, JiraIssue };
