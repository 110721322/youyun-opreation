<template>
  <div>
    <div class="tab-head">
      <span class="title">佣金结算审核</span>
    </div>
    <Search
      :is-show-all="true"
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      @search="search"
    />

    <div class="table-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="roleId === '12'" label="顶级服务商" name="12"></el-tab-pane>
        <el-tab-pane label="服务商" name="11"></el-tab-pane>
      </el-tabs>
      <BaseCrud
        v-if="activeName==='12'"
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        :header-cell-style="headerCellStyle"
        :api-service="api"
        :params="params"
        @detail="onClickDetail"
        @reject="onClickReject"
        @adopt="onClickAdopt"
      ></BaseCrud>
      <BaseCrud
        v-else
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        :header-cell-style="headerCellStyle"
        :api-service="apiAgent"
        :params="params"
        @detail="onClickDetail"
        @reject="onClickReject"
        @adopt="onClickAdopt"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <div v-if="fromConfigData.processData" class="process-box">
        <template v-for="(item,index) in fromConfigData.processData">
          <div :key="index" class="process-item">
            <div>
              <img class="process-icon" :src="item.icon" />
            </div>
            <div class="label">
              {{ item.desc }}
              <span v-if="item.username" class="name">{{ item.username }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
          <img
            v-if="!(index===fromConfigData.processData.length-1)"
            :key="'img'+index"
            class="arrow-img"
          />
        </template>
      </div>
      <Form
        v-if="drawer"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        :foot-btn-label="fromConfigData.footBtnLabel"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>

    <el-drawer
      :visible.sync="detailDrawer"
      direction="rtl"
      :before-close="handleClose"
      size="500px"
    >
      <div slot="title" class="drawer-contenttitle">
        <span>佣金结算详情</span>
      </div>
      <div v-if="JSON.stringify(settleDetailData) !== '{}'" class="content-draw">
        <div class="content-form">
          <div class="form-select">
            <div class="module-title">结算金额</div>
            <div class="select">
              <div class="check-box">
                <div hide-required-asterisk="true" class="left-label">结算类型：</div>
                <div>
                  <div v-for="(type, index) in settleDetailData.settleAmount.settleTypes" :key="index" class="select-price months">{{ (type.name+'&nbsp;['+type.months+']') }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="select" style="margin: 16px 0 24px 0;">
            <div class="left-label">总佣金：</div>
            <div class="select-price">{{ `¥${settleDetailData.settleAmount.settleCommission}` }}</div>
          </div>
          <div class="select" style="margin: 16px 0 24px 0;">
            <div class="left-label">扣除佣金:</div>
            <div class="select-price">
              <div class="select-price">
                <span>到期续费&nbsp;</span>
                <span>{{ `¥${settleDetailData.settleAmount.agentRenewAmount}` }}</span>
              </div>
              <div class="select-price">
                <span>平台抽成&nbsp;</span>
                <span>{{ `¥${settleDetailData.settleAmount.platformCommission}` }}</span>
              </div>
            </div>
          </div>
          <div class="select" style="margin: 16px 0 24px 0;">
            <div class="left-label">结算金额:</div>
            <div class="select-price">{{ `¥${settleDetailData.settleAmount.actualSettleCommission}` }}</div>
          </div>
        </div>
        <div class="form-select">
          <div class="module-title">结算信息</div>
          <div class="receipt-img">
            <el-image class="show-image" :src="settleDetailData.settleInfo.expressImg" :preview-src-list="[settleDetailData.settleInfo.expressImg]"></el-image>
            <p>发票照片</p>
          </div>
          <Form
            v-if="detailDrawer"
            :form-base-data="detailFormConfigData.formData"
            :show-foot-btn="detailFormConfigData.showFootBtn"
            label-width="130px"
          ></Form>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "../formConfig/commission";
import { SEARCH_CONFIG } from "../formConfig/commissionSearch";
import { TABLE_CONFIG } from "../tableConfig/commissionConfig";
import { DETAIL_FORM_CONFIG } from "../formConfig/operationApproveForm";
import api from "@/api/api_financialAudit.js";

export default {
  name: "Commission",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      agentNo: "",
      headerCellStyle: { },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: {},
      fromConfigData: {},
      detailFormConfigData: DETAIL_FORM_CONFIG.detailData,
      testData: [],
      drawer: false,
      params: {
      },
      api: api.topListFinanceSettle,
      apiAgent: api.listFinanceSettle,
      activeRow: null,
      formStatus: null,
      activeName: String(this.$store.state.admin.userInfo.roleId),
      detailDrawer: false,
      settleDetailData: {},
      roleId: String(this.$store.state.admin.userInfo.roleId)
    };
  },
  created() {
    this.params = {
      beginTime: this.$g.utils.getToday(-6),
      endTime: this.$g.utils.getToday(0),
      typeFlag: this.activeName === '12' ? '0' : '1',
      settleStatus: 0
    };
    this.configData = TABLE_CONFIG
    this.configData.gridConfig[0].label = this.activeName === '12' ? '顶级服务商' : '服务商'
    this.configData.gridConfig[0].prop[0].key = this.activeName === '12' ? 'channelAgentName' : 'agentName'
    this.configData.gridConfig[0].prop[1].key = this.activeName === '12' ? 'channelAgentCode' : 'agentNo'
  },
  mounted() {
  },
  methods: {
    handleClick() {
      this.params.typeFlag = this.activeName === '12' ? '0' : '1'
      this.configData.gridConfig[0].label = this.activeName === '12' ? '顶级服务商' : '服务商'
      this.configData.gridConfig[0].prop[0].key = this.activeName === '12' ? 'channelAgentName' : 'agentName'
      this.configData.gridConfig[0].prop[1].key = this.activeName === '12' ? 'channelAgentCode' : 'agentNo'
      this.$nextTick(() =>
        this.$refs.table.getData()
      );
    },
    confirm($data) {
      const rejectApi = this.activeName === '12' ? 'topFinanceReject' : 'financeReject'
      const successApi = this.activeName === '12' ? 'topFinanceSuccess' : 'financeSuccess'
      switch (this.formStatus) {
        case "reject":
          var params = {
            id: this.activeRow.id,
            rejectReason: $data.reason
          }
          if (this.activeName === '12') {
            params.channelAgentCode = this.channelAgentCode
          } else {
            params.agentNo = this.agentNo
          }
          api[rejectApi](params).then(res => {
            if (res.status === 0) {
              this.$message("已驳回");
              this.drawer = false;
              this.$refs.table.getData()
            }
          })
          break;
        case "adopt":
          var paramsData = {
            id: this.activeRow.id,
            actualSettleCommission: $data.actualSettleCommission,
            financeRemark: $data.financeRemark
          }
          if (this.activeName === '12') {
            paramsData.channelAgentCode = this.channelAgentCode
          } else {
            paramsData.agentNo = this.agentNo
          }
          api[successApi](paramsData).then(res => {
            if (res.status === 0) {
              this.$message("已通过");
              this.drawer = false;
              this.$refs.table.getData()
            }
          })
          break;
        default:break;
      }
    },
    search($ruleForm) {
      this.params = {
        typeFlag: this.activeName === '12' ? '0' : '1',
        settleStatus: 0,
        beginTime: $ruleForm.date[0] ? $ruleForm.date[0] : this.$g.utils.getToday(-6),
        endTime: $ruleForm.date[1] ? $ruleForm.date[1] : this.$g.utils.getToday(0)
      };
    },
    onClickDetail($row) {
      const queryDetailApi = this.activeName === '12' ? 'topQueryDetail' : 'queryDetail'
      api[queryDetailApi]({
        id: $row.id || null
      }).then(res => {
        const {
          settleType,
          settleCommission,
          agentRenewAmount,
          platformCommission,
          actualSettleCommission,
          expressImg,
          expressNumber,
          settleAccount,
          settleMobile,
          alternatePhone,
          settleRemark
        } = res.data;
        const settleTypes = [];
        for (const key in settleType) {
          settleTypes.push({
            name: key,
            months: settleType[key]
          });
        }
        this.settleDetailData = {
          settleAmount: {
            settleTypes,
            settleCommission: settleCommission.toFixed(2),
            agentRenewAmount: agentRenewAmount.toFixed(2),
            platformCommission: platformCommission.toFixed(2),
            actualSettleCommission: actualSettleCommission.toFixed(2)
          },
          settleInfo: {
            expressImg,
            expressNumber,
            settleAccount,
            settleMobile,
            alternatePhone,
            settleRemark: settleRemark || '-'
          }
        };
        DETAIL_FORM_CONFIG.detailData.formData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        this.detailFormConfigData = DETAIL_FORM_CONFIG.detailData;
        this.detailDrawer = true;
      });
    },
    handleClose() {
      this.detailDrawer = false;
    },
    onClickReject($row) {
      if (this.activeName === '12') {
        this.channelAgentCode = $row.channelAgentCode
      } else {
        this.agentNo = $row.agentNo
      }
      const queryDetailApi = this.activeName === '12' ? 'topQueryDetail' : 'queryDetail'
      api[queryDetailApi]({// 通过/驳回详情
        id: $row.id || null
      }).then(res => {
        // 编辑前重赋值
        FORM_CONFIG.rejectData.formData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        FORM_CONFIG.rejectData.processData = res.data.map
        this.activeRow = $row;
        this.formStatus = "reject";
        this.fromConfigData = FORM_CONFIG.rejectData;
        this.drawer = true;
        this.topQueryTypeMonthDetail($row)
      })
    },
    onClickAdopt($row) {
      if (this.activeName === '12') {
        this.channelAgentCode = $row.channelAgentCode
      } else {
        this.agentNo = $row.agentNo
      }
      const queryDetailApi = this.activeName === '12' ? 'topQueryDetail' : 'queryDetail'
      api[queryDetailApi]({
        id: $row.id || null
      }).then(res => {
        // 编辑前重赋值
        FORM_CONFIG.adoptData.formData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        FORM_CONFIG.adoptData.processData = res.data.map
        this.activeRow = $row;
        this.formStatus = "adopt";
        this.fromConfigData = FORM_CONFIG.adoptData;
        this.drawer = true;
      })
      this.activeRow = $row;
      this.formStatus = "adopt";
      this.fromConfigData = FORM_CONFIG.adoptData;
      this.drawer = true;
      this.topQueryTypeMonthDetail($row)
    },
    topQueryTypeMonthDetail($row) {
      const typeMonthDetailApi = this.activeName === '12' ? 'topQueryTypeMonthDetail' : 'queryTypeMonthDetail'
      api[typeMonthDetailApi]({
        idList: $row.agentTradeIdList
      }).then(res => {
        if (res.data) {
          var keyArr = []
          res.data.forEach((a, b) => {
            res.data.forEach((c, d) => {
              if (a.settleType === c.settleType) {
                keyArr.push({settleType: a.settleType, dateArr: [], settleTypeName: a.settleTypeName})
              }
            })
          })
          // var newArr = []
          if (keyArr.length > 0) {
            keyArr.forEach((item, index) => {
              res.data.forEach((dItem, dIndex) => {
                if (item.settleType === dItem.settleType) {
                  item.dateArr.push(dItem.tradeMonth)
                }
              })
            })
            keyArr.forEach((item, index) => {
              this.$set(item, 'dateTxt', item.dateArr.join(','))
            })
          }
          this.fromConfigData.settlementData.initValArray = keyArr
        }
      })
    },
    cancel() {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  padding-top: 12px;
  overflow: hidden;
  background: #fff;
}
/deep/.el-tabs__item{
  font-size: 16px;
}
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
  .drawer-contenttitle {
    font-size: 20px;
    font-weight: 500;
  }
  .content-draw {
    width: 100%;
    padding: 0 32px 100px 32px;
  }
  .module-title {
    width: 100%;
    height: 44px;
    padding-left: 24px;
    margin-bottom: 26px;
    border-bottom: 1px solid #E9E9E9;

    line-height: 44px;
    font-size: 14px;
    font-weight: 500;

    color: #000;
    background: #FAFAFA;
  }
  .form-select {
    width: 100%;
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  .select {
    display: flex;
  }
  .left-label {
    min-width: 130px;
    margin-right: 6px;

    text-align: right;
    line-height: 22px;
  }
  .check-box {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 1;
  }
  .el-checkbox, .el-checkbox__input {
    white-space: normal;
    word-break: break-all;
  }
  .months {
    margin-bottom: 10px;
  }
  .select-price {
    font-size: 14px;
    line-height: 22px;

    color: #606266;
  }
  .select-box {
    // width: 50%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  /deep/.el-drawer__header {
    padding: 20px 20px 24px 32px;
    margin-bottom: 24px;
    border-bottom: 1px solid #E9E9E9;
  }
  .receipt-img {
    width: 100px;
    margin-left: 55px;

    text-align: center;
    .show-image {
      width: 100%;
      height: 100px;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;

      color: #606266;
    }
  }
</style>
