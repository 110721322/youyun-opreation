<template>
  <div class="pay-page">
    <ul class="top-area">
      <li>
        <span class="left-title">付款剩余时间:</span>
        <div class="step-time">
          <div class="times">{{ lefth }}</div>
          <span>:</span>
          <div class="times">{{ leftm }}</div>
          <span>:</span>
          <div class="times">{{ lefts }}</div>
        </div>
      </li>
      <li>
        <span class="left-title">订单号:</span>
        <span class="left-title">{{ orderInfo.outputNo }}</span>
      </li>
      <li>
        <span class="left-title">付款金额:</span>
        <span class="price">{{ orderInfo.actualAmount }}</span>
      </li>
    </ul>
    <div class="pay-way">
      <div class="pay-label">支付方式:</div>
      <div v-for="(item, index) in wayData" :key="index" class="way" :class="wayIndex===index?'isway':''" @click="clickWay(index)">{{ item.value }}</div>
    </div>
    <!--    <div v-if="wayIndex===0" class="qrcode">-->
    <!--      <img src="../../../assets/img/qr_code.jpg" alt="">-->
    <!--    </div>-->
    <!--    <div v-if="wayIndex===0" class="bottom-des">-->
    <!--      <span>支持</span>-->
    <!--      <img src="../../../assets/img/zfbpay.png" alt="">-->
    <!--      <img src="../../../assets/img/wxpay.png" alt="">-->
    <!--      <img src="../../../assets/img/ysfpay.png" alt="">-->
    <!--      <span>扫码支付</span>-->
    <!--    </div>-->
    <div v-if="wayIndex===0" class="bank"><span>打款账户:</span><span>3301040160001013187</span></div>
    <div v-if="wayIndex===0" class="bank"><span>开户银行:</span><span>杭州银行滨江支行</span></div>
    <div v-if="wayIndex===0" class="code">
      <!--      <div class="code-label">打款凭证:</div>-->
      <Form
        :show-submit="fromConfigData.showSubmit"
        :show-foot-btn="fromConfigData.showFootBtn"
        :form-base-data="fromConfigData.formData"
        @submit="onClickSubmit"
      ></Form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket"
import Form from "@/components/form/index.vue";
export default {
  name: "EquimentPay",
  components: { Form },
  data() {
    return {
      imageUrl: '',
      wayData: [
        // {
        //   value: '扫码支付'
        // },
        {
          value: '对公转账'
        }
      ],
      wayIndex: 0,
      orderInfo: {},
      fromConfigData: {
        formData: [
          {
            type: 6,
            label: '打款凭证',
            maxNum: 1,
            key: 'deviceImg'
          }
        ],
        showSubmit: true,
        showFootBtn: false
      },
      leftd: '',
      lefth: '',
      leftm: '',
      lefts: '',
      deviceInfos: [],
      address: {}
    }
  },
  created() {},
  mounted() {
    this.orderInfo = this.$route.query.orderInfo
    this.deviceInfos = this.$route.query.deviceInfos
    this.address = this.$route.query.address
    this.getTime()
  },
  methods: {
    getTime() {
      var date = new Date();
      var Months = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var Dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      var now = date.getFullYear() + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds;
      var now1 = now.replace(new RegExp("-", "gm"), "/")
      var now2 = this.orderInfo.theTime.replace(new RegExp("-", "gm"), "/")
      var startDateM = (new Date(now1)).getTime(); // 得到倒计时的毫秒数
      var endTime = (new Date(now2)).getTime()
      var nowTime = (endTime + 1800000) - startDateM
      if (nowTime >= 0) {
        this.leftd = Math.floor(nowTime / (1000 * 60 * 60 * 24)) // 计算天数
        this.lefth = Math.floor(nowTime / (1000 * 60 * 60) % 24) // 计算小时数
        this.leftm = Math.floor(nowTime / (1000 * 60) % 60) // 计算分钟数
        this.lefts = Math.floor(nowTime / 1000 % 60) // 计算秒数
        if (this.leftd < 10) {
          this.leftd = "0" + this.leftd
        }
        if (this.lefth < 10) {
          this.lefth = "0" + this.lefth
        }
        if (this.leftm < 10) {
          this.leftm = "0" + this.leftm
        }
        if (this.lefts < 10) {
          this.lefts = "0" + this.lefts
        }
        setInterval(() => {
          this.getTime()
        }, 1000)
      } else {
        this.lefth = '00'
        this.lefth = '00'
        this.leftm = '00'
        this.lefts = '00'
      }
    },
    clickWay(index) {
      this.wayIndex = index
    },
    onClickSubmit($data) {
      if (!$data.deviceImg) {
        this.$message({
          message: '请上传付款凭证',
          type: 'warning'
        })
      } else {
        api.companyOrderSettle({
          voucher: $data.deviceImg.dialogImageUrl,
          outputNo: this.orderInfo.outputNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: "success"
            })
          } else {
            this.$confirm('超时未付款，订单自动关闭', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              showCancelButton: false,
              showClose: false
            }).then(() => {
              this.$router.replace({
                name: 'orderRecords'
              })
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .pay-page {
    width: 100%;
    background: #fff;
    padding: 32px 32px 40px 32px;
  }

  .top-area {
    width: 100%;
    background: #fafafa;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    padding: 32px 0 12px 32px;
  }

  .top-area li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .left-title {
    display: block;
    padding-right: 10px;
    font-size: 14px;
    color: #606266;
  }

  .step-time {
    display: flex;
    align-items: center;
  }

  .step-time .times {
    width: 28px;
    height: 32px;
    background: #e8f1fa;
    color: #1989fa;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    border-radius: 2px;
  }

  .step-time span {
    display: block;
    width: 12px;
    height: 32px;
    color: #1989fa;
    text-align: center;
    line-height: 32px;
    font-weight: 500;
  }

  .price {
    font-size: 20px;
    font-weight: 500;
    color: #f64d4c;
  }

  .pay-way {
    margin-top: 32px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    font-size: 14px;
  }

  .pay-label {
    margin-right: 12px;
    color: #000;
  }

  .way {
    width: 126px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ecedef;
    margin-right: 8px;
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
    align-items: center;
    padding-left: 60px;
    margin-top: 14px;
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
    margin-left: 50px;
  }

  .bank span {
    font-size: 14px;
  }

  .bank span:nth-child(1) {
    color: #000;
    padding-right: 12px;
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

  .code .el-form.formTemplate {
    margin: 0 0;
  }
</style>

