<template>
  <div>
    <el-radio
      v-for="item in radioOptions"
      :key="item.value"
      v-model="ruleForm[formItem.key]"
      :label="item.value"
      :disabled='isDisabled'
      v-show="!item.hideRadio"
      @change="change"
    >{{ item.label }}</el-radio>
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
    return {
      radioOptions: []
    };
  },
  computed: {
    options() {
      return this.formItem.options
    },
    isDisabled() {
      if (this.$g.utils.isFunction(this.formItem.isDisabled)) {
        return this.formItem.isDisabled(this.ruleForm)
      } else {
        return this.formItem.isDisabled;
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.newArr();
      },
      deep: true
    }
  },
  created() {
    this.newArr();
    if (this.formItem.initVal) {
      this.ruleForm[this.formItem.key] = this.formItem.initVal
    }
  },
  methods: {
    newArr() {
      const options = this.formItem.options;
      if (options) {
        this.radioOptions = options;
      } else {
        const urlOptions = this.formItem.urlOptions;
        urlOptions.url()
          .then(res => {
            this.radioOptions = res.data.map(item => {
              return {
                value: item[urlOptions.keyName],
                label: item[urlOptions.valueName]
              }
            })
          })
      }
    },
    change($val) {
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, $val)
      }
    }
  }
};
</script>

<style lang="scss"></style>
