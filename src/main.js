import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
Vue.use(Antd);

// import default theme
import "@/theme/default.less";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
