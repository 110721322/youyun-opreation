<template>
  <div class="container">
    <div class="p_head">服务器部署信息</div>
    <div class="content">
      <ul class="detail">
        <div class="top-title">服务商信息</div>
        <li><span>服务商名称：</span><span>{{ detail.topAgentName }}</span></li>
        <li><span>法人手机号：</span><span>{{ detail.personMobile }}</span></li>
        <li><span>公司地址：</span><span>{{ detail.address }}</span></li>
        <li><span>法人姓名：</span><span>{{ detail.personName }}</span></li>
        <li><span>联系邮箱：</span><span>{{ detail.email }}</span></li>
      </ul>
      <ul class="detail detail-no">
        <div class="top-title">部署信息</div>
        <li><span>阿里云帐号：</span><span>{{ detail.aliyunAccount }}</span></li>
        <li><span>阿里云密码：</span><span>{{ aliSeeFlag ? detail.aliyunPassword : '********' }}</span><img :src="aliSeeFlag ? seePassword : hidePassword" alt="" @click="aliSeeFlag = !aliSeeFlag"></li>
        <li><span>乐刷帐号：</span><span>{{ detail.leshuaAccount }}</span></li>
        <li><span>乐刷密码：</span><span>{{ lsSeeFlag ? detail.leshuaPassword : '********' }}</span><img :src="lsSeeFlag ? seePassword : hidePassword" alt="" @click="lsSeeFlag = !lsSeeFlag"></li>
        <li><span>联系人：</span><span>{{ detail.contactPerson }}</span></li>
        <li><span>联系电话：</span><span>{{ detail.contactMobile }}</span></li>
      </ul>
    </div>
    <div class="btn">{{ status }}</div>
  </div>
</template>

<script>
import api from "@/api/api_agent"
import hidePassword from "@/assets/img/hide_password.png"
import seePassword from "@/assets/img/see_password.png"
export default {
  name: "DeployDetail",
  data() {
    return {
      channelAgentCode: this.$route.query.channelAgentCode,
      detail: {},
      aliSeeFlag: false,
      lsSeeFlag: false,
      hidePassword: hidePassword,
      seePassword: seePassword
    }
  },
  computed: {
    status() {
      switch (this.detail.status) {
        case 1:
          return '待部署';
        case 2:
          return '部署中';
        case 3:
          return '已完成';
        default:
          return ''
      }
    }
  },
  created() {
    this.getSourceCodeDeployDetail()
  },
  methods: {
    getSourceCodeDeployDetail() {
      api.getSourceCodeDeployDetail({channelAgentCode: this.channelAgentCode}).then(res => {
        this.detail = res.data;
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    padding: 24px 24px 0 24px;
    width: 100%;

    .detail {
      margin-bottom: 19px;
      padding-bottom: 8px;
      width: 100%;
      background: #fff;

      .top-title {
        margin-bottom: 20px;
        padding-left: 24px;
        width: 100%;
        height: 62px;
        border-bottom: 1px solid #ebeef5;
        line-height: 62px;
        color: #333335;
        font-size: 14px;
        font-weight: 500;
      }

      li {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        font-size: 14px;

        span:nth-child(1) {
          width: 108px;
          display: block;
          text-align: right;
          color: #000;
        }

        span:nth-child(2) {
          color: #606266;
        }

        img {
          display: block;
          margin-left: 4px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .btn {
    margin: 0 auto;
    width: 134px;
    height: 40px;
    background: #1989fa;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
  }

  .detail-no {
    margin-bottom: 42px;
  }
</style>
