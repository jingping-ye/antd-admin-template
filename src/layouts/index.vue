<template>
  <div class="lay-out">
    <l-header />
    <div class="lay-out-body">
      <l-sidebar class="l-sidebar" />
      <div class="main-box">
        <Breadcrumb />
        <div class="main-container">
          <l-main />
        </div>
        <l-footer />
      </div>
    </div>
  </div>
</template>
<script>
//  layout component
import LHeader from "./LHeader/LHeader";
import LSidebar from "./LSidebar/LSidebar";
import LMain from "./LMain/LMain";
import LFooter from "./LFooter/LFooter";

//  common component
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb";

export default {
  name: "Layout",
  mixins: [],
  components: {
    LHeader,
    LSidebar,
    LMain,
    LFooter,
    Breadcrumb,
  },
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
<style lang="scss" scoped>
.lay-out-body {
  height: 100%;
  display: flex;
}
</style>
