import {
  Card, CardContent, Button, styled, CardHeader,
} from '@mui/material';

export const ProjectCard = styled(Card)(({ theme }) => ({
  padding: '8px',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
}));

export const ProjectCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
});

export const ProjectListItem = styled(Button)({
  marginTop: '8px',
});

export const ProjectCardHeader = styled(CardHeader)({
  padding: '0',
  paddingLeft: '16px',
});
