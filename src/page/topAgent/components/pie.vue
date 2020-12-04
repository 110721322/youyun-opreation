<template>
  <div class="data-box">
    <div :ref="refName" class="data-pie" :style="pieStyle"></div>
    <div class="data-list">
      <div v-for="(item,index) in dataList" :key="index" class="data-item">
        <span>
          <span :class="item.className"></span>
          {{ item.title }}
        </span>
        <span class="perc">| {{ item.perc }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pie",
  props: ["pieOption", "refName", "dataList", "pieStyle"],
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      const myChartBar = this.$echarts.init(this.$refs[`${this.refName}`]);

      // 绘制图表
      myChartBar.setOption(this.pieOption);
    }
  }
};
</script>
<style lang="scss" scoped>
.data-box {
  display: flex;
  justify-content: center;
  padding: 36px 24px 0;

  .data-pie {
    width: 250px;
    height: 300px;
  }

  .data-list {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .data-item {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:first-child {
        margin-top: 0;
      }
    }

    .dot {
      display: inline-block;
      margin-right: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .dot_d {
      background: #00a1ff;
    }

    .dot_z {
      background: #37cbcb;
    }

    .dot_b {
      background: #fad337;
    }

    .dot_n {
      background: #f2637b;
    }

    .dot_x {
      background: #975fe4;
    }

    .perc {
      margin-left: 8px;
      font-family: HelveticaNeue;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
  }
}
</style>
