
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
        >{{ tag.name }}</el-tag>
        <el-input
          v-if="formData.agentTags.inputVisible"
          ref="saveTagInput"
          v-model="formData.agentTags.inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="$event.target.blur"
          @blur="handleInputConfirm($event,formData.agentTags)"
        ></el-input>
        <el-button
          class="button-new-tag"
          size="small"
          @click="showInput(formData.agentTags)"
        >+ 新增</el-button>
      </div>
    </DetailBox>

    <DetailBox title="服务商顶部颜色条" btn-name="新增颜色条" :border="true" :is-show-edit-btn="true" @edit="onClick_editColor">
      <div class="s-color-container">
        <p style="font-size: 14px; color: #333335; margin-bottom: 16px;">颜色：含义</p>
        <div class="color_item_container">
          <div v-for="(item,index) in formData.moodColor" :key="index" class="color_item">
            <div class="color-line">
              <div class="color_box" :style="{background: item.color}"></div>
              <div class="color-right">
                <el-button type="text" @click="editColor(item)">编辑</el-button>
                <p style="color: #C7C8CD;">|</p>
                <el-button type="text" style="color: #F5222D;">删除</el-button>
              </div>
            </div>
            <div class="item_text">{{ item.mean }}</div>
          </div>
        </div>
      </div>
    </DetailBox>

    <DetailBox title="成员职位标签" :border="true">
      <div class="tag-box">
        <el-tag
          v-for="(tag,key) in formData.positionTags.tags"
          :key="key"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,formData.positionTags)"
        >{{ tag.name }}</el-tag>
        <el-input
          v-if="formData.positionTags.inputVisible"
          ref="saveTagInput"
          v-model="formData.positionTags.inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="$event.target.blur"
          @blur="handleInputConfirm($event,formData.positionTags)"
        ></el-input>
        <el-button
          class="button-new-tag"
          size="small"
          @click="showInput(formData.positionTags)"
        >+ 新增</el-button>
      </div>
    </DetailBox>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <div class="color-input">
        <el-input v-model="ruleForm.mean" placeholder="请输入文案"></el-input>
        <el-color-picker v-model="ruleForm.color" class="s-color-picker"></el-color-picker>
      </div>

      <div class="foot_btn_box">
        <el-button size="normal" type="primary" @click="handleClick">保存</el-button>
        <el-button size="normal" @click="cancelForm">取消</el-button>
      </div>
      <!-- <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>-->
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_systemConfig";
import DetailBox from "@/components/detailMode/detailBox.vue";
export default {
  name: "TagsSetting",
  components: { DetailBox },
  data() {
    return {
      drawer: false,
      fromConfigData: {
        title: "服务商顶部颜色条编辑"
      },
      inputVisible: false,
      inputValue: "",
      formData: {
        agentTags: {
          type: "agent",
          tags: [],
          inputVisible: false,
          inputValue: ""
        },
        agentColor: {
          red: "情绪客户",
          green: "优质客户",
          yellow: "普通客户"
        },
        moodColor: [],
        positionTags: {
          type: "user",
          tags: [],
          inputVisible: false,
          inputValue: ""
        }
      },
      inputRed: "",
      inputGreen: "",
      inputYellow: "",
      ruleForm: {
        type: "add",
        id: "",
        color: "",
        mean: ""
      }
    };
  },
  mounted() {
    this.labelQueryByConditionAgent();
    this.labelQueryByConditionUser();
    this.moodColorQueryByConditionAgent();
  },
  methods: {
    // 查询情绪色
    moodColorQueryByConditionAgent() {
      api
        .moodColorQueryByConditionAgent()
        .then(res => {
          this.formData.moodColor = res.data;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 查询服务商标签
    labelQueryByConditionAgent() {
      api
        .labelQueryByConditionAgent()
        .then(res => {
          this.formData.agentTags.tags = res.data;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 查询成员职位标签
    labelQueryByConditionUser() {
      api
        .labelQueryByConditionUser()
        .then(res => {
          this.formData.positionTags.tags = res.data;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    editColor($item) {
      this.ruleForm = {
        type: 'edit',
        color: $item.color,
        id: $item.id,
        mean: $item.mean
      }
      this.drawer = true;
    },
    handleClick() {
      if (this.ruleForm.type === 'add') {
        api.moodColorAddAgent({
          color: this.ruleForm.color,
          mean: this.ruleForm.mean
        }).then(res => {
          if (res.code) return res;
          this.$message({
            type: "success",
            message: "已添加"
          })
          this.moodColorQueryByConditionAgent();
          this.cancelForm();
        })
      } else {
        api
          .moodColorUpdateAgent({
            color: this.ruleForm.color,
            mean: this.ruleForm.mean,
            id: this.ruleForm.id
          })
          .then(res => {
            if (res.code) return res;
            this.$message({
              type: "success",
              message: "已保存"
            })
            this.moodColorQueryByConditionAgent();
            this.cancelForm();
          })
      }
    },
    cancelForm() {
      this.ruleForm = {
        type: "add",
        id: "",
        color: "",
        mean: ""
      }
      this.drawer = false;
    },
    handleClose(tag, $item) {
      if ($item.type === "user") {
        api
          .labelDelete({ id: tag.id })
          .then(res => {
            this.labelQueryByConditionUser();
          })
      } else if ($item.type === "agent") {
        api
          .labelDelete({ id: tag.id })
          .then(res => {
            this.labelQueryByConditionAgent();
          })
      }
    },

    showInput($item) {
      $item.inputVisible = true;
    },
    handleInputConfirm($event, $item) {
      if ($event.target.value) {
        if ($item.type === "user") {
          api
            .labelAddUser({ name: $event.target.value, sort: 1 })
            .then(res => {
              this.labelQueryByConditionUser();
              $item.inputVisible = false;
              $item.inputValue = "";
            })
            .catch(err => {
              this.$message(err);
            });
        } else if ($item.type === "agent") {
          api
            .labelAddAgent({ name: $event.target.value, sort: 1 })
            .then(res => {
              this.labelQueryByConditionAgent();
              $item.inputVisible = false;
              $item.inputValue = "";
            })
            .catch(err => {
              this.$message(err);
            });
        }
      } else {
        $item.inputVisible = false;
      }
    },
    cancel(done) {
      done();
    },
    onClick_editColor() {
      this.ruleForm = {
        type: "add",
        id: "",
        color: "",
        mean: ""
      }
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.color-input {
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 0 32px;
  .el-input {
    width: 243px;
    height: 40px;
    margin-right: 8px;
    font-size: 14px;
    /deep/ input {
      height: 100%;
    }
  }
}
.area_box {
  border-bottom: 1px solid #ebeef5;
}
.add_area {
  margin: 24px;
}
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 48px - 76px);
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
  overflow: auto;
  // margin: 24px;
  .tag-box {
    margin: 24px;
  }
}
.s-color-picker {
  width: 40px;
  height: 40px;
  /deep/ .el-color-picker__trigger {
    padding: 6px;
    width: 40px;
    height: 40px;
  }
}
.s-color-container {
  margin: 24px 32px;
  font-size: 14px;
  .color_item_container {
    display: flex;
    flex-wrap: wrap;
    .color_item {
      width: 205px;
      margin-right: 104px;
      margin-bottom: 14px;
      .color-line {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        .color_box {
          display: flex;
          width: 119px;
          height: 20px;
          margin-right: 14px;
          border: 1px solid #EBEEF5;
        }
        .color-right {
          width: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .el-button {
            border: 0;
            padding: 0;
          }
        }
      }
      .item_text {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 53, 1);
        line-height: 20px;
      }
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
.foot_btn_box {
  width: 100%;
  height: 96px;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding: 16px 0;
  margin-top: 24px;
  .form_box {
    margin: 0 59px;
  }
}
</style>
