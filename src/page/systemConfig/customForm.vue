<template>
  <div>
    <div class="tab-head">
      <span class="title">自定义表单</span>
    </div>

    <div class="table-box">
      <div class="left-box">
        <div class="tab-head">
          <span class="title">类型</span>
        </div>
        <div class="device-list">
          <div
            v-for="(item,key) of menuList"
            :key="key"
            class="device-item"
            :class="item.type == selectMenu.type?'select':''"
            @click="clickMenuItem(item)"
          >
            <div class="device-name">{{ item.name }}</div>
            <div class="device-num"></div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <DetailBox title="自定义表单" :border="true">
          <div class="mod-tips">
            <span>表单位置：{{ selectMenu.formLoaction }}</span>
            <el-button type="primary" @click="clickEdit">编辑</el-button>
          </div>

          <el-table :data="tableData" style="width: 100%;">
            <el-table-column
              v-for="(item,key) of tableConfig"
              :key="key"
              :prop="item.prop"
              :label="item.label"
            >
              <template slot-scope="scope">
                <div v-if="item.isShowCheckBox">
                  <el-checkbox
                    v-model=" scope.row[item.prop]"
                    :disabled="!isEdit"
                    @input="onInputCheckBox"
                  ></el-checkbox>
                </div>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </DetailBox>
        <div v-if="isEdit" class="btn-box">
          <el-button size="medium" type="primary" @click="clickSaveTableData">保存</el-button>
          <el-button size="medium" @click="clickCancelEdit">取消</el-button>
        </div>
      </div>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
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
import DetailBox from "@/components/detailMode/detailBox.vue";

export default {
  name: "CustomForm",
  components: { Form, DetailBox },
  data() {
    return {
      fromConfigData: {},
      testData: [],
      drawer: false,
      ruleForm: {
        name1: "2"
      },
      isEdit: false,
      tableConfig: [
        {
          label: "名称",
          prop: "fieldNameCn",
          width: "90px"
        },
        {
          label: "类型",
          prop: "fieldTypeValue",
          width: "90px"
        },
        {
          label: "是否必填",
          prop: "isNeed",
          width: "90px",
          isShowCheckBox: true
        },
        {
          label: "列表显示",
          prop: "isDisplay",
          width: "90px",
          isShowCheckBox: true
        }
      ],
      tableData: [],
      cloneTableData: [],
      menuList: [
        {
          name: "成员信息（编辑信息）",
          type: "employee_edit",
          formLoaction: "系统配置-成员管理-操作-编辑"
        },
        {
          name: "成员信息（注册信息）",
          type: "employee_register",
          formLoaction: "系统配置-成员列表-操作-编辑"
        }
      ],
      selectMenu: {},
      type: "employee_edit"
    };
  },
  computed: {
    /**
     * 返回发生修改的表格项
     * @returns {unknown[]}
     */
    updateTableItems() {
      return this.tableData.filter(($item, $index) => {
        const isDisplay = this.cloneTableData[$index].isDisplay;
        const isNeed = this.cloneTableData[$index].isNeed;
        const isChange = ($item.isDisplay !== isDisplay) || ($item.isNeed !== isNeed);
        if (isChange) return $item
      })
    }
  },
  mounted() {
    this.selectMenu = this.menuList[0];
    this.getTableData();
  },
  methods: {
    clickMenuItem($item) {
      this.selectMenu = $item;
      this.type = $item.type;
      this.getTableData();
    },

    onInputCheckBox() {},

    getTableData(params) {
      api
        .queryAllFormFieldsByType({
          type: this.type
        })
        .then(res => {
          this.tableData = res.data;
          this.cloneTableData = this.$g.utils.deepClone(res.data);
        })
    },

    clickSaveTableData() {
      if (this.$g.utils.isArr(this.updateTableItems) && this.updateTableItems.length > 0) {
        api
          .batchSetFormFieldsProperty(this.updateTableItems)
          .then(() => {
            this.$message({
              type: 'success',
              message: "已保存"
            });
            this.getTableData();
            this.isEdit = false;
          })
      }
    },

    clickEdit() {
      this.isEdit = true;
    },

    clickCancelEdit() {
      this.isEdit = false;
    },
    cancel(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  padding: 30px 24px;
  border-top: 1px solid #ededed;
}
.table-box {
  position: relative;
  margin: 24px;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 48px - 76px);
}

.left-box {
  width: 290px;
  background: rgba(255, 255, 255, 1);
  border-right: 1px solid #ebeef5;
  float: left;
  height: 100%;
}

.right-box {
  float: left;
  width: calc(100% - 290px - 48px);
  height: 100%;
  overflow: scroll;

  .mod-tips {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(25, 137, 250, 1);
    margin: 16px 32px 16px;
  }
}

.device-list {
  margin-top: 20px;
  height: 392px;
  overflow: auto;
}

.select {
  background: rgba(236, 237, 241, 1);
}

.device-item {
  width: 100%;
  height: 48px;
  cursor: pointer;
}

.device-name {
  float: left;
  margin-left: 30px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  line-height: 48px;
}

.device-num {
  float: right;
  margin-right: 30px;
  width: 31px;
  height: 22px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
}

.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
