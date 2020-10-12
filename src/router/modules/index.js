const businessRoutes = [
  {
    path: "/system",
    name: "SystemManage",
    redirect: "/system/user",
    component: () => import("@/layouts/index"),
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "user",
        name: "UserManage",
        component: () => import("@/views/systemManage/userManage"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "permission",
        name: "PermissionManage",
        component: () => import("@/views/systemManage/permissionManage"),
        meta: {
          title: "权限管理",
        },
      },
    ],
  },
];

export { businessRoutes };
