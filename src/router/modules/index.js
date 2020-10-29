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
          icon: "user",
        },
      },
      {
        path: "permission",
        name: "PermissionManage",
        component: () => import("@/views/systemManage/permissionManage"),
        meta: {
          title: "权限管理",
          icon: "benefit",
        },
      },
      {
        path: "/e-table",
        name: "ETable",
        component: () => import("@/views/eTable/eTable"),
        meta: {
          title: "可扩展表格",
        },
      },
      {
        path: "/e-table2",
        name: "ETable2",
        component: () => import("@/views/eTable/eTable2"),
        meta: {
          title: "可扩展表格2",
        },
      },
    ],
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("@/views/editor/editor"),
    meta: {
      title: "编辑器",
    },
  },
];

export { businessRoutes };
