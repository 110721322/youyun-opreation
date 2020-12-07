<template>
  <div>
    <ul class="top-head">
      <li class="step" :class="firstStep===1? 'now-step':''">
        <span v-if="firstStep===1 && secondStep===0" :style="{'background': (firstStep===1 && secondStep===0 && thirdStep===0)? '#1989FA' :'#ffffff'}">1</span>
        <span v-if="secondStep===1" style="display: flex; align-items: center; justify-content: center; border: 1px solid #1989FA;">
          <img src="../../assets/img/step_now.png" style="width: 24px; height: 24px;" />
        </span>
        <span>优惠码信息</span>
        <span></span></li>
      <li class="step" :class="firstStep===1 && secondStep===1? 'now-step':''">
        <span v-if="thirdStep===0" :style="{'background': (firstStep===1 && secondStep===1 && thirdStep===0)? '#1989FA' :'#ffffff'}">2</span>
        <span v-if="thirdStep===1" style="display: flex; align-items: center; justify-content: center; border: 1px solid #1989FA;">
          <img src="../../assets/img/step_now.png" style="width: 24px; height: 24px;" />
        </span>
        <span>活动页面信息</span>
        <span></span>
      </li>
      <li class="step" :class="thirdStep===1? 'now-step':''">
        <span :style="{'background': thirdStep===1? '#1989FA': '#ffffff'}">3</span>
        <span>生成推广链接</span>
      </li>
    </ul>
    <div class="couponContent">
      <div class="left-area">
        <img src="../../assets/img/coupon.jpg" alt="">
        <div class="sub-title">扫脸时代感恩回馈</div>
        <div class="title">支付立减优惠码，等你来抢</div>
      </div>
      <div v-show="firstStep===1 && secondStep===0" class="right-area">
        <div class="right-head">
          <span></span>
          <span>优惠码设置</span>
        </div>
        <div class="coupon-form">
          <Form
            ref="firstForm"
            :form-base-data="fromConfigData1.formData"
            :label-width="'auto'"
            :show-foot-btn="false"
          ></Form>
          <div class="next-btn">
            <button @click="onClickFirstbtn">下一步</button>
          </div>
        </div>
      </div>
      <div v-show="secondStep===1 && thirdStep===0" class="right-area">
        <div class="right-head">
          <span></span>
          <span>页面设置</span>
        </div>
        <div class="coupon-form">
          <Form
            ref="secondForm"
            :form-base-data="fromConfigData2.formData"
            :label-width="'auto'"
            :show-foot-btn="false"
          ></Form>
          <div class="next-btn">
            <button class="back-btn" @click="onClickBack">上一步</button>
            <button @click="onClickSecondbtn">下一步</button>
          </div>
        </div>
      </div>
      <div v-if="thirdStep===1" class="right-area">
        <div class="right-head">
          <span></span>
          <span>推广步骤</span>
        </div>
        <div class="coupon-form" style="padding: 24px 0 32px 32px; margin-bottom: 24px;">
          <div class="third_title"><span>1</span><span>下载二维码/复制领取链接</span></div>
          <p>优惠码领取二维码</p>
          <div class="qd-code">
            <img id="img" :src="activityDetail.qrCodeImageUrl" alt="">
          </div>
          <button class="down" @click="clickDownloadCodeImg">下载二维码</button>
        </div>
        <div class="coupon-form" style="padding: 24px 0 32px 32px;">
          <div class="third_title"><span>2</span><span>发给服务商扫码/进入链接进行领取</span></div>
          <p>优惠码领取链接</p>
          <!-- <div class="text-info">http://192.168.2.7/yx/sy/#id=hbdaqk&p=%E7%99%BB%E5%BD%95%E9%A1%B5&g=1</div> -->
          <div class="text-info">{{ activityDetail.shortUrl }}</div>
          <button class="down" @click="copyActiveCode($event,activityDetail.shortUrl )">复制链接</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "@/components/form/index";
import { FORM_CONFIG1 } from "./formConfig/addCoupon";
import { FORM_CONFIG2 } from "./formConfig/addCoupon";
import api from "@/api/api_coupon.js"
import Clipboard from "clipboard";
export default {
  name: "AddCoupon",
  components: { Form },
  data() {
    return {
      fromConfigData1: FORM_CONFIG1,
      fromConfigData2: FORM_CONFIG2,
      firstStep: 1,
      secondStep: 0,
      thirdStep: 0,
      ruleForm: {},
      activityDetail: {}
    }
  },
  methods: {
    clickDownloadCodeImg() {
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      var _this = this;
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png");// 得到图片的base64编码数据
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = _this.projectName || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = this.activityDetail.qrCodeImageUrl;
    },
    onClickFirstbtn() {
      this.ruleForm = this.$refs.firstForm.ruleForm
      this.secondStep = 1
    },
    onClickSecondbtn() {
      const params = {
        ...this.ruleForm,
        ...this.$refs.secondForm.ruleForm
      }
      api.createPromoCode({
        activityBeginTime: params.date ? params.date[0] : null,
        activityEndTime: params.date ? params.date[1] : null,
        activityName: params.activityName,
        activitySubName: params.activitySubName,
        promoCodeAmount: params.promoCodeAmount,
        promoCodeCount: params.promoCodeCount,
        promoCodeName: params.promoCodeName,
        promoCodeTime: params.promoCodeTime,
        promoCodeTimeFlag: params.promoCodeTimeFlag,
        promoCodeBeginTime: params.dateArr ? params.dateArr[0] : null,
        promoCodeEndTime: params.dateArr ? params.dateArr[1] : null,
        suffixUrl: 'a.html'
      }).then(res => {
        if (res.data) {
          this.activityDetail = res.data
          this.thirdStep = 1
        }
      })
    },
    onClickBack() {
      this.secondStep = 0
    },
    copyActiveCode(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    }
  }
}
</script>

<style scoped lang="scss">
  .main_page {
    width: 100%;
    height: 100%;
    padding: 24px 24px 0 24px;
    .top-head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 86px;
      margin-bottom: 24px;
      background: #ffffff;
      .step {
        width: 33.3%;
        display: flex;
        align-items: center;
        padding-left: 24px;
        span {
          display: block;
        }
        span:nth-child(1) {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          border: 1px solid #DBDBDB;
          color: #DBDBDB;
          margin-right: 8px;
          text-align: center;
          line-height: 32px;
        }
        span:nth-child(2) {
          white-space: nowrap;
          font-size: 16px;
          color: #909399;
          margin-right: 24px;
        }
        span:nth-child(3) {
          width: 64%;
          height: 1px;
          background: #D9D9D9;
        }
      }
      .step.now-step {
        span:nth-child(2) {
          color: #333335;
          font-weight: 600;
        }
      }
    }
    .couponContent {
      width: 100%;
      height: 100%;
      background: #ffffff;
      padding: 24px 24px 40px 24px;
      display: flex;
      .left-area {
        position: relative;
        top: 0;
        img {
          display: block;
          width: 375px;
          height: 812px;
        }
        .sub-title {
          position: absolute;
          top: 170px;
          left: 84px;
          width: 206px;
          height: 64px;
          text-align: center;
          line-height: 64px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
        }
        .title {
          position: absolute;
          top: 258px;
          left: 68px;
          width: 240px;
          height: 28px;
          font-size: 20px;
          font-weight: 500;
          text-align: center;
          line-height: 28px;
          color: #4B4139;
        }
      }
      .right-area {
        width: 100%;
        margin-left: 10%;
        .right-head {
          display: flex;
          height: 44px;
          border-bottom: 1px dashed #DCDFE6;
          span:nth-child(1) {
            display: block;
            width: 3px;
            height: 16px;
            background: #1989FA;
            margin-right: 9px;
          }
          span:nth-child(2) {
            color: #000000;
            font-size: 16px;
          }
        }
        .coupon-form {
          width: 100%;
          background: #FAFAFA;
          padding: 1px 0 35px 0;
          box-sizing: border-box;
          .next-btn {
            display: flex;
            padding:32px 0 0 140px;
            .back-btn {
              background: #ffffff;
              color: #606266;
              border: 1px solid #C7C8CD;
              margin-right: 8px;
            }
            button {
              width: 134px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: #ffffff;
              font-size: 14px;
              border-radius: 4px;
              background: #1989FA;
            }
          }
          .third_title {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            span:nth-child(1) {
              display: block;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background: #1989FA;
              text-align: center;
              line-height: 22px;
              font-size: 14px;
              font-weight: 500;
              margin-right: 8px;
              color: #ffffff;
            }
            span:nth-child(2) {
              font-size: 16px;
              color: #000000;
            }
          }
          P {
            font-size: 14px;
            color: #000000;
            margin-bottom: 16px;
          }
          .qd-code {
            width: 200px;
            height: 200px;
            background: #ffffff;
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            margin-bottom: 24px;
            img {
              width: 196px;
              height: 196px;
            }
          }
          .text-info {
            width: 364px;
            height: 58px;
            padding: 12px 37px 0 16px;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            font-size: 14px;
            line-height: 16px;
            color: #606266;
            word-break: break-all;
            margin-bottom: 24px;
          }
          .down {
            width: 134px;
            height: 40px;
            background: #1989FA;
            color: #ffffff;
            border-radius: 4px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
