import {
  Card, styled, CardHeader,
} from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useRecoilValue } from 'recoil';
import { useLinkLaunchService } from '../services/IpcLaunchServices';
import appDetailsState from '../state/AppDetailsState';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  height: '90%',
});

const AboutCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  padding: '10px',
  height: '270px',
  width: '400px',
}));

const DetailsItem = styled('div')(({ theme }) => ({
  marginTop: '8px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  borderRadius: '25px',
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '10pt',
  width: '100%',
  'a:link': {
    color: theme.palette.text.primary,
  },
}));

const DetailsItemLink = styled(DetailsItem)({
  cursor: 'pointer',
});

const DetailsItemTitle = styled(DetailsItem)({
  fontWeight: 'bold',
  fontSize: '12pt',
});

const Details = styled('div')({
  textAlign: 'center',
  padding: '10px',
});

export const AboutCardHeader = styled(CardHeader)({
  padding: '0',
  paddingLeft: '16px',
  marginBottom: '20px',
});

function AboutPage() {
  const appDetails = useRecoilValue(appDetailsState);
  const scriptLauncher = useLinkLaunchService();

  return (
    <Root>
      <AboutCard>
        <AboutCardHeader
          avatar={<InfoIcon />}
          title="About"
        />
        <Details>
          <DetailsItemTitle>{appDetails.name}</DetailsItemTitle>
          <DetailsItem>
            version
            {' '}
            {appDetails.version}
          </DetailsItem>
          <DetailsItem>
            {' '}
            {appDetails.copyright}
          </DetailsItem>
          <DetailsItemLink
            onClick={() => scriptLauncher.launch('https://github.com/mjamry/project-launcher/')}
          >
            Github
          </DetailsItemLink>
        </Details>
      </AboutCard>
    </Root>
  );
}

export default AboutPage;
