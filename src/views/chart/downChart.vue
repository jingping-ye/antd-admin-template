<template>
  <div class="downChart">
    12313213
    <div id="main" style="width: 1000px;height:500px;"></div>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };
import { downData } from "./downData";

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: "downChart",
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
    renderChart() {
      /**
       * 分割数据
       */
      const splitData = function(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i]);
          volumns.push(rawData[i][4]);
        }
        return {
          categoryData: categoryData,
          values: values,
          volumns: volumns,
        };
      };

      /**
       * 计算MA
       */
      const calculateMA = function(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push("-");
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
          }
          result.push(+(sum / dayCount).toFixed(3));
        }
        return result;
      };

      const data = splitData(downData);
      var myChart = this.$echarts.init(document.getElementById("main"));
      const _this = this;
      const options = {
        backgroundColor: "transparent", // 整个图表容器的背景颜色
        animation: true, // 是否开启动画，默认为true,
        legend: {
          //  图例
          bottom: 10, // 距离底部10px
          left: "center", // 居中显示
          data: ["Dow-Jones index", "MA5", "MA10", "MA20", "MA30"], // 显示图例，点击图例可以加粗显示的折现
        },
        tooltip: {
          trigger: "axis", // 坐标轴触发
          axisPointer: {
            type: "cross", //  十字线坐标轴
            animation: false,
            label: {
              backgroundColor: "#ccc",
              borderColor: "#aaa",
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,

              color: "#222",
            },
          },
          backgroundColor: "rgba(245, 245, 245, 0.8)", // 背景颜色
          borderWidth: 2, // 边框粗细
          borderColor: "#4572a7", // 边框颜色
          padding: 10, // 内边距
          textStyle: {
            color: "#000", // 文字颜色
          },
          position: function(pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          }, // 显示位置, 去掉这段代码，tooltip将会跟随鼠标变动，但是移动到下层时，tooltip有一部分被隐藏
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); width:180px;", // 设置额外的css
        },
        axisPointer: {
          //  坐标轴指示器
          link: { xAxisIndex: "all" }, // 表示联动所有的图表
          label: {
            backgroundColor: "#777", // 文本标签的背景颜色
          },
        },
        toolbox: {
          // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
          feature: {
            dataZoom: {
              yAxisIndex: false, // 数据区域缩放 是否控制y轴区域
            },
            brush: {
              type: ["lineX", "clear"], //  选框，横向选择，可清除
            },
          },
        },
        brush: {
          // 选框工具
          xAxisIndex: "all", // 指定哪些 xAxisIndex 可以被刷选。
          brushLink: "all", // 不同系列间，选中的项可以联动。
          outOfBrush: {
            // 定义 在选中范围外 的视觉元素。
            colorAlpha: 0.1, //   选择区域的背景透明度 0.1
          },
        },
        grid: [
          //  内置两个表格
          {
            // 表格1： 左侧10%, 右侧8%， 高50%
            left: "10%",
            right: "8%",
            height: "50%",
          },
          {
            //  表格2：左侧10%, 右侧8%, 顶部20%, 高15%
            left: "10%",
            right: "8%",
            bottom: "20%",
            height: "15%",
          },
        ],
        xAxis: [
          // 直角坐标轴grid的x轴
          {
            type: "category", // 类型，类目轴
            data: data.categoryData, // x轴数据，对应的值将会从series.data中取出
            // scale: true,// 只在type:'value'时有效,在设置 min 和 max 之后该配置项无效。
            boundaryGap: false, // 坐标轴两侧留白策略, true的时候上方和右侧被灰色线封闭, 为false的时候右侧没有封闭线
            axisLine: {
              // 坐标轴轴线相关设置。
              onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
            },
            splitLine: {
              // 坐标轴在 grid 区域中的分隔线。
              //  是否显示竖线
              show: false,
            },
            splitNumber: 20, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
            min: "dataMin", // 坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
            max: "dataMax", // 坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
            axisPointer: {
              // 坐标轴指示器配置项。
              z: 100, // 坐标轴指示器的 z 值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。???
            },
          },
          {
            type: "category",
            gridIndex: 1, // x 轴所在的 grid 的索引，默认位于第一个 grid, 这里显示第二个图表
            data: data.categoryData,
            // scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: true }, // 坐标轴上分割线
            splitLine: { show: false }, // 分隔竖线
            axisLabel: { show: true }, // 标签显示，x轴下方文字
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              label: {
                //  addCommas 千分符分隔

                formatter: function(params) {
                  //  params.value 横坐标数据
                  //  params.seriesData[0].value 纵坐标数据
                  //
                  // console.log("params", params);
                  var seriesValue = (params.seriesData[0] || {}).value;
                  // return seriesValue;
                  return (
                    params.value + (seriesValue != null ? "\n" + _this.$echarts.format.addCommas(seriesValue) : "")
                  );
                },
              },
            },
          },
        ],
        yAxis: [
          // 直角坐标轴grid的y轴
          {
            scale: true,
            splitArea: {
              show: true, // 是否出现斑马线效果
            },
          },
          {
            scale: true, // 是否脱离0值比例
            gridIndex: 1, // 第二张图
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
        ],
        dataZoom: [
          {
            type: "inside", // 内置缩放组件
            xAxisIndex: [0, 1], //  缩放组件控制的图表，这里表示第一个和第二个
            start: 98, // 数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            end: 100, // 数据窗口范围的结束百分比。 start和end定义了数据窗口范围
          },
          {
            type: "slider", // 外置滑动缩放组件
            xAxisIndex: [0, 1],
            top: "85%", // 距离容器顶端的距离
            start: 98,
            end: 100,
          },
        ],
        series: [
          {
            // 道琼斯指数
            name: "Dow-Jones index",
            //  蜡烛图(k线图)
            type: "candlestick",
            data: data.values,
            itemStyle: {
              // k线图的图形样式
              normal: {
                color: "#06B800", // 阳线的颜色
                color0: "#FA0000", // 阴线的颜色
                borderColor: null, // 阳线的描边颜色
                borderColor0: null, // 阴线的描边颜色
              },
            },
            tooltip: {
              //  格式化,这里不懂
              // formatter: function(param) {
              //   param = param[0];
              //   return [
              //     "Date: " + param.name + "<hr size=1 >",
              //     "Open: " + param.data[0] + "<br/>",
              //     "Close: " + param.data[1] + "<br/>",
              //     "Lowest: " + param.data[2] + "<br/>",
              //     "Highest: " + param.data[3] + "<br/>",
              //   ].join("");
              // },
            },
          },
          {
            // ma5
            name: "MA5",
            type: "line",
            data: calculateMA(5, data),
            showSymbol: false,
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 },
            },
            itemStyle: {
              borderWidth: 1,
            },
            areaStyle: {
              color: "#DAE3ED",
              opacity: 0.8,
            },
            makePoint: { symbol: "pin" },
          },
          {
            name: "MA10",
            type: "line",
            symbol: "none",
            data: calculateMA(10, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 },
            },
          },
          {
            name: "MA20",
            type: "line",
            symbol: "none",
            data: calculateMA(20, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 },
            },
          },
          {
            name: "MA30",
            type: "line",
            symbol: "none",
            data: calculateMA(30, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 },
            },
          },
          {
            name: "Volumn",
            type: "bar",
            symbol: "none",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.volumns,
          },
        ],
      };
      myChart.setOption(options);
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
.down-chart {
}
</style>
