<template>
  <div class="breadcrumb" v-if="isShowBreadcrumb">
    <a-breadcrumb separator="/">
      <a-breadcrumb-item v-for="route in navList" :key="route.path">
        <router-link :to="route.path">
          {{ route.meta.title }}
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      isShow: false,
      navList: [],
    };
  },
  computed: {},
  watch: {
    $route: {
      handler() {
        this.getNavList();
        this.isShowBreadcrumb();
      },
      immediate: true,
    },
  },
  methods: {
    isShowBreadcrumb() {
      if (this.$route.meta) {
        if (Object.prototype.hasOwnProperty.call(this.$route.meta, "breadcrumb") && !this.$route.meta.breadcrumb) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      } else {
        this.isShow = true;
      }
    },
    getNavList() {
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      this.navList = matched;
    },
  },
  filters: {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped></style>
