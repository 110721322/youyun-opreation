<template>
  <div class="container">
    <div class="top">
      <div class="left_img">
        <img src="../../assets/img/message_photo.png" alt="">
      </div>
      <div class="right_info">
        <div class="right_title">{{ productItem.productName }}</div>
        <div class="right_subtitle">{{ productItem.productDesc }}</div>
      </div>
    </div>
    <div class="content">
      <div class="select_btn">
        <div v-for="(item, index) in menu" :key="index" class="select_title" :class="selectIndex===index? 'title_select' :''" @click="onclick_head(index)">
          <span>{{ item.value }}</span>
        </div>
      </div>
      <div v-if="selectIndex===0" class="message_recharge">
        <div class="relize">当前剩余短信：<span style="color: #1989FA; font-size: 20px">{{ codeNum }}</span>条</div>
        <div class="select_package">
          <div class="package_label">短信套餐:</div>
          <div v-for="(item, index) in comboList" :key="index" class="package_select" :class="packageIndex===index?'ispackage': ''" @click="onclick_package(item,index)">
            <p>{{ item.comboCount }}条</p>
            <p>{{ item.comboAmount }}元</p>
          </div>
        </div>
        <div class="pay_price"><span>支付金额:</span><span style="color: #F5222D; font-size: 20px;">{{ comboPrice }}</span><span>元</span></div>
        <div class="pay_way">
          <div class="pay_label">支付方式:</div>
          <div v-for="(item, index) in wayData" :key="index" class="way" :class="wayIndex===index?'isway':''" @click="onclick_way(index)">{{ item.value }}</div>
        </div>
        <div v-if="wayIndex===0" class="qrcode">
          <img src="../../assets/img/qr_code.jpg" alt="">
        </div>
        <div v-if="wayIndex===0" class="bottom-des">
          <span>支持</span>
          <img src="../../assets/img/apply_pay.png" alt="">
          <img src="../../assets/img/wx_pay.png" alt="">
          <img src="../../assets/img/yun_pay.png" alt="">
          <span>扫码支付</span>
        </div>
        <div v-if="wayIndex===1" class="bank"><span>打款账户:</span><span>3301040160001013187</span></div>
        <div v-if="wayIndex===1" class="bank"><span>开户银行:</span><span>杭州银行滨江支行</span></div>
        <div v-if="wayIndex===1" class="code">
          <div class="code_label">打款凭证:</div>
          <div class="photo">
            <Upload :formItem="formItem" :ruleForm="ruleForm" />
          </div>
        </div>
        <div v-if="wayIndex===1" class="see_model">查看示例</div>
        <div v-if="wayIndex===1" class="sub_btn">
          <button @click="onClick_tostatus">提交</button>
        </div>
      </div>
      <div v-if="selectIndex===1" class="table_box">
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
    onclick_head(index) {
      this.selectIndex = index
    },
    onclick_package(data, index) {
      this.packageIndex = index
      this.comboItem = data
      this.comboPrice = data.comboAmount
    },
    onclick_way(index) {
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
        if (res.object) {
          this.comboList = res.object || []
          this.comboItem = this.comboList[this.selectIndex] || {}
          this.comboPrice = this.comboList[this.selectIndex].comboAmount || 0
        }
      })
    },
    // 剩余短信
    getLastCode() {
      api.getSmsCount({}).then(res => {
        if (res.object) {
          this.codeNum = res.object
        }
      })
    },
    onClick_tostatus() {
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
        if (res.object) {
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
    width: 100%;
    padding: 24px 24px 40px 24px;
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    height: 128px;
    padding: 32px 67px 32px 32px;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .left_img {
    width: 64px;
    height: 64px;
    margin-right: 24px;
  }
  .left_img img {
    width: 64px;
    height: 64px;
  }
  .right_info {
    width: 100%;
    padding-top: 7px;
  }
  .right_title {
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: #333335;
    margin-bottom: 8px;
  }
  .right_subtitle {
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }
  .content {
    width: 100%;
    margin-top: 24px;
    padding: 14px 32px 48px 32px;
    background: #ffffff;
  }
  .select_btn {
    display: flex;
    height: 42px;
  }
  .select_title {
    width: 96px;
    line-height: 42px;
    font-size: 16px;
    color: #606266;
    text-align: center;
      cursor: pointer;
  }
  .select_title.title_select {
    color: #1989FA;
    border-bottom: 2px solid #1989FA;
  }
  .message_recharge {
    padding-top: 26px;
  }
  .relize {
    width: 100%;
    height: 68px;
    background: #FAFAFA;
    line-height: 68px;
    padding-left: 24px;
    color: #909399;
    font-size: 14px;
  }
  .select_package {
    display: flex;
    margin-top: 32px;
  }
  .package_label {
    padding-top: 18px;
    color: #333335;
    font-size: 14px;
    margin-right: 12px;
  }
  .package_select {
    width: 136px;
    height: 88px;
    padding-top: 20px;
    box-sizing: border-box;
    border: 1px solid #ECEDEF;
    border-radius: 8px;
    text-align: center;
    margin-right: 16px;
    color: #606266;
    cursor: pointer;
  }
  .package_select p:nth-child(1) {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 6px;
    font-weight: 500;
  }
  .package_select p:nth-child(2) {
    font-size: 14px;
    line-height: 20px;
  }
  .package_select.ispackage {
    background: #ECF6FF;
    border: 1px solid #1890FF;
    color: #1890FF;
  }
  .pay_price {
    margin-top: 24px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .pay_price span:nth-child(1) {
    color: #000000;
      padding-right: 12px;
  }
  .pay_price span:nth-child(3) {
    color: #606266;
  }
  .pay_way {
    margin-top: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .pay_label {
    color: #000000;
    margin-right: 12px;
  }
  .way {
    width: 126px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ECEDEF;
    margin-right: 8px;
    cursor: pointer;
  }
  .way.isway {
    border: 1px solid #1890FF;
    color: #1890FF;
    background: #ECF6FF;
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
    padding-left: 60px;
    display: flex;
    align-items: center;
    color: #606266;
    font-size: 14px;
    margin-top: 14px;
  }
  .bottom-des img {
    display: block;
    width: 26px;
    height: 26px;
    margin-right: 4px;
  }
  .bottom-des span:nth-child(1) {
    padding-right: 7px;
  }
  .bank {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
  .bank span{
    font-size: 14px;
  }
  .bank span:nth-child(1) {
    color: #000000;
    padding-right: 12px;
  }
  .bank span:nth-child(2) {
    color: #606266;
  }
  .code {
    display: flex;
    margin-top: 16px;
  }
  .code_label {
    font-size: 14px;
    color: #000000;
    margin-right: 12px;
  }
  .photo {
    /* width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px; */
    cursor: pointer;
    position: relative;
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
    width: 100px;
    height: 100px;
    display: block;
  }
  .see_model {
    padding-left: 94px;
    color: #1989FA;
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
  }
  .sub_btn {
    padding-left: 74px;
    margin-top: 32px;
  }
  .sub_btn button {
    display: block;
    width: 114px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    background: #1989FA;
    border-radius: 4px;
  }
  .table_box {
    padding-top: 24px;
  }
</style>

