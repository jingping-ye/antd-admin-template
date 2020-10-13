import http from "../../utils/http";
import store from "../../store";

/**
 * 组成可用菜单列表
 * @param {Array} menuList 从后台获取的菜单信息
 */
const formMenuList = function(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList));

  //  懒加载引入
  const lazyLoad = (name) => {
    const componentName = name.replace("/", "");
    return (resolve) => require([`@/${componentName}`], resolve);
  };

  //  循环遍历菜单
  const getTree = function(nodeList) {
    nodeList.map((item) => {
      if (item.component) {
        item["component"] = lazyLoad(item.component, item.meta.type);
      }
      if (item.children) {
        getTree(item.children);
      }
      return item;
    });
  };

  getTree(newMenuList);

  return newMenuList;
};

/**
 * 设置动态路由
 */
const setDaynamicRoutes = async function(router, to, next) {
  http
    .get("/menu/list")
    .then((res) => {
      let menuList = JSON.parse(JSON.stringify(res));
      let dynamicMenuList = formMenuList(menuList);
      store.commit("app/setMenuList", menuList);
      dynamicMenuList.push({
        path: "*",
        name: "NotFound",
        component: () => import("@/views/exception/404"),
        meta: {
          title: "找不到页面",
        },
      });
      router._addRoutes(dynamicMenuList);
      next({ ...to, replace: true });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export { setDaynamicRoutes };
