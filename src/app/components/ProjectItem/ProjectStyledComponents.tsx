import {
  Card, styled, CardHeader,
} from '@mui/material';

export const ProjectCardContainer = styled(Card)(({ theme }) => ({
  padding: '8px',
  margin: '12px 0',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
}));

export const ContentAsColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const ProjectCardHeader = styled(CardHeader)({
  padding: '0',
  paddingLeft: '16px',
  fontWeight: 'bold',
});
