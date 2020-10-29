<template>
  <div class="e-table">
    <TestComp ref="testComp" />
    <a-button type="primary" @click="refCall">ref调用函数</a-button>
    <a-button @click="addColumn" style="margin-bottom:10px">增加变量列</a-button>
    <a-button @click="logColumn">输出列</a-button>
    <a-button @click="logTableData">输出数据</a-button>
    <vxe-grid
      border
      resizeable
      show-overflow
      keep-source
      auto-resize
      :columns="tableColumn"
      :data="tableList"
      :mouse-config="{ selected: true }"
      :edit-config="{ trigger: 'click', mode: 'row', showStatus: true, icon: 'fa fa-file-text-o' }"
      :keyboard-config="{
        isArrow: true,
        isDel: true,
        isEnter: true,
        isTab: true,
        isEdit: true,
      }"
    >
      <template v-slot:empty>
        <div style="padding-top:30px;padding-bottom:30px;">
          <p>暂无数据</p>
          <p>
            <a-button type="primary" @click="addRow(-1)">添加数据集</a-button>
          </p>
        </div>
      </template>
      <template v-for="(paramTitle, paramName) in paramNameList" v-slot:[paramName]="{ column }">
        <div :key="paramName">
          <span>{{ paramTitle }} {{ column.title }}</span>
        </div>
      </template>
      <!-- <template v-for="(paramTitle, paramName) in paramNameList">
        <template v-for="(paramTitle, paramName) in paramNameList" v-slot:[paramName]="{ column }">
          <div :key="paramName">
            <span>{{ paramTitle }}</span>
          </div>
        </template>
      </template> -->
      <!-- <template v-slot:name_header="{ column }">
        <span>{{ column.title }}</span>
        <a-input v-model="column.title"> </a-input>
      </template> -->
      <template v-slot:opt="{ row, rowIndex }">
        <span>
          <a-icon type="file-add" @click="addRow(rowIndex)"></a-icon>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm title="是否要删除该条数据？" @confirm="delRow(rowIndex, row)">
            <a-icon type="delete" />
          </a-popconfirm>
        </span>
      </template>
    </vxe-grid>
  </div>
</template>
<script>
import TestComp from "./test";
export default {
  name: "eTable",
  mixins: [],
  components: {
    TestComp,
  },
  props: {},
  data() {
    return {
      tableColumn: [
        {
          field: "dbSetName",
          title: "数据集名称",
          align: "center",
          minWidth: 200,
          editRender: { name: "input", align: "center" },
        },
        {
          field: "opt",
          title: "操作",
          slots: { default: "opt" },
          width: 150,
          align: "center",
          fixed: "right",
        },
      ],
      tableList: [],
      //  状态
      flag: true,
      //  变量
      paramNameList: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    refCall() {
      this.$refs.testComp.test(34);
    },
    logColumn() {
      console.log("columnHeader", this.tableColumn);
    },
    logTableData() {
      console.log("tableData", this.tableList);
    },
    headerClickEvent() {
      this.$message.success("你点击了！");
    },
    addRow(idx) {
      if (this.tableList.length === 20) {
        this.$message.warning("最多添加20行！");
        return false;
      } else {
        let initField = this.tableColumn.map((item) => item.field);
        initField.pop(); // 去掉末尾
        let initData = {};
        initField.forEach((item) => {
          if (item === "dbSetName") {
            initData[item] = `数据集${idx + 1}`;
          }
          initData[item] = "";
        });
        this.tableList.splice(idx + 1, 0, initData);
      }
    },
    delRow(idx) {
      this.tableList.splice(idx, 1);
    },
    addColumn() {
      //  表头结构
      const columnField = `param${this.tableColumn.length - 1}`;
      const column = {
        field: columnField,
        title: "列名",
        showHeaderOverflow: true,
        align: "center",
        width: 200,
        slots: {
          header: columnField,
        },
        editRender: { name: "input", align: "center" },
      };
      this.tableColumn.splice(this.tableColumn.length - 1, 0, column);

      //  表头参数数据
      this.$set(this.paramNameList, columnField, "列名");
      console.log("paramNameList", this.paramNameList);

      this.$message.success("增加变量列");
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style scoped>
.e-table {
}
</style>
