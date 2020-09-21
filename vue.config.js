console.log("当前环境：", process.env.NODE_ENV);
console.log("当前基础API：", process.env.VUE_APP_API_BASE_URL);

const isProduction = process.env.NODE_ENV === "production";
const BaseURL = process.env.VUE_APP_API_BASE_URL; // 基础路径;

const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

const cdn = {
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    moment: "moment",
    "ant-design-vue": "antd",
  },
  css: [],
  js: [
    "//cdn.bootcss.com/vue/2.6.11/vue.min.js",
    "//cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js",
    "//cdn.bootcss.com/vuex/3.1.3/vuex.min.js",
    "//cdn.bootcss.com/axios/0.19.2/axios.min.js",
    "//cdn.jsdelivr.net/npm/moment@2.26.0/min/moment.min.js",
    "//cdn.jsdelivr.net/npm/ant-design-vue@1.6.0/dist/antd.min.js",
  ],
};

const vueConfig = {
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      "/api": {
        target: BaseURL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  chainWebpack: (config) => {
    //  生产环境注入CDN
    if (isProduction) {
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }

    //  别名
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@comp", resolve("./src/components"))
      .set("@assets", resolve("./src/assets"))
      .set("@layouts", resolve("./src/layouts"))
      .set("@api", resolve("./src/api"))
      .set("@router", resolve("./src/router"))
      .set("@store", resolve("./src/store"))
      .set("@styles", resolve("./src/styles"))
      .set("@uitls", resolve("./src/utils"))
      .set("@views", resolve("./src/views"));
  },
  configureWebpack: {
    externals: isProduction ? cdn.externals : {},
  },
  productionSourceMap: false,
  runtimeCompiler: true,
};

module.exports = vueConfig;
