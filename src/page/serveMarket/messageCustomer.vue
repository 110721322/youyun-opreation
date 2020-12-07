<template>
  <div class="container">
    <div class="top">
      <div class="left-img">
        <img src="../../assets/img/message_photo.png" al="icon" />
      </div>
      <div class="right-info">
        <div class="right-title">{{ productItem.productName }}</div>
        <div class="right-subtitle">{{ productItem.productDesc }}</div>
      </div>
    </div>
    <div class="content">
      <div class="select-btn">
        <div v-for="(item, index) in menu" :key="index" class="select-title" :class="selectIndex===index? 'title-select' :''" @click="clickHead(index)">
          <span>{{ item.value }}</span>
        </div>
      </div>
      <div v-if="selectIndex===0" class="message-recharge">
        <div class="relize">当前剩余短信：<span style="color: #1989fa; font-size: 20px;">{{ codeNum }}</span>条</div>
        <div class="select-package">
          <div class="package-label">短信套餐:</div>
          <div v-for="(item, index) in comboList" :key="index" class="package-select" :class="packageIndex===index?'ispackage': ''" @click="clickPackage(item,index)">
            <p>{{ item.comboCount }}条</p>
            <p>{{ item.comboAmount }}元</p>
          </div>
        </div>
        <div class="pay-price"><span>支付金额:</span><span style="color: #f5222d; font-size: 20px;">{{ comboPrice }}</span><span>元</span></div>
        <div class="pay-way">
          <div class="pay-label">支付方式:</div>
          <div v-for="(item, index) in wayData" :key="index" class="way" :class="wayIndex===index?'isway':''" @click="clickWay(index)">{{ item.value }}</div>
        </div>
        <div v-if="wayIndex===0" class="qrcode">
          <img src="../../assets/img/qr_code.jpg" alt="icon" />
        </div>
        <div v-if="wayIndex===0" class="bottom-des">
          <span>支持</span>
          <img src="../../assets/img/apply_pay.png" alt="支付宝图标" />
          <img src="../../assets/img/wx_pay.png" alt="微信图标" />
          <img src="../../assets/img/yun_pay.png" alt="云闪付图标" />
          <span>扫码支付</span>
        </div>
        <div v-if="wayIndex===1" class="bank"><span>打款账户:</span><span>3301040160001013187</span></div>
        <div v-if="wayIndex===1" class="bank"><span>开户银行:</span><span>杭州银行滨江支行</span></div>
        <div v-if="wayIndex===1" class="code">
          <div class="code-label">打款凭证:</div>
          <div class="photo">
            <Upload :form-item="formItem" :rule-form="ruleForm" />
          </div>
        </div>
        <div v-if="wayIndex===1" class="see-model">查看示例</div>
        <div v-if="wayIndex===1" class="sub-btn">
          <button @click="clickTostatus">提交</button>
        </div>
      </div>
      <div v-if="selectIndex===1" class="table-box">
        <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-data="testData"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          :api-service="api"
          :hide-edit-area="true"
          :params="params"
        >
          <div slot="head" slot-scope="item">
            <span>{{ item.item.label }}</span>
            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
              <div slot="content">
                <div>
                  <span class="dot opened"></span>已开通
                </div>
                <div>
                  <span class="dot review"></span>审核中
                </div>
                <div>
                  <span class="dot reject"></span>驳回
                </div>
                <div>
                  <span class="dot unused"></span>未审核
                </div>
              </div>
              <i class="el-icon-info" />
            </el-tooltip>
          </div>
        </BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
// import api from "@/api/api_merchant";
import { USER_CONFIG } from "./tableConfig/messageConfig";
import BaseCrud from "@/components/table/BaseCrud.vue";
import api from "@/api/api_serveMarket";
import Upload from "@/components/form/components/Upload.vue";
export default {
  name: "MessageCustomer",
  components: { BaseCrud, Upload },
  data() {
    return {
      menu: [
        {
          value: '短信充值'
        },
        {
          value: '充值记录'
        }
      ],
      wayData: [
        {
          value: '扫码支付'
        },
        {
          value: '对公转账'
        }
      ],
      selectIndex: 0,
      packageIndex: 0,
      wayIndex: 1,
      imageUrl: '',
      configData: USER_CONFIG,
      api: api.rechargeRecords,
      testData: [],
      params: {},
      comboList: [],
      comboPrice: 0,
      showTip: false,
      comboItem: {},
      productItem: {},
      formItem: {
        key: 'imgUrl'
      },
      ruleForm: {},
      codeNum: 0
    }
  },
  created() {
    this.productItem = JSON.parse(localStorage.getItem('productItem'))
    this.getModelDetail()
    this.getLastCode()
  },
  mounted() {
  },
  methods: {
    clickHead(index) {
      this.selectIndex = index
    },

    clickPackage(data, index) {
      this.packageIndex = index
      this.comboItem = data
      this.comboPrice = data.comboAmount
    },

    clickWay(index) {
      if (index === 0) {
        return;
      }
      this.wayIndex = index
    },

    // 套餐
    getModelDetail() {
      api.selectProductCombo({
        productCode: this.productItem.productCode
      }).then(res => {
        if (res.data) {
          this.comboList = res.data || []
          this.comboItem = this.comboList[this.selectIndex] || {}
          this.comboPrice = this.comboList[this.selectIndex].comboAmount || 0
        }
      })
    },

    // 剩余短信
    getLastCode() {
      api.getSmsCount({}).then(res => {
        if (res.data) {
          this.codeNum = res.data
        }
      })
    },

    clickTostatus() {
      const imageUrl = this.ruleForm.imgUrl.dialogImagePath + this.ruleForm.imgUrl.dialogImageUrl
      localStorage.setItem('voucher', imageUrl)
      const params = {
        comboId: this.comboItem.id,
        payType: 1,
        productName: this.productItem.productName,
        promoCodeId: '',
        voucher: this.ruleForm.imgUrl
      }
      api.createOrder(params).then(res => {
        if (res.data) {
          this.$message.success('成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 24px 24px 40px 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .top {
    display: flex;
    justify-content: space-between;
    padding: 32px 67px 32px 32px;
    width: 100%;
    height: 128px;
    box-sizing: border-box;
    background: #fff;
  }

  .left-img {
    margin-right: 24px;
    width: 64px;
    height: 64px;
  }

  .left-img img {
    width: 64px;
    height: 64px;
  }

  .right-info {
    padding-top: 7px;
    width: 100%;
  }

  .right-title {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: #333335;
  }

  .right-subtitle {
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }

  .content {
    margin-top: 24px;
    padding: 14px 32px 48px 32px;
    width: 100%;
    background: #fff;
  }

  .select-btn {
    display: flex;
    height: 42px;
  }

  .select-title {
    width: 96px;
    line-height: 42px;
    font-size: 16px;
    color: #606266;
    text-align: center;
    cursor: pointer;
  }

  .select-title.title-select {
    color: #1989fa;
    border-bottom: 2px solid #1989fa;
  }

  .message-recharge {
    padding-top: 26px;
  }

  .relize {
    padding-left: 24px;
    width: 100%;
    height: 68px;
    background: #fafafa;
    line-height: 68px;
    color: #909399;
    font-size: 14px;
  }

  .select-package {
    display: flex;
    margin-top: 32px;
  }

  .package-label {
    padding-top: 18px;
    margin-right: 12px;
    color: #333335;
    font-size: 14px;
  }

  .package-select {
    margin-right: 16px;
    padding-top: 20px;
    width: 136px;
    height: 88px;
    box-sizing: border-box;
    border: 1px solid #ecedef;
    border-radius: 8px;
    text-align: center;
    color: #606266;
    cursor: pointer;
  }

  .package-select p:nth-child(1) {
    margin-bottom: 6px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
  }

  .package-select p:nth-child(2) {
    font-size: 14px;
    line-height: 20px;
  }

  .package-select.ispackage {
    background: #ecf6ff;
    border: 1px solid #1890ff;
    color: #1890ff;
  }

  .pay-price {
    display: flex;
    align-items: center;
    margin-top: 24px;
    font-size: 14px;
  }

  .pay-price span:nth-child(1) {
    padding-right: 12px;
    color: #000;
  }

  .pay-price span:nth-child(3) {
    color: #606266;
  }

  .pay-way {
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 14px;
  }

  .pay-label {
    margin-right: 12px;
    color: #000;
  }

  .way {
    margin-right: 8px;
    width: 126px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ecedef;
    cursor: pointer;
  }

  .way.isway {
    border: 1px solid #1890ff;
    color: #1890ff;
    background: #ecf6ff;
  }

  .qrcode {
    padding-left: 60px;
    margin-top: 16px;
  }

  .qrcode img {
    display: block;
    width: 196px;
    height: 196px;
  }

  .bottom-des {
    display: flex;
    padding-left: 60px;
    margin-top: 14px;
    align-items: center;
    color: #606266;
    font-size: 14px;
  }

  .bottom-des img {
    display: block;
    margin-right: 4px;
    width: 26px;
    height: 26px;
  }

  .bottom-des span:nth-child(1) {
    padding-right: 7px;
  }

  .bank {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .bank span {
    font-size: 14px;
  }

  .bank span:nth-child(1) {
    padding-right: 12px;
    color: #000;
  }

  .bank span:nth-child(2) {
    color: #606266;
  }

  .code {
    display: flex;
    margin-top: 16px;
  }

  .code-label {
    margin-right: 12px;
    font-size: 14px;
    color: #000;
  }

  .photo {
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    display: block;
    width: 100px;
    height: 100px;
  }

  .see-model {
    margin-top: 8px;
    padding-left: 94px;
    color: #1989fa;
    font-size: 14px;
    line-height: 20px;
  }

  .sub-btn {
    padding-left: 74px;
    margin-top: 32px;
  }

  .sub-btn button {
    display: block;
    width: 114px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #1989fa;
    border-radius: 4px;
  }
  .table-box {
    padding-top: 24px;
  }
</style>

