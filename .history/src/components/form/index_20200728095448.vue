<template>
  <div class="">
    <el-form
      ref="formTep"
      class="formTemplate"
      size=""
      :inline="false"
      :label-position="labelPosition"
      :model="ruleForm"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot name="form-item"></slot>
      <slot name="btn"></slot>
      <template v-for="formItem in formBaseData">
        <el-form-item
          v-if="formItem.isShow?formItem.isShow(ruleForm):true"
          :key="formItem.key"
          class="formTemplate-item"
          :prop="formItem.key"
          :label="formItem.label+(formItem.hideColon?'':':')"
          :rules="formItem.rules"
        >
          <components :is="transType(formItem.type)" :rule-form="ruleForm" :form-item="formItem"></components>
        </el-form-item>
      </template>
    </el-form>
    <div v-if="showFootBtn" class="foot_btn_box">
      <el-button class="foot_btn" type="primary" @click="handleClick">{{ footBtnLabel }}</el-button>
      <el-button v-if="showFootReset" class="foot_btn" @click="resetForm">重置</el-button>
      <el-button v-if="showFootClear" class="foot_btn" @click="clearForm">清空</el-button>
      <el-button v-if="showFootCancel" class="foot_btn" @click="cancelForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import * as g from "@/libs/global";
import {
  transFormType,
  clearFormData,
  formatFormData
} from "@/libs/kit/formFns.js";
import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import Check from "./components/Check.vue";
import Date from "./components/Date.vue";
import iSwitch from "./components/Switch.vue";
import Radio from "./components/Radio.vue";
import Upload from "./components/Upload.vue";
import Tinymce from "./components/Tinymce/index.vue";
import Cascader from "./components/Cascader.vue";
import UploadFile from "./components/UploadFile";
import Show from "./components/Show";
import DatePicker from "./components/DatePicker.vue";
import SelectInput from "./components/SelectInput.vue";
import DateTime from "./components/DateTime.vue";
import DateMonth from "./components/DateMonth.vue"

// import { isUndefined, deepClone } from '@/libs/lit/utils'

export default {
  name: "",
  components: {
    Input,
    Select,
    Check,
    Date,
    iSwitch,
    Radio,
    Upload,
    Tinymce,
    Cascader,
    UploadFile,
    Show,
    DatePicker,
    SelectInput,
    DateTime,
    DateMonth
  },
  props: {
    formBaseData: Array,
    rules: Object,
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
    }
  },
  data() {
    return {
      ruleForm: {},
      formKeys: []
    };
  },
  watch: {
    formBaseData: function($value, $old) {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 初始化 绑定初始值
      this.ruleForm = {}
      if (this.formBaseData.length > 0) {
        for (const iterator of this.formBaseData) {
          console.log("iterator", iterator);
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
      this.$emit("confirm", this.ruleForm, this.formKeys);
    },
    resetForm() {
      // 初始化表单
      this.$refs.formTep.resetFields();
    },
    clearForm() {
      // 清空表单
      const p = () =>
        new Promise(resolve => {
          clearFormData(this.ruleForm, this.formKeys);
          resolve();
        });
      p().then(() => {
        this.$refs.formTep.clearValidate();
      });
    },
    cancelForm() {
      // 初始化表单
      this.$emit("cancel");
    },
    transType(value) {
      // 获取表单项类型
      return transFormType(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.formTemplate {
  margin: 40px 20px 0;
}
.formTemplate-item {
  margin-right: 20px;
}

.foot_btn_box {
  width: 100%;
  height: 96px;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  .foot_btn {
    width: 113px;
    height: 40px;
    margin-top: 28px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .form_box {
    margin: 0 59px;
  }
}
</style>
