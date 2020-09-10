<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/commissionDetail') !== -1 || this.$route.path.indexOf('/publicTransfer') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">佣金结算审核</span>
      </div>
      <Search
        :is-show-all="true"
        :open-height="searchHeight"
        :form-base-data="searchConfig.formData"
        @search="search"
      />

      <div class="table_box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="顶级服务商" name="0"></el-tab-pane>
          <el-tab-pane label="服务商" name="1"></el-tab-pane>
        </el-tabs>
        <BaseCrud
          v-if="activeName==='0'"
          ref="table"
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
        ></BaseCrud>
        <BaseCrud
          v-else
          ref="table"
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
          :api-service="apiAgent"
          :params="params"
          @detail="onClick_detail"
          @reject="onClick_reject"
          @adopt="onClick_adopt"
        ></BaseCrud>
      </div>

      <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
        <div class="p_head">{{ fromConfigData.title }}</div>
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
              :src="arrow"
              class="arrow-img"
            />
          </template>
        </div>
        <Form
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
    >
      <div slot="title" class="drawer-contenttitle">
        <span>佣金结算详情</span>
      </div>
      <div class="content-draw">
        <div class="content-form">
          <div class="form-select">
            <div class="select">
              <div class="check-box">
                <div hide-required-asterisk="true" class="left-label">结算类型：</div>
                <div>
                  <!-- <div v-for="(confDate, index) in seetlmap.confDate" :key="index" class="select-price">{{ (confDate.name+'['+confDate.dateTxt+']') }}</div> -->
                </div>
              </div>
            </div>
            <div class="select" style="margin: 16px 0 24px 0;">
              <div class="left-label">总佣金：</div>
              <div class="select-price">{{ 0 }}</div>
            </div>
            <div class="select" style="margin: 16px 0 24px 0;">
              <div class="left-label">扣除佣金:</div>
              <div class="select-price">
                <div class="select-price">{{ 0 }}</div>
              </div>
            </div>
            <div class="select" style="margin: 16px 0 24px 0;">
              <div class="left-label">结算金额:</div>
              <div class="select-price">{{ 0 }}</div>
            </div>
          </div>
          <Form
            :form-base-data="detailFormConfigData.formData"
            :show-foot-btn="detailFormConfigData.showFootBtn"
            label-width="130px"
          ></Form>
        </div>
      </div>
    </el-drawer>
    </div>
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
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
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
      activeName: '0',
      detailDrawer: false
    };
  },
  created() {
    this.params = {
      beginTime: this.$g.utils.getToday(),
      endTime: this.$g.utils.getToday(),
      typeFlag: this.activeName,
      settleStatus: 0
    };
  },
  mounted() {
  },
  methods: {
    handleClick() {
      this.params.typeFlag = this.activeName
      this.configData.gridConfig[0].label = this.activeName === '0' ? '顶级服务商' : '服务商'
      this.configData.gridConfig[0].prop[0].key = this.activeName === '0' ? 'channelAgentName' : 'agentName'
      this.configData.gridConfig[0].prop[1].key = this.activeName === '0' ? 'channelAgentCode' : 'agentNo'
      this.$nextTick(() =>
        this.$refs.table.getData()
      );
    },
    confirm($data) {
      const rejectApi = this.activeName === '0' ? 'topFinanceReject' : 'financeReject'
      const successApi = this.activeName === '0' ? 'topFinanceSuccess' : 'financeSuccess'
      switch (this.formStatus) {
        case "reject":
          api[rejectApi]({
            id: this.activeRow.id,
            rejectReason: $data.rejectReason
          }).then(res => {
            this.$message("已驳回");
            this.drawer = false;
          }).catch(err => {
            this.$message(err);
          });
          break;
        case "adopt":api[successApi]({
          id: this.activeRow.id,
          actualSettleCommission: $data.actualSettleCommission,
          financeRemark: $data.financeRemark
        }).then(res => {
          this.$message("已通过");
          this.drawer = false;
        }).catch(err => {
          this.$message(err);
        });
          break;
        default:break;
      }
    },
    search($ruleForm) {
      this.params = {
        beginTime: $ruleForm.date[0],
        endTime: $ruleForm.date[1]
      };
    },
    onClick_detail($row) {
      // this.$router.push({
      //   path: "/financial/transferReview/commission/commissionDetail",
      //   query: { idList: $row.agentTradeIdList.join(','), activeName: this.activeName }
      // });
      this.detailDrawer = true;
    },
    handleClose() {
      this.detailDrawer = false;
    },
    onClick_reject($row) {
      const queryDetailApi = this.activeName === '0' ? 'topQueryDetail' : 'queryDetail'
      api[queryDetailApi]({// 通过/驳回详情
        id: $row.id || null
      }).then(res => {
        // 编辑前重赋值
        FORM_CONFIG.rejectData.formData.forEach((item, index) => {
          item.initVal = res.object[item.key];
        });
        FORM_CONFIG.rejectData.processData = res.object.map
        this.activeRow = $row;
        this.formStatus = "reject";
        this.fromConfigData = FORM_CONFIG.rejectData;
        this.drawer = true;
        this.topQueryTypeMonthDetail($row)
      })
    },
    onClick_adopt($row) {
      const queryDetailApi = this.activeName === '0' ? 'topQueryDetail' : 'queryDetail'
      api[queryDetailApi]({
        id: $row.id || null
      }).then(res => {
        // 编辑前重赋值
        FORM_CONFIG.adoptData.formData.forEach((item, index) => {
          item.initVal = res.object[item.key];
        });
        FORM_CONFIG.adoptData.processData = res.object.map
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
      const typeMonthDetailApi = this.activeName === '0' ? 'topQueryTypeMonthDetail' : 'queryTypeMonthDetail'
      api[typeMonthDetailApi]({
        idList: $row.agentTradeIdList
      }).then(res => {
        if (res.object) {
          var keyArr = []
          res.object.forEach((a, b) => {
            res.object.forEach((c, d) => {
              if (a.settleType === c.settleType) {
                keyArr.push({settleType: a.settleType, dateArr: [], settleTypeName: a.settleTypeName})
              }
            })
          })
          // var newArr = []
          if (keyArr.length > 0) {
            keyArr.forEach((item, index) => {
              res.object.forEach((dItem, dIndex) => {
                if (item.settleType === dItem.settleType) {
                  item.dateArr.push(dItem.tradeMonth)
                }
              })
            })
            keyArr.forEach((item, index) => {
              this.$set(item, 'dateTxt', item.dateArr.join(','))
            })
          }
          this.fromConfigData.settlementData.initValArray = keyArr || []
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
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
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
    padding: 24px 32px 100px 32px;
  }
  .content-form {
    width: 100%;
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  .content-title {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #E9E9E9;
    background: #EBEEF5;
    line-height: 44px;
    padding-left: 24px;
    font-size: 14px;
    font-weight: 500;
  }
  .form-select {
    padding: 10px 5px 0px 5px;
  }
  .select {
    display: flex;
  }
  .left-label {
    min-width: 130px;
    text-align: right;
    margin-right: 6px;
  }
  .check-box {
    flex-shrink: 1;
  }
  .el-checkbox, .el-checkbox__input {
    white-space: normal;
    word-break: break-all;
  }
  .select-price {
    font-size: 14px;
    color: #606266;
  }
  .select-box {
    // width: 50%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
</style>
