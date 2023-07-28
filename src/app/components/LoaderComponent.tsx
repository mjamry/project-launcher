import React from 'react';
import { LinearProgress, Typography, styled } from '@mui/material';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
});

const ProgressContainer = styled('div')({
  width: '50vw',
});

type Props = {
  title: string;
  description?: string;
  progress?: number;
};

function LoaderComponent(props: Props) {
  const { title, description, progress } = props;

  return (
    <Root>
      <Typography variant="h3">{title}</Typography>
      <Typography>{description}</Typography>
      <ProgressContainer>
        <LinearProgress
          sx={{
            backgroundColor: 'darkgrey',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'white',
            },
            marginTop: '10px',
          }}
          variant="determinate"
          value={progress}
        />
      </ProgressContainer>
    </Root>
  );
}

export default LoaderComponent;
