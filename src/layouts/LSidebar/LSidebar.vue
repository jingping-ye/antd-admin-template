<template>
  <div class="sidebar">
    <a-menu style="width:200px;" class="menu" mode="inline" :selectedKeys="selectedKeys" :openKeys.sync="openKeys">
      <template v-for="route in routes">
        <template v-if="!route.meta.hide">
          <a-menu-item v-if="isHasNoShowChild(route.children)" :key="route.path">
            <router-link :to="{ path: route.path }">
              <a-icon :type="route.meta.icon" v-if="route.meta.icon" />
              <span>{{ route.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <l-sidebar-item v-else :menu-info="route" :key="route.path" :base-url="route.path"></l-sidebar-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import LSidebarItem from "./LSidebarItem.js";
import { businessRoutes } from "@/router/modules/index.js";
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
      businessRoutes,
      //  状态
      flag: true,
      openKeys: [],
      selectedKeys: [],
    };
  },
  computed: {
    /**
     * 路由
     */
    routes() {
      return this.businessRoutes;
    },
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
    test() {
      console.log("Hello World!");
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.menu {
  min-height: calc(100vh - 65px);
  height: 100%;
}
</style>
