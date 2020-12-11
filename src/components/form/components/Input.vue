<template>
  <div>
    <el-input
      v-model="ruleForm[formItem.key]"
      :placeholder="placeholder"
      :type="inputType"
      :rows="row"
      :maxlength="maxlength"
      show-word-limit
      :show-password="showPsd"
      clearable
      :style="inputStyle"
      :disabled="isDisabled"
      @blur="blurEvents"
    >
      <template v-if="formItem.isShowSlot" slot="append">
        <span>{{ formItem.showSlotName }}</span>
      </template>
    </el-input>
    <!-- 查看示例 -->
    <span v-if="formItem.isShowExample" style="font-size: 14px;color: #1989FA;cursor:pointer;margin-left:12px;" @click="showViewer=true">{{ formItem.showExampleName }}</span>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[exampleImg]" />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: { ElImageViewer },
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean
  },
  data() {
    return {
      showViewer: false,
      exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
    };
  },
  computed: {
    placeholder() {
      const item = this.formItem;
      if (this.$g.utils.isFunction(item.placeholder)) {
        return item.placeholder(this.ruleForm)
      } else {
        return item.placeholder ? item.placeholder : `请输入${item.label}`;
      }
    },
    inputType() {
      const item = this.formItem;
      return item.inputType ? item.inputType : "text";
    },
    maxlength() {
      const item = this.formItem;
      return item.maxlength ? item.maxlength : null;
    },
    showPsd() {
      return this.inputType === "password";
    },
    row() {
      const item = this.formItem;
      return item.row ? item.row : 4;
    },
    inputStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
    },
    isDisabled() {
      if (this.$g.utils.isFunction(this.formItem.isDisabled)) {
        return this.formItem.isDisabled(this.ruleForm)
      } else {
        return this.formItem.isDisabled
      }
    }
  },

  methods: {
    blurEvents() {
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm)
      }
    },
    closeViewer() {
      this.showViewer = false
    }
  }
};
</script>

<style lang='scss'>
</style>
