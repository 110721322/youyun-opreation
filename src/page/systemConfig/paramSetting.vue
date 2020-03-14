<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">参数设置</span>
    </div>

    <div class="table_box" style="padding:0">
      <div class="left_box">
        <div class="tab_head">
          <span class="title">类型</span>
        </div>
        <div class="device_list">
          <div class="device_item select">
            <div class="device_name">待办事项</div>
            <div class="device_num"></div>
          </div>
          <div class="device_item">
            <div class="device_name">标签</div>
            <div class="device_num"></div>
          </div>
          <div class="device_item">
            <div class="device_name">大区</div>
            <div class="device_num"></div>
          </div>
        </div>
      </div>
      <div class="right_box">
        <DetailMod title="参数设置" :rule-form="ruleForm" :config-data="configData"></DetailMod>

        <DetailMod title="客单价异常" :rule-form="ruleForm" :config-data="configData2"></DetailMod>

        <DetailMod title="交易数据异常" :rule-form="ruleForm" :config-data="configData3"></DetailMod>
        <DetailBox title="交易数据异常" :border="true">
          <div class="tag-box">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{ tag }}</el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
        </DetailBox>

        <DetailBox title="交易数据异常" :border="true">
          <div>
            <div class="color_item">
              <div class="color_box"></div>
              <div class="item_text">情绪客户</div>
            </div>

            <div class="color_item">
              <div class="color_box"></div>
              <div class="item_text">情绪客户</div>
            </div>

            <div class="color_item">
              <div class="color_box"></div>
              <div class="item_text">情绪客户</div>
            </div>
          </div>
        </DetailBox>
      </div>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
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
import DetailMod from "@/components/detailMode/detailMode2.vue";
import DetailBox from "@/components/detailMode/detailBox.vue";

export default {
  name: "Theme",
  components: { Form, DetailBox, DetailMod },
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      searchMaxHeight: "340",
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      ruleForm: {
        name1: "2"
      },
      configData: {
        name: "基本信息",
        border: true,
        headColor: "#ebeef5",
        models: [
          {
            items: [
              {
                name: "任务倒计时",
                key: "name1",
                type: "switch"
              }
            ]
          },
          {
            items: [
              {
                name: "钉钉通讯地址",
                key: "name1",
                type: "edit"
              }
            ]
          }
        ]
      },
      configData2: {
        name: "基本信息",
        border: true,
        headColor: "#ebeef5",
        models: [
          {
            items: [
              {
                name: "客单价≥",
                key: "name1",
                type: "switch"
              }
            ]
          },
          {
            items: [
              {
                name: "交易笔数≥",
                key: "name1",
                type: "edit"
              }
            ]
          }
        ]
      },
      configData3: {
        name: "基本信息",
        border: true,
        headColor: "#ebeef5",
        models: [
          {
            items: [
              {
                name: "比较类型",
                key: "name1",
                type: "switch"
              }
            ]
          },
          {
            items: [
              {
                name: "客单价≥",
                key: "name1",
                type: "edit"
              }
            ]
          },
          {
            items: [
              {
                name: "比例≥",
                key: "name1",
                type: "edit"
              }
            ]
          }
        ]
      }
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
  .tag-box {
    margin: 24px;
  }

  .color_item {
    width: 230px;
    margin: 24px;
    float: left;
    .color_box {
      width: 140px;
      height: 20px;
      background: rgba(245, 34, 45, 1);
      float: left;
      margin-right: 16px;
    }
    .item_text {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 53, 1);
      line-height: 20px;
    }
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
  width: 101px;
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
