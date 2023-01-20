/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Collapse from '@mui/material/Collapse/Collapse';
import React, { useEffect, useState } from 'react';
import { useRecoilSnapshot, useRecoilValue } from 'recoil';
import BugReportIcon from '@mui/icons-material/BugReport';
import IconButton from '@mui/material/IconButton';
import {
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Paper,
  styled,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import useLoggerService from '../common/LoggerService';
import appSettingsState from './AppState';

const Content = styled('div')({
  maxHeight: '95vh',
  width: '400px',
  position: 'relative',
  paddingTop: '20px',
  textAlign: 'left',
  paddingLeft: '5px',
  overflow: 'auto',
  overflowX: 'hidden',
  opacity: 0.9,
});

const ContentRow = styled(TableRow)({
  cursor: 'pointer',
});

const Settings = styled(Paper)({
  marginTop: '5px',
  paddingLeft: '5px',
});

const Root = styled('div')({
  display: 'flex',
  position: 'absolute',
  right: '5px',
  zIndex: 9999,
  fontSize: '10pt',
  fontColor: '#000',
});

type State = {
  key: string,
  value: any,
  isSelected: boolean,
};

function DebugStateObserver() {
  const snapshot = useRecoilSnapshot();
  const [atomsView, setAtomsView] = useState<State[]>([]);
  const logger = useLoggerService('AppStateViewer');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showStateChanges, setShowStateChanges] = useState<boolean>(false);
  const appSettings = useRecoilValue(appSettingsState);

  useEffect(() => {
    const atoms: State[] = [];

    if (showStateChanges) {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        logger.debug(node.key, snapshot.getLoadable(node));
      }
    }

    for (const node of snapshot.getNodes_UNSTABLE()) {
      if (!node.key.includes('selector')) {
        atoms.push({
          key: node.key,
          value: snapshot.getLoadable(node).getValue(),
          // TODO
          isSelected: false,
        });
      }
    }

    setAtomsView(atoms);
  }, [snapshot]);

  const handleShowAtom = (key: string, index: number) => {
    if (atomsView && atomsView.length > 0 && atomsView[index]) {
      console.group(atomsView[index].key);
      atomsView[index] ? console.table(atomsView[index].value) : console.log('Empty');
      console.groupEnd();
    } else logger.debug(`${key} is empty`);
  };

  const renderCollapsed = () => (
    <IconButton
      aria-label="debug view"
      component="span"
      onClick={() => setIsCollapsed(false)}
      sx={{
        color: appSettings && appSettings.theme.highlightBackgroundColor ? appSettings.theme.highlightBackgroundColor : 'red',
      }}
    >
      <BugReportIcon />
    </IconButton>
  );

  const renderContent = () => (
    <ClickAwayListener onClickAway={() => setIsCollapsed(true)}>
      <Content>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>State</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atomsView
              && (
                atomsView.map((atom, index) => (
                  <ContentRow
                    onClick={() => handleShowAtom(atom.key, index)}
                    key={atom.key}
                  >
                    <TableCell>
                      {atom.key}
                    </TableCell>
                    <TableCell>
                      {`${atom.value}`}
                    </TableCell>
                  </ContentRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
        <Settings>
          <FormControlLabel
            control={(
              <Checkbox
                checked={showStateChanges}
                onChange={() => setShowStateChanges(!showStateChanges)}
              />
              )}
            label={<Typography>Log state changes</Typography>}
          />
        </Settings>
      </Content>
    </ClickAwayListener>
  );

  return (
    <Root>
      <Collapse
        collapsedSize="40px"
        orientation="vertical"
        in={!isCollapsed}
        timeout={0}
      >
        <Collapse
          collapsedSize="40px"
          orientation="horizontal"
          in={!isCollapsed}
          timeout={0}
        >
          { isCollapsed ? renderCollapsed() : renderContent() }
        </Collapse>
      </Collapse>
    </Root>
  );
}

export default DebugStateObserver;
