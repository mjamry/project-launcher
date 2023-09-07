enum IpcChannelTypes {
  appSettingsLoaded = 'appSettingsLoaded',
  appDetails = 'appDetails',
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
  autoUpdateNewVersion = 'autoUpdateNewVersion',
  autoUpdateDownloaded = 'autoUpdateDownloaded',
  autoUpdateInstall = 'autoUpdateInstall',
}

export default IpcChannelTypes;
