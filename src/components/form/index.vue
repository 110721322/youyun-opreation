<template>
  <div class="">
    <div :class="[isDrawer?'content-drawer':'']">
      <el-form
        ref="formTep"
        :class="[isDrawer?'formTemplate-drawer':'formTemplate']"
        size=""
        :inline="false"
        :label-position="labelPosition"
        :model="ruleForm"
        :rules="rules"
        :label-width="labelWidth"
      >
        <template v-for="formItem in formBaseData">
          <el-form-item
            v-if="isShow(formItem)"
            :key="formItem.key"
            class="formTemplate-item"
            :prop="formItem.key"
            :label="formItem.label+(formItem.hideColon?'':':')"
            :rules="formItem.rules"
          >
            <components :is="transType(formItem.type)" ref="formItem" :rule-form="ruleForm" :form-item="formItem"></components>
            <span v-if="formItem.tip" style="font-size: 12px;color: #909399;">{{ formItem.tip }}</span>
            <slot :name="formItem.slot"></slot>
            <el-tooltip v-if="formItem.tooltip" effect="dark" :content="formItem.tooltip" placement="top">
              <i class="iconfont iconshuoming tooltip"></i>
            </el-tooltip>
          </el-form-item>
        </template>
        <slot name="content"></slot>
      </el-form>
    </div>
    <div v-if="showFootBtn" :class="[isDrawer?'foot-btn-box-drawer':'foot-btn-box']">
      <el-button size="normal" type="primary" @click="clickFootBtn">{{ footBtnLabel }}</el-button>
      <el-button v-if="showFootReset" size="normal" @click="clickResetForm">重置</el-button>
      <el-button v-if="showFootClear" size="normal" @click="clickClearForm">清空</el-button>
      <el-button v-if="showFootCancel" size="normal" @click="clickCancelForm">取消</el-button>
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
import DateTime from "./components/DateTime.vue"
import InputSelect from "./inputSelect.vue";
import TicketAddForm from "./ticketAddForm.vue";

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
    InputSelect,
    TicketAddForm
  },
  props: {
    formBaseData: {
      type: Array,
      default() {
        return []
      }
    },
    rules: Object,
    showFootBtn: {
      type: Boolean,
      default() {
        return true;
      }
    },
    isDrawer: {
      type: Boolean,
      default() {
        return false;
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
      default: "120px"
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
    isShow($formItem) {
      if (this.$g.utils.isFunction($formItem.isShow)) {
        return $formItem.isShow(this.ruleForm)
      } else if (this.$g.utils.isBoolean($formItem.isShow)) {
        return $formItem.isShow
      } else {
        return true
      }
    },
    init() {
      // 初始化 绑定初始值
      this.ruleForm = {}
      if (this.formBaseData.length > 0) {
        for (const iterator of this.formBaseData) {
          let initVal = iterator.initVal;
          if (g.utils.isUndefined(initVal)) {
            initVal = null;
          }
          this.formKeys.push(iterator.key);
          this.$set(this.ruleForm, iterator.key, initVal);
        }
        if (this.$refs.formItem && this.$g.utils.isArr(this.$refs.formItem)) {
          for (const componentFormItem of this.$refs.formItem) {
            if (componentFormItem.initVal) {
              componentFormItem.initVal();
            }
          }
        }
      }
    },
    clickFootBtn() {
      let validateStatus;
      this.$refs.formTep.validate(valid => {
        // 校验
        if (valid) {
          const formInfo = g.utils.deepClone(this.ruleForm);
          // 统一过滤表单
          formatFormData(formInfo, this.formKeys);
          validateStatus = true;
        } else {
          validateStatus = false;
          return false;
        }
      });
      if (validateStatus) {
        this.$emit("confirm", this.ruleForm, this.formKeys);
        return this.ruleForm
      } else {
        return false;
      }
    },
    clickResetForm() {
      // 初始化表单
      this.$refs.formTep.resetFields();
    },
    clickClearForm() {
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
    clickCancelForm() {
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
.formTemplate-drawer {
  margin: 0;
  padding: 40px 20px 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
  flex: 1;
  box-sizing: border-box;
}
.formTemplate-item {
  margin-right: 20px;
}
.content-drawer {
    height: calc(100vh - 172px);
    overflow: hidden;
}
.foot-btn-box {
  width: 100%;
  // height: 96px;
  border-top: 1px solid #ebeef5;
  // position: absolute;
  // bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding: 16px 0;
  // .foot_btn {
  //   // width: 113px;
  //   // height: 40px;
  //   // margin-top: 28px;
  //   // margin-left: 12px;
  //   // margin-right: 12px;
  //   padding: 15px;
  // }
  .form-box {
    margin: 0 59px;
  }
}
.foot-btn-box-drawer {
  width: 500px;
  // height: 96px;
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding: 16px 0;
  // .foot_btn {
  //   // width: 113px;
  //   // height: 40px;
  //   // margin-top: 28px;
  //   // margin-left: 12px;
  //   // margin-right: 12px;
  //   padding: 15px;
  // }
  .form-box {
    margin: 0 59px;
  }
}
</style>
