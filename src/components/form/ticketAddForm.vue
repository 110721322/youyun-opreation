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
      @change="selectSecond"
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
import apiAgent from "@/api/api_ticketCenter.js";
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
  mounted() {
    if (this.ruleForm[this.formItem.key1]) {
      this.selectFirst()
    }
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
        this.getUrlOptions(urlOptions1.params)
      }
    },
    selectFirst() {
      this.$set(this.ruleForm, this.formItem.key2, '')
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
        this.getUrlOptionsFirst({
          firstMenuId: this.ruleForm[this.formItem.key1]
        })
      }
    },
    /**
     * 调用api获取下拉列表
     * @param $params
     */
    getUrlOptions($params) {
      const { urlOptions1 } = this.formItem;
      const apiUrl = urlOptions1.url ? urlOptions1.url : apiAgent.queryFirstClassByPage
      return apiUrl($params)
        .then(res => {
          if (!this.$g.utils.isArr(res.data)) {
            this.selectOptions1 = [];
          } else {
            this.selectOptions1 = res.data.map(item => {
              return {
                label: item[urlOptions1.keyName],
                value: item[urlOptions1.valueName]
              }
            })
          }
          return this.selectOptions1;
        })
    },
    /**
     * 调用api获取下拉列表
     * @param $params
     */
    getUrlOptionsFirst($params) {
      const { urlOptions2 } = this.formItem;
      const apiUrl = urlOptions2.url ? urlOptions2.url : apiAgent.querySecondClassByPage
      return apiUrl($params)
        .then(res => {
          if (!this.$g.utils.isArr(res.data)) {
            this.selectOptions2 = [];
          } else {
            this.selectOptions2 = res.data.map(item => {
              return {
                label: item[urlOptions2.keyName],
                value: item[urlOptions2.valueName]
              }
            })
          }
          return this.selectOptions2;
        })
    },
    selectSecond() {}
  }
};
</script>

<style></style>
