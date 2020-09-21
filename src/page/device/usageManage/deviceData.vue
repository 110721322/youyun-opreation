<template>
  <div>
    <div class="tab_head">
      <span class="title">设备数据</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">设备统计</el-menu-item>
        <el-menu-item index="2">服务商统计</el-menu-item>
        <el-menu-item index="3">设备明细</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <DeviceStatistics v-if="activeIndex == '1'"></DeviceStatistics>
      <AgentStatistics v-else-if="activeIndex == '2'"></AgentStatistics>
      <DeviceDetail v-else-if="activeIndex == '3'"></DeviceDetail>
    </transition>
  </div>
</template>
<script>
import AgentStatistics from "./components/agentStatistics.vue";
import DeviceStatistics from "./components/deviceStatistics.vue";
import DeviceDetail from "./components/deviceDetail.vue";

export default {
  name: "DeviceData",
  components: { AgentStatistics, DeviceStatistics, DeviceDetail },
  data() {
    return {
      activeIndex: "1"
    };
  },
  mounted() {},
  methods: {
    handleSelect($item) {
      // eslint-disable-next-line no-console
      this.activeIndex = $item;
    }
  }
};
</script>

<style scoped>
/* /deep/ .el-form-item {
  margin-bottom: 0px!important;
} */
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}
</style>
