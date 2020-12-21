<template>
  <div :class="!isCollapsed ? 'layout-aside-menu-show-width' : ''">
    <a-menu mode="inline" :inline-collapsed="isCollapsed">
      <template v-for="route in businessRoutes">
        <a-menu-item v-if="!isHasValidChildren(route.children)" :key="route.name">
          <router-link :to="{ path: route.path }">
            <a-icon :type="route.meta.icon" v-if="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="route.name" :menu-info="route" :base-url="route.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { businessRoutes } from "@/router/module/index.js";
import { mapState } from "vuex";
export default {
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      businessRoutes,
      collapsed: false,
    };
  },
  computed: {
    ...mapState({
      isCollapsed: (state) => state.app.isCollapsed,
    }),
  },
  methods: {
    isHasValidChildren(children) {
      if (children && children.length > 0) {
        const showRoute = children.filter((item) => !(item.meta && item.meta.hide));
        if (showRoute.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
</script>
