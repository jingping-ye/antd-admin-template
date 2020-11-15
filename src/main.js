import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//  ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//  echart
import echarts from "echarts";

Vue.prototype.$echarts = echarts;

Vue.use(Antd);

//  http请求
import http from "@/utils/http";
Vue.prototype.$http = http;

//  moment
import moment from "moment";

Vue.prototype.$moment = moment;

//  normal css
import "normalize.css/normalize.css";

//  global css
import "@/styles/index.scss";

//  mock
// import "./mock";

import CMessage from "@/components/CMessage";
Vue.use(CMessage);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
