<template>
  <div>
    <el-input
      placeholder="请输入内容"
      class="input-with-select"
      size="large"
      v-model="inputForm"
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
        >
        </el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean,
    isRest: Boolean
  },
  watch: {
    isRest: function($new) {
      if ($new) {
        this.inputSelect = this.formItem.options[0].value
        this.inputForm = ''
      }
    }
  },
  computed: {},
  created() {
    this.inputSelect = this.formItem.options[0].value
  },
  data() {
    return {
      inputSelect: '',
      inputForm: ''
    }
  },
  methods: {
    onChange_input() {
      this.ruleForm.inputSelect = this.inputSelect
      this.ruleForm.inputForm = this.inputForm
    }
  }
}
</script>

<style lang="scss" scoped>
.input-with-select {
  width: 774px;
}

.el-select .el-input {
  width: 130px;
}
</style>
