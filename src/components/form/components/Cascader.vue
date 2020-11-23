<template>
  <div>
    <el-cascader
      v-model="ruleForm[formItem.key]"
      :options="formItem.options"
      @change="handleChange"
      style="max-width:294px;width:294px;"
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
  computed: {},
  created() {},

  methods: {
    handleChange($val) {
      let options = this.$g.utils.deepClone(this.formItem.options);
      options = this.$g.utils.getNestedArr(options, 'children');
      this.ruleForm.addressObj = $val.map(v => {
        const current = options.find(item => item.value === v)
        delete current.children;
        return current
      })
    }
  }
};
</script>

<style></style>
