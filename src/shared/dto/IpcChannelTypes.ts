enum AppInit {
  appInit_settingsLoaded = 'appInit_SettingsLoaded',
  appInit_projectsConfigsLoaded = 'appInit_projectsConfigsLoaded',
  appInit_projectsFileNameLoaded = 'appInit_projectsFileNameLoaded',
  appInit_ready = 'appInit_ready',
  appInit_done = 'appInit_done',
  appInit_appDetails = 'appInit_appDetails',
}

enum AppUpdate {
  appUpdate_newVersion = 'appUpdate_newVersion',
  appUpdate_readyToInstall = 'appUpdate_readyToInstall',
  appUpdate_install = 'appUpdate_install',
}

enum AppRuntime {
  saveConfigFile = 'saveConfigFile',
  createConfigFile = 'createConfigFile',
  error = 'error',
  appMinimize = 'appMinimize',
  appClose = 'appClose',
  appToggleMaximize = 'appMaximize',
  appRestart = 'appRestart',

}

const IpcChannelTypes = { ...AppInit, ...AppUpdate, ...AppRuntime };

export default IpcChannelTypes;
