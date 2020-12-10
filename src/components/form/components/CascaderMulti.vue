<template>
  <div>
    <div
        class="flex-row g-cascader"
    >
      <el-cascader
          v-model="ruleForm[formItem.key]"
          :style="selectStyle"
          :props="{ multiple: true, checkStrictly: true }"
          :options="options"
          :disabled="formItem.isDisabled"
          @change="handleChange"
      ></el-cascader>
    </div>
    <el-checkbox v-if="!formItem.hideCheck" v-model="checked" :disabled="formItem.isDisabled">所有区域</el-checkbox>
  </div>
</template>

<script>
export default {
  name: "CascaderMulti",
  props: {
    ruleForm: Object,
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {
      formItemNum: 1,
      checked: false,
      oldVal: []
    };
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
    },
    options() {
      if (this.$g.utils.isFunction(this.formItem.options)) {
        return this.formItem.options();
      } else {
        return this.formItem.options
      }
    }
  },
  watch: {
    checked() {
      if (this.checked) { //  check与选择框互斥
        this.formItemNum = 1;
        this.ruleForm[this.formItem.key] = [];
      }

      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, this.checked)
      }
      if (this.$g.utils.isString(this.formItem.emitEventBus)) {
        this.$EventBus.$emit(this.formItem.emitEventBus, this.ruleForm[this.formItem.key])
      }
    }
  },
  created() {
    if (this.ruleForm[this.formItem.key]) {
      if (this.ruleForm[this.formItem.key].length > 0) {
        this.formItemNum = this.ruleForm[this.formItem.key].length
        this.oldVal = this.ruleForm[this.formItem.key]
      } else {
        this.formItemNum = 1;
        this.ruleForm[this.formItem.key] = []
      }
    }
    if (this.formItem.checked) {
      this.checked = this.formItem.checked
    }
  },
  methods: {
    addSelect() {
      this.formItemNum++;
      this.ruleForm[this.formItem.key].push([])
    },
    removeSelect($index) {
      this.formItemNum--;
      this.ruleForm[this.formItem.key] = this.ruleForm[this.formItem.key].filter((item, index) => {
        if (index !== $index) {
          return item
        }
      })
    },
    handleChange(val) {
      let index;
      // 获取当前选中项
      val.forEach((item, itemIndex) => {
        const oldItemFilter = this.oldVal.filter(oldItem => {
          const oldItemStr = this.$g.utils.isString(oldItem) ? oldItem : oldItem.join("");
          if (oldItemStr === item.join("")) {
            return oldItem
          }
        });
        if (oldItemFilter.length === 0) {
          index = itemIndex;
        }
      })
      const currentVal = val[index];
      let newVal
      if (currentVal) {
        // 父子关联过滤
        newVal = val.filter(item => {
          if (item.length === currentVal.length) { // 选中同级
            return item
          } else if (item.length > currentVal.length) { // 选中父级,去除该父级下的已选子级
            const newItem = item.filter((ele, idx) => {
              if ((idx + 1) === currentVal.length && ele === currentVal[idx]) {
                return ele;
              }
            });
            if (newItem.length === 0) return item
          } else { // 选中子级,去除对应的父级
            const newItem = item.filter((ele, idx) => {
              if ((idx + 1) === item.length && ele === currentVal[idx]) {
                return ele;
              }
            });
            if (newItem.length === 0) return item
          }
        })
        this.ruleForm[this.formItem.key] = newVal
        this.oldVal = newVal;
      } else {
        newVal = val;
      }
      if (!newVal) {
        this.ruleForm[this.formItem.key] = [];
        this.oldVal = [];
      } else {
        this.checked = false;
      }
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, this.checked)
      }
      if (this.$g.utils.isString(this.formItem.emitEventBus)) {
        this.$EventBus.$emit(this.formItem.emitEventBus, this.ruleForm[this.formItem.key])
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .g-cascader {
    display: block;
    margin-bottom: 18px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .m-add {
    height: 21px;
    color: #1989FA;
    font-size: 21px;
    margin: 6px 0 0 8px;
    cursor: pointer;
  }
</style>
