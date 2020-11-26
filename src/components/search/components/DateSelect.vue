<template>
  <div class="flex-align-center">
    <el-date-picker
      v-show="isOpen"
      v-model="timeInterval"
      style="float: left;width: 100%;max-width: 480px;"
      :style="inputStyle"
      size="large"
      :type="datatype"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :clearable="clearable"
      :default-time="defaultTime"
      :picker-options="pickerOptions"
      @change="onChage"
    />
    <div style="flex-shrink:0">
      <div
        v-for="item of dateList"
        :key="item.label"
        class="date-item"
        :class="item.value === selectItem.value ? 'select' : ''"
        @click="onClick_item(item)"
      >{{ item.label }}</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { dateSelect } from "@/libs/config/constant.config";

export default {
  components: {},
  props: {
    ruleForm: Object,
    formItem: Object,
    pickerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isRest: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      defaultTime: [],
      timeInterval: "",
      isOpen: "",
      dateList: [
        {
          label: "昨天",
          value: 1
        },
        {
          label: "近3天",
          value: 3
        },
        {
          label: "近7天",
          value: 7
        },
        {
          label: "近30天",
          value: 30
        }
      ],
      selectItem: {},
      datatype: dateSelect.DATE_RANGE
    };
  },
  computed: {
    inputStyle() {
      const item = this.formItem;
      return item.style ? item.style : "float: left;";
    }
  },
  watch: {
    isRest: function($new) {
      if ($new) {
        this.resetState();
      }
    }
  },
  created() {
    this.datatype = this.formItem.datatype || dateSelect.DATE_RANGE
    this.resetState();
  },
  methods: {
    resetState() {
      const { defaultDateType } = this.formItem;
      if (this.datatype === dateSelect.DATE_TIME_RANGE) {
        this.defaultTime = ["00:00:00", "23:59:59"];
      }
      this.getToday()
      this.selectItem = {};
      if (defaultDateType === dateSelect.DATE_INTERVAL_FIRST) {
        this.resetSelectToday();
      } else if (defaultDateType === dateSelect.DATE_INTERVAL_THIRD) {
        this.resetSelectThird();
      } else if (defaultDateType === dateSelect.DATE_INTERVAL_ALL) {
        this.resetSelectAll();
      }
    },
    resetSelectToday() {
      this.dateList[0].label = "今天";
      this.onClick_item(this.dateList[0])
    },
    resetSelectAll() {
      this.timeInterval = [];
      this.selectItem = {};
      this.ruleForm[this.formItem.key] = this.timeInterval;
    },
    resetSelectThird() {
      this.dateList[0].label = "今天";
      this.onClick_item(this.dateList[2]);
    },
    onChage($data) {
      if ($data === null) {
        this.onClick_item(this.dateList[0]);
        return;
      }
      this.selectItem = {};
      let timeInterval = [];
      if (this.datatype === dateSelect.DATE_RANGE) {
        timeInterval = [this.$g.utils.date($data[0]), this.$g.utils.date($data[1])];
      } else if (this.datatype === dateSelect.DATE_TIME_RANGE) {
        timeInterval = [this.$g.utils.time($data[0]), this.$g.utils.time($data[1])];
      }

      this.$emit("dataSelect", timeInterval);
      this.ruleForm[this.formItem.key] = timeInterval;
      this.$emit("timeSearch", this.ruleForm)
    },
    onClick_item($item) {
      this.selectItem = $item;
      let start = "";
      let end = "";
      if (this.datatype === dateSelect.DATE_RANGE) {
        if ($item.label === "今天") {
          start = this.getDay(0);
          end = this.getDay(0);
        } else {
          start = this.getDay(-$item.value + 1);
          end = this.getDay(0);
        }
        this.timeInterval = [start, end];
      } else if (this.datatype === dateSelect.DATE_TIME_RANGE) {
        if ($item.label === "今天") {
          start = this.getDay(0) + " 00:00:00";
          end = this.getDay(0) + " 23:59:59";
        } else {
          start = this.getDay(-$item.value + 1) + " 00:00:00";
          end = this.getDay(0) + " 23:59:59";
        }
        this.timeInterval = [start, end];
      }
      this.$emit("dataSelect", this.timeInterval);
      this.ruleForm[this.formItem.key] = this.timeInterval;
      this.$emit("timeSearch", this.ruleForm)
    },
    getToday() {
      let end, start;
      if (this.datatype === dateSelect.DATE_RANGE) {
        end = this.getDay(0);
        start = this.getDay(0);
      } else if (this.datatype === dateSelect.DATE_TIME_RANGE) {
        end = this.getDay(0) + " 23:59:59";
        start = this.getDay(0) + " 00:00:00";
      }
      this.timeInterval = [start, end];
      this.$emit("dataSelect", this.timeInterval);
      this.ruleForm[this.formItem.key] = this.timeInterval;
    },
    getDay(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    getTime(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      var tHour = today.getHours();
      var tMinute = today.getMinutes();
      var tsecond = today.getSeconds();

      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      tHour = this.doHandleMonth(tHour);
      tMinute = this.doHandleMonth(tMinute);
      tsecond = this.doHandleMonth(tsecond);
      return (
        tYear +
        "-" +
        tMonth +
        "-" +
        tDate +
        " " +
        tHour +
        ":" +
        tMinute +
        ":" +
        tsecond
      );
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/scss" scoped>
.date-item {
  float: left;
  height: 40px;
  width: 75px;
  margin-left: 15px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #b0b2b8;
  cursor: pointer;
  -moz-user-select: none; /* 火狐 */
  -webkit-user-select: none; /* webkit浏览器 */
  -ms-user-select: none; /* IE10 */
  -khtml-user-select: none; /* 早期浏览器 */
  user-select: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.select {
  color: #409eff;
  background: #E6F1FC;
  border: 1px solid #409eff;
}
</style>
