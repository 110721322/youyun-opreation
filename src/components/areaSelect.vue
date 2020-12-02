<template>
  <el-cascader
    v-model="value"
    :options="options"
    @input="handleChange"
  ></el-cascader>
</template>
<script>
import AREADATA from "@/assets/data/areaData";

export default {
  name: "AreaSelect",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {
      value: [],
      options: AREADATA,
      data: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      var _self = this;
      const data = [
        { name: "内蒙古自治区", code: "150000" },
        { name: "通辽市", code: "150500" },
        { name: "通辽市", code: "150524" }
      ];
      data.forEach(($item, $index) => {
        _self.$set(_self.value, $index, $item.code);
      });
    },
    handleChange($val) {
      const _self = this;
      this.options.forEach(function($item) {
        if ($item.value === $val[0]) {
          _self.data[0] = { name: $item.label, code: $val[0] };
          $item.children.forEach(function($item1) {
            if ($item1.value === $val[1]) {
              _self.data[1] = { name: $item1.label, code: $val[1] };
              $item1.children.forEach(function($item2) {
                if ($item2.value === $val[2]) {
                  _self.data[2] = { name: $item1.label, code: $val[2] };
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
