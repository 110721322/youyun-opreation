<template>
  <div class="main_page">
    <div class="p_head">商品详情</div>
    <div class="goods">
      <div class="goods-introduce">
        <div class="goods-style">
          <div class="main-img">
            <img :src="imgData[imgIndex]" alt="" />
          </div>
          <div class="next-img">
            <img v-for="(item, index) in imgData" :key="index" :src="item" alt="" @click="onClice_changeImg(index)" />
          </div>
        </div>
        <div class="operation">
          <div class="name">{{ goodsDetail.deviceModel }}</div>
          <p>已售{{ goodsDetail.payCount }}件</p>
          <div class="shop flex-between flex-align-center">
            <div class="money">¥{{ goodsDetail.salePrice }}</div>
            <el-input-number v-model="num" size="small" label="描述文字" :min="1" @change="handleChange"></el-input-number>
          </div>
          <div class="shop-handle">
            <el-row>
              <el-button size="medium" type="primary" @click="onClick_gobuy">立即购买</el-button>
              <el-button size="medium" @click="click_addCart">加入购物车</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <div class="goods-detail">
        <div class="goods-title">商品详情</div>
        <div class="goods-info" v-html="goodsDetail.desc">
          {{ goodsDetail.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket"
// import api_address from "@/api/api_baseSetting"
export default {
  data() {
    return {
      num: 1,
      deviceId: '',
      goodsDetail: {},
      imgData: [],
      imgIndex: 0,
      userId: '',
      address: {}
    }
  },
  created() {
    this.deviceId = this.$route.query.deviceId
    // this.userId = localStorage.getItem('userId')
    this.getDetail(this.deviceId)
    this.getAddress()
  },
  methods: {
    getDetail(deviceId) {
      api.queryMallDeviceDetail({
        deviceId: deviceId
      }).then(res => {
        this.goodsDetail = res.object
        if (res.object.img) {
          const imgData = res.object.img.split(',')
          this.imgData = imgData
        }
      }).catch(err => {
        this.$message(err.errorMessage)
      })
    },
    getAddress() {
      api.queryAddress({
        agentNo: localStorage.getItem('agentNo')
      }).then(res => {
        if (res.object) {
          console.log(res)
          for (const i in res.object) {
            if (res.object[i].defaultType) {
              this.address = res.object[i]
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    click_addCart() {
      api.addShopCart({
        deviceId: this.goodsDetail.deviceId,
        count: this.num,
        userId: localStorage.getItem('agentUserId')
      }).then(res => {
        this.$message({
          message: '添加购物车成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
      })
    },
    onClick_gobuy() {
      if (this.address) {
        const deviceInfos = [
          {
            deviceId: this.goodsDetail.deviceId,
            count: this.num,
            salePrice: this.goodsDetail.salePrice
          }
        ]
        api.orderSettle({
          deviceInfos: deviceInfos,
          amount: this.num * this.goodsDetail.salePrice,
          actualAmount: this.num * this.goodsDetail.salePrice,
          agentNo: localStorage.getItem('agentNo'),
          buyerName: this.address.personName,
          buyerPhone: this.address.personMobile,
          buyerAddress: this.address.detailAddress,
          buyerRemark: '',
          outputType: 1
        }).then(res => {
          if (!res.object) {
            this.$message({
              message: res.errorMessage + ',请修改购买数量',
              type: 'warning'
            })
          } else {
            this.$router.push({
              path: '/serveMarket/equipmentMall/equimentPay',
              query: {
                orderInfo: res.object,
                deviceInfos: deviceInfos,
                address: this.address
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message({
          message: '请填写收货地址',
          type: 'warning'
        })
      }
    },
    onClice_changeImg(index) {
      this.imgIndex = index
    },
    handleChange(currentValue) {
      this.num = currentValue
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods {
    padding: 24px;
    .goods-introduce {
      display: flex;
      justify-content: flex-start;
      padding: 33px 43px;
      margin-bottom: 24px;
      background-color: #fff;
      .goods-style {
        margin-right: 32px;
        .main-img {
          padding: 12px 24px 0 19px;
          margin-bottom: 14px;
          img {
            width: 144px;
            height: 175px;
          }
        }
        .next-img {
          img {
            width: 32px;
            height: 32px;
            border-radius: 2px;
            margin-right: 10px;
          }
        }
      }
      .operation {
        .name {
          color: #333335;
          font-size: 20px;
          font-weight: 500;
        }
        p {
          color: #606266;
          margin: 8px 0 24px 0;
        }
        .shop {
          .money {
            color: #F64D4C;
            font-size: 20px;
            font-weight: 500;
            margin-right: 40px;
          }
        }
        .shop-handle {
          margin-top: 40px;
          .el-button {
            width: 133px;
            height: 40px;
            &:last-child {
              margin-left: 24px;
            }
          }
        }
      }
    }
    .goods-detail {
      background-color: #fff;
      .goods-title {
        font-size: 16px;
        font-weight: 500;
        padding-left: 32px;
        color: #333335;
        border-bottom: 1px solid #EBEEF5;
        line-height: 87px;
      }
      .goods-img {
        padding: 32px;
        img {
          width: 100%;
          height: 306px;
        }
      }
    }
  }
  .goods-info {
    padding: 24px 24px;
  }
</style>
