<template>
  <div :class="selectClass">
    <el-select
      v-model="ruleForm[formItem.key]"
      :multiple="isArray(formItem.initVal)"
      :filterable="formItem.isSearch"
      :clearable="selectClearable"
      :remote="formItem.isSearch"
      :placeholder="placeholder"
      :remote-method="remoteMethod"
      :loading="formItem.isSearch && loading"
      :disabled="formItem.isDisabled"
      :style="selectStyle"
      @change="changeEvent"
      @visible-change="visibleChange"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import * as g from "@/libs/global";

export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {
      selectOptions: [],
      loading: false
    };
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px;max-width: 294px;";
    },

    placeholder() {
      const item = this.formItem;
      return item.placeholder ? item.placeholder : `请选择${item.label}`;
    },
    selectClass() {
      const item = this.formItem;
      return item.className ? item.className : "";
    },
    selectClearable() {
      const item = this.formItem;
      return item.clearable ? item.clearable : false;
    },
    options() {
      if (this.formItem.options) {
        return this.formItem.options;
      } else {
        return []
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.selectOptionsFun();
      },
      deep: true
    }
  },
  created() {
    this.selectOptionsFun();
  },
  methods: {
    changeEvent($event) {
      const checked = this.selectOptions.filter($item => $item.value === this.ruleForm[this.formItem.key])[0]
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, checked)
      }
      this.$emit('selectChange', this.ruleForm)
    },
    isArray(value) {
      return g.utils.isArr(value);
    },
    selectOptionsFun() {
      const { options, urlOptions } = this.formItem;
      if (!options && !urlOptions) {
        throw new ReferenceError(
          'options or urlOptions" does not exist.open fn.js and add it'
        );
      }
      if (options) {
        this.selectOptions = options;
      } else {
        this.getUrlOptions(urlOptions.params).then(() => {
          // 设置初始值
          if (this.formItem.requireFirst && (!this.ruleForm[this.formItem.key])) {
            this.ruleForm[this.formItem.key] = this.selectOptions[0].value
          }
        })
      }
    },
    /**
     * 调用api获取下拉列表
     * @param $params
     */
    getUrlOptions($params) {
      const { urlOptions } = this.formItem;
      this.loading = true;
      return urlOptions
        .url($params || {})
        .then(res => {
          this.loading = false;
          if (!this.$g.utils.isArr(res.data)) {
            this.selectOptions = [];
          } else {
            this.selectOptions = res.data.map(item => {
              return {
                label: item[urlOptions.keyName],
                value: item[urlOptions.valueName]
              }
            })
          }
          return this.selectOptions
        })
    },
    visibleChange($status) {
      if (this.formItem.isSearch && $status) {
        this.remoteMethod("")
      }
    },
    remoteMethod($query) {
      const { urlOptions } = this.formItem;
      const params = this.$g.utils.deepClone(urlOptions.params)
      Object.assign(params, {[urlOptions.searchKey]: $query})
      this.getUrlOptions(params)
    }
  }
};
</script>

<style></style>
