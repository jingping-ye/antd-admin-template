import Mock from "mockjs";

Mock.setup({
  timeout: "300 - 600",
});

//   用户权限
Mock.mock("/user/perm", {
  code: 4000,
  errMsg: [],
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
          path: "/log",
          name: "Log",
          component: "/views/log/log",
          meta: {
            title: "日志",
            breadcrumb: false,
          },
        },
      ],
    },
  ],
});

Mock.mock("/log/list", {
  code: 4000,
  errMsg: [
    "2019-01-01 00:00:00 - INFO  - 初始函数开始运行且全局只运行一次",
    "2019-01-02 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-02 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-02 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-02 15:30:00 - INFO  - 一天结束",
    "2019-01-02 15:30:00 - INFO  - ##############################################################",
    "2019-01-03 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-03 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-03 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount/price/avg_cost/acc_avg_cost 都是 0",
    "2019-01-03 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-03 15:30:00 - INFO  - 一天结束",
    "2019-01-03 15:30:00 - INFO  - ##############################################################",
    "2019-01-04 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-04 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-04 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount/price/avg_cost/acc_avg_cost 都是 0",
    "2019-01-04 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-04 15:30:00 - INFO  - 一天结束",
    "2019-01-04 15:30:00 - INFO  - ##############################################################",
    "2019-01-07 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-07 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-07 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-07 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 10100: Order(security=000001.XSHE mode=OrderValue: _value=100000.0 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-07 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640244 security=000001.XSHE mode=OrderValue: _value=100000.0 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-07 09:30:00 error=)",
    "2019-01-07 09:30:00 - INFO  - 下单检查标的数量：StockOrder(entrust_id=1602640244 security=000001.XSHE mode=OrderValue: _value=100000.0 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-07 09:30:00 error=开仓数量必须是 100 的整数倍，调整为 10100)",
    "2019-01-07 09:30:00 - INFO  - order StockOrder(entrust_id=1602640244 security=000001.XSHE mode=OrderValue: _value=100000.0 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-07 09:30:00 error=开仓数量必须是 100 的整数倍，调整为 10100) trade price: 9.85, amount:10100, commission: 29.845499999999998",
    "2019-01-07 09:30:00 - INFO  - 订单已委托：StockOrder(entrust_id=1602640244 security=000001.XSHE mode=OrderValue: _value=100000.0 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-07 09:30:00 error=开仓数量必须是 100 的整数倍，调整为 10100)",
    "2019-01-07 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-07 15:30:00 - INFO  - 成交记录：UserTrade({'trade_id': 1602640244, 'order_id': 1602640244, 'time': datetime.datetime(2019, 1, 7, 9, 30), 'amount': 10100, 'price': 9.85})",
    "2019-01-07 15:30:00 - INFO  - 一天结束",
    "2019-01-07 15:30:00 - INFO  - ##############################################################",
    "2019-01-08 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-08 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-08 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-08 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-08 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640245 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-08 09:30:00 error=)",
    "2019-01-08 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640245 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-08 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-08 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-08 15:30:00 - INFO  - 一天结束",
    "2019-01-08 15:30:00 - INFO  - ##############################################################",
    "2019-01-09 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-09 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-09 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-09 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-09 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640246 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-09 09:30:00 error=)",
    "2019-01-09 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640246 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-09 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-09 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-09 15:30:00 - INFO  - 一天结束",
    "2019-01-09 15:30:00 - INFO  - ##############################################################",
    "2019-01-10 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-10 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-10 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-10 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-10 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640247 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-10 09:30:00 error=)",
    "2019-01-10 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640247 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-10 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-10 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-10 15:30:00 - INFO  - 一天结束",
    "2019-01-10 15:30:00 - INFO  - ##############################################################",
    "2019-01-11 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-11 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-11 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-11 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-11 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640248 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-11 09:30:00 error=)",
    "2019-01-11 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640248 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-11 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-11 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-11 15:30:00 - INFO  - 一天结束",
    "2019-01-11 15:30:00 - INFO  - ##############################################################",
    "2019-01-14 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-14 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-14 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-14 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-14 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640249 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-14 09:30:00 error=)",
    "2019-01-14 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640249 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-14 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-14 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-14 15:30:00 - INFO  - 一天结束",
    "2019-01-14 15:30:00 - INFO  - ##############################################################",
    "2019-01-15 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-15 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-15 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-15 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-15 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640250 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-15 09:30:00 error=)",
    "2019-01-15 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640250 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-15 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-15 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-15 15:30:00 - INFO  - 一天结束",
    "2019-01-15 15:30:00 - INFO  - ##############################################################",
    "2019-01-16 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-16 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-16 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-16 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-16 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640251 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-16 09:30:00 error=)",
    "2019-01-16 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640251 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-16 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-16 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
    "2019-01-16 15:30:00 - INFO  - 一天结束",
    "2019-01-16 15:30:00 - INFO  - ##############################################################",
    "2019-01-17 09:00:00 - INFO  - 函数运行时间(before_market_open)：09:00:00",
    "2019-01-17 09:30:00 - INFO  - 函数运行时间(market_open):09:30:00",
    "2019-01-17 09:30:00 - INFO  - 价格高于均价 1%, 买入 000001.XSHE",
    "2019-01-17 09:30:00 - INFO  - 开仓数量必须是100的整数倍，调整为 0: Order(security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long margin=False entrust_time=None)",
    "2019-01-17 09:30:00 - INFO  - 订单已提交：StockOrder(entrust_id=1602640252 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=close margin=False entrust_time=2019-01-17 09:30:00 error=)",
    "2019-01-17 09:30:00 - ERROR - 订单委托失败：StockOrder(entrust_id=1602640252 security=000001.XSHE mode=OrderValue: _value=485.1545 style=MarketOrderStyle: _limit_price=0.0 side=long action=open margin=False entrust_time=2019-01-17 09:30:00 error=开仓数量不能小于 100)",
    "2019-01-17 15:30:00 - INFO  - 函数运行时间(after_market_close):15:30:00",
  ],
});
