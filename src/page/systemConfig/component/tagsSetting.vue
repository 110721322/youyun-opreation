
<template>
  <div>
    <DetailBox title="服务商标签" :border="true">
      <div class="tag-box">
        <el-tag
          v-for="(tag,key) in formData.agentTags.tags"
          :key="key"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,formData.agentTags)"
        >{{ tag }}</el-tag>
        <el-input
          v-if="formData.agentTags.inputVisible"
          ref="saveTagInput"
          v-model="formData.agentTags.inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm($event,formData.agentTags)"
          @blur="handleInputConfirm($event,formData.agentTags)"
        ></el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput(formData.agentTags)"
        >+ 新增</el-button>
      </div>
    </DetailBox>

    <DetailBox title="服务商顶部颜色条" :border="true" :is-show-edit-btn="true" @edit="onClick_editColor">
      <div>
        <div class="color_item">
          <div class="color_box"></div>
          <div class="item_text">{{ formData.agentColor.red }}</div>
        </div>

        <div class="color_item">
          <div class="color_box"></div>
          <div class="item_text">{{ formData.agentColor.green }}</div>
        </div>

        <div class="color_item">
          <div class="color_box"></div>
          <div class="item_text">{{ formData.agentColor.yellow }}</div>
        </div>
      </div>
    </DetailBox>

    <DetailBox title="成员职位标签标签" :border="true">
      <div class="tag-box">
        <el-tag
          v-for="(tag,key) in formData.positionTags.tags"
          :key="key"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,formData.positionTags)"
        >{{ tag }}</el-tag>
        <el-input
          v-if="formData.positionTags.inputVisible"
          ref="saveTagInput"
          v-model="formData.positionTags.inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm($event,formData.positionTags)"
          @blur="handleInputConfirm($event,formData.positionTags)"
        ></el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput(formData.positionTags)"
        >+ 新增</el-button>
      </div>
    </DetailBox>

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
import DetailBox from "@/components/detailMode/detailBox.vue";
export default {
  name: "Theme",
  components: { Form, DetailBox },
  data() {
    return {
      drawer: false,
      ruleForm: {
        name1: "2"
      },
      fromConfigData: {},
      inputVisible: false,
      inputValue: "",
      formData: {
        agentTags: {
          tags: ["标签一", "标签一", "标签一"],
          inputVisible: false,
          inputValue: ""
        },
        agentColor: {
          red: "情绪客户",
          green: "优质客户",
          yellow: "普通客户"
        },
        positionTags: {
          tags: ["标签二", "标签二"],
          inputVisible: false,
          inputValue: ""
        }
      }
    };
  },
  mounted() {},
  methods: {
    handleClose(tag, $item) {
      $item.tags.splice($item.tags.indexOf(tag), 1);
    },

    showInput($item) {
      $item.inputVisible = true;
    },
    handleInputConfirm($event, $item) {
      if ($event.target.value) {
        $item.tags.push($event.target.value);
      }
      $item.inputVisible = false;
      $item.inputValue = "";
    },
    cancel(done) {
      done();
    },
    onClick_editColor() {
      this.drawer = true;
      this.fromConfigData = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.area_box {
  border-bottom: 1px solid #ebeef5;
}
.add_area {
  margin: 24px;
}
.area_box_title {
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  line-height: 24px;
  height: 64px;
  line-height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid #ebeef5;
}
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
  overflow: auto;
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
  line-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  top: 1px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
  position: relative;
  top: 3px;
}
</style>
