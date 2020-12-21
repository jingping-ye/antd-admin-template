<template>
  <div class="test">
    <DebugggerArea></DebugggerArea>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
import DebugggerArea from "@/components/DebuggerArea/DebuggerArea";
export default {
  name: "Test",
  mixins: [],
  components: {
    DebugggerArea,
  },
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
    clickMe() {
      console.log("Hello World!");
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
