import React, { useState } from 'react';
import styled from '@emotion/styled';
import CollapseButton from './CollapseButton';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const FullContent = styled('p')({
  margin: '10px',
});

const PartialContent = styled('p')({
  overflow: 'hidden',
});

type Props = {
  content: string;
};

function CollapsibleContent(props: Props) {
  const { content } = props;
  const [canShowContent, setCanShowContent] = useState(false);

  const handleContentClick = () => {
    setCanShowContent(!canShowContent);
  };

  return (
    <Root>
      <CollapseButton onClick={handleContentClick} />
      {canShowContent
        ? <FullContent>{content}</FullContent>
        : <PartialContent>{content.substring(0, 110).concat('...')}</PartialContent>}
    </Root>
  );
}

export default CollapsibleContent;
