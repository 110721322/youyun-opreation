<template>
  <div>
    <div class="flex-between">
      <el-input v-if="formItem.isSearch" v-model="queryString" style="width: 310px;" @input="handleInput" :placeholder="placeholder"></el-input>
      <el-checkbox v-if="formItem.hasCheckAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    </div>
    <el-checkbox-group :style="style" v-model="ruleForm[formItem.key]" @change="handleChecked">
      <el-checkbox
        v-for="item in checkOptions"
        :key="item.value"
        :label="item.value"
      >{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  import { debounce } from "@/libs/kit/fun";

  export default {
  name: "Check",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {
      checkOptions: [],
      checkAll: false,
      isIndeterminate: false,
      queryString: ""
    };
  },
  computed: {
    style() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
    },
    placeholder() {
      const item = this.formItem;
      return item.placeholder ? item.placeholder : `搜索${item.label}`;
    }
  },
  created() {
    this.checkOptionsFun();
  },
  mounted() {
    if (this.formItem.eventName) {
      this.$EventBus.$on(this.formItem.eventName, this.CheckEvent)
    }
  },
    destroyed() {
      if (this.formItem.eventName) {
        this.$EventBus.$off(this.formItem.eventName, this.CheckEvent)
      }
    },
  methods: {
    CheckEvent() {
      this.$nextTick(() => {
        if (!this.$g.utils.isObj(this.formItem.urlOptions)) return;
        this.remoteMethod().then(() => {
          // this.ruleForm[this.formItem.key] = [];
        })
      })
    },
    handleCheckAllChange($val) {
      if (!this.formItem.hasCheckAll) return;
      const allOptions = this.checkOptions.map(item => item.value)
      this.ruleForm[this.formItem.key] = $val ? allOptions : [];
      this.isIndeterminate = false;
    },
    handleInput: debounce(function () {
      if (!this.$g.utils.isObj(this.formItem.urlOptions)) return;
      this.remoteMethod().then(() => {
        // this.ruleForm[this.formItem.key] = [];
      })
    }),
    handleChecked($val) {
      if (!this.formItem.hasCheckAll) return;
      const checkedCount = $val.length;
      this.checkAll = checkedCount === this.checkOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkOptions.length;
    },
    checkOptionsFun() {
      const options = this.formItem.options;
      if (options) {
        this.checkOptions = options;
      } else {
        this.remoteMethod();
      }
    },
    remoteMethod() {
      const {urlOptions} = this.formItem;
      const params = this.$g.utils.deepClone(urlOptions.params)
      if (urlOptions.searchKey) {
        Object.assign(params, {[urlOptions.searchKey]: this.queryString})
      }
      return urlOptions.url(params)
        .then(res => {
          if (!this.$g.utils.isArr(res.data)) {
            throw new ReferenceError(
              "'data' is not array"
            );
          }
          const newArr = [];
          if (res.data) {
            for (const item of res.data) {
              item.value = item[urlOptions.keyName];
              item.label = item[urlOptions.valueName];
              newArr.push(item);
            }
          }
          this.checkOptions = newArr;
          return newArr
        })
    }
  }
};
</script>
<style lang="scss"></style>
