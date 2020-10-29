<template>
  <div class="user-manage">
    名字：<a-input v-model="userInfo.name"></a-input> 年龄：<a-input v-model="userInfo.age"></a-input>
    <a-button type="primary" @click="clickMe">点击我</a-button>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
// import { mapState } from "vuex";
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
    // ...mapState({
    //   userInfo: (state) => {
    //     console.log("this===", this);
    //     state.userList[this.listIdx];
    //   },
    // }),
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
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
.user-manage {
}
</style>
