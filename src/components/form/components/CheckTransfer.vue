<template>
  <div>
    <div class="flex-between" style="margin-bottom: 12px;">
      <el-input v-if="formItem.isSearch" v-model="queryString" style="width: 310px;" @input="handleInput" :placeholder="placeholder"></el-input>
    </div>
    <div class="flex-row">
      <div class="u-check-container" style="margin-right: 24px;">
        <div class="u-checkAll">
          <el-checkbox v-if="formItem.hasCheckAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
        <el-checkbox-group :style="style" class="u-check-group" v-model="ruleForm[formItem.key]">
          <el-checkbox
              v-for="item in checkOptions"
              :key="item.value"
              :label="item.value"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="u-check-container">
        <div class="u-checkAll">
          已选
        </div>
        <el-checkbox-group :style="style" class="u-check-group" v-model="ruleForm[formItem.key]">
          <el-checkbox
              v-for="item in valueOptions"
              :key="item.value"
              :label="item.value"
              disabled
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
  import { debounce } from "@/libs/kit/fun";

  export default {
    name: "CheckTransfer",
    props: {
      ruleForm: Object,
      formItem: Object
    },
    data() {
      return {
        checkOptions: [],
        queryString: "",
        valueOptions: []
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
      },
      value() {
        return this.ruleForm[this.formItem.key]
      },
      checkAll: {
        get() {
          const checkedCount = this.value.length;
          return checkedCount >= this.checkOptions.length;
        },
        set(val) {}
      },
      isIndeterminate() {
        const checkedCount = this.value.length;
        return checkedCount > 0 && checkedCount < this.checkOptions.length;
      }
    },
    watch: {
      value() {
        this.getCheck()
      }
    },
    created() {
      this.checkOptionsFun()
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
      getCheck() {
        const value = this.checkOptions.filter(item => this.value.indexOf(item.value) > -1);
        const valueOptionsMap = this.valueOptions.map(item => item.value)
        value.forEach(item => {
          if(valueOptionsMap.indexOf(item.value) === -1) {
            this.valueOptions.push(item);
          }
        })
        this.valueOptions = this.valueOptions.filter(item => this.value.indexOf(item.value) > -1)
      },
      handleCheckAllChange($val) {
        if (!this.formItem.hasCheckAll) return;
        const allOptions = this.checkOptions.map(item => item.value)
        this.ruleForm[this.formItem.key] = $val ? allOptions : [];
      },
      handleInput: debounce(function () {
        if (!this.$g.utils.isObj(this.formItem.urlOptions)) return;
        this.remoteMethod().then(() => {
          // this.ruleForm[this.formItem.key] = [];
        })
      }),
      checkOptionsFun() {
        const options = this.formItem.options;
        if (options) {
          this.checkOptions = options;
        } else {
          this.remoteMethod().then(() => {
            this.getCheck();
          })
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
<style lang="scss" scoped>
  .u-check-container {
    border: 1px solid #DCDFE6;
    border-radius: 8px;
    width: 279px;
    .u-checkAll {
      background: #f5f7fa;
      padding: 6px 12px;
    }
    .u-check-group {
      height: 200px;
      padding: 12px;
    }
  }
</style>
