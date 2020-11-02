<template>
  <div class="theme">
    <h2>按钮</h2>
    <a-button type="primary">
      Primary
    </a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">
      Dashed
    </a-button>
    <a-button type="danger">
      Danger
    </a-button>
    <a-config-provider :auto-insert-space-in-button="false">
      <a-button type="primary">
        按钮
      </a-button>
    </a-config-provider>
    <a-button type="primary">
      按钮
    </a-button>
    <a-button type="link">
      Link
    </a-button>
    <a-button type="primary" block>
      Primary
    </a-button>
    <a-button block>
      Default
    </a-button>
    <a-button type="dashed" block>
      Dashed
    </a-button>
    <a-button type="danger" block>
      Danger
    </a-button>
    <a-button type="link" block>
      Link
    </a-button>
    <a-divider>分割线</a-divider>
    <h2>下拉菜单</h2>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()"> Hover me <a-icon type="down" /> </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-divider>分割线</a-divider>
    <h2>导航菜单</h2>
    <div>
      <a-switch :default-checked="false" @change="changeMode" /> Change Mode
      <span className="ant-divider" style="margin: 0 1em" />
      <a-switch :default-checked="false" @change="changeTheme" /> Change Theme
      <br />
      <br />
      <a-menu
        style="width: 256px"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :mode="mode"
        :theme="theme"
      >
        <a-menu-item key="1">
          <a-icon type="mail" />
          Navigation One
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="calendar" />
          Navigation Two
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="appstore" /><span>Navigation Three</span></span>
          <a-menu-item key="3">
            Option 3
          </a-menu-item>
          <a-menu-item key="4">
            Option 4
          </a-menu-item>
          <a-sub-menu key="sub1-2" title="Submenu">
            <a-menu-item key="5">
              Option 5
            </a-menu-item>
            <a-menu-item key="6">
              Option 6
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="setting" /><span>Navigation Four</span></span>
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
          <a-menu-item key="9">
            Option 9
          </a-menu-item>
          <a-menu-item key="10">
            Option 10
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <h2>分页</h2>
    <div>
      <a-pagination show-size-changer :default-current="3" :total="500" @showSizeChange="onShowSizeChange" />
      <br />
      <a-pagination
        v-model="current"
        show-size-changer
        :page-size.sync="pageSize"
        :total="500"
        disabled
        @showSizeChange="onShowSizeChange"
      />
    </div>
    <a-divider>分割线</a-divider>
    <h2>表单</h2>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item ref="name" label="Activity name" prop="name">
        <a-input
          v-model="form.name"
          @blur="
            () => {
              $refs.name.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="Activity zone" prop="region">
        <a-select v-model="form.region" placeholder="please select your zone">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Activity time" required prop="date1">
        <a-date-picker v-model="form.date1" show-time type="date" placeholder="Pick a date" style="width: 100%;" />
      </a-form-model-item>
      <a-form-model-item label="Instant delivery" prop="delivery">
        <a-switch v-model="form.delivery" />
      </a-form-model-item>
      <a-form-model-item label="Activity type" prop="type">
        <a-checkbox-group v-model="form.type">
          <a-checkbox value="1" name="type">
            Online
          </a-checkbox>
          <a-checkbox value="2" name="type">
            Promotion
          </a-checkbox>
          <a-checkbox value="3" name="type">
            Offline
          </a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item label="Resources" prop="resource">
        <a-radio-group v-model="form.resource">
          <a-radio value="1">
            Sponsor
          </a-radio>
          <a-radio value="2">
            Venue
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="Activity form" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          Create
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-divider>分割线</a-divider>
    <h2>时间选择器</h2>
    <a-date-picker @change="onChange" />
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "Theme",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      mode: "inline",
      theme: "light",
      pageSize: 20,
      current: 4,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "Please input Activity name", trigger: "blur" },
          { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
        ],
        region: [{ required: true, message: "Please select Activity zone", trigger: "change" }],
        date1: [{ required: true, message: "Please pick a date", trigger: "change" }],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [{ required: true, message: "Please select activity resource", trigger: "change" }],
        desc: [{ required: true, message: "Please input activity form", trigger: "blur" }],
      },
      //  变量
      list: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    changeMode(checked) {
      this.mode = checked ? "vertical" : "inline";
    },
    changeTheme(checked) {
      this.theme = checked ? "dark" : "light";
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.theme {
  margin: 10px;
}
.ant-btn {
  margin: 10px 10px;
}
</style>
