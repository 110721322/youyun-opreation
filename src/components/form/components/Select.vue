<!--TODO
表单select通用组件
* 固定options
* 远端获取options
* 模糊查询options
* 分页查询options
* 单选或多选
-->

<template>
  <div :class="'flex-align-center ' + selectClass">
    <el-select
        ref="select"
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
        @change="onChangeEvent"
        @visible-change="visibleChange"
    >
      <div style="max-height: 220px;overflow-y: auto">
        <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </div>
      <el-pagination
          v-if="formItem.isSearch"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :current-page="currentPage"
          @current-change="currentChange"
          :total="totalCount">
      </el-pagination>
    </el-select>
    <el-checkbox style="margin-left: 14px" v-if="formItem.hasCheckAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
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
      selectOptions: [],
      loading: false,
      checkAll: false,
      isIndeterminate: false,
      currentPage: 1,
      totalCount: 0,
      queryString: ""
    };
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
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
    },
    pageSize() {
      if (this.formItem.urlOptions && this.formItem.urlOptions.params && this.formItem.urlOptions.params.pageSize) {
        return this.formItem.urlOptions.params.pageSize
      } else {
        return 10
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
    if (this.formItem.urlOptions && this.formItem.urlOptions.params && this.formItem.urlOptions.searchKey && this.formItem.urlOptions.params[this.formItem.urlOptions.searchKey]) {
      this.queryString = this.formItem.urlOptions.params[this.formItem.urlOptions.searchKey]
    }
    this.selectOptionsFun();
  },
  methods: {
    handleCheckAllChange($val) {
      if (!this.formItem.hasCheckAll) return;
      const allOptions = this.selectOptions.map(item => item.value)
      this.ruleForm[this.formItem.key] = $val ? allOptions : [];
      this.isIndeterminate = false;
    },
    onChangeEvent() {
      const checked = this.selectOptions.filter($item => {
        if ($item.value === this.ruleForm[this.formItem.key]) {
          return $item;
        }
      })[0]
      this.queryString = checked.label;
      if (this.formItem.hasCheckAll) {  // 计算全选按钮
        const checkedCount = this.ruleForm[this.formItem.key].length;
        this.checkAll = checkedCount === this.selectOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectOptions.length;
        this.queryString = ""
      }
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, checked)
      }
      this.$emit('selectChange', this.ruleForm)
    },
    isArray(value) {
      return this.$g.utils.isArr(value);
    },
    /**
     * 初始化设置options
     */
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
    /**
     * 异步获取options, 并对初始值进行处理
     */
    selectOptionNext() {
      this.remoteMethod().then(() => {
        // 设置初始值
        const boolean = !this.ruleForm[this.formItem.key] || (this.isArray(this.ruleForm[this.formItem.key]))
        if (this.formItem.requireFirst && boolean) {
          if (this.isArray(this.formItem.initVal) && this.formItem.checkAll) {  //  选中全部
            this.ruleForm[this.formItem.key] = this.selectOptions.map(item => item.value)
          } else {
            this.ruleForm[this.formItem.key] = this.selectOptions[0].value  //  选中第一项
          }
          this.onChangeEvent();
        }
      })
    },
    /**
     * select输入框获取焦点时触发事件,重置查询条件
     * @param $status 下拉框出现则为 true，隐藏则为 false
     */
    visibleChange($status) {
      if (this.formItem.isSearch && $status) {
        this.remoteMethod("")
      }
    },
    /**
     * 根据所有查询条件，分页查询options, 设置el-select组件默认查询字符串
     * @param $page   当前分页
     */
    currentChange($page) {
      this.currentPage = $page;
      this.queryUrlOption().then(() => {
        this.$nextTick(() => {
          this.$refs.select.selectedLabel = this.queryString
          this.$refs.select.query = this.queryString
        })
      })
    },
    /**
     * 模糊查询options
     * @param $query  模糊查询字符串
     * @return Promise  返回queryUrlOption结果
     */
    remoteMethod($query) {
      if (this.$g.utils.isString($query)) {
        this.queryString = $query;
      }
      this.currentPage = 1;
      return this.queryUrlOption()
    },
    /**
     * 请求服务端options
     * @return Promise  返回axios请求处理结果
     */
    queryUrlOption() {
      const {urlOptions} = this.formItem;
      const params = this.$g.utils.deepClone(urlOptions.params)
      if (urlOptions.searchKey) {
        Object.assign(params, {
          [urlOptions.searchKey]: this.queryString,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      }
      this.loading = true;
      return urlOptions.url(params)
        .then(res => {
          this.loading = false;
          this.totalCount = res.totalCount;
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
    },
  }
};
</script>

<style lang="scss" scoped></style>
