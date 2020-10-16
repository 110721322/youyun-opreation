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
      const checked = this.selectOptions.filter($item => {
        if ($item.value === this.ruleForm[this.formItem.key]) {
          return $item;
        }
      })[0]
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, checked)
      }
      // this.ruleForm[this.formItem.key] = checked.value
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
        this.loading = true;
        urlOptions
          .url(
            urlOptions.params || {}
          )
          .then(res => {
            this.loading = false;
            const newArr = [];
            if (res.object) {
              for (const item of res.object) {
                item.value = item[urlOptions.keyName];
                item.label = item[urlOptions.valueName];
                newArr.push(item);
              }
            }
            if (res.data) {
              for (const item of res.data) {
                item.value = item[urlOptions.keyName];
                item.label = item[urlOptions.valueName];
                newArr.push(item);
              }
            }
            this.selectOptions = newArr;
            // 设置初始值
            if (this.formItem.requireFirst && (!this.ruleForm[this.formItem.key])) {
              this.ruleForm[this.formItem.key] = this.selectOptions[0].value
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
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
      this.loading = true;
      urlOptions
        .url(
          params || {}
        )
        .then(res => {
          this.loading = false;
          const newArr = [];
          if (res.object) {
            for (const item of res.object) {
              item.value = item[urlOptions.keyName];
              item.label = item[urlOptions.valueName];
              newArr.push(item);
            }
          }
          if (res.data) {
            for (const item of res.data) {
              item.value = item[urlOptions.keyName];
              item.label = item[urlOptions.valueName];
              newArr.push(item);
            }
          }
          this.selectOptions = newArr;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style></style>
