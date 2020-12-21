<template>
  <div class="main-layout">
    <LHeader />
    <div class="layout-container">
      <aside
        class="layout-aside"
        :class="!isCollapsed ? 'layout-aside-menu-show-width' : 'layout-aside-menu-hide-width'"
      >
        <div class="layout-aside__fixed layout-aside-menu layout-aside-menu__scroll">
          <Menu />
        </div>
      </aside>
      <div class="layout-content">
        <div>
          <div>页签区</div>
          <div>
            <div>面包屑区</div>
            <router-view></router-view>
          </div>
        </div>
      </div>
      <LFooter />
    </div>
  </div>
</template>
<script>
import LHeader from "./LHeader/LHeader.vue";
import LFooter from "./LFooter/LFooter";
import Menu from "./Menu/Menu";

import { mapState } from "vuex";
export default {
  name: "MainLayout",
  mixins: [],
  components: {
    LHeader,
    Menu,
    LFooter,
  },
  props: {},
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapState({
      isCollapsed: (state) => state.app.isCollapsed,
    }),
  },
  watch: {},
  methods: {},
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
