module.exports = function override(config, env) {
  config.target = 'electron-main';
  return config;
}