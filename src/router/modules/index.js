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
      {
        path: "/mul-tab",
        name: "MulTab",
        component: () => import("@/views/mulTab/mulTab"),
        meta: {
          title: "多页签切换",
        },
      },
      {
        path: "/input-field",
        name: "InputField1",
        component: () => import("@/views/inputField/inputField"),
        meta: {
          title: "输入区1",
          alive: false,
        },
      },
      {
        path: "/input-field2",
        name: "InputField2",
        component: () => import("@/views/inputField/inputField2"),
        meta: {
          title: "输入区2",
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
