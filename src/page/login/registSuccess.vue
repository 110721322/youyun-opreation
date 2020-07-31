<template>
  <div class="main_page">
    <div class="left-box">
      <div class="tab-box">
        <img src="@/assets/img/logo.png" class="sidebar-logo">
      </div>
    </div>
    <div class="right-box">
      <div class="right-head"></div>
      <div class="right-content">
        <div class="content">
          <div class="middle">
            <div class="content-img">
              <img src="@/assets/img/order_photo.png" alt="">
            </div>
            <p class="title1">欢迎使用小马哥服务商管理系统</p>
            <p class="title2">平台将在一个工作日内为您进行资料审核请您耐心等待</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistSuccess",
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .main_page {
    width: 100%;
    height: 100%;
    display: flex;
    .left-box {
      width: 300px;
      height: 100%;
      background: #ffffff;
      box-shadow:5px 0px 9px 0px rgba(0,0,0,0.05);
      z-index: 2;
      .tab-box {
        width: 160px;
        height: 100%;
        background: #002140;
        padding: 18px 0 0 4px;
        img {
          width: 150px;
          height: 44px;
        }
      }
    }
    .right-box {
      width: calc(100% - 300px);
      height: 100%;
      background: #F0F2F5;
      .right-head {
        width: 100%;
        background: #ffffff;
        height: 58px;
      }
      .right-content {
        width: 100%;
        height: calc(100% - 58px);
        padding: 24px 24px;
        box-sizing: border-box;
        .content {
          width: 100%;
          height: 100%;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          .middle {
            width: 374px;
            .content-img {
              margin-bottom: 20px;
              img {
                display: block;
                width: 80px;
                height: 80px;
                margin:0 auto;
              }
            }
          }
          p {
            width: 100%;
            text-align: center;
          }
          .title1 {
            font-size: 20px;
            color: #606266;
            font-weight: 500;
            margin-bottom: 6px;
          }
          .title2 {
            font-size: 14px;
            color: #909399;
          }
        }
      }
    }
  }
</style>

