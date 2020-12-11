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
    >
      <template v-if="formItem.isShowSlot" slot="append">
        <span>{{ formItem.showSlotName }}</span>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean
  },
  data() {
    return {};
  },
  computed: {
    placeholder() {
      const item = this.formItem;
      return item.placeholder ? item.placeholder : `请输入${item.label}`;
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
      return item.style ? item.style : "";
    },
    isDisabled() {
      if (this.$g.utils.isFunction(this.formItem.isDisabled)) {
        return this.formItem.isDisabled(this.ruleForm)
      } else {
        return this.formItem.isDisabled
      }
    }
  },

  methods: {}
};
</script>

<style lang='scss'>
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
