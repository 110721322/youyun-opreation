<template>
  <div>
    <el-radio
      v-for="(item, index) in radioOptions"
      :key="index"
      v-model="ruleForm[formItem.key]"
      :label="item.value"
      :disabled="formItem.isDisabled"
    >{{ item.label }}</el-radio>
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
    return {
      radioOptions: []
    };
  },
  created() {
    this.newArr();
  },
  methods: {
    newArr() {
      const options = this.formItem.options;
      if (options) {
        this.radioOptions = options;
      } else {
        const urlOptions = this.formItem.urlOptions;
        urlOptions.url({})
          .then(res => {
            const newArr = [];
            for (const item of res.datas) {
              newArr.push({
                value: item[urlOptions.keyName],
                label: item[urlOptions.valueName]
              });
            }
            this.radioOptions = newArr;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss"></style>
