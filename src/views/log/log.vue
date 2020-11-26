<template>
  <div class="log-output">
    <pre v-html="logStr"></pre>
    <!-- <pre>
      12313
    </pre> -->
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "log",
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
      logList: [],
      logStr: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    getLogListRequest() {
      this.$http
        .get("/log/list")
        .then((res) => {
          let logList = res.map((logItem) => {
            const logType = ["INFO", "WARNING", "DEBUG", "ERROR"];
            let curLogType = logType.filter((type) => logItem.includes(type))[0];
            let curLogClass = `log-${curLogType.toLowerCase()}`;

            let splitType = new RegExp(`-\\s+${curLogType}\\s+-`);
            // - INFO  -
            let splitArr = logItem.split(splitType);

            let logDate = splitArr[0];
            let logMsg = splitArr[1];

            let curLogStr = `<p><span class="log-date">${logDate}</span> - <span class="${curLogClass}">${curLogType}</span> - <span class="log-msg">${logMsg}</span></p>`;
            return curLogStr;
          });
          this.logStr = logList.join("");
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.getLogListRequest();
  },
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.log-output {
  height: 550px;
  color: #ddd;
  font-size: 12px;
  overflow-y: auto;
  padding: 10px;
  background-color: #222;
}
.log-output pre {
  background-color: #141414;
  color: #ddd;
  border: none;
  font-size: 12px;
  padding: 0;
  white-space: pre-wrap;
}
::v-deep .log-date {
  color: #258ccd;
}
::v-deep .log-info {
  color: #393;
}
::v-deep .log-warning {
  color: #dad06f;
}
::v-deep .log-error {
  color: #f22;
}
</style>
