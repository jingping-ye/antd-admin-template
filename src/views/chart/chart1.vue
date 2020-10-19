<template>
  <div class="chart1">
    <div id="dataset2" style="width: 1000px;height:500px;"></div>
    <div id="dataset1" style="width: 1000px;height:500px;"></div>
    <a-button type="primary" @click="clickMe">clickMe</a-button>
    <div id="main" style="width: 600px;height:400px;"></div>
    <div id="main2" style="width: 1000px;height:1000px;"></div>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "chart1",
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
    clickMe() {},
    renderDataSet2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("dataset2"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "某投资产品的年化收益（数据集2）",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["七日年化收益率", "预期年化收益率", "实际年化收益率"],
        },
        dataset: {
          dimensions: ["time", "sevenDays", "estimate", "real"],
          source: [
            ["06/01", 5, 10, 7],
            ["07/01", 10, 15, 12],
            ["08/01", 8, 10, 9],
            ["09/01", 30, 50, 35],
            ["10/01", 20, 30, 15],
            ["11/01", 32, 40, 14],
          ],
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: [
          {
            type: "category",
          },
        ],

        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "七日年化收益率",
            type: "line",
          },
          {
            name: "预期年化收益率",
            type: "line",
          },
          {
            name: "实际年化收益率",
            type: "line",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    renderDataSet1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("dataset1"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "某投资产品的年化收益（数据集1）",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["七日年化收益率", "预期年化收益率", "实际年化收益率"],
        },
        dataset: {
          dimensions: ["time", "sevenDays", "estimate", "real"],
          source: [
            {
              time: "06/01",
              sevenDays: "5",
              estimate: "10",
              real: "7",
            },
            {
              time: "07/01",
              sevenDays: "10",
              estimate: "15",
              real: "12",
            },
            {
              time: "08/01",
              sevenDays: "8",
              estimate: "10",
              real: "9",
            },
            {
              time: "09/01",
              sevenDays: "30",
              estimate: "50",
              real: "35",
            },
            {
              time: "10/01",
              sevenDays: "20",
              estimate: "30",
              real: "15",
            },
            {
              time: "11/01",
              sevenDays: "32",
              estimate: "40",
              real: "14",
            },
          ],
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: [
          {
            type: "category",
          },
        ],

        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "七日年化收益率",
            type: "line",
          },
          {
            name: "预期年化收益率",
            type: "line",
          },
          {
            name: "实际年化收益率",
            type: "line",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    renderChart2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main2"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "某投资产品的年化收益（无数据集）",
        },
        tooltip: {},
        legend: {
          data: ["七日年化收益率", "预期年化收益率", "实际年化收益率"],
        },
        xAxis: {
          data: ["06/01", "07/01", "08/01", "09/01", "10/01", "11/01"],
        },
        yAxis: {},
        series: [
          {
            name: "七日年化收益率",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "预期年化收益率",
            type: "line",
            data: [6, 21, 33, 15, 15, 25],
          },
          {
            name: "实际年化收益率",
            type: "line",
            data: [8, 15, 25, 30, 15, 30],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.renderChart();
    this.renderChart2();
    this.renderDataSet1();
    this.renderDataSet2();
  },
  destoryed() {},
};
</script>
<style scoped>
.chart1 {
}
</style>
