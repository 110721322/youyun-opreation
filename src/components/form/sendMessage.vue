<template>
  <div class>
    <el-form
      ref="formTep"
      class="formTemplate"
      size
      :inline="false"
      :label-position="labelPosition"
      :model="ruleForm"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot name="form-item"></slot>
      <slot name="btn"></slot>
      <el-form-item
        v-for="formItem in formBaseData"
        :key="formItem.key"
        class="formTemplate-item"
        :prop="formItem.key"
        :label="formItem.label+':'"
        :rules="formItem.rules"
      >
        <components :is="transType(formItem.type)" :rule-form="ruleForm" :form-item="formItem"></components>
      </el-form-item>

      <el-button type="primary" class="sent_btn">发送</el-button>
    </el-form>
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
// import { isUndefined, deepClone } from '@/libs/lit/utils'

export default {
  name: "",
  components: {
    Input,
    Select,
    Check,
    Date,
    iSwitch,
    Radio
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
  created() {
    this.init();
  },
  methods: {
    init() {
      // 初始化 绑定初始值
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
  margin: 40px 59px 0;
}
.formTemplate-item {
  margin-right: 20px;
}
.sent_btn {
  display: block;
  margin: 14px auto;
  width: 113px;
  height: 40px;
  background: rgba(25, 137, 250, 1);
  border-radius: 4px;
}
</style>
