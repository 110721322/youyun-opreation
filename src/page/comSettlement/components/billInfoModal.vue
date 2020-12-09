<template>
  <div class="bill-info-modal">
    <div class="bill-info">
      <div class="bill-info-base">
        <div class="base">
          <div class="base-title">开票资料</div>
          <div v-for="(item, index) in baseInfo" :key="index" class="base-item">
            <span class="item-label">{{ item.label }}</span>
            <div class="item-value">
              <span>{{ item.firstVal }}</span>
              <span v-if="item.secondVal">{{ item.secondVal }}</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="base other">
          <div class="base-title">其他资料<span>（只需寄送发票的第二联、第三联）</span></div>
          <div class="base-item">
            <div class="item-label">货物或应税劳务、服务名称：</div>
            <div class="item-value">软件服务费/技术服务费</div>
          </div>
        </div>
      </div>
      <div class="bill-info-img">
        <el-image
          style="width: 478px; height: 305px"
          :src="require('@/assets/img/bill-example.png')"
          :preview-src-list="srcList"
        ></el-image>
        <div class="look-img-tip">点击图片放大查看</div>
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
        { label: '名称：', firstVal: '杭州有云科技有限公司' },
        { label: '纳税人识别号：', firstVal: '913301000067886643E' },
        { label: '地址、电话：', firstVal: '浙江省杭州市西湖区三墩镇西园八路3号', secondVal: '智汇众创中心E1幢1801,0571-88119420' },
        { label: '开户行及帐号：', firstVal: '杭州银行滨江支行', secondVal: '330104160001013187' }
      ],
      srcList: [require('@/assets/img/bill-example.png')]
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
  font-weight: 400;

  .bill-info-base {
    width: 386px;
    box-sizing: border-box;
    padding: 13px 23px 0 21px;
    border: 1px solid #EBEEF5;

    background: #FAFAFA;
  }
  .bill-info-img {
    width: 478px;

    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;

    color: #909399;
    .look-img-tip {
      margin-top: 20px;
    }
  }
}

.base-title {
  margin-bottom: 16px;

  font-size: 16px;

  color: #333335;

  span {
    font-size: 14px;

    color: #909399;
  }
}
.base-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  margin-bottom: 16px;

  color: #000;

  .item-value {
    color: #606266;
    span {
      display: block;

      margin-bottom: 5px;

      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
}
.line {
  width: 344px;
  height: 1px;
  margin-bottom: 25px;

  background: #DCDFE6;
}

</style>
