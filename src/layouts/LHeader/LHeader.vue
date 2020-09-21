// LHeader.vue
<template>
  <div class="l-header">
    <div class="l-header-left">{{ title }}</div>
    <div class="l-header-right">
      <span><a-icon type="search" style="font-size:18px;"/></span>
      <span><a-icon type="bell" style="font-size:18px;"/></span>
      <span>
        <img :src="defaultAvatar" class="user-avatar" />
        <a-dropdown>
          <span class="userName">{{ userName }}</span>
          <a-menu slot="overlay" @click="chooseSetting">
            <a-menu-item key="logout"> <a-icon type="logout" /> <span>退出登录</span></a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </div>
  </div>
</template>
<script>
//  常量声明

//  引入外部资源
import DefaultAvatar from "@/assets/default-avatar.svg";
import { defaultSetting } from "@/setting";
import { removeToken } from "@/utils/auth";
export default {
  name: "LHeader",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      defaultAvatar: DefaultAvatar,
      title: defaultSetting.title,
      userName: "admin",
    };
  },
  computed: {},
  watch: {},
  methods: {
    test() {
      console.log("Hello World!");
    },
    chooseSetting({ key }) {
      if (key === "logout") {
        removeToken();
        this.$router.push("/login");
      }
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.l-header {
  width: 100%;
  padding: 20px 15px;
  line-height: 20px;
  background: #2468a9;
  color: #fff;

  &-left {
    font-size: 25px;
    display: inline-block;
  }
  &-right {
    display: inline-block;
    float: right;
    > span {
      margin-left: 15px;
    }
  }
}
.user-avatar {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-right: 10px;
  vertical-align: bottom;
}
.userName {
  cursor: pointer;
}
</style>
