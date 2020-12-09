<template>
  <div>
    <div class="p-head">服务商列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />

    <div class="table-box">
      <div class="two-btn">
        <el-button type="primary" @click="clickAddServe">添加服务商</el-button>
      </div>
      <!--TODONEXT <div class="select_data">
        <span class="el-icon-info icon" />
        <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
        <el-button class="btn" type="text" @click="clickClear">清空</el-button>
      </div> -->
      <BaseCrud
        ref="child"
        :ref-name="child"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="true"
        :params="params"
        :api-service="api"
        @selectionChange="selectionChange"
        @detail="clickDetail"
        @thaw="clickThaw"
        @frozen="clickFrozen"
        @openAgentManager="openAgentManager"
        @goMerchantList="goMerchantList"
        @completion="clickDetail"
      >
        <el-button slot="paginationLeft" class="basecard-button" @click="clickTransfer">批量转移运营</el-button>
      </BaseCrud>
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
        <el-button type="primary" @click="clickSure">确 定</el-button>
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
  name: "AgentList",
  components: { search, BaseCrud },

  data() {
    return {
      operationId: '', // 服务商的ID
      options: [], // 选择项列表
      searchMaxHeight: "380", // 搜索展开项高度
      configData: USER_CONFIG, // 列表展示数据
      searchConfig: FORM_CONFIG, // 搜索项数据
      selectData: [], // 选择项数据
      params: {}, // 接口请求参数
      api: "", // 调用接口
      dialogVisible: false,
      child: 'child' // ref的值
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
    clickTransfer() {
      if (this.selectData.length) {
        this.dialogVisible = true
        commonApi.listOperations().then(res => {
          this.options = res.data
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择代理商"
        });
      }
    },

    // 清空批量选择
    clickClear() {
      this.selectData = []
      this.$refs.child.$children[0].clearSelection();
    },

    // 点击确认按钮，确认转移运营
    clickSure() {
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
        })
      }
    },

    // 关闭批量转移的窗口
    handleClose() {
      this.dialogVisible = false
    },

    // 当前选中的tab表格
    selectionChange($val) {
      this.selectData = $val;
    },

    // 搜索功能
    search($form) {
      this.params = {
        beginDate: $form.date[0] ? $form.date[0] : null,
        endDate: $form.date[0] ? $form.date[1] : null,
        operationId: $form.operationId,
        status: $form.status ? $form.status : null,
        personName: $form.personName ? $form.personName : null,
        personMobile: $form.personMobile ? $form.personMobile : null,
        regionCode: $form.regionCode ? $form.regionCode : null,
        activeScopeType: $form.activeScopeType ? $form.activeScopeType : null,
        labelId: $form.labelId ? $form.labelId : null,
        [$form.search]: $form.searchVal
      }
      if ($form.area && $form.area[0]) {
        this.params.provinceCode = $form.area[0]
        this.params.cityCode = $form.area[1]
        this.params.areaCode = $form.area[2]
      }
    },

    // 点击查看详情，进入服务商详情页面
    clickDetail($row) {
      this.$router.push({
        name: "agentDetail",
        query: {
          agentNo: $row.agentNo
        }
      });
    },

    // 点击解冻代理商的按钮解冻代理商
    clickThaw(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
        api.unfrozen({
          agentNo: row.agentNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已解冻"
            });
            this.$refs.child.getData()
          }
        });
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        })
      })
    },

    // 点击冻结代理商的按钮冻结代理商
    clickFrozen(row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(() => {
        api.frozen({
          agentNo: row.agentNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已冻结"
            })
            this.$refs.child.getData()
          }
        })
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        })
      })
    },

    // 打开服务商后台
    openAgentManager(row) {
      api.generateLoginTicket({
        system: 'agent',
        phone: row.loginAccount,
        password: row.password
      }).then(res => {
        if (res.status === 0) {
          window.open(process.env.VUE_APP_AGENTURL + '#/login?ticket' + '=' + res.data)
        }
      })
    },

    // 点击进入商户列表页面
    goMerchantList() {
      this.$router.push({
        name: "merchantList"
      });
    },

    // 点击添加服务商按钮，跳转至添加服务商的页面
    clickAddServe() {
      this.$router.push({
        name: "addAgent"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.two-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.select_data {
  margin: 16px 0;
  width: 100%;
  height: 40px;
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(186, 231, 255, 1);
  line-height: 40px;

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

.basecard-button {
  margin-left: 24px;
}
</style>
