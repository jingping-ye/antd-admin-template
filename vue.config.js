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
    port: 8089,
    open: true,
    proxy: {
      "/proxy-service": {
        target: BaseURL,
        changeOrigin: true,
        pathRewrite: {
          "^/proxy-service": "/",
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

    // 清除svg默认配置对./src/icons文件夹的处理
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons")) // icons存放地（svg放的地方）
      .end();

    // 添加新的rule处理./src/icons文件夹的svg文件
    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["src/assets/icons"],
      })
      .end()
      .before("svg-sprite-loader")
      .use("svgo-loader")
      .loader("svgo-loader")
      .options({
        plugins: [{ removeAttrs: { attrs: "path:fill" } }],
      })
      .end();
  },
  configureWebpack: {
    externals: isProduction ? cdn.externals : {},
  },
  productionSourceMap: false,
  runtimeCompiler: true,
};

module.exports = vueConfig;
