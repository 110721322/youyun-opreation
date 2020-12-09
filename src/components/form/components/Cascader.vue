<template>
  <div>
    <el-cascader
      v-model="ruleForm[formItem.key]"
      :options="formItem.options"
      style="max-width:294px;width:294px;"
      @change="changeVal"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "Cascader",
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
    changeVal(val) {
      const options = JSON.parse(JSON.stringify(this.formItem.options));
      const obj = [];
      obj[0] = options.find(item => {
        return item.value === val[0];
      });
      if (obj[0].children) {
        obj[1] = obj[0].children.find(item => {
          return item.value === val[1];
        });
      }
      if (obj[1].children) {
        obj[2] = obj[1].children.find(item => {
          return item.value === val[2];
        });
      }
      obj.forEach(item => {
        delete item.children;
      });
      this.ruleForm.addressObj = obj;
    }
  }
};
</script>

<style></style>
