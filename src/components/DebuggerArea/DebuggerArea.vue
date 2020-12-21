<template>
  <div class="debugger-area">
    <a-button
      type="primary"
      icon="setting"
      v-if="!isShowDebuggerPanel"
      @click="showDebuggerPanel"
      class="open-debugger-btn"
    />
    <div v-if="isShowDebuggerPanel">
      <a-drawer
        :maskClosable="false"
        title="调试区域"
        :mask="false"
        :visible="isShowDebuggerPanel"
        @close="closeDebugggerPanel"
      >
        <div>调试区</div>
        <div><a-button type="primary" @click="printStore">输出缓存</a-button></div>
      </a-drawer>
    </div>
  </div>
</template>
<script>
export default {
  name: "DebuggerArea",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      isShowDebuggerPanel: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    printStore() {
      console.log("this.$store", this.$store);
    },
    showDebuggerPanel() {
      this.isShowDebuggerPanel = true;
    },
    closeDebugggerPanel() {
      this.isShowDebuggerPanel = false;
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="less" scoped>
.open-debugger-btn {
  width: 50px;
  height: 50px;
  border: 5px;
  ::v-deep .anticon-setting {
    font-size: 18px;
  }
  position: absolute;
  top: 20%;
  right: 0;
  z-index: 999;
}
</style>
