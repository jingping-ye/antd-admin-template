import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import { beforeRouterHook, afterRouterHook } from "./common/routerHook";

import "./common/optimize";

import { businessRoutes } from "./modules/index";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/feng",
    name: "Feng",
    redirect: "/system/user",
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/exception/404"),
  },
  ...businessRoutes,
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(beforeRouterHook);
router.afterEach(afterRouterHook);

export default router;
