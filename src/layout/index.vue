<template>
  <div class="layout">
    <header class="layout-header fixed box">头部</header>
    <div class="layout-container box">
      <div class="menu-sidebar">
        <div class="main-container scrollable">
          左侧菜单栏
        </div>
      </div>
      <div class="content">右侧内容区</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="less" scoped>
@header-height: 70px;
@menu-sidebar-width: 200px;
.layout {
  background: #edf1f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  width: 100vw;
  background: #fff;
  line-height: @header-height;
  box-shadow: 2px 5px 5px #e0e0e0;
}

.layout-container {
  padding-top: @header-height;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
}
.menu-sidebar {
  background-color: #fff;
  box-shadow: 2px 2px 5px #e0e0e0;
  width: @menu-sidebar-width;
}
.main-container {
  height: calc(100vh - @header-height);
  position: fixed;
  top: @header-height;
  width: @menu-sidebar-width;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.scrollable {
  overflow-y: auto;
  overflow-x: hide;
}
</style>
