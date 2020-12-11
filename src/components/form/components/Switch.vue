<template>
  <div>
    <el-switch
      v-model="ruleForm[formItem.key]"
      active-color="#1989FA"
      :active-value="1"
      :inactive-value="0"
      :active-text="activeText"
      :inactive-text="inactive"
      :disabled="formItem.isDisabled"
    ></el-switch>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {};
  },
  computed: {
    activeText() {
      return this.formItem.activeText ? this.formItem.activeText : "";
    },
    inactive() {
      return this.formItem.inactive ? this.formItem.inactive : "";
    },
    activeValue() {
      return this.formItem.activeValue ? this.formItem.activeValue : "";
    },
    inactiveValue() {
      return this.formItem.inactiveValue ? this.formItem.inactiveValue : "";
    }
  },
  methods: {
  }
};
</script>

<style lang='scss'>
</style>
