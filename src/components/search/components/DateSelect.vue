<template>
  <div class="flex-align-center">
    <el-date-picker
      v-show="isOpen"
      v-model="timeInterval"
      style="float: left;max-width: 480px;"
      :style="inputStyle"
      size="normal"
      :type="datatype"
      :value-format="valueFormat"
      range-separator="至"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :clearable="clearable"
      :default-time="defaultTime"
      :picker-options="pickerOptions"
      @change="onChage"
    />
    <div v-if="!hideDateBtn" style="flex-shrink:0">
      <div
        v-for="item of dateList"
        :key="item.label"
        class="date-item"
        :class="item.label === selectItem.label ? 'select' : ''"
        @click="onClick_item(item)"
      >{{ item.label }}</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import * as g from "@/libs/global";
import { DateSelect } from "@/libs/config/constant.config";

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
      datatype: DateSelect.DATE_RANGE,
      defaultTime: [],
      timeInterval: "",
      isOpen: "",
      selectItem: {
        label: "近7天",
        value: 7
      },
      valueFormat: "yyyy-MM-dd",
      hideDateBtn: false
    };
  },
  computed: {
    dateList() {
      const date = new Date();
      const quickPickerType = this.formItem.quickPickerType;
      switch (quickPickerType) {
        case 1:
          return [
            {label: "昨天", value: 2},
            {label: "近3天", value: 3},
            {label: "近7天", value: 7},
            {label: "近30天", value: 30}
          ]
        case 2:
          return [
            {label: '今日', value: 1},
            {label: '本周', value: this.$g.utils.changeCNDay(date.getDay())},
            {label: '本月', value: date.getDate()}
          ]
        case 3:
          return [
            {label: '今日', value: 1},
            {label: '本周', value: this.$g.utils.changeCNDay(date.getDay())},
            {label: '本月', value: date.getDate()}
          ]
        case 4:
          return [
            {label: "今日", value: 1},
            {label: "昨天", value: 2},
            {label: "近7天", value: 7},
            {label: "近30天", value: 30}
          ]
        default:
          return [
            {label: "昨天", value: 2},
            {label: "近3天", value: 3},
            {label: "近7天", value: 7},
            {label: "近30天", value: 30}
          ]
      }
    },
    inputStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px;float: left;";
    },
    startPlaceholder() {  // 兼容IE
      if (this.timeInterval && this.timeInterval.length > 0) {
        return ""
      } else {
        return "开始时间"
      }
    },
    endPlaceholder() {  // 兼容IE
      if (this.timeInterval && this.timeInterval.length > 0) {
        return ""
      } else {
        return "结束时间"
      }
    }

  },
  watch: {
    isRest: function($new) {
      if ($new) {
        if (this.formItem.isSelectToday) {
          this.dateList[0].label = "今日";
        }

        if (this.datatype === DateSelect.DATE_TIME_RANGE) {
          this.defaultTime = ["00:00:00", "23:59:59"];
        }
        this.onClick_item(this.dateList[0]);
      }
    }
  },
  created() {
    if (this.formItem.isSelectToday) {
      this.dateList[0].label = "今日";
    }
    this.datatype = this.formItem.datatype || DateSelect.DATE_RANGE
    if (this.datatype === DateSelect.DATE_TIME_RANGE) {
      this.valueFormat = "yyyy-MM-dd HH:mm:ss"
      this.defaultTime = ["00:00:00", "23:59:59"];
    } else {
      this.valueFormat = "yyyy-MM-dd"
    }
    this.onClick_item(this.dateList[0]);
    this.hideDateBtn = this.formItem.hideDateBtn
  },
  methods: {
    onChage($data) {
      if ($data === null) {
        this.onClick_item(this.dateList[0]);
        return;
      }
      this.selectItem = {};
      let timeArr = [];
      if (this.datatype === DateSelect.DATE_RANGE) {
        timeArr = [g.utils.date($data[0]), g.utils.date($data[1])];
      } else if (this.datatype === DateSelect.DATE_TIME_RANGE) {
        timeArr = [g.utils.time($data[0]), g.utils.time($data[1])];
      }

      this.$emit("dataSelect", timeArr);
      this.ruleForm[this.formItem.key] = timeArr;
    },
    onClick_item($item) {
      this.selectItem = $item;
      let start = "",
          end = "";
      switch ($item.label) {
        case DateSelect.TODAY_LABEL:
          end = this.getDay(0);
          start = this.getDay(0);
          break;
        case DateSelect.YESTERDAY_LABEL:
          end = this.getDay(-1);
          start = this.getDay(-1);
          break;
        case DateSelect.ALL_LABEL:
          end = this.getDay(0);
          start = "2000-01-01";
          break;
        default:
          end = this.getDay(0);
          start = this.getDay(-$item.value + 1);
      }
      if (this.datatype === DateSelect.DATE_TIME_RANGE) {
        end = end + " 23:59:59";
        start = start + " 00:00:00";
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
  width: 62px;
  //   padding: 5px;
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
  color: #1989FA;
  background: #E6F1FC;
  border: 1px solid #A3D0FD;
}
</style>
