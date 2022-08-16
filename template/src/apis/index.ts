import { AxiosRequestConfig } from 'axios';
import { createAxios } from 'rich-axios';

// 合并文件夹下所有模块
const queryAllModules = (path) => {
  const files = require.context(path, true, /(?<!index)\.ts/);
  return files
    .keys()
    .reduce<ApiConfig[]>(
      (list, modulePath) => {
        const moduleName = /\w+/.exec(modulePath)?.[0]?.toUpperCase(); // 模块名大写
        (files(modulePath)?.default || [])
          .forEach((module: ApiConfig) => {
            list.push(Object.assign({}, module, { moduleName: moduleName}));
          });
        return list;
      }, []
    );
};

const instance = createAxios({
  timeout: 5000
});
 
const configs = queryAllModules('.');

export default configs.reduce((modules: any, config) => {
  const apiName = `${config.moduleName}_${config.name}`;
  modules[apiName] = (obj: any, resetConfig?: AxiosRequestConfig<any>) => 
    ['POST', 'CANCELPOST'].includes(config.type.toUpperCase()) 
      ? instance[config.type](config.path, obj, resetConfig)
      : instance[config.type](config.path, obj);
  return modules;
}, {});