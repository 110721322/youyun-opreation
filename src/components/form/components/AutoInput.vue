<template>
  <div>
    <el-autocomplete
        v-model="ruleForm[formItem.key]"
        :style="inputStyle"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-key="formItem.valueKey"
        :debpunce="formItem.debounce"
        :placement="formItem.placement"
        :trigger-on-focus="formItem.triggerOnFocus"
        :fetch-suggestions="querySearchAsync"
        @select="selectEvent"
    ></el-autocomplete>
  </div>
</template>

<script>
  export default {
    name: "AutoInput",
    props: {
      ruleForm: Object,
      formItem: Object
    },
    computed: {
      placeholder() {
        if (this.$g.utils.isFunction(this.formItem.placeholder)) {
          return this.formItem.placeholder(this.ruleForm)
        } else {
          return this.formItem.placeholder ? this.formItem.placeholder : `请输入${this.formItem.label}`;
        }
      },
      disabled() {
        if (this.$g.utils.isFunction(this.formItem.disabled)) {
          return this.formItem.disabled(this.ruleForm);
        } else {
          return this.formItem.disabled;
        }
      },
      inputStyle() {
        const item = this.formItem;
        return item.style ? item.style : "width:294px";
      }
    },
    methods: {
      querySearchAsync($queryString, $callback) {
        const { apiService, searchKey, params } = this.formItem.urlOptions;
        if (this.$g.utils.isFunction(apiService)) {
          params[searchKey] = $queryString;
          apiService(params).then(res => {
            if (!this.$g.utils.isArr(res.data)) {
              $callback([])
              return res;
            }
            $callback(res.data)
          }).catch(() => {
            $callback([])
          })
        }
      },
      selectEvent($val) {
        if (this.$g.utils.isFunction(this.formItem.callback)) {
          this.formItem.callback(this.ruleForm, $val)
        }
      }
    }
  }
</script>

<style scoped>

</style>
