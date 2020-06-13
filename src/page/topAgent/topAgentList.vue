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
          <el-button @click="onClick_addServe" type="primary">添加服务商</el-button>
        </div>
        <div class="select_data">
          <span class="el-icon-info icon" /><span>已选择<span class="blue">{{ selectData.length }}</span> 项目</span>
          <el-button class="btn" type="text">清空</el-button>
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
          :is-select="false"
          :params="params"
          :api-service="null"
          @selectionChange="selectionChange"
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @goMerchantList="goMerchantList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js";
// import dataMode from '@/components/dataMode/dataMode.vue'
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/topAgentConfig";
import { FORM_CONFIG } from "./../agent/formConfig/agentListSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "380",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      selectData: [],
      params: {},
      api: api.agentList
    };
  },
  created() {
    this.params = {
      agentNo: "",
      businessType: "",
      agentName: "",
      personName: "",
      personMobile: "",
      contractType: "",
      activeScopeType: "",
      operateUserNo: "",
      parentAgentNo: "",
      activeDate: "",
      expireDate: "",
      contractStatus: "",
      contractStatusSet: "",
      isExpired: "",
      provinceCode: "",
      cityCode: "",
      areaCode: "",
      agentGrade: 1
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          sort: '1',
          createTime: '2020-06-13',
          ID: '123456',
          agentName: '测试服务商',
          people: '张三',
          expireDate: '拉阿拉蕾',
          accountStatus: '通过'
        }
      ]
    },
    transfer() {
      if (this.selectData.length) {
        this.$confirm("是否批量转移运营？", "转移运营", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then(() => {
          api.transferOperate({
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
      console.log($form);
      this.params = {
        agentNo: "",
        businessType: "",
        agentName: "",
        personName: "",
        personMobile: "",
        contractType: "",
        activeScopeType: $form.activeScopeType,
        operateUserNo: $form.operateUserNo,
        parentAgentNo: "",
        activeDate: "",
        expireDate: "",
        contractStatus: "",
        contractStatusSet: $form.contractStatusSet,
        isExpired: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        agentGrade: $form.agentGrade
      };
      if ($form.area) {
        this.params.provinceCode = $form.area[0];
        this.params.cityCode = $form.area[1];
        this.params.areaCode = $form.area[2];
      }
      this.params[$form.inputSelect] = $form.inputForm;
    },
    openDetail() {},
    thaw(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
        api.unfrozen({
          agentNo: row.agentNo
        }).then(res => {
          this.$message({
            type: "info",
            message: "已解冻"
          });
        });
      }).catch(() => {});
    },
    frozen() {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(row => {
        api.frozen({
          agentNo: row.agentNo
        }).then(res => {
          this.$message({
            type: "info",
            message: "已冻结"
          });
        });
      }).catch(() => {});
    },
    openAgentManager() {},
    goMerchantList() {},
    onClick_addServe() {}
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
