import { createI18n } from 'vue-i18n';

const languageFiles = require.context('@/language', true, /(?<!index)\.ts/);
const sitefiles = require.context('.', true, /(?<!index)\.ts/);
const defaultSite = 'fr';

const languages = languageFiles.keys()
  .reduce((obj, modulePath) => {
    const fileName = /[a-zA-Z]+/.exec(modulePath)?.[0] || '';
    return Object.assign({}, obj, {[fileName]: languageFiles(modulePath)?.default });
  }, {});

const sites = sitefiles.keys()
  .reduce((obj, modulePath) => {
    const moduleName = /[a-zA-Z]+/.exec(modulePath)?.[0] || '';
    return Object.assign({}, obj, { [moduleName]: sitefiles(modulePath)?.default });
  }, {});

/**
 * @description 获取站点名字
 * @returns 
 */
const getSiteName = () => {
  const prefixReg = /[\.]\w+/g;
  const hostPrefix = window.location.host.replace(prefixReg, ''); 
  return window.location.protocol === 'https:' ? hostPrefix : defaultSite;
};

export default () => {
  const siteName = getSiteName();
  return createI18n({
    legacy: false,
    locale: sites[siteName].lang,
    messages: languages
  });
};