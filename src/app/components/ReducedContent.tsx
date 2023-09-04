import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import WindowSize, { ContentLength } from '../../shared/dto/WindowSize';
import windowSizeState from '../state/WindowSizeState';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const PartialContent = styled('p')({
  overflow: 'hidden',
  maxWidth: '40vw',
});

type Props = {
  content?: string;
  maxLength?: number;
};

function ReducedContent(props: Props) {
  const { content, maxLength } = props;
  const [contentLength, setContentLength] = useState(ContentLength.medium);
  const windowSize = useRecoilValue(windowSizeState);

  useEffect(() => {
    switch (windowSize) {
      case WindowSize.fullscreen:
        setContentLength(ContentLength.fullscreen);
        break;
      case WindowSize.large:
        setContentLength(ContentLength.large);
        break;
      case WindowSize.medium:
        setContentLength(ContentLength.medium);
        break;
      case WindowSize.small:
        setContentLength(ContentLength.small);
        break;
      default:
    }
  }, [windowSize]);

  return (
    <>
      {content && content.length > 0
        ? (
          <Root>
            <Tooltip title={content} arrow>
              <PartialContent>
                {content.length > contentLength
                  ? <>{content.substring(0, maxLength || contentLength).concat('...')}</>
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
