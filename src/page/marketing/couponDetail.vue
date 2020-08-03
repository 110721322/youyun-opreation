<template>
  <div class="mian_page">
    <div class="detail">
      <div class="detail-title">活动信息</div>
      <ul class="detail-info">
        <li><span>活动名称：</span><span>{{ activityDetail.activityName }}</span><span>{{ stateMap[activityDetail.state] }}</span></li>
        <li><span>优惠码面值：</span><span>{{ activityDetail.promoCodeAmount }}元</span></li>
        <li><span>截止活动时间：</span><span>{{ activityDetail.activityEndTime }}</span></li>
        <li><span>优惠码使用有限期：</span><span>{{promoCodeTime}}</span></li>
        <li><span>发放数量：</span><span>{{ activityDetail.promoCodeCount }}</span></li>
        <li><span>活动主标题：</span><span>{{ activityDetail.activityName }}</span></li>
        <li><span>活动副标题：</span><span>{{ activityDetail.activitySubName }}</span></li>
      </ul>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="false"
      @search="search"
    />
    <ul class="search-result">
      <li>
        <div class="info"><span>{{ couponStatics.receiveCount }}</span><span>次</span></div>
        <p>领取数量</p>
      </li>
      <li>
        <div class="info"><span>{{ couponStatics.usedCount }}</span><span>次</span></div>
        <p>核销数量</p>
      </li>
      <li>
        <div class="info"><span>{{ couponStatics.orderSuccessCount }}</span><span>次</span></div>
        <p>成交订单数</p>
      </li>
      <li>
        <div class="info"><span>{{ couponStatics.orderSuccessMoney }}</span><span>元</span></div>
        <p>成交订单金额</p>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/api/api_coupon.js";
import search from "@/components/search/search.vue";
import { FORM_CONFIG } from "./formConfig/detailConfig";
export default {
  components: { search },
  data() {
    return {
      searchMaxHeight: "88",
      searchConfig: FORM_CONFIG,
      activityDetail: {},
      activityNo: '',
      id: '',
      stateMap: {0: '进行中', 1: '已结束'},
      promoCodeTime: '',
      couponStatics: {},
      params: {}
    }
  },
  created() {
    const activityNo = this.$route.query.activityNo
    const id = this.$route.query.id
    this.getDetail(activityNo, id)
    this.getStastic(activityNo)
  },
  methods: {
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        activityNo: this.$route.query.activityNo
      };
      this.params = params;
      api.queryDetailCount(params).then(res => {
        if (res.object) {
          // console.log(res.object)
          this.couponStatics = res.object
        }
      })
    },
    getDetail(activityNo, id) {
      api.promoCodeQueryDetails({
        activityNo: activityNo,
        id: id
      }).then(res => {
        if (res.object) {
          this.activityDetail = res.object
          if (this.activityDetail.promoCodeTimeFlag === '0') {
            if (this.activityDetail.promoCodeTime.indexOf('D') !== -1) {
              this.promoCodeTime = '领取后' + this.activityDetail.promoCodeTime.split('-')[1] + '天内'
            } else {
              this.promoCodeTime = '领取后' + this.activityDetail.promoCodeTime.split('-')[1] + '小时内'
            }
          } else {
            this.promoCodeTime = this.activityDetail.promoCodeBeginTime + '-' + this.activityDetail.promoCodeEndTime
          }
        }
      });
    },
    getStastic(activityNo) {
      api.queryDetailCount({
        activityNo: activityNo
      }).then(res => {
        if (res.object) {
          // console.log(res.object)
          this.couponStatics = res.object
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .mian_page {
    width: 100%;
    height: 100%;
    padding: 24px 24px 40px 24px;
    .detail {
      width: 100%;
      background: #ffffff;
      padding: 0 24px;
      margin-bottom: 24px;
      .detail-title {
        width: 100%;
        height: 70px;
        border-bottom: 1px solid #EBEEF5;
        line-height: 70px;
        color: #000000;
        font-size: 16px;
      }
      .detail-info {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 24px 0 8px 0;
        li {
          width: 40%;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          span:nth-child(1) {
            font-size: 14px;
            color: #000000;
            padding-right: 4px;
          }
          span:nth-child(2) {
            color: #606266;
            font-size: 14px;
            padding-right: 8px;
          }
          span:nth-child(3) {
            display: block;
            width: 54px;
            height: 24px;
            line-height: 24px;
            background: #1989FA;
            text-align: center;
            color: #ffffff;
            border-radius: 4px;
          }
        }
      }
    }
    .s_box[data-v-19c2e88f] {
      margin: 0 0;
    }
    .search-result {
      width: 100%;
      padding: 32px 0;
      display: flex;
      background: #ffffff;
      margin-top: 24px;
      li {
        width: 25%;
        text-align: center;
        .info {
          margin-bottom: 8px;
          span:nth-child(1) {
            font-size: 24px;
            font-weight: 500;
          }
          span:nth-child(2) {
            font-size: 16px;
            font-weight: 500;
          }
        }
        p {
          color: #909399;
          font-size: 14px;
        }
      }
      li:nth-child(4) {
        .info {
          color: #1989FA;
        }
      }
    }
  }
</style>
