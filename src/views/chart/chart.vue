<template>
  <div>
    <div>
      <div id="myChart" :style="{ height: '140px' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      percent1: 30,
      percent2: 70,
      year: "2018-10-20",
      time: "10:05:03",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        color: ["#23D864", "#FF4D51"],
        title: { text: "伦敦金" },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },

        legend: [
          {
            itemWidth: 15,
            x: "2%",
            y: "20%",
            textStyle: {
              color: "#ccc",
            },
            data: ["买跌"],
          },
          {
            itemWidth: 15,
            x: "80%",
            y: "20%",
            data: ["买涨"],
          },
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["42%", "50%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },

              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "0",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },

            itemStyle: {
              top: "50",
            },

            data: [
              {
                value: this.percent1,
                name: "买跌",
                a: "1",
              },
              {
                value: this.percent2,
                name: "买涨",
                a: "1",
              },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// div {
//   padding: 0 rem(30);

//   position: relative;

//   .title {
//     position: absolute;
//     left: 44%;
//     top: 29%;
//     font-size: rem(30);
//   }

//   .percent1 {
//     position: absolute;
//     left: 10%;
//     top: 35%;
//     font-size: rem(32);
//     color: #333;
//     font-weight: bold;
//     line-height: rem(55);
//   }

//   .percent2 {
//     position: absolute;
//     right: 10%;
//     top: 35%;
//     font-size: rem(32);
//     color: #333;
//     font-weight: bold;
//     line-height: rem(55);
//   }

//   .time {
//     position: absolute;
//     left: 24%;
//     top: 70%;
//   }
// }
</style>
