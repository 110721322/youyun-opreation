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
      <div class="content-title">订单支付</div>
      <ul class="select">
        <li><span>服务类型：</span><span>{{ modelName }}</span></li>
        <li><span>服务时间：</span><span>{{ comboItem.comboName }}</span></li>
        <li><span>支付金额：</span><span style="color: #f5222d; font-size: 20px; font-weight: 500;">{{ amount }}</span><span>元</span></li>
        <li><span>支付方式：</span><div v-for="(item, index) in payWay" :key="index" class="pay-way" :class="selectIndex===index? 'pay-select': ''" @click="clickSelect(index)">{{ item.value }}</div></li>
        <li v-if="selectIndex===0"><img src="../../assets/img/qr_code.jpg" alt="icon" /></li>
        <div v-if="selectIndex===0" class="descript">
          <span>支持</span>
          <img src="../../assets/img/wx_pay.png" alt="微信图标" />
          <img src="../../assets/img/apply_pay.png" alt="支付宝图标" />
          <img src="../../assets/img/yun_pay.png" alt="云闪付图标" />
          <span>扫码支付</span>
        </div>
        <li v-if="selectIndex===1"><span>打款账号：</span><span>3301040160001013187</span></li>
        <li v-if="selectIndex===1"><span>开户银行：</span><span>杭州银行滨江支行</span></li>
        <li v-if="selectIndex===1">
          <span style="color: red;">*</span><span>上传凭证：</span>
          <div class="photo">
            <Upload :form-item="formItem" :rule-form="ruleForm" />
          </div>
        </li>
        <p v-if="selectIndex===1" style="cursor: pointer;" @click="seeExamples">查看示例</p>
        <button class="option-btn" @click="clickTostatus">我已完成</button>
      </ul>
    </div>
    <el-dialog
      title="凭证示例"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <img style="display: block; width: 270px; height: 406px; margin: 0 auto;" src="../../assets/img/settlePay.png" alt="icon" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      ruleForm: {},
      dialogVisible: false
    }
  },
  created() {
    this.comboItem = JSON.parse(localStorage.getItem('comboItem'))
    this.modelName = JSON.parse(localStorage.getItem('productItem')).productName
    this.amount = localStorage.getItem('amount')
  },
  beforeDestroy() {
    // localStorage.setItem('comboItem', '')
    // localStorage.setItem('productItem', '')
    // localStorage.setItem('amount', '')
    // localStorage.setItem('voucher', '')
    // localStorage.setItem('promoCodeId', '')
  },
  methods: {
    seeExamples() {
      this.dialogVisible = true
    },

    clickSelect(index) {
      if (index === 0) {
        this.$message.error('暂不支持扫码支付');
        return;
      }
      this.selectIndex = index
    },

    clickTostatus() {
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
  }
}
</script>

<style scoped>
  .container {
    padding: 24px 24px 80px 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    width: 100%;
    background: #fff;
    height: 88px;
    box-sizing: border-box;
  }

  .el-steps--horizontal {
    width: 70%;
  }

  .top span {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }

  .content {
    margin-top: 24px;
    width: 100%;
    height: 627px;
    background: #fff;
  }

  .content-title {
    padding-left: 24px;
    width: 100%;
    height: 86px;
    line-height: 86px;
    border-bottom: 1px solid #ebeef5;
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }

  .select {
    padding-top: 32px;
    margin: 0 auto;
    width: 346px;
    box-sizing: border-box;
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
    padding-right: 4px;
    color: #000;
  }

  .select li span:nth-child(2) {
    color: #606266;
  }

  .select li span:nth-child(3) {
    color: #606266;
  }

  .select li img {
    display: block;
    margin: 0 auto;
    width: 190px;
    height: 190px;
  }

  .pay-way {
    margin-right: 8px;
    width: 126px;
    height: 40px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ecedef;
    text-align: center;
    line-height: 40px;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
  }

  .pay-way.pay-select {
    color: #1989fa;
    border: 1px solid #1890ff;
    background: #ecf6ff;
  }

  .descript {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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
    margin-right: 4px;
    width: 26px;
    height: 26px;
  }

  .select li .el-upload {
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }

  .select li .photo {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .select li .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
    display: block;
    object-fit: cover;
    width: 100px;
    height: 100px;
  }

  .select p {
    padding-left: 98px;
    margin-top: 8px;
    color: #1989fa;
    font-size: 14px;
  }

  .option-btn {
    margin-left: 74px;
    margin-top: 32px;
    width: 114px;
    height: 40px;
    border-radius: 4px;
    background: #1989fa;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
  }
</style>

