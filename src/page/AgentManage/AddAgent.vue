<template>
  <div class="m-page">
    <div class="m-content">
      <div class="m-title">新增服务商</div>
      <div class="m-service">
        <div class="m-box">
          <div class="m-service-title">服务商信息</div>
          <yun-form
              ref="serviceInfo"
              :form-base-data="formConfigData.serviceData"
              :show-foot-btn="formConfigData.showFootBtn"
              label-width="130px"
          ></yun-form>
        </div>
        <div class="m-box">
          <div class="m-service-title">费率信息</div>
          <yun-form
              ref="rateInfo"
              :form-base-data="formConfigData.rateData"
              :show-foot-btn="formConfigData.showFootBtn"
              label-width="130px"
          ></yun-form>
        </div>
        <div class="m-box m-no-bord">
          <div class="m-service-title">结算账号</div>
          <yun-form
              ref="settleInfo"
              :form-base-data="formConfigData.settleData"
              :show-foot-btn="formConfigData.showFootBtn"
              label-width="130px"
          ></yun-form>
        </div>
      </div>
    </div>
    <div class="m-btn">
      <el-button type="primary" @click="clickSubmit">提交</el-button>
      <el-button @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_agentManage.js";
  import { ADD_AGENT } from "./FormConfig/AddAgent";

  export default {
    name: "AddAgent",
    data() {
      return {
        formConfigData: ADD_AGENT,
        serviceInfo: {
          agentName: '',
          phone: '',
          endTime: '',
          area: [],
          address: '',
        }
      }
    },
    methods: {
      clickSubmit() {
        const checkServiceForm = this.$refs['serviceInfo'].clickFootBtn();
        const checkRateForm = this.$refs['rateInfo'].clickFootBtn();
        const checkSettleForm = this.$refs['settleInfo'].clickFootBtn();
        if (!checkServiceForm) {
          this.$message('请完善服务商信息');
          return
        }
        if (!checkRateForm) {
          this.$message('请完善费率信息');
          return
        }
        if (!checkSettleForm) {
          this.$message('请完善结算信息');
          return
        }
        let infoData = {}
        Object.assign(infoData, checkServiceForm, checkRateForm, checkSettleForm)
        const params = {
          account: infoData.account,
          address: infoData.address,
          agentName: infoData.agentName,
          areaCode: infoData.area[2],
          cityCode: infoData.area[1],
          provinceCode: infoData.area[0],
          alipayRate: this.$g.utils.AccDiv(infoData.alipayRate, 100),
          wechatPayRate : this.$g.utils.AccDiv(infoData.wechatPayRate, 100),
          chargeFeePercent: this.$g.utils.AccDiv(infoData.chargeFeePercent, 100),
          bankBranchName: infoData.bankBranchName,
          bankCardNo: infoData.bankCardNo,
          bankAccountHolder: infoData.bankAccountHolder,
          expireDate: infoData.expireDate
        }
        api.addAgent(params).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '添加服务商成功',
              type: 'success'
            })
            this.$router.replace({
              name: 'AgentList'
            })
          }
        })
      },

      clickCancel() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    padding: 32px;
    .m-content {
      margin-bottom: 24px;
      background: #fff;
      .m-title {
        padding-left: 24px;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        line-height: 54px;
        border-bottom: 1px solid #DCDFE6;
      }
      .m-service {
        padding: 24px 24px 16px;
        .m-box {
          margin-bottom: 24px;
          border-bottom: 1px solid #e5e5e5;
          .m-service-title {
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: 500;
          }
        }
        .m-box.m-no-bord {
          border-bottom: 0;
        }
      }
    }
    .m-btn {
      display: flex;
      justify-content: center;
      button {
        height: 40px;
        line-height: 20px;
        font-size: 14px;
        padding: 10px 20px;
        margin-left: 16px;
      }
    }
  }
</style>
