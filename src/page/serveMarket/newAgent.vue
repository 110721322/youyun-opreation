<template>
  <div class="main_page">
    <div class="top_content">
      <div class="warn">
        <div class="left_icon">i</div>
        <span>已购买该服务，有效期到：2020-10-10 。再次购买后服务到期时间将累加</span>
        <img src="../../assets/img/cancle.png" alt="">
      </div>
      <div class="start warn">
        <div class="left_icon">i</div>
        <span>服务器部署中，请耐心等待~ 部署时间2~7个工作日</span>
      </div>
      <div class="finish warn">
        <img class="left_photo" src="../../assets/img/order_success.png" alt="">
        <span>服务器部署中，请耐心等待~ 部署时间2~7个工作日</span>
      </div>
      <div class="buy_info">
        <img class="buy_img" src="../../assets/img/new_image.png" alt="">
        <div class="buy_all">
          <div class="first_body">
            <div class="buy_title">新源码</div>
            <div class="buy_subtitle">支持接入自己的交易通道，且提供服务器独立部署</div>
            <img class="buy_photo" src="" alt="">
          </div>
          <div class="second_body">
            <div class="select_date">
              <span class="select_name">服务时间</span>
              <div v-for="(item, index) in selectMounth" :key="index" class="select_btn" :class="selectIndex===index? 'select_show' : ''">
                <button @click="onclick_selectDate(index)">{{ item.value }}</button>
              </div>
            </div>
            <div class="price">
              <span class="select_name">购买价格</span>
              <span class="data_price"><span>¥</span>1000</span>
            </div>
          </div>
          <button class="buy_serve" @click="onclick_buyserve">购买服务</button>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="operation_title">操作流程</div>
      <div class="operation_step">
        <div class="left_step">步骤一:</div>
        <ul class="right_step">
          <li class="right_title">选择服务时间</li>
          <li class="right_list">目前服务时间可购买：1年，2年和3年。服务到期后若不进行续费购买将无法展开该服务</li>
        </ul>
      </div>
      <div class="operation_step">
        <div class="left_step">步骤二:</div>
        <ul class="right_step">
          <li class="right_title">购买服务</li>
          <li class="right_list">支付方式支持：线上扫码付款及对公转账</li>
          <li class="right_list">1.扫码支付：支持微信/支付宝/云闪付扫码支付，支付成功后直接进行业务拓展</li>
          <li class="right_list">2.对公转账：需对公转账到以下信息，并上传证明，审核通过后可进行业务拓展</li>
          <li class="right_bank">
            <div class="bank"><div class="bank_title">打款账户:</div>3301040160001013187</div>
            <div class="bank"><div class="bank_title">开户行:</div>杭州银行滨江支行</div>
          </li>
        </ul>
      </div>
      <div class="operation_step">
        <div class="left_step">步骤三:</div>
        <ul class="right_step">
          <li class="right_title">业务拓宽</li>
          <li class="right_list">可添加服务商，为服务商配置该类型，进行业务</li>
        </ul>
      </div>
    </div>
    <div class="serve">
      <div class="serve_title">服务器部署</div>
      <ul class="serve_desc">
        <li>1、按照要求购买阿里云服务器，具体要求及购买流程可查看<span style="color: #1989FA">《服务器购买要求及操作流程》</span></li>
        <li>2、按照要求申请乐刷后台账号，并进行相关配置，具体操作流程可查看《乐刷账号申请及配置说明》</li>
        <li>3、填写相关字段信息，由有云审核后进行部署（预计2~7个工作日）</li>
        <li>4、如有疑问可咨询：400-887-8292</li>
      </ul>
      <newAgentEdit
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="handleCommit"
      ></newAgentEdit>
      <div class="info">
        <ul>
          <li><span>阿里云帐号：</span><span>247394739493792</span></li>
          <li><span>阿里云密码：</span><span>**************</span><img src="../../assets/img/see_password.png" alt=""></li>
          <li><span>联系人：</span><span>红莲</span></li>
        </ul>
        <ul>
          <li><span>乐刷账号：</span><span>247394739493792</span></li>
          <li><span>乐刷密码：</span><span>chkh18jsi</span><img src="../../assets/img/hide_password.png" alt=""></li>
          <li><span>联系电话：</span><span>13350987890</span></li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="操作成功"
      :visible.sync="centerDialogVisible"
      width="455px"
      height="305px"
      border-radius="8px"
      center>
      <div style="color: #606266; font-size: 20px; font-weight: 500; text-align: center; line-height: 32px;">服务器部署中，请耐心等待</div>
      <div style="color: #909399; font-size: 14px; text-align: center; line-height: 32px;">部署时间2-7个工作日</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import newAgentEdit from "@/components/form/announcementEditForm.vue";
import { FORM_CONFIG } from "./formConfig/newAgentConfig";

export default {
  components: { newAgentEdit },
  data () {
    return {
      selectMounth: [
        {
          id: 1,
          value: '长期'
        }
      ],
      selectIndex: 0,
      fromConfigData: FORM_CONFIG.sendMessageData,
      centerDialogVisible: false,
      imgUrl: "https://pics7.baidu.com/feed/2f738bd4b31c8701e3ae9137d62254290608ffaf.jpeg?token=638e9b2296a837b445f9de64cce7c7b9"
    }
  },
  methods: {
    onclick_selectDate(index) {
      this.selectIndex = index
    },
    onclick_buyserve() {
      this.$router.push({
        path: "/serveMarket/businessModel/subOrder"
      });
    },
    handleCommit() {
      this.centerDialogVisible = true
    }
  }
}
</script>

<style scoped>
  .main_page {
    width: 100%;
    padding: 24px 24px;
    box-sizing: border-box;
  }
  .top_content {
    width: 100%;
    padding: 24px 24px 31px 32px;
    box-sizing: border-box;
    background: #ffffff;
  }
  .warn {
    width: 100%;
    height: 40px;
    background: #E6F7FF;
    border: 1px solid #91D5FF;
    border-radius: 4px;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 42px;
  }
  .start.warn {
    background: #FFF6E2;
    border: 1px solid #EFA911;
  }
  .start.warn span {
    color: #EFA911;
  }
  .start.warn .left_icon {
    background: #EFA911;
  }
  .finish.warn{
    background: #EDFCEB;
    border: 1px solid #79D370;
  }
  .finish.warn span {
    color: #79D370;
  }
  .warn .left_icon {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #ffffff;
    font-size: 12px;
    margin-top: 13px;
    text-align: center;
    line-height: 14px;
    float: left;
    margin-right: 8px;
    background: #1890FF;
  }
  .warn span {
    float: left;
    line-height: 40px;
    font-size: 14px;
    color: #000000;
  }
  .warn img{
    display: block;
    width: 10px;
    height: 10px;
    margin-top: 15px;
    float: right;
  }
  .finish.warn .left_photo {
    display: block;
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 8px;
    margin-top: 12px;
  }
  .buy_info{
    width: 100%;
    display: flex;
  }
  .buy_img {
    width: 103px;
    height: 103px;
    display: block;
    margin-right: 24px;
  }
  .buy_all {
    width: 100%;
  }
  .first_body {
    width: 100%;
    border-bottom: 1px solid #EBEEF5;
    padding-bottom: 32px;
    box-sizing: border-box;
  }
  .buy_title {
    font-size: 16px;
    font-weight: 500;
    color: #333335;
    line-height: 22px;
    margin-bottom: 8px;
  }
  .buy_subtitle {
    font-size: 14px;
    color: #909399;
    line-height: 20px;
    margin-bottom: 24px;
  }
  .buy_photo {
    display: block;
    width: 121px;
    height: 27px;
    background: #FF9150;
  }
  .second_body {
    width: 100%;
    padding: 28px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEEF5;
  }
  .select_date{
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  .select_name {
    color: #909399;
    font-size: 16px;
    padding-right: 24px;
  }
  .select_btn.select_show{
    width: 90px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 3px;
    border:1px solid #1989FA;
    color: #1989FA;
    font-size: 12px;
    margin-right: 16px;
  }
  .select_btn.select_show button {
    color: #1989FA;
  }
  .select_btn {
    width: 90px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 3px;
    border:1px solid #C7C8CD;
    color: #606266;
    font-size: 12px;
    margin-right: 16px;
  }
  .select_btn button {
    color: #606266;
  }
  .data_price {
    color: #F5222D;
    font-size: 24px;
    font-weight: bold;
  }
  .data_price span {
    font-size: 14px;
    padding-top:4px;
    box-sizing: border-box;
  }
  .buy_serve {
    display: block;
    width: 114px;
    height: 40px;
    background: #1989FA;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    margin-top: 24px;
  }
  .operation {
    width: 100%;
    margin-top: 24px;
    background: #ffffff;
    padding: 32px 0 32px 32px;
  }
  .operation_title {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 32px;
  }
  .operation_step {
    width: 100%;
    display: flex;
    margin-bottom: 32px;
  }
  .left_step{
    color: #1989FA;
    font-size: 14px;
    width: 56px;
    line-height: 20px;
  }
  .right_step {
    width: 100%;
    font-size: 14px;
  }
  .right_title {
    color: #333335;
    line-height: 20px;
  }
  .right_list {
    color: #909399;
    margin-top: 8px;
  }
  .right_bank {
    margin-top:8px;
    width: 256px;
    padding: 16px 0 16px 16px;
    background: #FAFAFA;
    border-radius: 4px;
    color: #606266;
  }
  .bank {
    display: flex;
  }
  .bank_title {
    width: 70px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .serve {
    width: 100%;
    padding: 24px 32px 50px 32px;
    background: #ffffff;
    margin-top: 24px;
  }
  .serve_title {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 24px;
  }
  .serve_desc {
    width: 100%;
    padding: 24px 0 24px 24px;
    background: #FAFAFA;
    font-size: 14px;
    color: #909399;
  }
  .serve_desc li {
    margin-bottom: 8px;
  }
  .serve_desc li:last-child {
    margin-bottom: 0;
  }
  .top_img img {
    display: block;
    width: 80px;
    height: 80px;
  }
  .info {
    margin-top: 32px;
    width: 100%;
    padding: 24px 0 24px 24px;
    background: #FAFAFA;
    display: flex;
  }
  .info ul:nth-child(1){
    width: 35%;
  }
  .info ul li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
  }
  .info ul li span:nth-child(1) {
    color: #000000;
  }
  .info ul li span:nth-child(2) {
    color: #606266;
  }
  .info ul li img {
    display: block;
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
</style>

