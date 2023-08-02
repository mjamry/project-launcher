import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const PartialContent = styled('p')({
  overflow: 'hidden',
  maxWidth: '40vw',
});

const DefaultMaxLength = 110;
type Props = {
  content?: string;
  maxLength?: number;
};

function ReducedContent(props: Props) {
  const { content, maxLength } = props;
  const contentLength = maxLength || DefaultMaxLength;

  return (
    <>
      {content && content.length > 0
        ? (
          <Root>
            <Tooltip title={content} arrow>
              <PartialContent>
                {content.length > contentLength
                  ? <>{content.substring(0, contentLength).concat('...')}</>
                  : <>{content}</>}
              </PartialContent>
            </Tooltip>
          </Root>
        )
        : <></>}
    </>
  );
}

export default ReducedContent;
