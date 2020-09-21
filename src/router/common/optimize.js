import Router from "vue-router";
/**
 * vue-router优化
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

/**
 * 新链接打开
 */
Router.prototype.newTab = function(routeObject) {
  const { href } = this.resolve(routeObject);
  window.open(href, "_blank");
};
