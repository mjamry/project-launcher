import React from 'react';
import JiraItemDetailsTable from './JiraItemDetailsTable';

type Props = {
  data?: any;
  projectKey: string
};

function JiraItems(props: Props) {
  const { data, projectKey } = props;

  return (
    <>
      {data.map((item: any) => (
        <JiraItemDetailsTable
          item={item}
          projectKey={projectKey}
        />
      ))}
    </>
  );
}

export default JiraItems;
