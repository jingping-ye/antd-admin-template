<template>
  <div class="editor">
    editor组件
    <MonacoEditor
      v-if="visible"
      height="300px"
      theme="vs"
      :value="value"
      language="python"
      :options="options"
      @blur="(e) => onBlur(e)"
    />
  </div>
</template>
<script>
//  常量声明
import MonacoEditor from "@/components/MonacoEditor";

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "editor",
  mixins: [],
  components: {
    MonacoEditor,
  },
  props: {},
  data() {
    return {
      visible: true,
      value: "12123",
      //  常量
      options: { fontSize: 18, minimap: { enable: false } },
      //  状态
      flag: true,
      //  变量
      list: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onBlur(value) {
      console.log("value", value);
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
.editor {
}
</style>
