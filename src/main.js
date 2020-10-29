import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//  ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

//  http请求
import http from "@/utils/http";
Vue.prototype.$http = http;

//  normal css
import "normalize.css/normalize.css";

//  global css
import "@/styles/index.scss";

//  mock
import "./mock";

//  vxeTable
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import * as autoRegister from "./autoRegister";

Vue.prototype.$autoRegister = autoRegister;

Vue.use(VXETable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
