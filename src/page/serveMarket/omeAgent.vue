<template>
  <div class="container">
    <div class="top-content">
      <div v-if="showTip" class="warn">
        <div class="left-icon">i</div>
        <span>已购买该服务，有效期到：2020-10-10 。再次购买后服务到期时间将累加</span>
        <img src="../../assets/img/cancle.png" alt="icon" @click="closeWarn" />
      </div>
      <div class="buy-info">
        <img class="buy-img" src="../../assets/img/oem_image.png" alt="icon" />
        <div class="buy-all">
          <div class="first-body">
            <div class="buy-title">{{ productItem.productName }}</div>
            <div class="buy-subtitle">{{ productItem.productDesc }}</div>
            <img class="buy-photo" src="" alt="icon" />
          </div>
          <div class="second-body">
            <div class="select-date">
              <span class="select-name">服务时间</span>
              <div v-for="(item, index) in comboList" :key="index" class="select-btn" :class="selectIndex===index? 'select-show' : ''">
                <button @click="clickSelectDate(item,index)">{{ item.comboName }}</button>
              </div>
            </div>
            <div class="price">
              <span class="select-name">购买价格</span>
              <span class="data-price"><span>¥</span>{{ comboPrice }}</span>
            </div>
          </div>
          <button class="buy-serve" @click="clickBuyserve">购买服务</button>
        </div>
      </div>
    </div>
    <div v-if="productItem.buyStatus===0" class="operation">
      <div class="operation-title">操作流程</div>
      <div class="operation-step">
        <div class="left-step">步骤一:</div>
        <ul class="right-step">
          <li class="right-title">选择服务时间</li>
          <li class="right-list">目前服务时间可购买：1年，2年和3年。服务到期后若不进行续费购买将无法展开该服务</li>
        </ul>
      </div>
      <div class="operation-step">
        <div class="left-step">步骤二:</div>
        <ul class="right-step">
          <li class="right-title">购买服务</li>
          <li class="right-list">支付方式支持：线上扫码付款及对公转账</li>
          <li class="right-list">1.扫码支付：支持微信/支付宝/云闪付扫码支付，支付成功后直接进行业务拓展</li>
          <li class="right-list">2.对公转账：需对公转账到以下信息，并上传证明，审核通过后可进行业务拓展</li>
          <li class="right-bank">
            <div class="bank"><div class="bank-title">打款账户:</div>3301040160001013187</div>
            <div class="bank"><div class="bank-title">开户行:</div>杭州银行滨江支行</div>
          </li>
        </ul>
      </div>
      <div class="operation-step">
        <div class="left-step">步骤三:</div>
        <ul class="right-step">
          <li class="right-title">业务拓宽</li>
          <li class="right-list">可添加服务商，为服务商配置该类型，进行业务</li>
        </ul>
      </div>
    </div>
    <div v-else class="handle">
      <div class="handel-title">oem贴牌定制</div>
      <div class="upimg">
        <span>服务商后台logo：</span>
        <div class="photo">
          <Upload :form-item="formItem" :rule-form="ruleForm" />
        </div>
      </div>
      <div class="upimg">
        <span>商户后台logo：</span>
        <div class="photo">
          <Upload :form-item="formItem" :rule-form="ruleForm2" />
        </div>
      </div>
      <div class="upimg">
        <span></span>
        <button @click="clickSubmit">提交</button>
      </div>
    </div>
    <el-dialog
      title="操作成功"
      :visible.sync="centerDialogVisible"
      width="455px"
      height="305px"
      center
      border-radius="8px"
    >
      <div style="color: #606266; font-size: 20px; font-weight: 500; text-align: center; line-height: 32px;">贴牌定制成功</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
import Upload from "@/components/form/components/Upload.vue";
export default {
  name: "OmeAgent",
  components: {
    Upload
  },
  data () {
    return {
      selectIndex: 0,
      imageUrl: '',
      centerDialogVisible: false,
      comboList: [],
      comboPrice: 0,
      showTip: false,
      comboItem: {},
      productItem: {},
      formItem: {
        key: 'imgUrl'
      },
      ruleForm: {},
      ruleForm2: {}
    }
  },
  created() {
    this.productItem = JSON.parse(localStorage.getItem('productItem'))
    this.getModelDetail()
    if (this.productItem.buyStatus) {
      this.showTip = true
    }
  },
  methods: {
    clickSelectDate(data, index) {
      this.comboItem = data
      this.comboPrice = data.comboAmount
      this.selectIndex = index
    },

    clickBuyserve() {
      localStorage.setItem('comboItem', JSON.stringify(this.comboItem))
      if (this.comboItem.id) {
        this.$router.push({
          name: "subOrder"
        });
      }
    },
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
    closeWarn() {
      this.showTip = false
    },

    clickSubmit() {
      const agentLogo = this.ruleForm.imgUrl.dialogImageUrl
      const merchantLogo = this.ruleForm2.imgUrl.dialogImageUrl
      api.saveOEMConfig({
        agentLogo: agentLogo,
        merchantLogo: merchantLogo
      }).then(res => {
        if (res.data) {
          this.centerDialogVisible = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    padding: 24px 24px;
    box-sizing: border-box;
  }

  .top-content {
    padding: 24px 24px 31px 32px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
  }

  .warn {
    margin-bottom: 42px;
    padding: 0 16px;
    width: 100%;
    height: 40px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .left-icon {
    float: left;
    margin-top: 13px;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 14px;
    background: #1890ff;
  }

  .warn span {
    float: left;
    line-height: 40px;
    font-size: 14px;
    color: #000;
  }

  .warn img {
    display: block;
    margin-top: 15px;
    float: right;
    width: 10px;
    height: 10px;
  }

  .buy-info{
    width: 100%;
    display: flex;
  }

  .buy-img {
    display: block;
    margin-right: 24px;
    width: 103px;
    height: 103px;
  }

  .buy-all {
    width: 100%;
  }

  .first-body {
    padding-bottom: 32px;
    width: 100%;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  .buy-title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #333335;
    line-height: 22px;
  }

  .buy-subtitle {
    margin-bottom: 24px;
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }

  .buy-photo {
    display: block;
    width: 121px;
    height: 27px;
    background: #ff9150;
  }

  .second-body {
    padding: 28px 0;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
  }

  .select-date {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .select-name {
    padding-right: 24px;
    color: #909399;
    font-size: 16px;
  }

  .select-btn.select-show {
    margin-right: 16px;
    width: 90px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 3px;
    border: 1px solid #1989fa;
    color: #1989fa;
    font-size: 12px;
  }

  .select-btn.select-show button {
    color: #1989fa;
  }

  .select-btn {
    margin-right: 16px;
    width: 90px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 3px;
    border: 1px solid #c7c8cd;
    color: #606266;
    font-size: 12px;
  }

  .select-btn button {
    color: #606266;
  }

  .data-price {
    color: #f5222d;
    font-size: 24px;
    font-weight: bold;
  }

  .data-price span {
    padding-top: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .buy-serve {
    display: block;
    margin-top: 24px;
    width: 114px;
    height: 40px;
    background: #1989fa;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
  }

  .operation {
    margin-top: 24px;
    padding: 32px 0 32px 32px;
    width: 100%;
    background: #fff;
  }

  .operation-title {
    margin-bottom: 32px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .operation-step {
    display: flex;
    margin-bottom: 32px;
    width: 100%;
  }

  .left-step {
    color: #1989fa;
    font-size: 14px;
    width: 56px;
    line-height: 20px;
  }

  .right-step {
    width: 100%;
    font-size: 14px;
  }

  .right-title {
    color: #333335;
    line-height: 20px;
  }

  .right-list {
    margin-top: 8px;
    color: #909399;
  }

  .right-bank {
    margin-top: 8px;
    padding: 16px 0 16px 16px;
    width: 256px;
    background: #fafafa;
    border-radius: 4px;
    color: #606266;
  }

  .bank {
    display: flex;
  }

  .bank-title {
    margin-bottom: 8px;
    width: 70px;
    line-height: 18px;
  }

  .handle {
    padding-bottom: 216px;
    width: 100%;
    background: #fff;
  }

  .handel-title {
    padding-left: 24px;
    margin-top: 24px;
    width: 100%;
    height: 70px;
    font-size: 16px;
    line-height: 70px;
    color: #000;
    font-weight: 500;
    border-bottom: 1px solid #ebeef5;
  }

  .upimg {
    display: flex;
    margin-top: 24px;
    padding-left: 24px;
  }

  .upimg span {
    display: block;
    width: 112px;
    text-align: right;
  }

  .photo {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .photo .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .photo .avatar {
    display: block;
    width: 100px;
    height: 100px;
  }

  .upimg button {
    width: 114px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    background: #1989fa;
    border-radius: 4px;
  }
</style>
