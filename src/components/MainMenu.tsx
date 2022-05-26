import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { generatePath, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import RouteTypes from '../common/RouteTypes';
import projectsState from '../state/ProjectState';

const DrawerContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  height: '100vh',
  boxSizing: 'border-box',
}));

const CollapsibleButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexJustifyContent: 'end',
  paddingLeft: '7px',
});

const MenuTopItems = styled(List)({
  flexGrow: 1,
});

const MenuBottomItems = styled(List)();

const CollapseIcon = styled(ExpandMoreIcon)({
  transform: 'rotate(90deg)',
});

enum MenuItemPosition {
  top = 'top',
  bottom = 'bottom',
}

type MenuItem = {
  title: string;
  icon: JSX.Element;
  position: MenuItemPosition;
  action: () => void;
};

function MainMenu() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const projects = useRecoilValue(projectsState);

  const getProjects = (): MenuItem[] => {
    const output: MenuItem[] = [];
    projects.forEach((project) => {
      output.push({
        title: project.name,
        icon: <DashboardIcon />,
        position: MenuItemPosition.top,
        // eslint-disable-next-line no-console
        action: () => navigate(generatePath(RouteTypes.project, { projectId: `${project.id}` })),
      });
    });

    return output;
  };

  const getMenuItems = (): MenuItem[] => [
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
        <MenuTopItems>
          {
            getMenuItems()
              .filter((item) => item.position === MenuItemPosition.top)
              .map((menuItem) => (
                <ListItem button key={menuItem.title} onClick={menuItem.action}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItem>
              ))
          }
        </MenuTopItems>
        <MenuBottomItems>
          {
            getMenuItems()
              .filter((item) => item.position === MenuItemPosition.bottom)
              .map((menuItem) => (
                <ListItem button key={menuItem.title} onClick={menuItem.action}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItem>
              ))
          }
        </MenuBottomItems>
      </DrawerContainer>
    </Collapse>
  );
}

export default MainMenu;
