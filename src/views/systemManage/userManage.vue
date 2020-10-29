<template>
  <div class="user-manage">
    名字：<a-input v-model="userInfo.name"></a-input> 年龄：<a-input v-model="userInfo.age"></a-input>
    <a-button type="primary" @click="clickMe">点击我</a-button>
    <svg-icon src="benefit" class="benefit-icon" />
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
export default {
  name: "userManage",
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
      list: [],
      listIdx: 0,
    };
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.userList[this.listIdx];
      },
      set(value) {
        const commitValue = {
          listIdx: this.listIdx,
          data: value,
        };
        this.$store.commit("setUserInfo", commitValue);
      },
    },
  },
  watch: {},
  methods: {
    clickMe() {
      console.log("userInfo", JSON.stringify(this.userInfo));
    },

    test() {
      console.log("Hello World!");
    },
  },
  filters: {},
  created() {},
  mounted() {
    console.log("======", this.$autoRegister);
  },
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.benefit-icon {
  color: #e9b242;
}
</style>
