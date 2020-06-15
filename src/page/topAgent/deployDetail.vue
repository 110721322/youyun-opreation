<template>
  <div class="main_page">
    <div class="p_head">服务器部署信息</div>
    <div class="content">
      <ul class="detail">
        <div class="top-title">服务商信息</div>
        <li><span>服务商名称：</span><span>杭州紫菜网络科技公司</span></li>
        <li><span>法人手机号：</span><span>13087653645</span></li>
        <li><span>公司地址：</span><span>浙江省杭州市西湖区紫金创业小镇</span></li>
        <li><span>法人姓名：</span><span>小风</span></li>
        <li><span>联系邮箱：</span><span>924823676@qq.com</span></li>
      </ul>
      <ul class="detail" style="margin-bottom: 42px;">
        <div class="top-title">部署信息</div>
        <li><span>阿里云帐号：</span><span>13456786789</span></li>
        <li><span>阿里云密码：</span><span>13087653645</span><img src="../../assets/img/hide_password.png" alt=""></li>
        <li><span>乐刷帐号：</span><span>13456786785</span></li>
        <li><span>乐刷密码：</span><span>********</span><img src="../../assets/img/see_password.png" alt=""></li>
        <li><span>联系人：</span><span>柚子</span></li>
        <li><span>联系电话：</span><span>12354678276</span></li>
      </ul>
    </div>
    <div class="btn">已部署完成</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    padding: 24px 24px 0 24px;
    .detail {
      width: 100%;
      margin-bottom: 19px;
      background: #ffffff;
      padding-bottom: 8px;
      .top-title {
        width: 100%;
        height: 62px;
        border-bottom: 1px solid #EBEEF5;
        padding-left: 24px;
        line-height: 62px;
        color: #333335;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 20px;
      }
      li {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        font-size: 14px;
        span:nth-child(1) {
          display: block;
          width: 108px;
          text-align: right;
          color: #000000;
        }
        span:nth-child(2) {
          color: #606266;
        }
        img {
          display: block;
          width: 16px;
          height: 16px;
          margin-left: 4px;
        }
      }
    }
  }
  .btn {
    width: 134px;
    height: 40px;
    background: #1989FA;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
    margin: 0 auto;
  }
</style>
