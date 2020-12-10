<template>
  <div>
    <el-cascader
      v-model="ruleForm[formItem.key]"
      :style="selectStyle"
      :options="options"
      :props="formItem.props"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {};
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:100%";
    },
    options() {
      if (this.$g.utils.isFunction(this.formItem.options)) {
        return this.formItem.options();
      } else {
        return this.formItem.options
      }
    }
  },
  methods: {
    handleChange() {
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm)
      }
      if (this.$g.utils.isString(this.formItem.emitEventBus)) {
        this.$EventBus.$emit(this.formItem.emitEventBus, this.ruleForm[this.formItem.key])
      }
    }
  }
};
</script>

<style></style>
