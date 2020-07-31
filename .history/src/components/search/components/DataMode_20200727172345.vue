<template>
  <div>
    <el-date-picker
      v-model="timeInterval"
      style="float: left;"
      size="large"
      type="month"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import * as g from "@/libs/global";

export default {
  components: {},
  props: {
    type: {
      type: String,
      default: "daterange"
    },
    ruleForm: Object,
    formItem: Object,
    pickerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isRest: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      timeInterval: ""
    };
  },
  watch: {
  },
  created() {
  },
  methods: {
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/scss" scoped>
</style>
