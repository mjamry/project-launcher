import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Collapse, IconButton, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { generatePath, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import RouteTypes from '../common/dto/RouteTypes';
import projectsState from '../state/ProjectState';

// eslint-disable-next-line react/jsx-props-no-spreading
const MenuItem = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.button,
  color: theme.palette.primary.contrastText,
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
  },
}));

const DrawerContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.primary.main,
  height: '100vh',
  boxSizing: 'border-box',
}));

const CollapsibleButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexJustifyContent: 'end',
  paddingLeft: '8px',
});

const MenuTopItemsList = styled(List)({
  flexGrow: 1,
});

const MenuBottomItemsList = styled(List)();

const CollapseIcon = styled(ExpandMoreIcon)({
  transform: 'rotate(90deg)',
});

const ProjectAvatar = styled('img')({
  height: '24px',
  width: '24px',
});

enum MenuItemPosition {
  top = 'top',
  bottom = 'bottom',
}

type MenuItemDto = {
  title: string;
  icon: JSX.Element;
  position: MenuItemPosition;
  action: () => void;
};

function MainMenu() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedButtonTitle, setSelectedButtonTitle] = useState<string>('');
  const projects = useRecoilValue(projectsState);

  const getProjects = (): MenuItemDto[] => {
    const output: MenuItemDto[] = [];
    projects.forEach((project) => {
      output.push({
        title: project.name,
        icon: project.avatarUrl ? <ProjectAvatar src={project.avatarUrl} /> : <DashboardIcon />,
        position: MenuItemPosition.top,
        action: () => navigate(generatePath(RouteTypes.project, { projectId: `${project.id}` })),
      });
    });

    return output;
  };

  const getMenuItems = (): MenuItemDto[] => [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      position: MenuItemPosition.top,
      action: () => navigate(RouteTypes.root),
    },
    ...getProjects(),
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      position: MenuItemPosition.bottom,
      action: () => navigate(RouteTypes.settings),
    },
    {
      title: 'About',
      icon: <InfoIcon />,
      position: MenuItemPosition.bottom,
      action: () => navigate(RouteTypes.about),
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Collapse
      collapsedSize="3.5rem"
      orientation="horizontal"
      in={!isCollapsed}
      timeout="auto"
    >
      <DrawerContainer>
        <CollapsibleButtonContainer>
          <IconButton onClick={toggleCollapse}>
            { isCollapsed ? <MenuIcon /> : <CollapseIcon />}
          </IconButton>
        </CollapsibleButtonContainer>
        <MenuTopItemsList>
          {
            getMenuItems()
              .filter((item) => item.position === MenuItemPosition.top)
              .map((menuItem) => (
                <MenuItem
                  selected={selectedButtonTitle === menuItem.title}
                  key={menuItem.title}
                  onClick={() => {
                    menuItem.action();
                    setSelectedButtonTitle(menuItem.title);
                  }}
                >
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText disableTypography primary={menuItem.title} />
                </MenuItem>
              ))
          }
        </MenuTopItemsList>
        <MenuBottomItemsList>
          {
            getMenuItems()
              .filter((item) => item.position === MenuItemPosition.bottom)
              .map((menuItem) => (
                <MenuItem
                  selected={selectedButtonTitle === menuItem.title}
                  key={menuItem.title}
                  onClick={() => {
                    menuItem.action();
                    setSelectedButtonTitle(menuItem.title);
                  }}
                >
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText disableTypography primary={menuItem.title} />
                </MenuItem>
              ))
          }
        </MenuBottomItemsList>
      </DrawerContainer>
    </Collapse>
  );
}

export default MainMenu;
