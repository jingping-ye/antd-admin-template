<template>
  <div class="sidebar">
    <a-menu
      style="width:200px;"
      class="menu"
      mode="inline"
      theme="dark"
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
    >
      <template v-for="route in routes">
        <template v-if="!route.meta.hide">
          <a-menu-item v-if="isHasNoShowChild(route.children)" :key="comPath(route.path)">
            <router-link :to="{ path: comPath(route.path) }">
              <template v-if="route.meta.icon">
                <svg-icon
                  :name="route.meta.icon"
                  v-if="isExternalIcon(route.meta.icon)"
                  class="external-icon selected"
                ></svg-icon>
                <a-icon :type="route.meta.icon" v-else />
              </template>

              <span>{{ route.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <l-sidebar-item v-else :menu-info="route" :key="route.path" :base-url="comPath(route.path)"></l-sidebar-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import LSidebarItem from "./LSidebarItem.js";
import { businessRoutes } from "../../router/modules/index";
export default {
  name: "sidebar",
  mixins: [],
  components: {
    LSidebarItem,
  },
  props: {},
  data() {
    return {
      //  常量
      //  状态
      moduleBaseUrl: businessRoutes[0].path,
      flag: true,
      openKeys: [],
      selectedKeys: [],
    };
  },
  computed: {
    /**
     * 路由
     */
    routes: function() {
      return businessRoutes[0].children;
    },
    //  routes: (state) => state.app.menuList[0].children
  },
  watch: {
    $route: {
      handler(newV) {
        this.selectedKeys = [newV.path];
        if (newV.matched.length > 0) {
          this.openKeys = newV.matched.map((item) => item.path);
        }
      },
      immediate: true,
    },
  },
  methods: {
    isExternalIcon(iconName) {
      const svgIcon = this.$autoRegister.svgIcon;
      return svgIcon.includes(iconName);
    },
    comPath(path) {
      if (path.startsWith("/")) {
        return path;
      } else {
        return `${this.moduleBaseUrl}/${path}`;
      }
    },
    /***
     * 判断是否无显示的子路由
     */
    isHasNoShowChild(children) {
      if (!children) {
        return true;
      }

      const showChildRoute = children.filter((item) => !(item.meta && item.meta.hide));
      if (showChildRoute.length === 0) {
        return true;
      }

      return false;
    },
  },
  filters: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.menu {
  min-height: calc(100vh - 65px);
  height: 100%;
}
.external-icon {
  margin-right: 10px;
}
.ant-menu-item-selected .selected {
  color: #e9b242;
}
</style>
