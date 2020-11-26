<template>
  <div class="l-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :key="key" />
      </keep-alive>
      <router-view :key="key" v-else />
    </transition>
  </div>
</template>
<script>
export default {
  name: "LMain",
  components: {},
  props: {},
  data() {
    return {
      excludeView: "",
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  watch: {
    $router: {
      handler(newV) {
        if (newV.meta) {
          if (Object.prototype.hasOwnProperty.call(newV.meta, "alive") && !newV.meta.alive) {
            this.excludeView = newV.name;
          }
        }
      },
    },
  },
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
