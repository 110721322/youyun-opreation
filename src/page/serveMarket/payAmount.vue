<template>
  <div class="container">
    <div class="top">
      <span>下单页面</span>
      <el-steps :active="2" align-center>
        <el-step title="提交订单"></el-step>
        <el-step title="订单支付"></el-step>
        <el-step title="订购结果"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <div class="content_title">订单支付</div>
      <ul class="select">
        <li><span>服务类型：</span><span>{{ modelName }}</span></li>
        <li><span>服务时间：</span><span>{{ comboItem.comboName }}</span></li>
        <li><span>支付金额：</span><span style="color: #F5222D; font-size: 20px; font-weight: 500;">{{ amount }}</span><span>元</span></li>
        <li><span>支付方式：</span><div v-for="(item, index) in payWay" :key="index" class="pay_way" :class="selectIndex===index? 'pay_select': ''" @click="onClick_select(index)">{{ item.value }}</div></li>
        <li v-if="selectIndex===0"><img src="../../assets/img/qr_code.jpg" alt=""></li>
        <div v-if="selectIndex===0" class="descript">
          <span>支持</span>
          <img src="../../assets/img/wx_pay.png" alt="">
          <img src="../../assets/img/apply_pay.png" alt="">
          <img src="../../assets/img/yun_pay.png" alt="">
          <span>扫码支付</span>
        </div>
        <li v-if="selectIndex===1"><span>打款账号：</span><span>3301040160001013187</span></li>
        <li v-if="selectIndex===1"><span>开户银行：</span><span>杭州银行滨江支行</span></li>
        <li v-if="selectIndex===1">
          <span style="color:red">*</span><span>上传凭证：</span>
          <div class="photo">
            <Upload :formItem="formItem" :ruleForm="ruleForm" />
          </div>
        </li>
        <p v-if="selectIndex===1">查看示例</p>
        <button class="option_btn" @click="onClick_tostatus">我已完成</button>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
import Upload from "@/components/form/components/Upload.vue";
export default {
  name: "PayAmount",
  components: {
    Upload
  },
  data() {
    return {
      payWay: [
        {
          id: 2,
          value: '扫码支付'
        },
        {
          id: 1,
          value: '对公转账'
        }
      ],
      selectIndex: 1,
      modelName: '',
      comboItem: {},
      amount: 0,
      formItem: {
        key: 'imgUrl',
        maxNum: 1
      },
      ruleForm: {}
    }
  },
  created() {
    this.comboItem = JSON.parse(localStorage.getItem('comboItem'))
    this.modelName = JSON.parse(localStorage.getItem('productItem')).productName
    this.amount = localStorage.getItem('amount')
  },
  methods: {
    onClick_select(index) {
      if (index === 0) {
        this.$message.error('暂不支持扫码支付');
        return;
      }
      this.selectIndex = index
    },
    onClick_tostatus() {
      if (!this.ruleForm.imgUrl) {
        this.$message('请上传凭证')
        return
      }
      const imageUrl = `${this.ruleForm.ossHost}/${this.ruleForm.imgUrl}`
      localStorage.setItem('voucher', imageUrl)
      const params = {
        comboId: this.comboItem.id,
        payType: this.payWay[this.selectIndex].id,
        productName: this.modelName,
        promoCodeId: localStorage.getItem('promoCodeId') || '',
        voucher: this.ruleForm.imgUrl
      }
      api.createOrder(params).then(res => {
        if (res.data) {
          this.$router.push({
            name: "payStatus"
          })
        }
      })
    }
  },
  beforeDestroy() {
    // localStorage.setItem('comboItem', '')
    // localStorage.setItem('productItem', '')
    // localStorage.setItem('amount', '')
    // localStorage.setItem('voucher', '')
    // localStorage.setItem('promoCodeId', '')
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    padding: 24px 24px 80px 24px;
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    background: #ffffff;
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    box-sizing: border-box;
  }
  .el-steps--horizontal {
    width: 70%;
  }
  .top span {
    color: #000000;
    font-size: 16px;
    font-weight: 500;
  }
  .content {
    width: 100%;
    height: 627px;
    background: #ffffff;
    margin-top: 24px;
  }
  .content_title {
    width: 100%;
    height: 86px;
    padding-left: 24px;
    line-height: 86px;
    border-bottom: 1px solid #EBEEF5;
    color: #000000;
    font-size: 16px;
    font-weight: 500;
  }
  .select {
    width: 346px;
    padding-top: 32px;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .select li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .select li span {
    font-size: 14px;
  }
  .select li span:nth-child(1) {
    color: #000000;
    padding-right: 4px;
  }
  .select li span:nth-child(2) {
    color: #606266;
  }
  .select li span:nth-child(3) {
    color: #606266;
  }
  .select li img {
    display: block;
    width: 190px;
    height: 190px;
    margin:0 auto;
  }
  .pay_way {
    width: 126px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ECEDEF;
    text-align: center;
    line-height: 40px;
    color: #606266;
    font-size: 14px;
    margin-right: 8px;
    cursor: pointer;
  }
  .pay_way.pay_select {
    color: #1989FA;
    border: 1px solid #1890FF;
    background: #ECF6FF;
  }
  .descript {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .descript span {
    font-size: 14px;
    color: #606266;
  }
  .descript span:nth-child(1) {
    padding-right: 4px;
    box-sizing: border-box;
  }
  .descript img {
    width: 26px;
    height: 26px;
    margin-right: 4px;
  }
  .select li .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
  }
  .select li .photo {
    /* width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px; */
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .select li .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .select li .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
  }
  .select li .avatar {
    width: 100px;
    height: 100px;
    display: block;
    object-fit: cover;
  }
  .select p {
    color: #1989FA;
    font-size: 14px;
    padding-left: 98px;
    margin-top: 8px;
  }
  .option_btn {
    width: 114px;
    height: 40px;
    border-radius: 4px;
    background: #1989FA;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    margin-left: 74px;
    margin-top: 32px;
  }
</style>

