<template>
  <div>
    <div class="tab_head">
      <span class="title">工单知识库</span>
    </div>

    <div class="table_box">
      <div class="left-box">
        <div class="add-first-menu" @click="onClick_addFirstMenu">
          <i class="el-icon-plus el-icon--left"></i>添加一级菜单
        </div>
        <el-tree
          ref="tree"
          :props="props"
          :data="treeData"
          node-key="id"
          :expand-on-click-node="false"
          class="tree-box"
          draggable
          :load="loadNode"
          lazy
          :allow-drop="allowDrop"
          @node-click="handleNodeClick"
        >
          <template v-slot="{ node, data }">
            <div class="custom-tree-node">
              <span
                v-show="!data.isEdit"
                @click="onClick_editMenu(node,data)"
              >{{ data.menuName+"("+((data.count)||(data.questionCount)||0)+")" }}</span>
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
                  v-model="data.menuName"
                  size="mini"
                  class="edit-input"
                  @blur="onClick_complete(node,data)"
                ></el-input>
              </span>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="right-box">
        <div class="add-question">
          <el-button type="primary" class="question-btn" @click="onClick_addQuestion">添加问题</el-button>
        </div>
        <div v-if="questions[0]" class="title-box">
          <span class="title">{{ questions[0].secondMenuName }}</span>
          <span class="record">（共{{ questions.length }}条记录）</span>
        </div>
        <template v-if="questions.length!==0">
          <div class="questions-box">
            <div v-for="(item,index) in questions" :key="index" class="question-item">
              <div class="question">
                <span>
                  <i class="el-icon-question question-icon"></i>
                  <span class="content">{{ item.questionContent }}</span>
                </span>
                <span>
                  <span class="edit" @click="onClick_editQuestion(item)">编辑</span>
                  <span class="delete" @click="onClick_deleteQuestion(item)">删除</span>
                </span>
              </div>
              <div class="answer-box" v-html="item.answerContent"></div>
              <div class="info-box">
                <span>所属分类：{{ item.firstMenuName+"-"+item.secondMenuName }}</span>
                <span class="time">更新时间：{{ item.updateDate }}</span>
              </div>
            </div>
          </div>
          <div class="crud-pagination">
            <el-pagination
              size="medium"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
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
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        size="medium"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="90px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_ticketCenter";
import ticketKnowledgeImg from "@/assets/img/ticketKnowledge.png";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "../formConfig/ticketKnowledge";

export default {
  name: "TicketKnowledge",
  components: { Form },
  data() {
    return {
      props: {
        isLeaf: "leaf"
      },
      menuId: 10000,
      ticketKnowledgeImg: ticketKnowledgeImg,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      ruleForm: {
        name1: "2"
      },
      currentPage: 1,
      pageSize: 10,
      dataTotal: 0,
      isEdit: false,
      type: "employee_edit",
      treeData: [],
      questions: [],
      selectTreeData: {
        label: "佣金提现"
      },
      selectedData: {},
      formStatus: "",
      firstClass: "",
      secondClass: "",
      activeRow: {},
      currentNode: {},
      currentData: {}
    };
  },
  mounted() {
    this.transferQuestions();
    this.queryFirstClassByPage();
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 1) {
        // 处理展开后才能添加
        if (!node.data.children) {
          this.$set(node.data, "children", []);
        }
        api
          .querySecondClassByPage({
            firstMenuId: node.data.id,
            pageSize: 0,
            currentPage: 0
          })
          .then(res => {
            res.data.forEach(item => {
              item.leaf = true;
            });
            resolve(res.data);
          })
          .catch(err => {
            this.$message(err);
          });
      }
    },
    queryFirstClassByPage() {
      api
        .queryFirstClassByPage({})
        .then(res => {
          this.treeData = res.data;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    confirm($data) {
      switch (this.formStatus) {
        case "addFirstClass":
          api
            .addFirstClass({
              menuName: $data.menuName
            })
            .then(res => {
              this.$message("已添加");
              this.drawer = false;
              this.$nextTick(() => {
                this.queryFirstClassByPage()
              });
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "addQuestion":
          api
            .addQuestion({
              questionContent: $data.questionContent,
              secondClass: this.secondClass || $data.secondId,
              answerContent: $data.answerContent,
              firstClass: this.firstClass || $data.firstId
            })
            .then(res => {
              this.$message("已添加");
              this.drawer = false;
              this.$nextTick(() => {
                this.queryFirstClassByPage()
              });
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "editQuestion":
          api
            .updateQuestion({
              questionContent: $data.questionContent,
              secondClass: this.secondClass,
              answerContent: $data.answerContent,
              firstClass: this.firstClass,
              id: this.activeRow.id
            })
            .then(res => {
              this.$message("编辑成功");
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;

        default:
          break;
      }
    },
    onClick_editMenu($node, $data) {
      if (this.selectedData === $data) {
        this.$set($data, "isEdit", true);
        this.$nextTick(() => {
          this.$refs[`input${$data.id}`].focus();
        });
      } else {
        this.selectedData = $data;
      }
    },
    onClick_complete($node, $data) {
      if ($node.level === 1) {
        api
          .updateFirstClass({
            id: $data.id,
            menuName: $data.menuName
          })
          .then(res => {
            this.$set($data, "isEdit", false);
          })
          .catch(err => {
            this.$message(err);
          });
      } else if ($node.level === 2) {
        // 如果是新添加节点
        if ($data.isNew) {
          api
            .addSecondClass({
              firstMenuId: $node.parent.data.id,
              menuName: $data.menuName
            })
            .then(res => {
              this.$set($data, "isEdit", false);
              this.$set($data, "isNew", false);
            })
            .catch(err => {
              this.$message(err);
            });
        } else {
          api
            .updateSecondClass({
              id: $data.id,
              menu_name: $data.menuName,
              is_deleted: ""
            })
            .then(res => {
              this.$set($data, "isEdit", false);
            })
            .catch(err => {
              this.$message(err);
            });
        }
      }
    },
    onClick_cannel($data) {
      this.$set($data, "isEdit", false);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.level === dropNode.level) {
        if (draggingNode.parent.id === dropNode.parent.id) {
          if (type === "prev" || type === "next") {
            let axiosPromise = null;
            if (draggingNode.level === 1) {
              axiosPromise = api.moveFirstMenu
            } else if (draggingNode.level === 2) {
              axiosPromise = api.moveSecondMenu
            } else {
              return false
            }
            axiosPromise({
              changeMenuId: dropNode.data.id,
              id: draggingNode.data.id
            })
              .then(res => {
                this.$nextTick(() => {
                  this.queryFirstClassByPage()
                });
                return true;
              })
              .catch(err => {
                this.$message(err);
                return false;
              });
          } else {
            return false;
          }
        }
      } else {
        // 不同级进行处理
      }
    },
    handleNodeClick($data, $node) {
      this.currentNode = $node
      this.currentData = $data
      if ($node.level === 2) {
        this.firstClass = $node.parent.data.id;
        this.secondClass = $node.data.id;
        api
          .queryQuestionByPage({
            secondClass: $data.id,
            pageSize: 0,
            currentPage: 0
          })
          .then(res => {
            this.questions = res.data;
            this.dataTotal = res.totalCount;
          })
          .catch(err => {
            this.$message(err);
          });
      }
    },
    getQuestion(secondId) {
      api
        .queryQuestionByPage({
          secondClass: secondId,
          pageSize: 0,
          currentPage: 0
        })
        .then(res => {
          this.questions = res.data;
          this.dataTotal = res.totalCount;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    onClick_addFirstMenu() {
      this.formStatus = "addFirstClass";
      this.fromConfigData = FORM_CONFIG.menuData;
      this.drawer = true;
    },
    onClick_addQuestion() {
      this.formStatus = "addQuestion";
      this.fromConfigData = FORM_CONFIG.addQuestionData;
      this.drawer = true;
    },
    onClick_editQuestion($row) {
      this.formStatus = "editQuestion";
      this.activeRow = $row;
      const formData = JSON.parse(JSON.stringify(FORM_CONFIG.editQuestionData));
      this.fromConfigData = formData;
      this.drawer = true;
      this.getQuestion(this.currentData.id)
    },
    transferQuestions() {
      this.questions.forEach(item => {
        item.answer = item.answer.replace(/\n/g, "<br/>");
      });
    },
    onClick_append($node, $data) { // 添加节点
      this.$refs.tree.store.nodesMap[$data.id].expanded = true;
      this.menuId++
      const newChild = {
        id: this.menuId,
        menuName: "菜单名",
        isEdit: true,
        leaf: true,
        questionCount: 0,
        isNew: true
      };
      if (!$data.children) {
        this.$set($data, "children", []);
      }
      $data.children.push(newChild);
    },
    onClick_delete($node, $data) { // 删除节点
      this.$confirm("是否要删除该菜单？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          let axiosPromise = null;
          if (this.currentNode.level === 1) {
            axiosPromise = api.deleteFirstClass
          } else if (this.currentNode.level === 2) {
            axiosPromise = api.deleteSecondClass
          } else {
            return;
          }
          axiosPromise({
            id: this.currentData.id
          })
            .then(res => {
              this.$message({
                type: "info",
                message: "已删除"
              });
              this.$nextTick(() => {
                this.queryFirstClassByPage()
              });
            })
            .catch(err => {
              this.$message(err);
            });
        })
        .catch(() => {});
    },
    onClick_deleteQuestion($data) {
      this.$confirm("是否要删除该问题？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .deleteQuestion({
              questionContent: $data.questionContent,
              secondClass: this.secondClass,
              answerContent: $data.answerContent,
              firstClass: this.firstClass,
              id: $data.id
            })
            .then(res => {
              this.$message("删除成功");
              this.getQuestion(this.currentData.id)
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
        })
        .catch(() => {});
    },
    onClick_menuItem($item) {},
    handleCurrentChange(page) {
      this.currentPage = page;
      api
        .queryQuestionByPage({
          secondClass: this.secondClass,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          this.questions = res.data;
          this.dataTotal = res.totalCount;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      api
        .queryQuestionByPage({
          secondClass: this.secondClass,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          this.questions = res.data;
          this.dataTotal = res.totalCount;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    cancel() {
      this.drawer = false;
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
