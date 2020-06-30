<template>
  <div>
    <el-input
      v-model="inputForm"
      :placeholder="formItem.placeholder?formItem.placeholder:'请输入内容'"
      class="input-with-select"
      size="large"
      @input="onChange_input"
    >
      <el-select
        slot="prepend"
        v-model="inputSelect"
        style="width:294px"
        placeholder="请选择"
        @input="onChange_input"
      >
        <el-option
          v-for="(item, key) in formItem.options"
          :key="key"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean,
    isRest: Boolean
  },
  data() {
    return {
      inputSelect: "",
      inputForm: ""
    };
  },
  computed: {},
  watch: {
    isRest: function($new) {
      if ($new) {
        console.log('this.isRest', $new);
        this.inputSelect = this.formItem.options[0].value;
        this.inputForm = "";
        this.onChange_input();
      }
    }
  },
  created() {
    this.inputSelect = this.formItem.options[0].value;
  },
  methods: {
    onChange_input() {
      this.ruleForm.inputSelect = this.inputSelect;
      this.ruleForm.inputForm = this.inputForm;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-with-select {
  width: 774px;
}

.el-select .el-input {
  width: 130px;
}
</style>
