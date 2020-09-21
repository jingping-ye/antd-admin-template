<template>
  <div class="l-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>
<script>
export default {
  name: "LMain",
  components: {},
  props: {},
  computed: {
    key() {
      return this.$route.path;
    },
  },
  watch: {},
  methods: {},
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
.l-main {
  min-height: calc(100vh - 190px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
