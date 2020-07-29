<template>
  <div
    :class="['s_box', isShowAll ? 'is_show_all' : '']"
    :style="isOpen ? 'height:' + openHeight + 'px' : ''"
  >
    <el-form
      ref="formTep"
      size="large"
      :inline="false"
      :label-position="labelPosition"
      :model="ruleForm"
      :rules="rules"
      :label-width="labelWidth"
      :class="['form-inline', isShowAll ? 'is_show_all' : '']"
      :style="isOpen ? 'height:' + (Number(openHeight) - 40) + 'px' : ''"
    >
      <el-form-item
        v-for="formItem in formBaseData"
        :key="formItem.key"
        :prop="formItem.key"
        :label="formItem.label + ':'"
        :rules="formItem.rules"
        :class="['formTemplate-item', formItem.class]"
        :label-width="formItem.labelWidth"
      >
        <!-- <components
          :is="transType(formItem.type)"
          :rule-form="ruleForm"
          :form-item="formItem"
          :is-rest="isRest"
          @dataSelect="handleDataSelect"
        /> -->
      </el-form-item>

      <div class="btn_list" style="margin-bottom:0">
        <el-button type="primary" size="large" @click="handleClick">搜索</el-button>
        <el-button plain size="large" @click="resetForm">重置</el-button>
        <div v-show="!isShowAll" class="open_btn" @click="onClick_openOrClose">
          <span v-show="!isOpen">展开</span>
          <span v-show="isOpen">收起</span>

          <i :class="['el-icon-arrow-down', 'more', isOpen ? 'down' : '']" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
// import DateSelect from '@/components/dateSelect.vue'
import * as g from "@/libs/global";
import {
  transFormType,
  formatFormData
} from "@/libs/kit/formFns.js";
// import Input from "./components/Input.vue";
// import Select from "./components/Select.vue";
// import Tinymce from "./components/Tinymce/index.vue";
// import DateSelect from "./components/DateSelect.vue";
// import DatePicker from "./components/DatePicker.vue";
// import SelectInput from "./components/SelectInput.vue";
// import Cascader from "./components/Cascader.vue";

export default {
  name: "Search",
  components: {
    // Input,
    // Select,
    // Date,
    // Tinymce,
    // DateSelect,
    // SelectInput,
    // Cascader,
    // DatePicker
  },
  props: {
    isShowAll: {
      type: Boolean,
      default() {
        return false;
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
    // console.log(this.formBaseData);
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
        this.isRest = false;
      }, 500);
      this.$refs.formTep.resetFields();
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
  background: rgba(255, 255, 255, 1);
  margin: 24px 24px 0;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  min-width: 1000px;
}
.is_show_all {
  height: auto !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}
.is_show_all .btn_list {
  bottom: 25px;
}
.open_btn {
  float: right;
  margin-left: 16px;
  line-height: 40px;
  color: #1890ff;
  cursor: pointer;
  user-select: none;
}
.form-inline {
  margin: 27px 24px 10px;
  height: 40px;
  overflow: hidden;
  transition: 0.5s;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select {
  width: 774px;
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
