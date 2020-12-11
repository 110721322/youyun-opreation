<template>
  <div :class="'flex-align-center ' + selectClass">
    <el-select
        v-model="ruleForm[formItem.key]"
        :multiple="isArray(formItem.initVal)"
        :filterable="formItem.isSearch"
        :clearable="selectClearable"
        :remote="formItem.isSearch"
        :placeholder="placeholder"
        :remote-method="remoteMethod"
        :loading="formItem.isSearch && loading"
        :collapse-tags="formItem.collapseTags"
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
    <el-checkbox style="margin-left: 14px" v-if="formItem.hasCheckAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      ruleForm: Object,
      formItem: Object,
      isRest: Boolean
    },
    data() {
      return {
        selectOptions: [],
        loading: false,
        checkAll: false,
        isIndeterminate: false
      };
    },
    computed: {
      selectStyle() {
        const item = this.formItem;
        const width = item.hasCheckAll ? "width:calc(100% - 70px)" : "width: 100%"
        return item.style ? item.style : width;
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
      },
      isRest() {
        if (this.isRest) {
          this.checkAll = this.formItem.checkAll ? this.formItem.checkAll : false;
          this.isIndeterminate = false;
          this.selectOptionsFun();
          if (this.$g.utils.isFunction(this.formItem.resetFn)) {
            this.formItem.resetFn(this.ruleForm)
          }
        }
      }
    },
    created() {
      this.selectOptionsFun();
    },
    mounted() {
      if (this.formItem.eventName) {
        this.$EventBus.$on(this.formItem.eventName, this.SelectEvent)
      }
    },
    destroyed() {
      if (this.formItem.eventName) {
        this.$EventBus.$off(this.formItem.eventName, this.SelectEvent)
      }
    },
    methods: {
      SelectEvent() {
        this.$nextTick(() =>{
          if (this.formItem.isSearch) {
            this.selectOptionNext();
          }
        })
      },
      handleCheckAllChange($val) {
        if (!this.formItem.hasCheckAll) return;
        const allOptions = this.selectOptions.map(item => item.value)
        this.ruleForm[this.formItem.key] = $val ? allOptions : [];
        this.isIndeterminate = false;
      },
      changeEvent() {
        const checked = this.selectOptions.filter($item => {
          if ($item.value === this.ruleForm[this.formItem.key]) {
            return $item;
          }
        })[0]
        if (this.formItem.hasCheckAll) {
          const checkedCount = this.ruleForm[this.formItem.key].length;
          this.checkAll = checkedCount === this.selectOptions.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectOptions.length;
        }
        if (this.$g.utils.isFunction(this.formItem.callback)) {
          this.formItem.callback(this.ruleForm, checked)
        }
        this.$emit('selectChange', this.ruleForm)
        if (this.$g.utils.isString(this.formItem.emitEventBus)) {
          this.$EventBus.$emit(this.formItem.emitEventBus, this.ruleForm)
        }
      },
      isArray(value) {
        return this.$g.utils.isArr(value);
      },
      selectOptionsFun() {
        const {options, urlOptions} = this.formItem;
        if (!options && !urlOptions) {
          throw new ReferenceError(
            'options or urlOptions" does not exist.open fn.js and add it'
          );
        }
        if (options) {
          this.selectOptions = options;
        } else {
          this.selectOptionNext();
        }
      },
      selectOptionNext() {
        this.remoteMethod("").then(() => {
          // 设置初始值
          const boolean = !this.ruleForm[this.formItem.key] || (this.isArray(this.ruleForm[this.formItem.key]))
          if (this.formItem.requireFirst && boolean) {
            if (this.isArray(this.formItem.initVal) && this.formItem.checkAll) {
              this.ruleForm[this.formItem.key] = this.selectOptions.map(item => item.value)
            } else {
              this.ruleForm[this.formItem.key] = this.selectOptions[0].value
            }
            this.changeEvent();
          }
        })
      },
      visibleChange($status) {
        if (this.formItem.isSearch && $status) {
          this.remoteMethod("")
        }
      },
      remoteMethod($query) {
        const {urlOptions} = this.formItem;
        const params = this.$g.utils.deepClone(urlOptions.params)
        if (urlOptions.searchKey) {
          Object.assign(params, {[urlOptions.searchKey]: $query})
        }
        this.loading = true;
        return urlOptions
          .url(
            params || {}
          )
          .then(res => {
            this.loading = false;
            if (this.$g.utils.isArr(res.data)) {
              this.selectOptions = res.data.map(item => {
                item.value = item[urlOptions.keyName];
                item.label = item[urlOptions.valueName];
                return item
              })
              return this.selectOptions
            } else {
              return []
            }
          })
      }
    }
  };
</script>

<style></style>
