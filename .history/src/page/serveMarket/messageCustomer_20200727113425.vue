<template>
  <div class="main_page">
    <div class="top">
      <div class="left_img">
        <img src="../../assets/img/message_photo.png" alt="">
      </div>
      <div class="right_info">
        <div class="right_title">短信充值</div>
        <div class="right_subtitle">短信充值，用于系统/人工发送短信</div>
      </div>
    </div>
    <div class="content">
      <div class="select_btn">
        <div class="select_title" :class="selectIndex===index? 'title_select' :''" v-for="(item, index) in menu" :key="index" @click="onclick_head(index)">
          <span>{{item.value}}</span>
        </div>
      </div>
      <div class="message_recharge" v-if="selectIndex===0">
        <div class="relize">当前剩余短信：<span style="color: #1989FA; font-size: 20px">10</span>条</div>
        <div class="select_package">
          <div class="package_label">短信套餐:</div>
          <div class="package_select" :class="packageIndex===index?'ispackage': ''" v-for="(item, index) in packageData" :key="index" @click="onclick_package(index)">
            <p>{{item.num}}条</p>
            <p>{{item.price}}元</p>
          </div>
        </div>
        <div class="pay_price"><span>支付金额:</span><span style="color: #F5222D; font-size: 20px;">10</span><span>元</span></div>
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
      <div class="table_box" v-if="selectIndex===1">
        <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-data="testData"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="false"
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

export default {
  components: { BaseCrud },
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
      packageData: [
        {
          num: '1000',
          price: '10'
        },
        {
          num: '2000',
          price: '15'
        },
        {
          num: '5000',
          price: '35'
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
      wayIndex: 0,
      imageUrl: '',
      configData: USER_CONFIG,
      // api: api.queryPageByCondition,
      testData: [
        {
          id: '1',
          createTime: "2020-06-10"
        }
      ],
      params: {}
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onclick_head(index) {
      this.selectIndex = index
    },
    onclick_package(index) {
      this.packageIndex = index
    },
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
    },
    getTableData() {
      this.testData = [
        {
          id: '1',
          createTime: "2020-06-10"
        }
      ]
    }
  }
}
</script>

<style scoped>
  .main_page {
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
  .table_box {
    padding-top: 24px;
  }
</style>

