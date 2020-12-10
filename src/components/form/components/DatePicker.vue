<template>
  <div>
    <el-date-picker
      v-model="timeInterval"
      style="float: left;"
      :style="inputStyle"
      size="small"
      :type="datatype"
      :placeholder="placeholder"
      :clearable="clearable"
      :picker-options="pickerOptions"
      :value-format="format"
      :disabled="formItem.checked"
      @change="onChage"
    >
    </el-date-picker>
    <el-checkbox v-if="formItem.hasChecked" v-model="formItem.checked" @change="checkChange" style="margin-left:15px">长期有效</el-checkbox>
  </div>
</template>
<script type="text/ecmascript-6">
// import * as g from "@/libs/global";

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
    }
  },
  data() {
    return {
      timeInterval: null,
      placeholder: this.formItem.placeholder,
      datatype: this.formItem.datatype,
      format: this.formItem.format
    };
  },
  watch: {
    initVal: {
      handler() {
        this.setInitVal();
      },
      deep: true
    }
  },
  computed: {
    inputStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px;float: left;";
    },
    initVal() {
      if (this.formItem.initVal) {
        return this.formItem.initVal;
      } else {
        return ''
      }
    }
  },
  created() {
    this.setInitVal()
  },
  methods: {
    onChage($data) {
      console.log($data)
      this.$emit("select", $data);
      this.ruleForm[this.formItem.key] = $data;
    },
    setInitVal() {
      if (this.formItem.initVal) {
        this.timeInterval = this.formItem.initVal
      } else {
        this.timeInterval = ''
      }
    },
    checkChange(val) {
      if (val) {
        this.timeInterval = '2199-12-31'
        this.ruleForm[this.formItem.key] = '2199-12-31'
      } else {
        this.timeInterval = ''
        this.ruleForm[this.formItem.key] = ''
      }
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/scss" scoped>
.date-item {
  float: left;
  height: 40px;
  width: 77px;
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
  border: 1px solid #409eff;
}
</style>
