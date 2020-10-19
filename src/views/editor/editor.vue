<template>
  <div class="editor">
    <div>只读状态</div>
    <MonacoEditor
      v-if="visible"
      height="300px"
      theme="vs"
      :value="value"
      language="python"
      :options="options"
      @blur="(e) => onBlur(e)"
    />
    <div>
      编辑状态
    </div>
    <div>
      <MonacoEditor
        v-if="visible"
        height="1000px"
        theme="vs-dark"
        :value="value"
        language="python"
        :options="editOptions"
        @blur="(e) => onBlur(e)"
      />
    </div>
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
      value: "",
      //  常量
      options: { fontSize: 14, minimap: { enable: false }, readOnly: true, lineNumbers: false },
      editOptions: { fontSize: 14, minimap: { enable: false } },
      //  状态
      flag: true,
      //  变量
      list: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getStrategyRequest() {
      this.$http
        .get("/empty_strategy")
        .then((res) => {
          this.value = res;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    onBlur(value) {
      console.log("value", value);
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.getStrategyRequest();
  },
  destoryed() {},
};
</script>
<style scoped>
.editor {
}
</style>
