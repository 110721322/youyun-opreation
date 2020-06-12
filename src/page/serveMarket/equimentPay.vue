<template>
  <div class="pay_page">
    <div class="top-area">
      <li>
        <span class="left-title">付款剩余时间:</span>
        <div class="step-time">
          <div class="times">16</div>
          <span>:</span>
          <div class="times">20</div>
          <span>:</span>
          <div class="times">23</div>
        </div>
      </li>
      <li>
        <span class="left-title">订单号:</span>
        <span class="left-title">2022328082090</span>
      </li>
      <li>
        <span class="left-title">付款金额:</span>
        <span class="price">344.90</span>
      </li>
    </div>
    <div class="pay_way">
      <div class="pay_label">支付方式:</div>
      <div class="way" :class="wayIndex===index?'isway':''" v-for="(item, index) in wayData" :key="index" @click="onclick_way(index)">{{item.value}}</div>
    </div>
    <div class="qrcode" v-if="wayIndex===0">
      <img src="../../assets/img/qr_code.jpg" alt="">
    </div>
    <div class="bottom-des" v-if="wayIndex===0">
      <span>支持</span>
      <img src="../../assets/img/apply_pay.png" alt="">
      <img src="../../assets/img/wx_pay.png" alt="">
      <img src="../../assets/img/yun_pay.png" alt="">
      <span>扫码支付</span>
    </div>
    <div class="bank" v-if="wayIndex===1"><span>打款账户:</span><span>3301040160001013187</span></div>
    <div class="bank" v-if="wayIndex===1"><span>开户银行:</span><span>杭州银行滨江支行</span></div>
    <div class="code" v-if="wayIndex===1">
      <div class="code_label">打款凭证:</div>
      <div class="photo">
        <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="see_model" v-if="wayIndex===1">查看示例</div>
    <div class="sub_btn" v-if="wayIndex===1">
      <button>提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      wayData: [
        {
          value: '扫码支付'
        },
        {
          value: '对公转账'
        }
      ],
      wayIndex: 0
    }
  },
  methods: {
    onclick_way(index) {
      this.wayIndex = index
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
  .pay_page {
    width: 100%;
    background: #ffffff;
    padding: 32px 32px 40px 32px;
  }
  .top-area {
    width: 100%;
    background: #fafafa;
    border: 1px solid #EBEEF5;
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
    font-size: 14px;
    color: #606266;
    padding-right: 10px;
  }
  .step-time {
    display: flex;
    align-items: center;
  }
  .step-time .times {
    width: 28px;
    height: 32px;
    background: #E8F1FA;
    color: #1989FA;
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
    color: #1989FA;
    text-align: center;
    line-height: 32px;
    font-weight: 500;
  }
  .price {
    font-size: 20px;
    font-weight: 500;
    color: #F64D4C;
  }
  .pay_way {
    margin-top: 32px;
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
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
</style>

