import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import WindowSize from '../../shared/dto/WindowSize';
import windowSizeState from '../state/WindowSizeState';

function WindowSizeMonitor() {
  const [, setWindowSizeState] = useRecoilState(windowSizeState);

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth <= WindowSize.small) {
      setWindowSizeState(WindowSize.small);
    } else if (window.innerWidth > WindowSize.small && window.innerWidth <= WindowSize.medium) {
      setWindowSizeState(WindowSize.medium);
    } else if (window.innerWidth > WindowSize.medium && window.innerWidth <= WindowSize.large) {
      setWindowSizeState(WindowSize.large);
    } else {
      setWindowSizeState(WindowSize.fullscreen);
    }
  }, [setWindowSizeState]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    handleWindowResize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  );
}

export default WindowSizeMonitor;
