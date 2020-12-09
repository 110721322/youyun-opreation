<template>
  <div>
    <div class="tab-head">
      <span class="title">发货信息</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">订单信息</el-menu-item>
        <el-menu-item index="2">发货信息</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <div v-if="activeIndex == '1'" class="shipping">
        <div class="shipping-title">订单信息</div>
        <div class="shipping-content">
          <div class="pay-img">
            <img :src="orderDetail.voucher" alt="打款凭证" />
            <p>打款凭证</p>
          </div>
          <ul>
            <li><span>销售人员：</span><span>{{ orderDetail.saleUserName }}</span></li>
            <li><span>订单号：</span><span>{{ orderDetail.outputNo }}</span></li>
            <li><span>订单类型：</span><span>{{ orderDetail.outputTypeDesc }}</span></li>
            <li><span>订单金额：</span><span>{{ orderDetail.amount }}元</span></li>
            <li><span>实付金额：</span><span>{{ orderDetail.actualAmount }}元</span></li>
            <li><span>购买服务商：</span><span>{{ orderDetail.agentName }}</span></li>
            <li><span>支付方式：</span><span>{{ orderDetail.payTypeDesc }}</span></li>
            <li><span>邮寄地址：</span><span>{{ orderDetail.buyerAddress }}</span></li>
            <li><span>运营备注：</span><span>{{ orderDetail.financeRemark }}</span></li>
          </ul>
        </div>
      </div>
      <div v-if="activeIndex == '2'">
        <detailMode :key="2" :rule-form="ruleForm2" :config-data="configData2"></detailMode>
        <div class="table-box" style="padding:0">
          <div class="left-box">
            <div class="tab-head">
              <span class="title">设备型号</span>
            </div>
            <div class="device-list">
              <div
                v-for="(item, index) in deviceModelList"
                :key="index"
                class="device-item"
                :class="selectIndex===index? 'select-item': ''"
                @click="clickGetData(item,index)"
              >
                <div class="device-name">{{ item.deviceModel }}</div>
                <div class="device-num">{{ item.count }}台</div>
              </div>
            </div>
          </div>
          <div class="right-box">
            <BaseCrud
              ref="table"
              :params="params"
              :api-service="api"
              :grid-config="tableConfigData.gridConfig"
              :grid-btn-config="tableConfigData.gridBtnConfig"
              :grid-data="deviceInfo"
              :form-config="tableConfigData.formConfig"
              :form-data="tableConfigData.formModel"
              :grid-edit-width="100"
              form-title="用户"
              :border="true"
              :header-cell-style="getHeadClass"
              :is-async="true"
              @okEdit="clickOkEdit"
              @cancelEdit="clickCancelEdit"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import api from "@/api/api_device";
import detailMode from "@/components/detailMode/detailMode2.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { OUTSHOP_CONFIG } from "./../tableConfig/outShopConfig";

export default {
  name: "OutDetail",
  components: { detailMode, BaseCrud },

  data() {
    return {
      tableConfigData: OUTSHOP_CONFIG,
      activeIndex: "1",
      ruleForm: {},
      ruleForm2: {},
      configData: {
        name: "订单信息",
        items: [
          {
            name: "销售人员",
            key: "name1",
            type: "edit"
          },
          {
            name: "订单金额",
            key: "email"
          },
          {
            name: "支付方式",
            key: "name3"
          },
          {
            name: "订单号",
            key: "name"
          },
          {
            name: "实付金额",
            key: "pic"
          },
          {
            name: "邮寄地址",
            key: "name"
          },
          {
            name: "订单类型",
            key: "name"
          },
          {
            name: "购买服务商",
            key: "pic"
          },
          {
            name: "运营备注",
            key: "name"
          }
        ]
      },
      configData2: {
        name: "订单信息",
        items: [
          {
            name: "出库时间",
            key: "outputTime"
          },
          {
            name: "快递单号",
            key: "expressNo"
          },
          {
            name: "库管备注",
            key: "outputRemark"
          }
        ]
      },
      params: {
        currentPage: 0,
        deviceIdentifier: "",
        pageSize: 1,
        detailIdList: []
      },
      deviceModelList: [],
      id: '',
      orderDetail: {},
      deviceInfo: [],
      selectIndex: 0
    };
  },
  created() {
    this.id = this.$route.query.id
    this.checkOrderDetail(this.id)
  },
  // mounted() {
  //
  // },
  methods: {
    checkOrderDetail(id) {
      api.deviceOutputQueryById({id: id}).then(res => {
        this.orderDetail = res.data
      })
    },
    finishOutputInfo() {
      api.finishOutputInfo({ outputId: this.id }).then(res => {
        this.deviceModelList = res.data.infoResponseVOList;
        if (res.data.infoResponseVOList.length > 0) {
          this.deviceInfo = res.data.infoResponseVOList[0].deviceDetailList
        }
        this.ruleForm2 = res.data;
      });
    },
    clickGetData($item, index) {
      this.deviceInfo = $item.deviceDetailList
      this.selectIndex = index
    },
    handleSelect($index) {
      this.activeIndex = $index;
      if ($index === '2') {
        this.finishOutputInfo();
      }
    },
    onClick_edit($item) {
      $item.edit = true;
    },
    clickOkEdit($item) {
      $item.edit = false;
      api.finishOutputInfoUpdate({
        detailId: $item.detailId,
        deviceIdentifier: $item.deviceIdentifier
      }).then(res => {
        if (res.status === 0) {
          this.finishOutputInfo()
        }
      })
    },
    clickCancelEdit($item) {
      $item.edit = false;
    },
    getHeadClass() {
      return "background:#EFEFEF";
    }
  }
};
</script>

<style scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.form_item {
  float: left !important;
}

.clear_both {
  clear: both !important;
}

.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}

.form-box {
  display: flex;
  justify-content: space-between;
}

.left-box {
  width: 290px;
  height: 457px;
  background: rgba(255, 255, 255, 1);
  border-right: 1px solid #ebeef5;
  float: left;
}

.right-box {
  float: left;
  width: calc(100% - 290px - 48px);
  margin: 24px;
}

.device-list {
  margin-top: 20px;
  height: 392px;
  overflow: auto;
}

.device-item {
  width: 100%;
  height: 48px;
}

.device-item.select-item {
  background: #F1F5F6;
}

.device-name {
  width: 101px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  line-height: 48px;
  float: left;
  margin-left: 30px;
}

.device-num {
  width: 31px;
  height: 22px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  float: right;
  margin-right: 30px;
}

.shipping {
  width: 100%;
  padding: 24px 24px;
}

.shipping-title {
  width: 100%;
  height: 64px;
  background: #fff;
  padding-left: 24px;
  line-height: 64px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #EBEEF5;
}

.shipping-content {
  width: 100%;
  background: #fff;
  padding: 32px 32px;
}

.shipping-content .pay-img{
  width: 100%;
  margin-bottom: 32px;
}

.pay-img img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  display: block;
  margin-bottom: 8px;
}

.pay-img p {
  padding-left: 22px;
  font-size: 14px;
  color: #606266;
}

.shipping-content ul {
  display: flex;
  flex-wrap: wrap;
}

.shipping-content ul li {
  width: 33.3%;
  margin-bottom: 16px;
  line-height: 22px;
  font-size: 14px;
}

.shipping-content ul li span:nth-child(2) {
  font-size: 14px;
  color: #606266;
}
</style>
