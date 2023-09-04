enum IpcChannelTypes {
  appSettingsLoaded = 'appSettingsLoaded',
  projectsConfigsLoaded = 'projectsConfigsLoaded',
  projectsFileNameLoaded = 'projectsFileNameLoaded',
  saveConfigFile = 'saveConfigFile',
  createConfigFile = 'createConfigFile',
  appInitialized = 'appInitialized',
  error = 'error',
  jiraUpdate = 'jiraUpdate',
  jiraHistory = 'jiraHistory',
  appMinimize = 'appMinimize',
  appClose = 'appClose',
  appMaximize = 'appMaximize',
  appUnMaximize = 'appUnMaximize',
  appRestart = 'appRestart',
}

export default IpcChannelTypes;
