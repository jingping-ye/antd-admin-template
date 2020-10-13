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
    /**
     * HTTP REQUEST
     * 验证用户
     */
    validateUserRequest() {
      setTimeout(() => {
        //  假设获取到合法的token
        setToken("1231312");
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push("/feng");
        }
      }, 1000);
      this.isLoading = false;
    },
  },
  filters: {},
  created() {},
  mounted() {},
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
