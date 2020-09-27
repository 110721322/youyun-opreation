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
      <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-data="configData.formModel"
          :grid-edit-width="220"
          form-title="用户"
          :is-async="true"
          :is-select="false"
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
  </div>
</template>
<script>
import search from "@/components/search/search.vue";
import api_dataMarket from "@/api/api_dataMarket";
import api from "@/api/api_agent";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/topAgentConfig";
import { FORM_CONFIG } from "./formConfig/topAgentSearch";
import { mapActions } from 'vuex'

export default {
  name: "TopAgentList",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "280",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      selectData: [],
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
    transfer() {
      if (this.selectData.length) {
        this.$confirm("是否批量转移运营？", "转移运营", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then(() => {
          api_dataMarket.transferOperate({
            agentNos: [],
            operateUserNo: ""
          }).then(res => {
            this.$message({
              type: "info",
              message: "转移成功"
            });
          });
        }).catch(() => {});
      } else {
        this.$message({
          type: "info",
          message: "请选择代理商"
        });
      }
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
