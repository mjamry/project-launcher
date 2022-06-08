/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Navigate } from 'react-router-dom';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import useLoggerService from '../common/LoggerService';

const { ipcRenderer } = window.require('electron');

type State = {
  hasError: boolean,
};

type Props = {
  children: JSX.Element[];
};

class ErrorBoundary extends React.Component<Props, State> {
  logger = useLoggerService('ErrorBoundary');

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.logger.error(error, errorInfo);
    ipcRenderer.send(IpcChannelTypes.error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (<Navigate to="/error/1" replace />);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
