<template>
  <div :class="selectClass">
    <el-select
      v-model="ruleForm[formItem.key1]"
      :filterable="formItem.isSearch"
      :clearable="selectClearable"
      :remote="formItem.isSearch"
      :placeholder="placeholder1"
      :remote-method="remoteMethod"
      :style="selectStyle"
      @change="selectFirst"
    >
      <el-option
        v-for="item in selectOptions1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select
      v-model="ruleForm[formItem.key2]"
      :filterable="formItem.isSearch"
      :clearable="selectClearable"
      :remote="formItem.isSearch"
      :placeholder="placeholder2"
      :remote-method="remoteMethod"
      :disabled="formItem.isDisabled"
      :style="selectStyle"
    >
      <el-option
        v-for="item in selectOptions2"
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
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {
      selectOptions1: [],
      selectOptions2: []
    };
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
    },

    placeholder1() {
      const item = this.formItem;
      return item.placeholder1 ? item.placeholder1 : `请选择${item.label1}`;
    },
    placeholder2() {
      const item = this.formItem;
      return item.placeholder2 ? item.placeholder2 : `请选择${item.label2}`;
    },
    selectClass() {
      const item = this.formItem;
      return item.className ? item.className : "";
    },
    selectClearable() {
      const item = this.formItem;
      return item.clearable ? item.clearable : false;
    }
  },
  created() {
    this.selectOptionsFun();
  },

  methods: {
    isArray(value) {
      return g.utils.isArr(value);
    },
    selectOptionsFun() { // 请求一级菜单
      const { options, urlOptions1 } = this.formItem;
      if (!options && !urlOptions1) {
        throw new ReferenceError(
          'options or urlOptions" does not exist.open fn.js and add it'
        );
      }
      if (options) {
        this.selectOptions1 = options;
      } else {
        urlOptions1
          .url(
            urlOptions1.params || {}
          )
          .then(res => {
            const newArr = [];
            if (res.object) {
              for (const item of res.object) {
                newArr.push({
                  value: item[urlOptions1.keyName],
                  label: item[urlOptions1.valueName]
                });
              }
            }
            if (res.datas) {
              for (const item of res.datas) {
                newArr.push({
                  value: item[urlOptions1.keyName],
                  label: item[urlOptions1.valueName]
                });
              }
            }
            this.selectOptions1 = newArr;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    selectFirst() {
      this.selectOptions2 = []
      const { options, urlOptions2 } = this.formItem;
      if (!options && !urlOptions2) {
        throw new ReferenceError(
          'options or urlOptions" does not exist.open fn.js and add it'
        );
      }
      if (options) {
        this.selectOptions2 = options;
      } else {
        console.log(urlOptions2)
        urlOptions2.url({
          firstMenuId: this.ruleForm[this.formItem.key1]
        })
          .then(res => {
            const newArr = [];
            if (res.object) {
              for (const item of res.object) {
                newArr.push({
                  value: item[urlOptions2.keyName],
                  label: item[urlOptions2.valueName]
                });
              }
            }
            if (res.datas) {
              for (const item of res.datas) {
                newArr.push({
                  value: item[urlOptions2.keyName],
                  label: item[urlOptions2.valueName]
                });
              }
            }
            this.selectOptions2 = newArr;
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>

<style></style>
