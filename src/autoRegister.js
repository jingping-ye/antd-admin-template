/*
 * @Author: jingping.ye@kingstarfintech.com
 * @Email: jingping.ye@kingstarfintech.com
 * @Date: 2020-10-29 17:29:38
 * @Last Modified by: jingping.ye@kingstarfintech.com
 * @Last Modified time: 2020-10-29 17:55:43
 * @Description: 自动注册:包括svgIcon和Vue全局组件
 */

import Vue from "vue";

let svgIcon = [];
let globalComp = [];

// 自动注册Svg图标
const scanAllSvgIconFunc = require.context("@/assets/icons/", false, /\.svg$/);
scanAllSvgIconFunc.keys().forEach((svgIconPath) => {
  const icon = scanAllSvgIconFunc(svgIconPath);
  const iconName = icon.default.id.replace("icon-", "");
  svgIcon.push(iconName);
  return icon;
});

// 自动注册Vue全局组件
const scanAllGlobalCompFunc = require.context("@/components/", true, /\.vue$/);
scanAllGlobalCompFunc.keys().forEach((singleCompPath) => {
  const comp = scanAllGlobalCompFunc(singleCompPath);
  Vue.component(comp.default.name, comp.default);
  globalComp.push(comp.default.name);
});

export { svgIcon, globalComp };
