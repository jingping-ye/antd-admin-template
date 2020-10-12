<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-container">
        <h1 class="login-box-container_title">{{ title }}</h1>
        <h3 class="login-box-container_tip">登录账户</h3>
        <a-form-model
          layout="vertical"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          @submit="confirmSubmit"
          @submit.native.prevent
        >
          <a-form-model-item prop="userName">
            <a-input v-model="loginForm.userName" placeholder="请输入用户名" autocomplete="on">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input v-model="loginForm.password" type="password" placeholder="请输入密码" autocomplete="on">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" html-type="submit" block :loading="isLoading" :disabled="isLoading">
              {{ isLoading ? "登录中..." : "登 录" }}
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="login-box-footer">
        <span>忘记密码?</span>
        <span class="login-box-footer-account">注册账号</span>
      </div>
    </div>
  </div>
</template>
<script>
//  常量声明

//  设置
import { defaultSetting } from "@/setting";

//  token
import { setToken } from "@/utils/auth";
export default {
  name: "login",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      title: defaultSetting.title,
      loginRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur",
          },
          {
            max: 20,
            message: "用户名长度不能超过20个字符！",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "blur",
          },
          {
            max: 20,
            message: "密码长度不能超过20个字符！",
            trigger: "blur",
          },
        ],
      },
      isLoading: false,
      loginForm: {
        userName: "",
        password: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickMe() {
      // const _this = this;
      // console.log("genMenuList", genMenuList());
    },
    getMenuListRequestOri() {
      let menuList = [
        {
          path: "/system",
          name: "SystemManage",
          redirect: "/system/user",
          component: "@/layouts/index",
          meta: {
            title: "系统管理",
          },
          children: [
            {
              path: "user",
              name: "UserManage",
              component: "@/views/systemManage/userManage",
              meta: {
                title: "用户管理",
                goldPrice: true,
              },
            },
            {
              path: "permission",
              name: "PermissionManage",
              component: "@/views/systemManage/permissionManage",
              meta: {
                title: "权限管理",
              },
            },
          ],
        },
      ];
      return menuList;
    },
    getMenuListRequest() {
      let menuList = [
        {
          path: "/system",
          name: "SystemManage",
          redirect: "/system/user",
          component: (resolve) => require(["@/layouts/index.vue"], resolve),
          meta: {
            title: "系统管理",
          },
          children: [
            {
              path: "/system/user",
              name: "UserManage",
              component: (resolve) => require(["@/views/systemManage/userManage.vue"], resolve),
              meta: {
                title: "用户管理",
              },
            },
            {
              path: "/system/permission",
              name: "PermissionManage",
              component: (resolve) => require(["@/views/systemManage/permissionManage.vue"], resolve),
              meta: {
                title: "权限管理",
              },
            },
          ],
        },
      ];
      return menuList;
    },
    /**
     * 点击“登录”
     */
    confirmSubmit(e) {
      e.preventDefault();
      this.isLoading = true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.validateUserRequest();
        } else {
          this.isLoading = false;
        }
      });
    },
    genMenuList(menuList) {
      const newMenuList = menuList;
      const lazyLoad = (name) => {
        const componentName = name.replace("@/", "");
        return (resolve) => require([`@/${componentName}`], resolve);
        // if (type == 1) {
        //   return (resolve) => require([`@/${name}`], resolve);
        // } else {
        //   return (resolve) => require([`@/views/${name}`], resolve);
        // }
      };
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
    },
    /**
     * HTTP REQUEST
     * 验证用户
     */
    validateUserRequest() {
      setTimeout(() => {
        //  假设获取到合法的token
        setToken("1231312");
        this.$http
          .get("/menu/list")
          .then((res) => {
            console.log("res===", JSON.stringify(res));
            this.$store.commit("app/setMenuRouteLoaded", false);
            this.$store.commit("menu/setMenuList", []);
            const menuList = this.getMenuListRequestOri();
            // const menuList = res;
            // this.$store.commit("menu/setMenuList", menuList);
            const dynamicMenuList = this.genMenuList(menuList);
            // console.log("menuList1", this.getMenuListRequest());
            // console.log("dynamicMenuList", dynamicMenuList);
            // this.$router.options.routes.push(...dynamicMenuList);
            this.$router.addRoutes([...dynamicMenuList]);
            // this.$router.options.routes = [...this.$router.options.routes, ...dynamicMenuList];

            console.log("this.$router", this.$router);
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/feng");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }, 1000);
      this.isLoading = false;
    },
    // getMenuListRequest() {
    //   return this.$http.get("/menu/list");
    // },
    getAddressListRequest() {
      this.$http
        .get(`/api/address/list`, {
          params: {
            pageNum: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          console.log("res===", res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.$http.get("/menu/list").then((res) => {
      console.log("========", res);
    });
  },
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.login {
  min-height: 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(to right, #272838, #2b2d41, #393549, #433545);
}
.login-box {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  &-container {
    &_title {
      text-align: center;
    }
    &_tip {
      text-align: center;
    }
  }
  &-footer-account {
    float: right;
  }
}
.login-box-footer span {
  cursor: pointer;
  font-size: 12px;
}
.login-box-footer span:hover {
  color: #40a9ff;
}
</style>
