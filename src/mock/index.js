import Mock from "mockjs";

Mock.setup({
  timeout: "300 - 600",
});

Mock.mock("/user/perm", {
  code: 4000,
  data: [],
});

Mock.mock("/menu/list", {
  code: 4000,
  errMsg: [
    {
      path: "/system",
      name: "SystemManage",
      redirect: "/system/user",
      component: "/layouts/index",
      meta: {
        title: "系统管理",
      },
      children: [
        {
          path: "/system/user",
          name: "UserManage",
          component: "/views/systemManage/userManage",
          meta: {
            title: "用户管理",
          },
        },
        {
          path: "/system/permission",
          name: "PermissionManage",
          component: "/views/systemManage/permissionManage",
          meta: {
            title: "权限管理",
          },
        },
      ],
    },
  ],
});
