<template>
  <div class="bill-info-modal">
    <div class="bill-info">
      <div class="bill-info__base">
        <div class="base">
          <div class="base__title"></div>
          <div v-for="(item, index) in baseInfo" :key="index" class="base__item">
            <span class="item-label">{{ item.label }}</span>
            <div class="item-value">
              <span>{{ item.firstVal }}</span>
              <span v-if="item.secondVal">{{ item.secondVal }}</span>
            </div>
          </div>
        </div>
        <div class="base other">
          <div class="base__title">其他资料<span>（只需寄送发票的第二联、第三联）</span></div>
          <div class="base__item">
            <div class="item-label">货物或应税劳务、服务名称：</div>
            <div class="item-value">软件服务费/技术服务费</div>
          </div>
        </div>
      </div>
      <div class="bill-info__img">
        <img src="@/assets/img/bill-example.png" alt="">
        <div>点击图片放大查看</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BillInfoModal',
  data() {
    return {
      baseInfo: [
        { label: '名称', firstVal: '杭州有云科技有限公司' },
        { label: '纳税人识别号：', firstVal: '913301000067886643E' },
        { label: '地址、电话：', firstVal: '浙江省杭州市西湖区三墩镇西园八路3号', secondVal: '智汇众创中心E1幢1801室0571-88119420' },
        { label: '开户行及帐号：', firstVal: '杭州银行滨江支行', secondVal: '330104160001013187' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 942px;
  box-sizing: border-box;
  padding: 23px 31px 23px 24px;
  border-bottom: 1px solid #EBEEF5;

  font-size: 14px;

  .bill-info__base {
    width: 386px;
    box-sizing: border-box;
    padding: 13px 23px 20px 21px;
    border: 1px solid #EBEEF5;

    background: #FAFAFA;
  }
  .bill-info__img {
    width: 478px;

    font-weight: 400;
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;

    color: #909399;
    img {
      width: 100%;
      height: 305px;
      margin-bottom: 20px;
    }
  }
}

.base__title {
  margin-bottom: 16px;

  font-size: 16px;

  color: #333335;
}
.base__item {
  margin-bottom: 16px;

  color: #000;

  .item-value {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #606266
  }
}

</style>
