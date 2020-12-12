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
          :label-width="formItem.labelWidth ? formItem.labelWidth : '100px'"
          :rules="formItem.rules"
        >
          <Cell
              v-if="formItem.render"
              :render="formItem.render"
              slot="label"
          />
          <span slot="label" v-else>{{ formItem.label+(formItem.hideColon?'':':') }}</span>
          <div class="formItem-container" :style="formItem.contentStyle ? formItem.contentStyle : ''">
            <components :is="transType(formItem.type)" ref="formItem" :rule-form="ruleForm" :form-item="formItem"></components>
            <slot :name="formItem.slot"></slot>
            <el-tooltip v-if="formItem.tooltip" class="item" effect="dark" placement="top">
              <div slot="content">
                {{ formItem.tooltip }}
              </div>
              <i class="iconfont iconshuoming tooltip"></i>
            </el-tooltip>
            <!-- 自定义银行限制 -->
            <el-tooltip v-if="formItem.limitTooltip" class="toolItem" :effect="formItem.effect?formItem.effect:'dark'" :offset="5" placement="top-start" style="border:0px">
              <div slot="content">
                <div v-for="(item, index) in formItem.tooltipList" :key="index" class="flex-align-center" style="margin: 5px 0;">
                  <img v-if="item.img" :src="item.img" alt="" style="width:20px;margin-right:5px;">
                  <div>{{ item.txt }}</div>
                </div>
              </div>
              <div class="flex-align-center">
                <i class="iconfont iconshuoming tooltip" style="margin-right:5px;"></i>
                <span v-if="formItem.key === 'bankCard'" style="color: #C2C2C2;">支持的银行</span>
              </div>
            </el-tooltip>
          </div>
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
import Cell from "./expand"
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
import AutoInput from "./components/AutoInput.vue";
import DateTime from "./components/DateTime.vue"
import InputSelect from "./components/inputSelect.vue";
import TicketAddForm from "./components/ticketAddForm.vue";
import CascaderMulti from "./components/CascaderMulti";
import CheckTransfer from "./components/CheckTransfer";
import SelectPage from "@/components/Others/SelectPage";

// import { isUndefined, deepClone } from '@/libs/lit/utils'

export default {
  name: "",
  components: {
    Cell,
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
    AutoInput,
    DateTime,
    InputSelect,
    TicketAddForm,
    CascaderMulti,
    CheckTransfer,
    SelectPage
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
    handleClick() {
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
    resetForm() {
      // 初始化表单
      this.$refs.formTep.resetFields();
    },
    clearForm() {
      // 清空表单
      const promise = new Promise(resolve => {
        clearFormData(this.ruleForm, this.formKeys);
        resolve();
      });

      promise.then(() => {
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
  .formItem-container {
    display: flex;
    .tooltip {
      font-size: 20px;
      color: #C2C2C2;
      margin-left: 4px;
    }
  }
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
