<template>
  <div>
    <el-autocomplete
      v-if="selectOption.isAutocomplete"
      v-model="inputForm"
      :placeholder="formItem.placeholder?formItem.placeholder:'请输入内容'"
      :value-key="selectOption.value"
      :value="selectOption.valueKey"
      label="label"
      class="input-with-select"
      :style="selectOption.style"
      size="large"
      :fetch-suggestions="querySearchAsync"
      @select="selectAuto"
      @change="changeInput"
    >

      <el-select
        v-if="!formItem.hiddenSelect"
        slot="prepend"
        v-model="inputSelect"
        placeholder="请选择"
        @change="changeSelect"
      >
        <el-option
          v-for="(item, key) in formItem.options"
          :key="key"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-autocomplete>
    <el-input
      v-else
      v-model="inputForm"
      :placeholder="formItem.placeholder?formItem.placeholder:'请输入内容'"
      class="input-with-select"
      size="large"
      @input="changeInput"
    >
      <el-select
        slot="prepend"
        v-model="inputSelect"
        style="min-width: 150px;"
        placeholder="请选择"
        @change="changeSelect"
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
      inputForm: "",
      selectOption: null,
      autoCompleteList: []
    };
  },
  computed: {},
  watch: {
    isRest: function($new) {
      if ($new) {
        this.inputSelect = this.formItem.options[0].value;
        this.inputForm = "";
        this.changeInput();
        this.changeSelect();
      }
    }
  },
  created() {
    this.inputSelect = this.formItem.options[0].value;
    this.selectOption = this.formItem.options[0];
    this.ruleForm[this.formItem.key] = this.inputSelect;
  },
  methods: {
    changeInput() {
      this.ruleForm.inputSelect = this.selectOption.valueKey ? this.selectOption.valueKey : this.inputSelect;
      this.ruleForm.inputForm = this.inputForm;
      this.ruleForm[this.formItem.key] = this.ruleForm.inputSelect;
      this.ruleForm[this.formItem.key + 'Val'] = this.inputForm;
    },
    changeSelect() {
      this.inputForm = null;
      this.selectOption = this.formItem.options.filter(ele => ele.value === this.inputSelect)[0];
      this.ruleForm.inputSelect = this.selectOption.valueKey ? this.selectOption.valueKey : this.inputSelect;
      this.ruleForm[this.formItem.key] = this.ruleForm.inputSelect;
    },
    selectAuto(e) {
      this.ruleForm.inputForm = e[this.selectOption.valueKey]
    },
    querySearchAsync(queryString, callback) {
      const {api} = this.selectOption;
      const params = {
        [this.selectOption.value]: queryString
      }
      api(params).then(res => {
        this.autoCompleteList = res.data;
        callback(this.autoCompleteList);
      })
      return queryString;
    }
  }
};
</script>

<style lang="scss" scoped>
  .input-with-select {
    // width: 774px;
  }

  .el-select .el-input {
    width: 130px;
  }
  /deep/.el-input__inner{
    width: 100%;
    // max-width: 294px;
  }
</style>
