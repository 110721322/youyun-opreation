<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">自定义表单</span>
    </div>

    <div class="table_box" style="padding:0">
      <div class="left_box">
        <div class="tab_head">
          <span class="title">类型</span>
        </div>
        <div class="device_list">
          <div class="device_item select">
            <div class="device_name">成员信息（编辑信息）</div>
            <div class="device_num"></div>
          </div>
          <div class="device_item">
            <div class="device_name">成员信息（注册信息）</div>
            <div class="device_num"></div>
          </div>
        </div>
      </div>
      <div class="right_box">
        <DetailBox title="自定义表单" :border="true">
          <div class="mod_tips">表单位置：系统配置-成员管理-操作-编辑</div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="名称"></el-table-column>
            <el-table-column prop="name" label="类型"></el-table-column>
            <el-table-column prop="must" label="是否必填">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.must"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="showList" label="列表显示">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.showList"></el-checkbox>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </DetailBox>
      </div>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :size="medium"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import Form from "@/components/form/index.vue";
import DetailBox from "@/components/detailMode/detailBox.vue";

export default {
  name: "Theme",
  components: { Form, DetailBox },
  data() {
    return {
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      ruleForm: {
        name1: "2"
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          must: false
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          must: false
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          must: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          must: false
        }
      ]
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {},
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
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 48px - 76px);
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}
.left_box {
  width: 290px;
  background: rgba(255, 255, 255, 1);
  border-right: 1px solid #ebeef5;
  float: left;
  height: 100%;
}
.right_box {
  float: left;
  width: calc(100% - 290px - 48px);
  height: 100%;
  overflow: scroll;
  // margin: 24px;
  .mod_tips {
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(25, 137, 250, 1);
    line-height: 22px;
    margin: 16px 32px 16px;
  }
}
.device_list {
  margin-top: 20px;
  height: 392px;
  overflow: scroll;
}
.select {
  background: rgba(236, 237, 241, 1);
}
.device_item {
  width: 100%;
  height: 48px;
  cursor: pointer;
}
.device_name {
  // width: 101px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  line-height: 48px;
  float: left;
  margin-left: 30px;
}
.device_num {
  width: 31px;
  height: 22px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  float: right;
  margin-right: 30px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
