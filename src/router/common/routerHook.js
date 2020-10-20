import { message } from "ant-design-vue";
import { getToken } from "@/utils/auth";
import { getPageTitle } from "./getPageTitle";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//  进度条配置
NProgress.configure({ showSpinner: false });

//  白名单列表（无需登录），使用router的name限制
const whiteList = ["NotFound", "Login"];

/**
 * 路由跳转前钩子
 */
const beforeRouterHook = async function(to, from, next) {
  NProgress.start();

  document.title = getPageTitle(to.meta.title);

  const token = getToken();
  if (token && token.length > 0) {
    next();
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      next();
    } else {
      message.error("请先登录后再操作!");
      next({ path: "/", query: { redirect: to.path } });
      NProgress.done();
    }
  }
};

/**
 * 路由跳转后的钩子
 */
const afterRouterHook = async function() {
  NProgress.done();
};

export { beforeRouterHook, afterRouterHook };
