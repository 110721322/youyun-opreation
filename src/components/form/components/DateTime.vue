<template>
  <div>
    <el-date-picker
      v-model="timeInterval"
      style="float: left;width:294px;"
      size="small"
      type="datetime"
      :placeholder="placeholder"
      :clearable="clearable"
      :default-time="defaultTime"
      :picker-options="pickerOptions"
      :value-format="format"
      @change="onChage"
    />
    <!--    <span class="date-item" v-for="item of dateList" :class="item.value == selectItem.value?'select':''"  @click="onClick_item(item)">{{item.label}}</span>-->
  </div>
</template>

<script>

export default {
  name: "DateTime",
  components: {},
  props: {
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
    }
  },
  data() {
    return {
      defaultTime: "",
      timeInterval: "",
      placeholder: this.formItem.placeholder,
      datatype: this.formItem.datatype,
      format: "yyyy-MM-dd HH:mm:ss"
    };
  },
  watch: {},
  created() {
    console.log(this.placeholder);
  },
  methods: {
    onChage($data) {
      this.$emit("select", $data);
      this.ruleForm[this.formItem.key] = $data;
    }
  }
}
</script>

