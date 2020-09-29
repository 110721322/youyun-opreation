<template>
  <div
    :class="['s_box', isShowAll ? 'is_show_all' : '']"
    :style="isOpen ? ('height: auto' + ';overflow:auto') : 'overflow:hidden'"
  >
    <el-row style="width: 100%">
      <el-col :span="isShowAll ? 18 : 17">
        <el-form
          ref="formTep"
          size="large"
          :inline="false"
          :label-position="labelPosition"
          :model="ruleForm"
          :rules="rules"
          :label-width="labelWidth"
          :class="['form-inline', isShowAll ? 'is_show_all' : '']"
          :style="isOpen ? ('height: auto' + ';overflow:auto') : 'overflow:hidden'"
        >
          <el-row>
            <el-col
              v-for="formItem in formBaseData"
              :key="formItem.key"
              :span="formItem.span ? formItem.span : 8"
            >
              <el-form-item
                :prop="formItem.key"
                :label="formItem.label + ':'"
                :rules="formItem.rules"
                :class="[formItem.class]"
                :label-width="formItem.labelWidth"
              >
                <components
                  :is="transType(formItem.type)"
                  :rule-form="ruleForm"
                  :form-item="formItem"
                  :type="formItem.timeType"
                  :is-rest="isRest"
                  @dataSelect="handleDataSelect"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="isShowAll ? 6 : 7">
        <div class="btn_list" style="margin-bottom:0" :style="btnListStyle">
          <el-button v-has="permission.search" type="primary" size="large" @click="handleClick">搜索</el-button>
          <el-button plain size="large" @click="resetForm">重置</el-button>
          <div v-show="!isShowAll" v-has="permission.condition" class="open_btn" @click="onClick_openOrClose">
            <span v-show="!isOpen">展开</span>
            <span v-show="isOpen">收起</span>
            <i :class="['el-icon-arrow-down', 'more', isOpen ? 'down' : '']" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import DateSelect from '@/components/dateSelect.vue'
import * as g from "@/libs/global";
import {
  transFormType,
  formatFormData
} from "@/libs/kit/formFns.js";
import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import Tinymce from "./components/Tinymce/index.vue";
import DateSelect from "./components/DateSelect.vue";
import DatePicker from "./components/DatePicker.vue";
import SelectInput from "./components/SelectInput.vue";
import Cascader from "./components/Cascader.vue";
import TicketAddForm from "./../form/ticketAddForm.vue";
import Date from "../form/components/Date";

export default {
  name: "Search",
  components: {
    Input,
    Select,
    Date,
    Tinymce,
    DateSelect,
    SelectInput,
    Cascader,
    DatePicker,
    TicketAddForm
  },
  props: {
    isShowAll: {
      type: Boolean,
      default() {
        return false;
      }
    },
    btnListStyle: {
      type: String,
      default() {
        return ""
      }
    },
    formBaseData: Array,
    rules: Object,
    openHeight: String,
    showFootBtn: {
      type: Boolean,
      default() {
        return true;
      }
    },
    showFootCancel: {
      type: Boolean,
      default() {
        return true;
      }
    },
    footBtnLabel: {
      type: String,
      default: "保存"
    },
    labelPosition: {
      type: String,
      default: "right"
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    showFootReset: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showFootClear: {
      type: Boolean,
      default() {
        return false;
      }
    },
    permission: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      ruleForm: {},
      formKeys: [],
      isOpen: false,
      isRest: false
    };
  },
  watch: {},
  created() {
    this.init();
    console.log(this.formBaseData);
  },
  methods: {
    handleDataSelect($time) {
      this.$emit("dataSelect", $time);
    },
    init() {
      if (this.formBaseData.length > 0) {
        for (const iterator of this.formBaseData) {
          let initVal = iterator.initVal;
          if (g.utils.isUndefined(initVal)) {
            initVal = null;
          }
          this.formKeys.push(iterator.key);
          this.$set(this.ruleForm, iterator.key, initVal);
        }
      }
    },
    handleClick() {
      this.$refs.formTep.validate(valid => {
        // 校验
        if (valid) {
          const formInfo = g.utils.deepClone(this.ruleForm);
          // 统一过滤表单
          formatFormData(formInfo, this.formKeys);
        }
      });
      this.$emit("search", this.ruleForm);
    },
    resetForm() {
      // 初始化表单
      this.isRest = true;
      setTimeout(() => {
      }, 500);
      this.$nextTick(() => {
        this.isRest = false;
        this.$refs.formTep.resetFields();
        this.$emit("reset", this.ruleForm);
        this.$emit("search", this.ruleForm);
      })
    },
    transType(value) {
      // 获取表单项类型
      return transFormType(value);
    },

    onClick_openOrClose() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.s_box {
  height: 88px;
  padding: 24px;
  background: rgba(255, 255, 255, 1);
  margin: 24px 24px 0;
  transition: all 0.5s;
}
.s_box::-webkit-scrollbar {
  display:none
}
.is_show_all {
  height: auto !important;
}
.btn_list {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-left: 16px;
}
.is_show_all .btn_list {
  bottom: 25px;
}
.open_btn {
  /* float: right; */
  margin-left: 12px;
  line-height: 40px;
  color: #1890ff;
  cursor: pointer;
  user-select: none;
}
.form-inline {
  height: 40px;
  overflow: auto;
  transition: all 0.5s;
  flex-grow: 1;
  flex-shrink: 1;
}
.form-inline::-webkit-scrollbar {
  display:none
}
.el-select .el-input {
  width: 130px;
}
.input-with-select {
  /* width: 774px; */
}

.more {
  transition: 0.5s;
}
.down {
  transform: rotate(180deg);
}

.el-form-item {
  margin-bottom: 16px !important;
  margin-top: 0px !important;
}
.formTemplate-item {
  float: left !important;
}
.max-width {
  width: 100%;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
</style>
