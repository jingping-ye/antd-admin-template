import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import { afterRouterHook } from "./common/routerHook";

import "./common/optimize";

import { staticRoutes } from "./common/staticRoutes";
import { businessRoutes } from "./modules/index";

const router = new VueRouter({
  routes: [...staticRoutes, ...businessRoutes],
});

// router.beforeEach((to, from, next) => beforeRouterHook(to, from, next, router));
router.afterEach(afterRouterHook);

router._addRoutes = function(params) {
  router.matcher = new VueRouter({ routes: staticRoutes }).matcher;
  router.addRoutes(params);
};

export default router;
