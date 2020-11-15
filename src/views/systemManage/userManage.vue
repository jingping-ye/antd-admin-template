<template>
  <div class="user-manage">
    userManage组件
    <div id="test-text">1231</div>
    <a-space>
      <a-button @click="printSource">输出源码</a-button>
      <a-button @click="printExtend">输出extend后的代码</a-button>
      <a-button type="primary" @click="printNew">输出new过后的代码</a-button>
    </a-space>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };
import testTest from "./testText";
import Vue from "vue";

//  引入外部资源
// import someThing from 'SomeThing';
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    printSource() {
      console.log("source", testTest);
    },
    printExtend() {
      //   ƒ VueComponent (options) {
      //   this._init(options);
      // }
      console.log("extend", Vue.extend(testTest).prototype);
    },
    printNew() {
      let what = Vue.extend({
        ...testTest,
        data: function() {
          return {
            text: "事实上罗",
            params2: "试一试",
          };
        },
      }); // 创建一个组件类，声明或者创建
      const instance = new what(); // 实例化组件
      console.log("instance", instance);
      instance.text = "我修改了实例";
      instance.$mount("#test-text");
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
