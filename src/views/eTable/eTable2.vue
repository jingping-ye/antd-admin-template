<template>
  <div class="e-table2">
    <a-button @click="addColumn(-1)" style="margin-bottom:10px">增加变量列</a-button>
    <a-button @click="logColumn">输出列</a-button>
    <a-button @click="logTableData">输出数据</a-button>
    <vxe-grid
      class="e-table"
      border
      resizeable
      show-overflow
      keep-source
      auto-resize
      ref="eTable"
      :show-header="isShowHeader"
      :columns="tableColumn"
      :data="tableList"
      :mouse-config="{ selected: true }"
      :context-menu="{ body: { options: bodyMenus }, visibleMethod: visibleMethod }"
      :edit-config="{
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        icon: 'fa fa-file-text-o',
        activeMethod: activeMethod,
      }"
      :keyboard-config="{
        isArrow: true,
        isDel: true,
        isEnter: true,
        isTab: true,
        isEdit: true,
      }"
      @context-menu-click="contextMenuClickEvent"
    >
      <template v-slot:empty>
        <div style="padding-top:30px;padding-bottom:30px;">
          <p>暂无数据</p>
          <p>
            <a-button type="primary" @click="addRow(-1)">添加数据集</a-button>
          </p>
        </div>
      </template>
      <template v-slot:opt="{ row, rowIndex }">
        <template v-if="rowIndex === 0">
          操作
        </template>
        <template v-else>
          <span>
            <a-icon type="file-add" @click="addRow(rowIndex)"></a-icon>
            <a-divider type="vertical"></a-divider>
            <a-popconfirm title="是否要删除该条数据？" @confirm="delRow(rowIndex, row)">
              <a-icon type="delete" />
            </a-popconfirm>
          </span>
        </template>
      </template>
    </vxe-grid>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "eTable2",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      isShowHeader: true,
      bodyMenus: [
        [
          { code: "addColumnByLeft", name: "上方插入行", visible: true, disabled: false },
          { code: "addColumnByRight", name: "下方插入行", visible: true, disabled: false },
        ],
        [
          { code: "addColumnByLeft", name: "左侧插入列", visible: true, disabled: false },
          { code: "addColumnByRight", name: "右侧插入列", visible: true, disabled: false },
        ],
        [
          { code: "delColumn", name: "删除列", disabled: false, visible: true },
          { code: "delColumn", name: "删除行", disabled: false, visible: true },
        ],
      ],
      //  变量
      tableColumn: [
        {
          field: "dbSetName",
          title: "数据集名称",
          align: "center",
          minWidth: 200,
          editRender: { name: "input", align: "center", attrs: { disabled: false } },
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取最后
     */
    getMaxParamNum() {
      const tableColumn = JSON.parse(JSON.stringify(this.tableColumn));
      const tableColumnField = tableColumn.map((item) => item.field);
      if (tableColumnField.length === 2) {
        return 1;
      } else {
        const paramColumnField = tableColumnField.filter((item) => item.startsWith("param"));
        const paramNumList = paramColumnField.map((item) => Number(item.split("param")[1]));

        const maxParamNum = Math.max.apply(null, paramNumList);
        return maxParamNum;
      }
    },
    visibleMethod({ options, column }) {
      let isAddColumnByLeftVisible = true;
      let isAddColumnByRightVisible = true;
      let isDelColumnVisible = true;

      // 第一列和最后一列没有左新增列
      if (column.property === "dbSetName") {
        isAddColumnByLeftVisible = false;
        isDelColumnVisible = false;
      }

      // 最后一列没有右新增列
      if (column.property === "opt") {
        isAddColumnByLeftVisible = false;
        isAddColumnByRightVisible = false;
        isDelColumnVisible = false;
      }

      options.forEach((list) => {
        list.forEach((item) => {
          if (item.code === "addColumnByLeft") {
            item.visible = isAddColumnByLeftVisible;
          }

          if (item.code === "addColumnByRight") {
            item.visible = isAddColumnByRightVisible;
          }

          if (item.code === "delColumn") {
            item.visible = isDelColumnVisible;
          }
        });
      });
      return true;
    },
    activeMethod({ rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return false;
      }
      return true;
    },
    /***
     * 删除列
     */
    delColumn(columnIndex) {
      this.tableColumn.splice(columnIndex, 1);
    },
    contextMenuClickEvent({ columnIndex, menu }) {
      if (menu.code === "delColumn") {
        this.delColumn(columnIndex);
      }

      if (menu.code === "addColumnByLeft") {
        this.addColumn(columnIndex);
      }

      if (menu.code === "addColumnByRight") {
        this.addColumn(columnIndex + 1);
      }
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

        let initData = [];
        let headerData = {}; // 头部数据
        let realRowData = {}; // 真实数据
        initField.forEach((item) => {
          if (item === "dbSetName") {
            if (idx === -1) {
              headerData[item] = "数据集名称";
            }
            realRowData[item] = `数据集`;
          } else {
            if (idx === -1) {
              headerData[item] = "";
            }
            realRowData[item] = "";
          }
        });

        if (idx === -1) {
          this.isShowHeader = false;
          initData.push(headerData);
        }

        initData.push(realRowData);

        this.tableList.splice(idx + 1, 0, ...initData);
      }
    },
    /**
     * 新增列
     * @param {Number} columnIndex 新增列的索引
     */
    addColumn(columnIndex = -1) {
      let insertColumnIndex = this.tableColumn.length - 1;
      if (columnIndex !== -1) {
        insertColumnIndex = columnIndex;
      }

      //  表头结构
      const maxParamNum = this.getMaxParamNum(); // 最后一个参数的数字
      const columnField = `param${maxParamNum + 1}`;
      const column = {
        field: columnField,
        title: "列名",
        showHeaderOverflow: true,
        align: "center",
        width: 200,
        editRender: { name: "input", align: "center" },
      };
      this.tableColumn.splice(insertColumnIndex, 0, column);
    },
    delRow(idx) {
      this.tableList.splice(idx, 1);
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
::v-deep .e-table tbody tr:first-child {
  background: #f8f8f9;
  font-weight: bold;
}
::v-deep .e-table input[disabled] {
  background: #f8f8f9 !important;
  border: none;
  text-align: center;
  font-weight: bold;
}
</style>
