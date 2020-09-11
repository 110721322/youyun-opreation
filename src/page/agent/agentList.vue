<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1 || this.$route.path.indexOf('/addAgent') !== -1" />
    <div v-else>
      <div class="p_head">服务商列表</div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />

      <!-- <data-mode></data-mode> -->
      <div class="table_box">
        <div class="two-btn">
          <el-button @click="transfer">批量转移运营</el-button>
          <el-button type="primary" @click="onClick_addServe">添加服务商</el-button>
        </div>
        <div class="select_data">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
          <el-button class="btn" type="text" @click="clear">清空</el-button>
        </div>
        <BaseCrud
          ref="child"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :params="params"
          :api-service="api"
          @selectionChange="selectionChange"
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @goMerchantList="goMerchantList"
          @completion="onCompletion"
        />
      </div>
    </div>
    <el-dialog
      title="批量转移运营"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-model="operationId" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.operationId"
          :label="item.operationName"
          :value="item.operationId"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handle_ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js";
import commonApi from "@/api/api_common.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentConfig";
import { FORM_CONFIG } from "./formConfig/agentListSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      operationId: '',
      options: [],
      searchMaxHeight: "380",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      selectData: [],
      params: {},
      api: "",
      dialogVisible: false
    };
  },
  created() {
    if (this.$route.query.agentNo) {
      this.params.agentNo = this.$route.query.agentNo
    }
    this.api = api.agentList
  },
  mounted() {},
  methods: {
    transfer() {
      if (this.selectData.length) {
        this.dialogVisible = true
        commonApi.listOperations().then(res => {
          this.options = res.object
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择代理商"
        });
      }
    },
    clear() {
      this.selectData = []
      this.$refs.child.$children[0].clearSelection();
    },
    handle_ok() {
      if (!this.operationId) {
        this.$message({
          message: '请选择运营人员',
          type: 'warning'
        })
        return false
      } else {
        var agentNosList = ''
        for (var i = 0; i < this.selectData.length; i++) {
          agentNosList += this.selectData[i].agentNo + ','
        }
        agentNosList = agentNosList.slice(0, agentNosList.length - 1)
        api.updateOperationId({
          operationId: this.operationId,
          agentNos: agentNosList
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '批量转移成功',
              type: 'success'
            })
          }
          this.dialogVisible = false
          this.selectData = []
          this.$refs.child.getData()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleClose() {},
    selectionChange($val) {
      this.selectData = $val;
    },
    search($form) {
      this.params = {
        operationId: $form.operationId,
        status: $form.status ? $form.status : null,
        personName: $form.personName ? $form.personName : null,
        personMobile: $form.personMobile ? $form.personMobile : null,
        regionCode: $form.regionCode ? $form.regionCode : null,
        activeScopeType: $form.activeScopeType ? $form.activeScopeType : null,
        labelId: $form.labelId ? $form.labelId : null
      }
      if ($form.area) {
        this.params.provinceCode = $form.provinceCode
        this.params.cityCode = $form.cityCode
        this.params.areaCode = $form.areaCode
      }
      this.params[$form.inputSelect] = $form.inputForm;
    },
    openDetail($row) {
      this.$router.push({
        path: "/agent/list/detail",
        query: {
          agentNo: $row.agentNo
        }
      });
    },
    thaw(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .unfrozen({
              agentNo: row.agentNo
            })
            .then(res => {
              this.$message({
                type: "info",
                message: "已解冻"
              });
            });
        })
        .catch(() => {});
    },
    frozen(row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      })
        .then(res => {
          api
            .frozen({
              agentNo: row.agentNo
            })
            .then(res => {
              this.$message({
                type: "info",
                message: "已冻结"
              });
              this.$refs.child.getData()
            });
        })
        .catch(() => {});
    },
    openAgentManager(row) {
      console.log(row)
      api.generateLoginTicket({
        system: 'agent',
        phone: row.personMobile,
        password: row.password
      }).then(res => {
        if (res.status === 0) {
          api.loginWithTicket({
            ticket: res.object
          }).then(result => {
            console.log(result)
          })
        }
      })
    },
    goMerchantList() {
      this.$router.push({
        path: "/merchant/list"
      });
    },
    onClick_addServe() {
      this.$router.push({
        path: "/agent/list/addAgent"
      })
    },
    onCompletion($row) {
      this.$router.push({
        path: "/agent/list/detail",
        query: {
          agentNo: $row.agentNo
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.two-btn {
  display: flex;
  justify-content: space-between;
}
.select_data {
  width: 100%;
  height: 40px;
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(186, 231, 255, 1);
  line-height: 40px;
  margin: 16px 0;
  .icon {
    color: rgba(24, 144, 255, 1);
    margin: 0 8px 0 16px;
  }

  .blue {
    color: rgba(24, 144, 255, 1);
  }

  .btn {
    margin-left: 16px;
    font-size: 14px;
  }
}
</style>
