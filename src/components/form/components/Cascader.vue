<template>
  <div>
    <el-cascader
        ref="cascader"
        v-model="ruleForm[formItem.key]"
        :options="options"
        :style="selectStyle"
        @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
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
        return item.style ? item.style : "width:294px";
      },
      options() {
        if (this.$g.utils.isFunction(this.formItem.options)) {
          return this.formItem.options();
        } else {
          return this.formItem.options
        }
      },
      value() {
        return this.ruleForm[this.formItem.key]
      }
    },
    watch: {
      value() {
        console.log(this.value);
        this.changeActiveNodes()
      }
    },
    created() {
    },

    methods: {
      handleChange(val) {
        const options = JSON.parse(JSON.stringify(this.formItem.options));
        const obj = [];
        obj[0] = options.find(item => {
          return item.value === val[0];
        });
        if (obj[0].children) {
          obj[1] = obj[0].children.find(item => {
            return item.value === val[1];
          });
        }
        if (obj[1].children) {
          obj[2] = obj[1].children.find(item => {
            return item.value === val[2];
          });
        }
        obj.forEach(item => {
          delete item.children;
        });
        this.ruleForm.addressObj = obj;
      },
      changeActiveNodes() {
        if (this.value.length === 1) return;
        let nodes = this.$refs.cascader.$refs.panel.menus[0].filter(item => item.value === this.value[0])
        nodes = this.$g.utils.getNestedArr(nodes, "children")
        this.$refs.cascader.$refs.panel.activePath = this.value.map(item => {
          return nodes.filter(node => node.value === item)[0]
        })
      }
    }
  };
</script>

<style></style>
