<template>
  <div class="mul-tab" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <template v-for="(item, index) in tagList">
      <a-tag
        :key="item.name"
        :color="item.name === selectedTag ? '#108ee9' : ''"
        :closable="isClosable(item)"
        @close="closeTag(item, index)"
        @click="clickTag(item)"
      >
        <a-badge color="#fff" v-if="item.name === selectedTag" />{{ item.meta.title }}</a-tag
      >
    </template>
  </div>
</template>
<script>
// vuex
import { mapState, mapMutations } from "vuex";
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
export default {
  name: "MulTab",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      flag: true,

      //  变量
      fixedTag: ["UserManage"],
    };
  },
  computed: {
    ...mapState({
      tagList: (state) => state.app.tagList,
      selectedTag: (state) => state.app.selectedTag,
    }),
  },
  watch: {
    $route: {
      handler(newV) {
        const hasTag = this.tagList.filter((item) => item.name === newV.name).length > 0;
        if (!hasTag) {
          this.tagList.push(newV);
        }
        this.$store.commit("app/setSelectedTag", newV.name);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations({
      setTagList(commit, val) {
        commit("app/setTagList", val);
      },
    }),
    isClosable(item) {
      if (this.fixedTag.includes(item.name)) {
        return false;
      } else {
        return true;
      }
    },
    clickTag(item) {
      this.$store.commit("app/setSelectedTag", item.name);
      this.$router.replace({ name: item.name });
    },
    closeTag(item, index) {
      console.log("Hello World!", item);
      this.tagList.splice(index, 1);
      let selectedTag = "";
      if (index === this.tagList.length) {
        selectedTag = this.tagList[index - 1].name;
      } else {
        selectedTag = this.tagList[index].name;
      }
      this.$store.commit("app/setSelectedTag", selectedTag);
      this.$router.replace({ name: this.selectedTag });
    },
    onMouseEnter() {},
    onMouseLeave() {},
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
@import "@/styles/index.scss";
.mul-tab {
  padding: 5px;
  overflow: hidden;
  display: flex;
  @include scrollBarStyle;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.mul-tab:hover {
  overflow: auto;
  cursor: pointer;
}
.ant-tag:hover {
  cursor: pointer;
}
</style>
