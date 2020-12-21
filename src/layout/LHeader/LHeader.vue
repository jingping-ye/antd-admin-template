<template>
  <header class="layout-header layout-header__fixed">
    <div class="layout-header-menu"><a-icon type="menu" style="font-size:20px;" @click="switchCollapsed" /></div>
    <div class="layout-header-title"><div>风车后台管理系统</div></div>
    <div class="layout-header-nav">
      <a-dropdown>
        <div>
          <a-icon type="user" />
          <span class="nickname">admin</span>
        </div>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">用户设置</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  name: "LHeader",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    switchCollapsed() {
      this.$store.commit("app/setIsCollapsed", !this.$store.state.app.isCollapsed);
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
