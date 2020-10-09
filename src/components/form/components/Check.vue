<template>
  <div>
    <el-checkbox-group v-model="ruleForm[formItem.key]">
      <el-checkbox
        v-for="item in checkOptions"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      >{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "Check",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {
      checkOptions: []
    };
  },
  computed: {},
  created() {
    this.checkOptionsFun();
  },
  methods: {
    checkOptionsFun() {
      const options = this.formItem.options;
      if (options) {
        this.checkOptions = options;
      } else {
        const urlOptions = this.formItem.urlOptions;
        urlOptions.url({}).then(res => {
          const newArr = [];
          res.object.forEach(item => {
            newArr.push({
              value: item[urlOptions.keyName],
              label: item[urlOptions.valueName]
            });
          });
          this.checkOptions = newArr;
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>
<style lang="scss"></style>
