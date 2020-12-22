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
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="basicInfoConfig"
            module-title="基础信息"
            theme="border"
          >  
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="payInfoConfig"
            module-title="支付信息"
            theme="border"
          >
          </yun-detail-mode>  
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="openInfoConfig"
            module-title="开户信息"
            theme="border"
          >
          </yun-detail-mode>  
        </div>
      </div>
      <div v-show="activeName==='1'" class="detail-box">
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="shopInfoDetailConfig"
            module-title="认证信息"
            >  
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="verityDetailConfig"
            module-title="结算信息"
            >  
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="settleDetailConfig"
            module-title="费率信息"
            >  
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="rateDetailConfig"
            module-title="门店信息"
            >  
          </yun-detail-mode>
        </div>
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
      <yun-form
        ref="rejectForm"
        :form-base-data="rejectDataConfig"
        :label-width="'150px'"
        :show-foot-btn="false"
      ></yun-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/shopDetail";
  export default {
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
        ruleForm: {
          shopType: '独立结算门店（需审核）',
          shopName: '柚子餐饮1号店',
          tel: '1809909899',
          status: true,
          image0: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          image1: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          image2: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          image3: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          image4: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          image5: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        },
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
  .detail-box {
    margin: 0 24px;
    padding-bottom: 24px;
    .detail-mode-box {
      border-bottom: 1px solid #EBEEF5;
    }
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
  .detail-mode-box {
    margin-bottom: 24px;
  }
</style>
