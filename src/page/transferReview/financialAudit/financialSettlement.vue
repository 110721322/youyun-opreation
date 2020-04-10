<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">财务结算审核</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          :header-cell-style="headerCellStyle"
          :api-service="api"
          :params="params"
          @detail="onClick_detail"
          @reject="onClick_reject"
          @adopt="onClick_adopt"
          @reviewing="onClick_reviewing"
        ></BaseCrud>
      </div>

      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <div v-if="fromConfigData.processData" class="process-box">
          <template v-for="(item,index) in fromConfigData.processData">
            <div :key="index" class="process-item">
              <div>
                <img class="process-icon" :src="item.icon" />
              </div>
              <div class="label">
                {{ item.label }}
                <span v-if="item.name" class="name">{{ item.name }}</span>
              </div>
              <div class="time">{{ item.time }}</div>
            </div>
            <img
              v-if="!(index===fromConfigData.processData.length-1)"
              :key="'img'+index"
              :src="arrow"
              class="arrow-img"
            />
          </template>
        </div>
        <elForm v-if="fromConfigData.settlementData" class="formTemplate" :label-width="'130px'">
          <el-form-item :label="fromConfigData.settlementData.label+':'" class="formTemplate-item">
            <div
              v-for="(item,index) in fromConfigData.settlementData.initValArray"
              :key="index"
              class="ellipsis"
            >{{ item }}</div>
          </el-form-item>
        </elForm>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          :foot-btn-label="fromConfigData.footBtnLabel"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import arrowImg from "@/assets/img/arrow.png";
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "../formConfig/settlementForm";
import { SEARCH_CONFIG } from "../formConfig/settlementSearch";
import { TABLE_CONFIG } from "../tableConfig/settlementConfig";
import api from "@/api/api_financialAudit.js";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      arrow: arrowImg,
      params: {},
      api: api.listFinanceSettle,
      formStatus: null,
      activeRow: {}
    };
  },
  mounted() {},
  methods: {
    confirm($data) {
      switch (this.formStatus) {
        case "reject":
          api
            .financeReject({
              recordId: this.activeRow.recordId,
              rejectReason: $data.reason,
              userId: this.activeRow.userId
            })
            .then(res => {
              this.$message("已驳回");
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "adopt":
          api
            .financeSuccess({
              recordId: this.activeRow.recordId,
              adviseCommission: $data.adviseCommission,
              operationRemark: $data.operationRemark,
              userId: this.activeRow.userId
            })
            .then(res => {
              this.$message("已通过");
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
    search($ruleForm) {
      this.params = {
        settleStatus: $ruleForm.settleStatus
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    onClick_detail($row) {
      this.$router.push({
        path: "/transferReview/financialAudit/financialSettlement/detail",
        query: { id: $row.id }
      });
    },
    onClick_reject() {
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    onClick_adopt() {
      this.formStatus = "adopt";
      this.fromConfigData = FORM_CONFIG.adoptData;
      this.drawer = true;
    },
    onClick_reviewing() {
      this.$alert("任务已处理，审批中", "提示信息", {
        confirmButtonText: "确定"
      });
    },
    cancel() {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.process-box {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  .process-item {
    width: 120px;
    text-align: center;
    .process-icon {
      height: 44px;
      width: 44px;
      border-radius: 50%;
    }
    .label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333335;
      line-height: 22px;
    }
    .name {
      color: #8c8c8c;
    }
    .time {
      font-size: 12px;
      font-family: HelveticaNeue;
      color: rgba(0, 0, 0, 0.45);
      line-height: 12px;
    }
  }
  .arrow-img {
    width: 75px;
    height: 9px;
  }
}
.ellipsis {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}
.formTemplate {
  margin: 20px 20px 0;
}
.formTemplate-item {
  margin-right: 20px;
}
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.tabale_title_box {
  height: 52px;
  width: 100%;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
    // line-height: 52px;
  }
  .btn {
    float: right;
  }
}
</style>
