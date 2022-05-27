/**
 * @param {import('../shared/dto/AppConfig.ts').AppConfig} config
 */
function tst(config) {
  // eslint-disable-next-line no-console
  console.log(config.isDev);
}

module.exports = {
  fun: tst,
};
