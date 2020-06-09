<template>
  <div class="main_page">
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
        <li><span>服务类型：</span><span>小马哥代理</span></li>
        <li><span>服务时间：</span><span>1年</span></li>
        <li><span>支付金额：</span><span style="color: #F5222D; font-size: 20px; font-weight: 500;">10000</span><span>元</span></li>
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
          <span>上传凭证：</span>
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
        </li>
        <p v-if="selectIndex===1">查看示例</p>
        <button v-if="selectIndex===1" class="option_btn" @click="onClick_tostatus">我已完成</button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payWay: [
        {
          id: 1,
          value: '扫码支付'
        },
        {
          id: 2,
          value: '对公转账'
        }
      ],
      selectIndex: 0,
      imageUrl: ''
    }
  },
  methods: {
    onClick_select(index) {
      this.selectIndex = index
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
    },
    onClick_tostatus() {
      this.$router.push({
        path: "/serveMarket/businessModel/payStatus"
      })
    }
  }
}
</script>

<style scoped>
  .main_page {
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
    padding-left: 32px;
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
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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

