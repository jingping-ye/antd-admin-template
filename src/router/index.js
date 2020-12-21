import Vue from "vue";
import VueRouter from "vue-router";
import { businessRoutes } from "./module/index";
Vue.use(VueRouter);

const routes = [
  {
    name: "layout",
    path: "/layout",
    component: () => import("@/layout/index"),
  },
  {
    name: "MainLayout",
    path: "/main-layout",
    component: () => import("@/layout/mainLayout"),
  },
  {
    name: "test",
    path: "/test",
    component: () => import("@/views/chart/bar/bar"),
  },
  {
    name: "Home",
    path: "/",
    redirect: "/editor/index",
  },
  ...businessRoutes,
];

const router = new VueRouter({
  routes,
});

export default router;
