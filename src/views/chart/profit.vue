<template>
  <div class="profit">
    <p>策略收益图</p>
    <a-button type="primary" @click="clickMe">点击我</a-button>
    <div id="main" style="width:100%;height:1500px;"></div>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
// import someThing from 'SomeThing';
import { profitDetail } from "./profitDetail";
export default {
  name: "profit",
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
    clickMe() {
      console.log("----", this.$echarts.format);
    },
    renderChart() {
      let _this = this;
      const getCategoryData = function(rawData) {
        let categoryData = rawData.map((item) => _this.$moment(item).format("YY-MM-DD"));
        return categoryData;
      };

      /**
       * 转换单位，以K为单位, 1000置换
       */
      const toKUnit = (num, keepDigit = 1) => {
        return `${(num / 1000).toFixed(keepDigit)}K`;
      };

      /**
       * 以千分隔，以空格分隔
       */
      const toKSep = (val, fixedNum = 0) => {
        let _val = "" + Number(val).toFixed(fixedNum);
        if (_val.indexOf(".") !== -1) {
          return _val.replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
        } else {
          return _val.replace(/(?=(?!\b)(\d{3})+$)/g, " ");
        }
      };

      //  横坐标数据
      const rawCategoryData = profitDetail.data.result.benchmark.time;
      const strRawCategoryData = rawCategoryData.map((item) => item + "");
      const categoryData = getCategoryData(rawCategoryData);

      //  基准收益
      const benchmarkData = profitDetail.data.result.benchmark.value;

      //  策略收益
      const overallReturnData = profitDetail.data.result.overallReturn.value;

      //  每日盈亏数据
      let earnData = profitDetail.data.result.gains.earn.value; // 每日盈利
      let loseData = profitDetail.data.result.gains.lose.value; // 每日亏损

      //  买卖平仓数据
      let buyData = profitDetail.data.result.orders.buy.value; // 开仓数据
      let sellData = profitDetail.data.result.orders.sell.value; // 平仓数据

      let profitChart = this.$echarts.init(document.getElementById("main"));

      //  选项配置
      const options = {
        backgroundColor: "transparent",
        animation: true, // 是否开启动画，
        tooltip: {
          trigger: "axis", // 坐标轴触发
          backgroundColor: "rgba(245, 245, 245, 0.8)", // 背景颜色
          borderWidth: 2, // 边框粗细
          borderColor: "#4572a7", // 边框颜色
          padding: 10, // 内边距
          textStyle: {
            color: "#000", // 文字颜色
          },
          formatter: function(params) {
            //  数据
            const overallGrid = params.filter((item) => item.seriesName === "策略收益")[0];
            const benchmarkGrid = params.filter((item) => item.seriesName === "基准收益")[0];
            const earnGrid = params.filter((item) => item.seriesName === "当日盈利")[0];
            const loseGrid = params.filter((item) => item.seriesName === "当日亏损")[0];
            const buyGrid = params.filter((item) => item.seriesName === "当日开仓")[0];
            const sellGrid = params.filter((item) => item.seriesName === "当日平仓")[0];

            //  时间
            const formatTime = _this.$moment(`20${benchmarkGrid.axisValueLabel} 16:00`).format("dddd, MMMDo, HH:mm");

            return (
              '<span style="font-size:12px">' +
              '<span style="font-size:10px;">' +
              formatTime +
              "</span>" +
              "<br />" +
              `${overallGrid.marker} ${overallGrid.seriesName}: <span style="font-weight:bold;">  ${overallGrid.value}%  </span></br>` +
              `${benchmarkGrid.marker} ${benchmarkGrid.seriesName}:   <span style="font-weight:bold;">${benchmarkGrid.value}% </span></br>` +
              `${earnGrid.marker} ${earnGrid.seriesName}:   <span style="font-weight:bold;">${toKSep(
                earnGrid.value,
                2
              )} </span></br>` +
              `${loseGrid.marker} ${loseGrid.seriesName}:  <span style="font-weight:bold;"> ${toKSep(
                loseGrid.value,
                2
              )}</span> </br>` +
              `${buyGrid.marker} ${buyGrid.seriesName}:   <span style="font-weight:bold;">${toKSep(
                buyGrid.value,
                2
              )} </span></br>` +
              `${sellGrid.marker} ${sellGrid.seriesName}:   <span style="font-weight:bold;">${toKSep(
                sellGrid.value,
                2
              )}</span> </br>` +
              "</span>"
            );
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); min-width:150px;", // 设置额外的css
        },
        axisPointer: {
          //  坐标轴指示器
          link: { xAxisIndex: "all" }, // 表示联动所有的图表
          label: {
            backgroundColor: "#777", // 文本标签的背景颜色
          },
        },
        grid: [
          //  内置三个表格
          {
            // 表格1： 收益
            left: "10%",
            right: "8%",
            height: "170px",
            containLabel: true,
          },
          //  表格2：每日盈亏
          {
            left: "10%",
            right: "8%",
            height: "120px",
            top: "270px",
            containLabel: true,
          },
          {
            //  表格3：每日买卖
            left: "10%",
            right: "8%",
            top: "430px",
            height: "120px",
            containLabel: true,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: categoryData,
            boundaryGap: true,
            axisLine: {
              onZero: true,
            },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: {
              show: true,
            },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              z: 100,
            },
          },
          {
            type: "category",
            gridIndex: 1,
            data: categoryData,
            boundaryGap: true,
            axisLine: { onZero: true },
            axisTick: { show: false },
            splitLine: { show: true },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
          },
          {
            type: "category",
            gridIndex: 2,
            data: categoryData,
            boundaryGap: true,
            axisLine: { onZero: true },
            axisTick: { show: false },
            splitLine: { show: true },
            axisLabel: { show: true, fontSize: 10 },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
          },
        ],
        yAxis: [
          {
            name: "收益",
            nameLocation: "center",
            scale: false,
            axisTick: { show: false },
            position: "right",
            // splitNumber: 8,
            interval: 5,
            axisLabel: {
              inside: true,
              formatter: "{value}%",
              fontSize: 10,
              verticalAlign: "bottom",
              z: 999,
            },
            nameTextStyle: {
              color: "#707070",
            },
            splitLine: {
              show: true,
            },
            axisLine: {
              show: false,
            }, // 是否显示y轴
            nameGap: 10,
            nameRotate: -90,
          },
          {
            name: "每日盈亏",
            nameLocation: "center",
            scale: false, // 是否脱离0值比例
            gridIndex: 1, // 第二张图
            splitNumber: 2,
            position: "right",
            axisLabel: {
              show: true,
              inside: true,
              formatter: function(value) {
                return toKUnit(value, 0);
              },
              fontSize: 10,
              verticalAlign: "bottom",
            }, // 显示y轴标签
            axisTick: { show: false },
            splitLine: { show: true },
            nameTextStyle: {
              color: "#707070",
            },
            axisLine: {
              show: false,
            },
            nameGap: 10,
            nameRotate: -90,
            zlevel: 999,
          },
          {
            name: "每日买卖",
            nameLocation: "center",
            scale: false, // 是否脱离0值比例
            gridIndex: 2, // 第二张图
            splitNumber: 1,
            position: "right",
            axisLabel: {
              show: true,
              inside: true,
              formatter: function(value) {
                return toKUnit(value, 0);
              },
              fontSize: 10,
              verticalAlign: "bottom",
            }, // 显示y轴标签
            axisTick: { show: false },
            splitLine: { show: true },
            nameTextStyle: {
              color: "#707070",
            },
            axisLine: {
              show: false,
            },
            nameGap: 10,
            nameRotate: -90,
            zlevel: 999,
          },
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1, 2],
            start: 0,
            end: 100,
          },
          {
            type: "slider",
            xAxisIndex: [0, 1, 2],
            top: "580px",
            start: 0,
            end: 100,
            showDataShadow: false, // 是否显示拖拽条阴影
          },
        ],
        series: [
          {
            name: "策略收益",
            type: "line",
            data: overallReturnData,
            showSymbol: false,
            smooth: false,
            areaStyle: {
              color: "#DAE3ED",
              opacity: 0.4,
            },
            lineStyle: {
              color: "#4572a7",
            },
            markPoint: {
              data: [
                {
                  name: "最大回撤",
                  coord: ["19-04-19", "26.31"],
                  symbol:
                    "path://M 5.5 0.5 C 12.16 0.5 12.16 10.5 5.5 10.5 C -1.1600000000000001 10.5 -1.1600000000000001 0.5 5.5 0.5 Z M 5.5 10.5 L 5.5 2.598240000000004",
                  symbolSize: 10,
                  itemStyle: {
                    borderColor: "#A47D7C",
                    color: "#00BB00",
                  },
                  label: {
                    show: false,
                  },
                },
                {
                  name: "最大回撤",
                  coord: ["19-06-19", "13.32"],
                  symbol:
                    "path://M 5.5 0.5 C 12.16 0.5 12.16 10.5 5.5 10.5 C -1.1600000000000001 10.5 -1.1600000000000001 0.5 5.5 0.5 Z M 5.5 10.5 L 5.5 2.598240000000004",
                  symbolSize: 10,
                  itemStyle: {
                    borderColor: "#A47D7C",
                    color: "#00BB00",
                  },
                  label: {
                    show: false,
                  },
                },
              ],
            },
          },
          {
            name: "基准收益",
            type: "line",
            data: benchmarkData,
            showSymbol: false,
            smooth: false,
            lineStyle: {
              color: "#aa4643",
            },
          },
          {
            name: "当日盈利",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: earnData,
            itemStyle: {
              color: "#89A54E",
            },
          },
          {
            name: "当日亏损",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: loseData,
            itemStyle: {
              color: "#80699B",
            },
          },
          {
            name: "当日开仓",
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: buyData,
            itemStyle: {
              color: "#18a5ca",
            },
          },
          {
            name: "当日平仓",
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: sellData,
            itemStyle: {
              color: "#DB843D",
            },
          },
        ],
      };
      profitChart.setOption(options);
      window.addEventListener("resize", function() {
        profitChart.resize();
      });
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.renderChart();
  },
  destoryed() {},
};
</script>
<style scoped>
.profit {
}
</style>
