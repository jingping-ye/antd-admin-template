/**
 * axios请求封装
 */
import axios from "axios";
import { message } from "ant-design-vue";
import { jsonToHump, jsonToUnderline } from "./httpFormTran";
import { getToken, removeToken } from "@/utils/auth";

const isProxy = process.env.VUE_APP_API_PROXY === "1";
const isMock = process.env.VUE_APP_API_MOCK === "1";
console.log("当前是否处于代理服务器下：", isProxy);
console.log("是否开启mock", isMock);

// console.log("process", vueCo);
let BaseURL = process.env.VUE_APP_API_BASE_URL;
if (isProxy) {
  BaseURL = "/proxy-service";
} else {
  BaseURL = "";
}
const Timeout = 5000; // 超时时间
const NormalCode = 4000; // 从后台正常返回的代码
const ErrorMessage = (msg) => {
  message.error(msg, 5);
}; // 错误信息提示

let httpInstance = axios.create({
  baseURL: BaseURL,
  timeout: Timeout,
});

//  请求表单
httpInstance.formdata = (url, data, config) => {
  return httpInstance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
    ...config,
  });
};

//  请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //  转换post请求数据
    if (config.data && Object.keys(config.data).length > 0) {
      config.data = jsonToUnderline(config.data);
    }

    //  转换query请求参数
    if (config.params && Object.keys(config.params).length > 0) {
      config.params = jsonToUnderline(config.params);
    }

    //  添加头部信息
    config.headers["Content-Type"] = "application/json;charset=UTF-8";

    //  添加token
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    console.log("request", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  响应拦截器
httpInstance.interceptors.response.use(
  (response) => {
    console.log("response", JSON.stringify(response));
    if (response.status === 200) {
      if (response.data.code) {
        //  处理正常json格式文件
        response.data = jsonToHump(response.data); // 转为小驼峰
        if (response.data.code === NormalCode) {
          return Promise.resolve(response.data.errMsg);
        } else {
          ErrorMessage(`错误(错误代码${response.data.code}):${response.data.errMsg}`);
          return Promise.reject(new Error("请求失败"));
        }
      } else {
        //  处理文件流
        return Promise.resolve(response.data);
      }
    } else {
      console.log(response);
    }
  },
  (error) => {
    if (error.response) {
      const resStatus = error.response.status.toString();
      if (resStatus === "401") {
        ErrorMessage(`token验证失败，请重新登录!`);
        removeToken();
        location.reload();
      } else if (resStatus.startsWith("5")) {
        ErrorMessage(`服务器繁忙中，请稍后再试！`);
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    } else {
      ErrorMessage(`网络出错啦，请求失败！`);
      return Promise.reject(error);
    }
  }
);
export default httpInstance;
