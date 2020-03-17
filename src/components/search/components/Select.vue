<template>
  <div :class="selectClass">
    <el-select
      v-model="ruleForm[formItem.key]"
      :multiple="isArray(formItem.initVal)"
      :filterable="!formItem.options"
      :clearable="selectClearable"
      :remote="!formItem.options"
      :placeholder="placeholder"
      :remote-method="remoteMethod"
      :style="selectStyle"
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
// import { isArr } from '@/utils'
import * as g from "@/libs/global";
import { getOptionsByUrl } from "@/libs/kit/formFns";

export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {};
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "";
    },
    selectOptions() {
      const { options, urlOptions } = this.formItem;
      if (!options && !urlOptions) {
        throw new ReferenceError(
          'options or urlOptions" does not exist.open fn.js and add it'
        );
      }
      if (options) {
        return options;
      } else {
        const data = getOptionsByUrl(urlOptions);
        return data;
        // jiekouna
      }
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
    }
  },
  created() {},

  methods: {
    isArray(value) {
      return g.utils.isArr(value);
    }
  }
};
</script>

<style></style>
