import React from 'react';
import JiraItemDetails from './JiraItemDetails';

type Props = {
  data?: any;
  projectKey: string
};

function JiraItems(props: Props) {
  const { data, projectKey } = props;

  return (
    <>
      {data.map((item: any) => (
        <JiraItemDetails item={item} projectKey={projectKey} updated={false} />
      ))}
    </>
  );
}

export default JiraItems;
