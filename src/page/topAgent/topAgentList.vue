<template>
  <div class="container">
    <div class="p_head">服务商列表</div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
        @reset="reset"
    />
    <div class="table_box">
      <div class="two-btn">
        <el-button type="primary" class="s-table-btn" @click="updateOperation">转移运营</el-button>
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
          @selectionChange="selectionChange"
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @addInfo="openDetail"
      />
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">分配运营</div>
      <Form
          v-if="drawer"
          ref="memberEdit"
          :form-base-data="formConfig.formData"
          :show-foot-btn="true"
          :isDrawer="true"
          @cancel="drawer = false"
          @confirm="transfer"
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
        const labelList = res.object.labelList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          }
        })
        const regionList = res.object.regionSetList.map($ele => {
          return {
            label: $ele.regionName,
            value: $ele.regionCode
          }
        })
        const userList = res.object.userDTOList.map($ele => {
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
    updateOperation() {
      if (this.selectData.length) {
        this.drawer = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择服务商"
        });
      }
    },
    transfer($ruleForm) {
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
    reset($form) {
      this.params = {
        operationId: $form.operationId,
        status: $form.status ? $form.status : null,
        personName: $form.personName ? $form.personName : null,
        personMobile: $form.personMobile ? $form.personMobile : null,
        regionCode: $form.regionCode ? $form.regionCode : null,
        activeScopeType: $form.activeScopeType ? $form.activeScopeType : null,
        labelId: $form.labelId ? $form.labelId : null
      }
      this.params.provinceCode = ''
      this.params.cityCode = ''
      this.params.areaCode = ''
      this.params[$form.inputSelect] = $form.inputForm;
    },
    openDetail($row) {
      this.$router.push({
        name: "topAgentDetail",
        query: {
          channelAgentCode: $row.channelAgentCode
        }
      })
    },
    thaw($row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 5,
          channelAgentCode: $row.channelAgentCode
        }).then((result) => {
          this.$message({
            type: "success",
            message: "已解冻"
          });
          this.$refs.table.getData();
        })
      })
    },
    frozen($row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 4,
          channelAgentCode: $row.channelAgentCode
        }).then((result) => {
          this.$message({
            type: "info",
            message: "已冻结"
          });
          this.$refs.table.getData();
        })
      })
    },
    openAgentManager(row) {
      api.generateLoginTicket({
        system: 'operation',
        phone: row.personMobile,
        password: row.password
      }).then(res => {
        if (res.status === 0) {
          window.location.href = process.env.VUE_APP_BASEURL + '#/login?ticket' + '=' + res.object
        }
      })
    },
    onClick_addServe() {
      this.$router.push({
        name: "addTopAgent"
      })
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
    justify-content: flex-end;
    margin-bottom: 8px;
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
