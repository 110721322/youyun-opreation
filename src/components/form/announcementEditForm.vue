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
      <div v-for="formItem in formBaseData" :key="formItem.key">
        <el-form-item
          v-if="formItem.isShow?formItem.isShow(ruleForm):true"
          :key="formItem.key"
          class="formTemplate-item"
          :prop="formItem.key"
          :label="formItem.label+':'"
          :rules="formItem.rules"
        >
          <components :is="transType(formItem.type)" :rule-form="ruleForm" :form-item="formItem">
            <template v-if="formItem.showSec" slot="append">
              <span style="margin-left:8px;">秒</span>
            </template>
          </components>

          <!-- <template v-if="formItem.showDemoImg">
            <div class="demoImg" @click="clickShowDemoImg">
              查看示例:
              <img :src="formItem.demoImgUrl" />
            </div>
          </template>
          <el-dialog title="查看示例" :visible.sync="dialogTableVisible">
            <img :src="formItem.demoImgUrl" />
          </el-dialog> -->
        </el-form-item>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="normal" @click="clickSubmit">提交</el-button>
        <el-button plain size="normal" @click="clickCannel">取消</el-button>
      </div>
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
import AppDate from "./components/AppDate.vue";
import iSwitch from "./components/Switch.vue";
import Radio from "./components/Radio.vue";
import Tinymce from "./components/Tinymce/index.vue";

export default {
  name: "AnnouncementEditForm",
  components: {
    Input,
    Select,
    Check,
    AppDate,
    iSwitch,
    Radio,
    Tinymce
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
      formKeys: [],
      showMoreForm: false,
      inputDisable: true
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
    clickShowDemoImg() {
      this.dialogTableVisible = true;
    },
    clickSubmit() {
      this.$refs.formTep.validate(valid => {
        // 校验
        if (valid) {
          const formInfo = g.utils.deepClone(this.ruleForm);
          // 统一过滤表单
          formatFormData(formInfo, this.formKeys);
        }
      });
      this.$emit("commit", this.ruleForm);
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
    clickCannel() {
      // 初始化表单
      // this.$emit("cancel");
      this.$router.back();
    },
    transType(value) {
      // 获取表单项类型
      return transFormType(value);
    },
    clickShowDemo() {}
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
.btn-box {
  margin-top: 24px;
  margin-left: 81px;
  margin-bottom: 24px;
  // .btn {
  //   width: 113px;
  //   height: 40px;
  //   border-radius: 4px;
  // }
}
.demoImg {
  position: absolute;
  top: -7px;
  margin-left: 37px;
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(25, 137, 250, 1);
  line-height: 14px;
  img {
    margin-left: 4px;
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 1);
    border-radius: 4px;
    opacity: 0.4;
    vertical-align: middle;
  }
}
</style>
