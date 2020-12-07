<template>
  <div class="container">
    <div class="p-head">顶级服务商列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
      <div class="two-btn">
        <el-button type="primary" class="s-table-btn" @click="clickUpdateOperation">转移运营</el-button>
      </div>
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-data="configData.formModel"
        :grid-edit-width="220"
        form-title="用户"
        :is-async="true"
        :is-select="true"
        :params="params"
        :api-service="apiService"
        @selectionChange="onClickSelectionChange"
        @detail="onClickOpenDetail"
        @thaw="onClickThaw"
        @frozen="onClickFrozen"
        @openAgentManager="openAgentManager"
        @addInfo="onClickOpenDetail"
      />
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">分配运营</div>
      <Form
        v-if="drawer"
        ref="memberEdit"
        :form-base-data="formConfig.formData"
        :show-foot-btn="true"
        :is-drawer="true"
        @cancel="drawer = false"
        @confirm="onClickTransfer"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import search from "@/components/search/search.vue";
import api_dataMarket from "@/api/api_dataMarket";
import api_topAgent from "@/api/api_topAgent";
import api from "@/api/api_agent";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { USER_CONFIG } from "./tableConfig/topAgentConfig";
import { FORM_CONFIG, FORM_CONFIG2 } from "./formConfig/topAgentSearch";
import { mapActions } from 'vuex'

export default {
  name: "TopAgentList",
  components: { search, BaseCrud, Form },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "280",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      formConfig: FORM_CONFIG2,
      testData: [],
      selectData: [],
      drawer: false,
      params: {
        channelAgentCode: null,
        channelAgentName: null,
        personName: null,
        personMobile: null,
        operationId: null,
        status: null
      },
      apiService: api_dataMarket.topAgentPageByCondition
    };
  },
  created() {},
  mounted() {
    this.queryInit();
  },
  methods: {
    ...mapActions(['setLabelList', 'setRegionList', 'setUserList']),
    queryInit() {
      api_dataMarket.queryInit().then(res => {
        const labelList = res.data.labelList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          }
        })
        const regionList = res.data.regionSetList.map($ele => {
          return {
            label: $ele.regionName,
            value: $ele.regionCode
          }
        })
        const userList = res.data.userDTOList.map($ele => {
          return {
            label: $ele.jobName || $ele.name,
            value: $ele.id
          }
        })
        this.setLabelList(labelList)
        this.setRegionList(regionList)
        this.setUserList(userList)
      })
    },

    clickUpdateOperation() {
      if (this.selectData.length) {
        this.drawer = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择服务商"
        });
      }
    },

    onClickTransfer($ruleForm) {
      this.$confirm("是否批量转移运营？", "转移运营", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        api_topAgent.updateOperationId({
          topAgentNos: this.selectData.map(item => { return item.channelAgentCode }).join(','),
          operationId: $ruleForm.operationId
        }).then(res => {
          if (res.code) return res;
          this.$message({
            type: "success",
            message: "转移成功"
          });
          this.$refs.table.getData();
          this.drawer = false;
        });
      })
    },

    onClickSelectionChange($val) {
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
        labelId: $form.labelId ? $form.labelId : null,
        [$form.search]: $form.searchVal
      }
    },

    onClickOpenDetail($row) {
      this.$router.push({
        name: "topAgentDetail",
        query: {
          channelAgentCode: $row.channelAgentCode
        }
      })
    },

    onClickThaw($row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 5,
          channelAgentCode: $row.channelAgentCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已解冻"
            });
            this.$refs.table.getData();
          }
        })
      }).catch(() => {
        this.$message('取消操作')
      })
    },

    onClickFrozen($row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 4,
          channelAgentCode: $row.channelAgentCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "info",
              message: "已冻结"
            });
            this.$refs.table.getData();
          }
        })
      }).catch(() => {
        this.$message('取消操作')
      })
    },
    openAgentManager(row) {
      api.generateLoginTicket({
        system: 'operation',
        phone: row.loginAccount,
        password: row.password
      }).then(res => {
        if (res.status === 0) {
          window.location.href = process.env.VUE_APP_BASEURL + '#/login?ticket' + '=' + res.data
        }
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
</style>
