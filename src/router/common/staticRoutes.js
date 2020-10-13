const staticRoutes = [
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
];

export { staticRoutes };
