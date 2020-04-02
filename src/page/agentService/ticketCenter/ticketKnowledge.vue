<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">工单知识库</span>
    </div>

    <div class="table_box">
      <div class="left-box">
        <div class="add-first-menu" @click="onClick_addFirstMenu">
          <i class="el-icon-plus el-icon--left"></i>添加一级菜单
        </div>
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          class="tree-box"
          draggable
          :allow-drop="allowDrop"
          @node-click="handleNodeClick"
        >
          <template v-slot="{ node, data }">
            <div class="custom-tree-node">
              <span v-show="!data.isEdit" @click="onClick_editMenu(data)">{{ node.label }}</span>
              <span v-show="!data.isEdit">
                <el-button
                  v-if="data.children"
                  type="text"
                  size="mini"
                  @click="onClick_append(node,data)"
                >添加</el-button>
                <el-button type="text" size="mini" @click="onClick_delete(node,data)">删除</el-button>
              </span>
              <span v-show="data.isEdit">
                <el-input
                  :ref="'input'+data.id"
                  v-model="data.label"
                  size="mini"
                  class="edit-input"
                  @blur="onClick_complete(data)"
                ></el-input>
                <!-- <el-button
                    class="cancel-btn"
                    size="medium"
                    type="text"
                    @click="onClick_complete(data)"
                  >完成</el-button>
                  <el-button
                    class="cancel-btn"
                    size="medium"
                    type="text"
                    @click="onClick_cannel(data)"
                >取消</el-button>-->
              </span>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="right-box">
        <div class="add-question">
          <el-button type="primary" class="question-btn" @click="onClick_addQuestion">添加问题</el-button>
        </div>
        <div class="title-box">
          <span class="title">{{ selectTreeData.label }}</span>
          <span class="record">（共{{ questions.length }}条记录）</span>
        </div>
        <template v-if="questions.length!==0">
          <div class="questions-box">
            <div v-for="(item,index) in questions" :key="index" class="question-item">
              <div class="question">
                <span>
                  <i class="el-icon-question question-icon"></i>
                  <span class="content">{{ item.question }}</span>
                </span>
                <span>
                  <span class="edit" @click="onClick_editQuestion">编辑</span>
                  <span class="delete" @click="onClick_deleteQuestion">删除</span>
                </span>
              </div>
              <div class="answer-box" v-html="item.answer"></div>
              <div class="info-box">
                <span>所属分类：{{ item.category }}</span>
                <span class="time">更新时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div class="crud-pagination">
            <el-pagination
              size="medium"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="currentPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataTotal"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </template>
        <template v-if="questions.length===0">
          <div class="no-knowledge">
            <img class="img" :src="ticketKnowledgeImg" alt />
            <div class="tip">暂无相关知识</div>
          </div>
        </template>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        size="medium"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="90px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import ticketKnowledgeImg from "@/assets/img/ticketKnowledge.png";
import api from "@/api/api_params";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "../formConfig/ticketKnowledge";

export default {
  name: "Theme",
  components: { Form },
  data() {
    return {
      id: 10000,
      ticketKnowledgeImg: ticketKnowledgeImg,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      ruleForm: {
        name1: "2"
      },
      currentPage: 1,
      currentPageSize: 10,
      dataTotal: 0,
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
      type: "employee_edit",
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 9,
              label: "三级 1-1-1"
            },
            {
              id: 10,
              label: "三级 1-1-2"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      questions: [
        {
          question: "如何提现",
          answer:
            "a，佣金不低于500才可申请提现；\n\nb，提现时间需在本月28日-下月10日；\n\nc，交易与活动佣金可分开提现。",
          createTime: "2020-02-20 15:22：2",
          category: "财务类 - 佣金提现"
        },
        {
          question: "如何提现",
          answer:
            "a，佣金不低于500才可申请提现；\n\nb，提现时间需在本月28日-下月10日；\n\nc，交易与活动佣金可分开提现。",
          createTime: "2020-02-20 15:22：2",
          category: "财务类 - 佣金提现"
        },
        {
          question: "如何提现",
          answer:
            "a，佣金不低于500才可申请提现；\n\nb，提现时间需在本月28日-下月10日；\n\nc，交易与活动佣金可分开提现。",
          createTime: "2020-02-20 15:22：2",
          category: "财务类 - 佣金提现"
        },
        {
          question: "如何提现",
          answer:
            "a，佣金不低于500才可申请提现；\n\nb，提现时间需在本月28日-下月10日；\n\nc，交易与活动佣金可分开提现。",
          createTime: "2020-02-20 15:22：2",
          category: "财务类 - 佣金提现"
        }
      ],
      selectTreeData: {
        label: "佣金提现"
      },
      selectedData: {}
    };
  },
  mounted() {
    this.selectMenu = this.menuList[0];
    this.getTableData();
    this.transferQuestions();
  },
  methods: {
    onClick_editMenu($data) {
      if (this.selectedData === $data) {
        this.$set($data, "isEdit", true);
        this.$nextTick(() => {
          this.$refs[`input${$data.id}`].focus();
        });
      } else {
        this.selectedData = $data;
      }
    },
    onClick_complete($data) {
      // api.xxx()
      this.$set($data, "isEdit", false);
    },
    onClick_cannel($data) {
      this.$set($data, "isEdit", false);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.level === dropNode.level) {
        if (draggingNode.parent.id === dropNode.parent.id) {
          // api请求 {}
          return type === "prev" || type === "next";
        }
      } else {
        // 不同级进行处理
      }
    },
    handleNodeClick($data) {
      console.log($data);
    },
    onClick_addFirstMenu() {
      this.fromConfigData = FORM_CONFIG.menuData;
      this.drawer = true;
    },
    onClick_addQuestion() {
      this.fromConfigData = FORM_CONFIG.addQuestionData;
      this.drawer = true;
    },
    onClick_editQuestion() {
      this.fromConfigData = FORM_CONFIG.editQuestionData;
      this.drawer = true;
    },
    transferQuestions() {
      this.questions.forEach(item => {
        item.answer = item.answer.replace(/\n/g, "<br/>");
      });
    },
    onClick_append($node, $data) {
      const newChild = { id: this.id++, label: "testtest" };
      if (!$data.children) {
        this.$set($data, "children", []);
      }
      $data.children.push(newChild);
    },
    onClick_delete($node, $data) {
      this.$confirm("是否要删除该菜单？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.unfrozen({}).then(res => {
            this.$message({
              type: "info",
              message: "已删除"
            });
          });
        })
        .catch(() => {});
    },
    onClick_deleteQuestion($node, $data) {
      this.$confirm("是否要删除该问题？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.unfrozen({}).then(res => {
            this.$message({
              type: "info",
              message: "已删除"
            });
          });
        })
        .catch(() => {});
    },
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
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getTableData();
    },
    handleSizeChange(size) {
      this.currentPageSize = size;
      this.getTableData();
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
    cancel() {
      this.drawer = false;
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
    padding: 18px;
    .add-first-menu {
      width: 100%;
      margin: auto;
      height: 40px;
      line-height: 40px;
      background: rgba(243, 243, 243, 1);
      color: rgba(96, 98, 102, 1);
      text-align: center;
      border-radius: 4px;
      font-size: 14px;
      border: 1px solid rgba(220, 223, 230, 1);
    }
    .tree-box {
      margin-top: 25px;
      /deep/ .el-tree-node__content {
        height: 37px;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      height: 40px;
    }
  }
  .right-box {
    margin-left: 16px;
    width: 66%;
    background: #ffffff;
    overflow: auto;
    .add-question {
      padding: 0 24px;
      height: 76px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-bottom: 1px solid #ebeef5;
      .question-btn {
        width: 120px;
        height: 40px;
      }
    }
    .title-box {
      padding: 26px 18px 0;
      .title {
        color: #333335;
        font-size: 16px;
      }
      .record {
        color: #333335;
      }
    }
    .questions-box {
      height: 400px;
      overflow: auto;
    }
    .question-item {
      margin: 22px 18px 0;
      background: rgba(246, 247, 249, 1);
      border-radius: 2px;
      padding: 16px;
      .question {
        display: flex;
        justify-content: space-between;
        .question-icon {
          color: rgba(25, 137, 250, 1);
          font-size: 15px;
          line-height: 15px;
        }
        .content {
          margin-left: 8px;
          font-weight: 500;
        }
        .edit {
          color: #1989fa;
        }
        .delete {
          color: #1989fa;
          margin-left: 16px;
        }
      }
      .answer-box {
        margin: 13px 0 0 23px;
        color: #3a3a3c;
      }
      .info-box {
        color: #606266;
        margin: 24px 0 0 23px;
        .time {
          margin-left: 44px;
        }
      }
    }
    .no-knowledge {
      margin-top: 66px;
      text-align: center;
      .img {
        width: 269px;
        height: 195px;
      }
      .tip {
        margin-top: 21px;
        font-size: 18px;
        color: #7e7f83;
      }
    }
  }
}
.crud-pagination {
  background: #fff;
  padding: 16px;
  text-align: right;
  margin-top: 25px;
}
.edit-input {
  width: 200px;
}
</style>
