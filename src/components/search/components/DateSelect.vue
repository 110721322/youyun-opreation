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
        :class="item.value == selectItem.value ? 'select' : ''"
        @click="onClick_item(item)"
      >{{ item.label }}</div>
    </div>
    <!--    <span class="date-item" v-for="item of dateList" :class="item.value == selectItem.value?'select':''"  @click="onClick_item(item)">{{item.label}}</span>-->
  </div>
</template>
<script type="text/ecmascript-6">
import * as g from "@/libs/global";

export default {
  components: {},
  props: {
    // datatype: {
    //   type: String,
    //   default: "daterange"
    // },
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
      datatype: "daterange"
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
        this.getToday()
        this.selectItem = {};
        if (this.formItem.isSelectToday) {
          this.dateList[0].label = "今天";
          if (this.datatype === "daterange") {
            let start = "";
            let end = "";
            if (this.dateList[0].label === "今天") {
              end = this.getDay(0);
              start = this.getDay(0);
            }
            this.timeInterval = [start, end];
          } else if (this.datatype === "datetimerange") {
            let start = "";
            let end = "";
            if (this.dateList[0].label === "今天") {
              end = this.getDay(0) + " 23:59:59";
              start = this.getDay(0) + " 00:00:00";
            } else {
              end = this.getDay(-1) + " 23:59:59";
              start = this.getDay(-1) + " 00:00:00";
            }
            this.timeInterval = [start, end];
          }
        }
        if (this.formItem.querySelectAll) {
          this.timeInterval = [];
          this.selectItem = {};
          this.ruleForm[this.formItem.key] = this.timeInterval;
          return;
        }
        if (this.datatype === "datetimerange") {
          this.defaultTime = ["00:00:00", "23:59:59"];
        }
        if (this.formItem.selectSevenDay) {
          this.selectItem = {
            label: "近7天",
            value: 7
          }
          let start = "";
          let end = "";
          end = this.getDay(0);
          start = this.getDay(-6);
          if (this.datatype === 'daterange') {
            this.timeInterval = [start, end];
          }
          if (this.datatype === 'datetimerange') {
            this.timeInterval = [start + ' 00:00:00', end + ' 23:59:59'];
          }
          this.$emit("dataSelect", this.timeInterval);
          this.ruleForm[this.formItem.key] = this.timeInterval;
        }
      }
    }
  },
  created() {
    this.getToday()
    this.datatype = this.formItem.datatype || "daterange"
    if (this.datatype === "datetimerange") {
      this.defaultTime = ["00:00:00", "23:59:59"];
    }
    if (this.formItem.isSelectToday) {
      this.dateList[0].label = "今天";
      let start = "";
      let end = "";
      if (this.datatype === "daterange") {
        start = this.getDay(0);
        end = this.getDay(0);
      } else if (this.datatype === "datetimerange") {
        start = this.getDay(0) + " 00:00:00";
        end = this.getDay(0) + " 23:59:59";
      }
      this.timeInterval = [start, end];
      this.$emit("dataSelect", this.timeInterval);
      this.ruleForm[this.formItem.key] = this.timeInterval;
    }
    if (this.formItem.querySelectAll) {
      this.timeInterval = [];
      this.selectItem = {};
      this.ruleForm[this.formItem.key] = this.timeInterval;
    }
    if (this.formItem.selectSevenDay) {
      this.dateList[0].label = "今天";
      this.selectItem = {
        label: "近7天",
        value: 7
      }
      let start = "";
      let end = "";
      end = this.getDay(0);
      start = this.getDay(-6);
      if (this.datatype === 'daterange') {
        this.timeInterval = [start, end];
      }
      if (this.datatype === 'datetimerange') {
        this.timeInterval = [start + ' 00:00:00', end + ' 23:59:59'];
      }
      this.$emit("dataSelect", this.timeInterval);
      this.ruleForm[this.formItem.key] = this.timeInterval;
    }
  },
  methods: {
    onChage($data) {
      if ($data === null) {
        this.onClick_item(this.dateList[0]);
        return;
      }
      this.selectItem = {};
      let timeArr = [];
      if (this.datatype === "daterange") {
        timeArr = [g.utils.date($data[0]), g.utils.date($data[1])];
      } else if (this.datatype === "datetimerange") {
        timeArr = [g.utils.time($data[0]), g.utils.time($data[1])];
      }

      this.$emit("dataSelect", timeArr);
      this.ruleForm[this.formItem.key] = timeArr;
      this.$emit("timeSearch", this.ruleForm)
    },
    onClick_item($item) {
      console.log($item)
      this.selectItem = $item;
      let start = "";
      let end = "";
      if (this.datatype === "daterange") {
        if ($item.label === "今天") {
          start = this.getDay(0);
          end = this.getDay(0);
        } else {
          start = this.getDay(-$item.value + 1);
          end = this.getDay(0);
        }
        this.timeInterval = [start, end];
      } else if (this.datatype === "datetimerange") {
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
      if (this.datatype === "daterange") {
        end = this.getDay(0);
        start = this.getDay(0);
      } else if (this.datatype === "datetimerange") {
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
  color: #409eff;
  background: #E6F1FC;
  border: 1px solid #409eff;
}
</style>
