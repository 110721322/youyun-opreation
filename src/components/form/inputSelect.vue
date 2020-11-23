<template>
  <div>
    <div :class="selectClass">
      <el-select
        v-model="ruleForm[formItem.key]"
        :multiple="isArray(formItem.initVal)"
        :filterable="formItem.isSearch"
        :clearable="selectClearable"
        :remote="formItem.isSearch"
        :placeholder="placeholder"
        :remote-method="remoteMethod"
        :disabled="formItem.isDisabled"
        style="margin-bottom:22px;width:294px"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div v-if="ruleForm[formItem.key] === 0 || !ruleForm[formItem.key]">
      <el-input
        v-model="inputForm"
        class="input-with-select"
        @input="onInput"
      ></el-input>
      <el-select
        slot="prepend"
        v-model="inputSelect"
        style="width:146px"
        placeholder="请选择"
        @change="onSelect"
      >
        <el-option label="天" :value="0"></el-option>
        <el-option label="小时" :value="1"></el-option>
      </el-select>
    </div>
    <div v-else>
      <el-date-picker
        v-model="timeInterval"
        style="float: left;"
        size="large"
        :type="dateType"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="clearable"
        :default-time="defaultTime"
        :picker-options="pickerOptions"
        @change="onChage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputSelect",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean,
    isRest: Boolean,
    remoteMethod: Function,
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
    dateType: {
      type: String,
      default: "datetimerange"
    }
  },
  data() {
    return {
      inputSelect: "",
      inputForm: "",
      selectOption: null,
      autoCompleteList: [],
      timeInterval: '',
      selectOptions: [],
      defaultTime: [],
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
      selectItem: {
        label: "近7天",
        value: 7
      },
      datatype: this.formItem.datatype,
      format: this.formItem.format
    };
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
    },

    placeholder() {
      const item = this.formItem;
      return item.placeholder ? item.placeholder : `请选择${item.label}`;
    },
    selectClass() {
      const item = this.formItem;
      return item.className ? item.className : "";
    },
    selectClearable() {
      const item = this.formItem;
      return item.clearable ? item.clearable : false;
    }
  },
  watch: {
    isRest: function($new) {
      if ($new) {
        this.inputSelect = this.formItem.options[0].value;
        this.inputForm = "";
        this.onInput();
        this.onSelect();
        if (this.formItem.isSelectToday) {
          this.dateList[0].label = "今天";
        }

        if (this.dateType === "datetimerange") {
          this.defaultTime = ["00:00:00", "23:59:59"];
        }
        this.onClick_item(this.dateList[0]);
      }
    }
  },
  created() {
    this.inputSelect = this.formItem.options[0].value;
    this.selectOption = this.formItem.options[0];
    this.selectOptionsFun();
    if (this.formItem.isSelectToday) {
      this.dateList[0].label = "今天";
    }

    if (this.dateType === "datetimerange") {
      this.defaultTime = ["00:00:00", "23:59:59"];
    }
    this.onClick_item(this.dateList[0]);
  },
  methods: {
    isArray(value) {
      return this.$g.utils.isArr(value);
    },
    selectOptionsFun() {
      const { options, urlOptions } = this.formItem;
      if (!options && !urlOptions) {
        throw new ReferenceError(
          'options or urlOptions" does not exist.open fn.js and add it'
        );
      }
      if (options) {
        this.selectOptions = options;
      } else {
        this.getUrlOptions(urlOptions.params)
      }
    },
    /**
     * 调用api获取下拉列表
     * @param $params
     */
    getUrlOptions($params) {
      const { urlOptions } = this.formItem;
      return urlOptions
        .url($params || {})
        .then(res => {
          if (!this.$g.utils.isArr(res.data)) {
            this.selectOptions = [];
          } else {
            this.selectOptions = res.data.map(item => {
              return {
                label: item[urlOptions.keyName],
                value: item[urlOptions.valueName]
              }
            })
          }
          return this.selectOptions
        })
    },
    onInput() {
      this.ruleForm.inputSelect = this.selectOption.valueKey ? this.selectOption.valueKey : this.inputSelect;
      this.ruleForm.inputForm = this.inputForm;
      if (this.ruleForm.inputSelect === 0) {
        this.ruleForm.promoCodeTime = 'D-' + this.ruleForm.inputForm
      } else {
        this.ruleForm.promoCodeTime = 'H-' + this.ruleForm.inputForm
      }
    },
    onSelect() {
      this.inputForm = null;
      this.selectOption = this.formItem.options.filter(ele => ele.value === this.inputSelect)[0];
      this.ruleForm.inputSelect = this.selectOption.valueKey ? this.selectOption.valueKey : this.inputSelect;
    },
    onChage($data) {
      if ($data === null) {
        this.onClick_item(this.dateList[0]);
        return;
      }
      this.selectItem = {};
      let timeArr = [];
      if (this.dateType === "daterange") {
        timeArr = [this.$g.utils.date($data[0]), this.$g.utils.date($data[1])];
      } else if (this.dateType === "datetimerange") {
        timeArr = [this.$g.utils.time($data[0]), this.$g.utils.time($data[1])];
      }

      this.$emit("dataSelect", timeArr);
      this.ruleForm[this.formItem.dateKey] = timeArr;
    },
    onClick_item($item) {
      this.selectItem = $item;
      if (this.dateType === "daterange") {
        let start = "";
        let end = "";
        if ($item.label === "今天") {
          end = this.getDay(0);
          start = this.getDay(-$item.value + 1);
        } else {
          end = this.getDay(-1);
          start = this.getDay(-$item.value);
        }
        this.timeInterval = [start, end];
      } else if (this.dateType === "datetimerange") {
        let start = "";
        let end = "";
        if ($item.label === "今天") {
          end = this.getDay(0) + " 23:59:59";
          start = this.getDay(-($item.value - 1)) + " 00:00:00";
        } else {
          end = this.getDay(-1) + " 23:59:59";
          start = this.getDay(-$item.value) + " 00:00:00";
        }
        this.timeInterval = [start, end];
      }

      this.$emit("dataSelect", this.timeInterval);
      this.ruleForm[this.formItem.dateKey] = this.timeInterval;
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

<style lang="scss" scoped>
.input-with-select {
  width:146px;
}

.el-select .el-input {
  width: 146px;
}
</style>
