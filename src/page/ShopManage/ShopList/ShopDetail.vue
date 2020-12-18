<template>
  <div>
    <div class="content">
      <div class="tab-box flex-align-center">
        <el-tabs v-model="activeName" class="tab-out">
          <el-tab-pane style="font-size:16px;" label="门店信息" name="0"></el-tab-pane>
          <el-tab-pane style="font-size:16px;" label="门店详情" name="1"></el-tab-pane>
        </el-tabs>
        <el-button type="primary" class="edit-btn" @click="clickEdit">编辑</el-button>
      </div>
      <div v-if="activeName==='0'" class="info-box">
        <InfoMode
          :rule-form="ruleForm"
          :config-data="basicInfoConfig"
        >
          <template slot-scope="scope" slot="switch">
            <!-- 授权 -->
            <span class="edit_btn">启用</span>
          </template>
          <template slot-scope="scope" slot="status">
            <div>
              <span>微信未认证</span>
            </div>
          </template>
        </InfoMode>
        <InfoMode
          class="pay-box"
          :rule-form="ruleForm"
          :config-data="payInfoConfig"
        >
          <template slot-scope="scope" slot="rateInfo">
            <div>
              <span>支付宝</span>
              <span>微信</span>
            </div>
          </template>
        </InfoMode>
        <InfoMode
          class="open-box"
          :rule-form="ruleForm"
          :config-data="openInfoConfig"
        >
        </InfoMode>
      </div>
      <div v-show="activeName==='1'">
        <DetailMode
          :rule-form="ruleForm"
          :config-data="shopInfoDetailConfig"
        >
          <template slot-scope="scope" slot="settleType">
            <el-radio-group v-model="radio" :disabled="true">
              <el-radio :label="1">独立结算门店（需审核）</el-radio>
              <el-radio :label="2">非独立结算门店（无需审核）</el-radio>
            </el-radio-group>
          </template>
          <template slot-scope="scope" slot="area">
            <div>{{ ruleForm.provinceName + ruleForm.cityName + ruleForm.areaName }}</div>
          </template>
        </DetailMode>
        <DetailMode
          :rule-form="ruleForm"
          :config-data="verityDetailConfig"
        >
          <template slot-scope="scope" slot="shopType">
            <el-radio-group v-model="radio" :disabled="true">
              <el-radio :label="1">企业</el-radio>
              <el-radio :label="2">个体工商</el-radio>
              <el-radio :label="3">个人</el-radio>
            </el-radio-group>
          </template>
          <template slot-scope="scope" slot="shopLicenseDate">
            <div>{{ ruleForm.shopLicenseBegDate + '-' + ruleForm.shopLicenseEndDate }}</div>
          </template>
          <template slot-scope="scope" slot="idCardDate">
            <div>{{ ruleForm.idCardBeginDate + '-' + ruleForm.idCardExpireDate }}</div>
          </template>
        </DetailMode>
        <DetailMode
          :rule-form="ruleForm"
          :config-data="settleDetailConfig"
        >
          <template slot-scope="scope" slot="settleType">
            <el-radio-group v-model="radio" :disabled="true">
              <el-radio :label="1">对公法人</el-radio>
              <el-radio :label="2">对私法人</el-radio>
              <el-radio :label="3">对私非法人</el-radio>
            </el-radio-group>
          </template>
        </DetailMode>
        <DetailMode
          :rule-form="ruleForm"
          :config-data="rateDetailConfig"
        >
        </DetailMode>
      </div>
      <div v-if="activeName==='1'" class="flex-align-center flex-justify-center foot-btn">
        <div>
          <el-button type="primary" size="normal" @click="dialogVisible = true">驳回</el-button>
          <el-button size="normal">取消</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="驳回"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <Form
        ref="rejectForm"
        :form-base-data="rejectDataConfig"
        :label-width="'150px'"
        :show-foot-btn="false"
      ></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/shopDetail";
  import InfoMode from "@/components/detailMode/shopDetailMode.vue";
  import DetailMode from "@/components/detailMode/detailMode2.vue";
  import Form from "@/components/form/index.vue";
  export default {
    components: { InfoMode, DetailMode, Form },
    data() {
      return {
        basicInfoConfig: FORM_CONFIG.basicInfoData,
        payInfoConfig: FORM_CONFIG.payInfoData,
        openInfoConfig: FORM_CONFIG.openInfoData,
        shopInfoDetailConfig: FORM_CONFIG.shopInfoDetail,
        verityDetailConfig: FORM_CONFIG.verityDetail,
        settleDetailConfig: FORM_CONFIG.settleDetail,
        rateDetailConfig: FORM_CONFIG.rateDetail,
        rejectDataConfig: FORM_CONFIG.rejectConfig,
        activeName: '1',
        ruleForm: {},
        radio: 1,
        dialogVisible: false
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      clickEdit() {
        this.$router.push('/shopManage/shopList/shopDetail/editShop')
      },
      handleClose() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
    .tab-box {
      padding: 24px;
      width: 100%;
      /deep/ .el-tabs__header{
        margin: 0px;
      }
    }
  }
  .tab-out {
    flex-shrink: 1;
    width: 100%;
  }
  .edit-btn {
    flex-shrink: 0;
  }
  .info-box {
    margin: 0 24px;
    padding-bottom: 24px;
  }
  .pay-box, .open-box {
    margin-top: 24px;
  }
  /deep/ .el-radio-group {
    display: flex;
    align-items: center;
  }
  .foot-btn {
    padding: 16px 0;
    box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.09);
  }
  /deep/ .formTemplate {
    margin: 0;
  }
</style>
