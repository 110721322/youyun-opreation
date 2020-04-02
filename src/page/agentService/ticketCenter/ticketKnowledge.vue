<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">工单知识库</span>
    </div>

    <div class="table_box">
      <div class="left-box">
        <div class="add-first-menu">
          <i class></i>添加一级菜单
        </div>
      </div>
      <div class="right-box"></div>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        size="medium"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_params";
import Form from "@/components/form/index.vue";

export default {
  name: "Theme",
  components: { Form },
  data() {
    return {
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      ruleForm: {
        name1: "2"
      },
      isEdit: false,
      tableData: [],
      menuList: [
        {
          name: "成员信息（编辑信息）",
          type: "employee_edit",
          formLoaction: "系统配置-成员管理-操作-编辑"
        },
        {
          name: "成员信息（注册信息）",
          type: "employee_register",
          formLoaction: "成员注册-完善个人信息"
        }
      ],
      selectMenu: {},
      type: "employee_edit"
    };
  },
  mounted() {
    this.selectMenu = this.menuList[0];
    this.getTableData();
  },
  methods: {
    onClick_menuItem($item) {
      this.selectMenu = $item;
      this.type = $item.type;
      this.getTableData();
    },
    onInput_checkBox() {
      console.log(this.tableData);
    },
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData(params) {
      api
        .queryAllFormFieldsByType({
          type: this.type
        })
        .then(res => {
          console.log(res);
          this.tableData = res.object;
        })
        .catch();
    },
    saveTableData() {
      api
        .batchSetFormFieldsProperty({ vos: this.tableData })
        .then(res => {
          console.log(res);
          this.$message("保存成功");
          this.isEdit = false;
        })
        .catch();
    },
    onClick_Edit() {
      this.isEdit = true;
    },
    cancelEdit() {
      this.isEdit = false;
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    cancel(done) {
      done();
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  padding: 30px 24px;
  border-top: 1px solid #ededed;
}
.table_box {
  position: relative;
  margin: 24px;
  display: flex;
  height: calc(100% - 50px - 77px);
  .left-box {
    width: 34%;
    background: #ffffff;
    overflow: auto;
  }
  .right-box {
    margin-left: 16px;
    width: 66%;
    background: #ffffff;
    overflow: auto;
  }
}
</style>
