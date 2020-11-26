import Mock from "mockjs";

Mock.setup({
  timeout: "300 - 600",
});

//   用户权限
Mock.mock("/user/perm", {
  code: 4000,
  data: [],
});

Mock.mock("/empty_strategy", () => {
  const data = `# coding=utf-8
from __future__ import print_function, absolute_import
from gm.api import *

# 策略中必须有init方法
def init(context):
    pass

if __name__ == '__main__':
    run(strategy_id='strategy_id',
        filename='main.py',
        mode=MODE_BACKTEST,
        token='token_id',
        backtest_start_time='2016-06-17 13:00:00',
        backtest_end_time='2017-08-21 15:00:00')`;
  return {
    code: 4000,
    errMsg: data,
  };
});

//   菜单列表
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
        {
          path: "/editor",
          name: "Editor",
          component: "/views/editor/editor",
          meta: {
            title: "编辑器",
            breadcrumb: false,
          },
        },
        {
          path: "/chart",
          name: "Chart",
          component: "/layouts/TransitionRouter/TransitionRouter.vue",
          redirect: "/chart1",
          meta: {
            title: "图表",
          },
          children: [
            {
              path: "/chart1",
              name: "Chart1",
              component: "/views/chart/chart1",
              meta: {
                title: "图表1",
              },
            },
            {
              path: "/down",
              name: "DownChart",
              component: "/views/chart/downChart",
              meta: {
                title: "道琼斯指数",
              },
            },
            {
              path: "/profit",
              name: "Profit",
              component: "/views/chart/profit",
              meta: {
                title: "策略收益图",
              },
            },
          ],
        },
        {
          path: "/file",
          name: "File",
          component: "/views/file/file",
          meta: {
            title: "文件上传与下载",
            breadcrumb: false,
          },
        },
      ],
    },
  ],
});
