<template>
  <div>
    <el-switch
      v-model="ruleForm[formItem.key]"
      active-color="#1989FA"
      :active-text="activeText"
      :active-value="activeValue"
      :inactive-text="inactive"
      :inactive-value="inactiveValue"
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

  methods: {}
};
</script>

<style lang='scss'>
</style>
