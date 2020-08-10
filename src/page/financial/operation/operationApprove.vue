<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">佣金结算审核</span>
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
      <elForm v-if="fromConfigData.settlementData" class="formTemplate" :label-width="'130px'">
        <el-form-item :label="fromConfigData.settlementData.label+':'" class="formTemplate-item">
          <div
            v-for="(item,index) in fromConfigData.settlementData.initValArray"
            :key="index"
            class="ellipsis"
          >{{ item.settleTypeName+'['+item.dateTxt+']' }}</div>
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
</template>
<script>
import arrowImg from "@/assets/img/arrow.png";
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "../formConfig/operationApproveForm";
import { SEARCH_CONFIG } from "../formConfig/operationApproveSearch";
import { OPERATIONAPPROVE_CONFIG } from "../tableConfig/operationApproveConfig";
import api from "@/api/api_financialAudit.js";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: OPERATIONAPPROVE_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      arrow: arrowImg,
      params: {
        beginTime: this.$g.utils.getToday(),
        endTime: this.$g.utils.getToday(),
        typeFlag: 0
      },
      api: api.topListOperationSettle,
      formStatus: null,
      activeRow: {}
    };
  },
  mounted() {},
  methods: {
    confirm($data) {
      console.log($data)
      debugger
      switch (this.formStatus) {
        case "reject":
          api.topOperationReject({
            id: this.activeRow.id,
            rejectReason: $data.rejectReason
          }).then(res => {
            this.$message("已驳回");
            this.drawer = false;
          }).catch(err => {
            this.$message(err);
          });
          break;
        case "adopt":api.topOperationSuccess({
          id: this.activeRow.id,
          adviseCommission: $data.adviseCommission,
          operationRemark: $data.operationRemark
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
      // eslint-disable-next-line no-console
      console.log($ruleForm);
      this.params = {
        // settleStatus: $ruleForm.settleStatus || "",
        typeFlag: '0',
        beginTime: $ruleForm.date[0] || '',
        endTime: $ruleForm.date[1] || ''
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    onClick_detail($row) {
      this.$router.push({
        path: "/transferReview/financialAudit/financialSettlement/detail",
        query: { id: $row.id }
      });
    },
    onClick_reject($row) {
      api.topQueryDetail({// 通过/驳回详情
        id: $row.id || []
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
      api.topQueryDetail({
        id: $row.id || []
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
      api.topQueryTypeMonthDetail({
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
  .form_item {
    float: left !important;
  }
  .clear_both {
    clear: both !important;
  }
  .btn_list {
    /* background: rebeccapurple; */
    position: absolute;
    right: 0;
    bottom: 21px;
    right: 24px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    /* width: 25%; */
  }
  .form-box {
    display: flex;
    justify-content: space-between;
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

