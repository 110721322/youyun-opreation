<template>
  <div>
    <el-autocomplete
      v-if="selectOption.isAutocomplete"
      v-model="inputForm"
      :placeholder="formItem.placeholder?formItem.placeholder:'请输入内容'"
      value-key="agentName"
      label="agentNo"
      class="input-with-select"
      size="large"
      :fetch-suggestions="querySearchAsync"
      @select="onAutoSelect"
      @change="onInput"
    >

      <el-select
        slot="prepend"
        v-model="inputSelect"
        style="width:294px"
        placeholder="请选择"
        @change="onSelect"
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
      @input="onInput"
    >
      <el-select
        slot="prepend"
        v-model="inputSelect"
        style="width:294px"
        placeholder="请选择"
        @change="onSelect"
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
        this.onInput();
        this.onSelect();
      }
    }
  },
  created() {
    this.inputSelect = this.formItem.options[0].value;
    this.selectOption = this.formItem.options[0];
  },
  methods: {
    onInput() {
      this.ruleForm.inputSelect = this.selectOption.valueKey ? this.selectOption.valueKey : this.inputSelect;
      this.ruleForm.inputForm = this.inputForm;
    },
    onSelect() {
      this.inputForm = null;
      this.selectOption = this.formItem.options.filter(ele => ele.value === this.inputSelect)[0];
      this.ruleForm.inputSelect = this.selectOption.valueKey ? this.selectOption.valueKey : this.inputSelect;
    },
    onAutoSelect(e) {
      this.ruleForm.inputForm = e[this.selectOption.valueKey]
    },
    querySearchAsync(queryString, callback) {
      const {api} = this.selectOption;
      const params = {
        agentName: queryString
      }
      api(params).then(res => {
        this.autoCompleteList = res.object;
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
</style>
