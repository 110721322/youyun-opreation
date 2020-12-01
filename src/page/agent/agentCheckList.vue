<template>
  <div>
    <div class="p_head">服务商审核列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="160"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @reject="onClickReject"
        @activation="onClickActivation"
        @adopt="onClickAdopt"
      />
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">审核通过</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        :is-drawer="true"
        @cancel="onClickCancel"
        @confirm="onClickConfirm"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { CHECK_CONFIG } from "./formConfig/agentCheck";
import { USER_CONFIG } from "./tableConfig/agentCheckConfig";
import { FORM_CONFIG } from "./formConfig/agentCheckListSearch";
export default {
  name: "AgentCheckList",
  components: { search, BaseCrud, Form },

  data() {
    return {
      agentNo: '', // 服务商的编号
      drawer: false, // 控制侧边抽屉的显示与隐藏
      searchMaxHeight: "320", // 搜索展开项的高度
      configData: USER_CONFIG, // 列表项的参数
      searchConfig: FORM_CONFIG, // 搜索项的参数
      fromConfigData: CHECK_CONFIG, // 侧边弹窗的参数
      params: {}, // 搜索项传参
      api: api.agentExamineList // 请求列表
    };
  },
  created() {},
  mounted() {},
  methods: {
    search($form) {
      this.params = {
        beginDate: $form.date ? $form.date[0] : '',
        endDate: $form.date ? $form.date[1] : '',
        personName: $form.personName ? $form.personName : null,
        personMobile: $form.personMobile ? $form.personMobile : null,
        businessType: $form.businessType ? $form.businessType : null,
        contractStatus: $form.contractStatus ? $form.contractStatus : null,
        operationId: $form.operationId ? $form.operationId : null,
        agentName: $form.agentName ? $form.agentName : null
      }
    },

    // 驳回代理商
    onClickReject(row) {
      this.$confirm("是否要驳回该代理商？", "驳回代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认驳回",
        cancelButtonText: "取消"
      }).then(() => {
        api.reject({
          agentNo: row.agentNo
        }).then((res) => {
          if (res.status === 0) {
            this.$message({
              type: "info",
              message: "已驳回"
            });
          }
          this.$refs.table.getData();
        })
      })
    },

    // 激活代理商
    onClickActivation(row) {
      this.$confirm("是否要激活该代理商？", "激活代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认激活",
        cancelButtonText: "取消"
      }).then(() => {
        api.activate({
          agentNo: row.agentNo
        }).then((res) => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已激活"
            });
            this.$refs.table.getData();
          }
        })
      })
    },

    // 点击取消关闭侧弹窗
    onClickCancel() {
      this.drawer = false
    },

    // 点击确认按钮
    onClickConfirm($form) {
      if (!$form.operationId) {
        this.$message({
          message: '请选择所属服务商',
          type: 'warning'
        })
        return false
      }
      api.pass({
        agentNo: this.agentNo,
        operationId: $form.operationId
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            type: "success",
            message: "已通过"
          })
          this.$router.push({
            name: 'agentDetail',
            query: {
              agentNo: this.agentNo
            }
          })
        }
        this.drawer = false
      })
    },

    // 点击通过按钮弹出侧边弹窗
    onClickAdopt(row) {
      this.drawer = true
      this.agentNo = row.agentNo
    }
  }
};
</script>

<style scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
