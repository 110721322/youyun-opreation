<template>
  <div class="main_page">
    <div class="tab_head">
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
      <div v-if="activeIndex == '1'">
        <detailMode :key="1" :rule-form="ruleForm" :config-data="configData"></detailMode>
      </div>
      <div v-if="activeIndex == '2'">
        <detailMode :key="2" :rule-form="ruleForm" :config-data="configData2"></detailMode>

        <!-- <detailBox title="商品信息">
          <div class="table_box">
            <BaseCrud
              :grid-config="tableConfigData.gridConfig"
              :grid-btn-config="tableConfigData.gridBtnConfig"
              :grid-data="testData"
              :form-config="tableConfigData.formConfig"
              :form-data="tableConfigData.formModel"
              :grid-edit-width="300"
              form-title="用户"
              :is-async="true"
            />
          </div>
        </detailBox>-->
        <div class="table_box" style="padding:0">
          <div class="left_box">
            <div class="tab_head">
              <span class="title">设备型号</span>
            </div>
            <div class="device_list">
              <div
                v-for="(item,key) of deviceModelList"
                :key="key"
                class="device_item"
                @click="onClick_getData(item)"
              >
                <div class="device_name">{{ item.deviceModel }}</div>
                <div class="device_num">{{ item.count }}</div>
              </div>
            </div>
          </div>
          <div class="right_box">
            <BaseCrud
              ref="table"
              :params="params"
              :api-service="api"
              :grid-config="tableConfigData.gridConfig"
              :grid-btn-config="tableConfigData.gridBtnConfig"
              :grid-data="testData"
              :form-config="tableConfigData.formConfig"
              :form-data="tableConfigData.formModel"
              :grid-edit-width="100"
              form-title="用户"
              :border="true"
              :header-cell-style="getHeadClass"
              :is-async="true"
              @okEdit="onClick_okEdit"
              @cancelEdit="onClick_cancelEdit"
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
  name: "Theme",
  components: { detailMode, BaseCrud },

  data() {
    return {
      tableConfigData: OUTSHOP_CONFIG,
      activeIndex: "2",
      ruleForm: {
        name: "1",
        name1: "2",
        name2: "3",
        name3: "4",
        email: "12312312@163.com",
        pic:
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      },
      ruleForm2: {
        name: "1",
        name1: "2",
        name2: "3",
        name3: "4",
        email: "12312312@163.com",
        pic:
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      },
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
      testData: [
        {
          id: 0,
          type: "设备品牌",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系",
          edit: false
        },
        {
          id: 1,
          type: "设备型号",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系",
          edit: false
        }
      ],
      params: {
        currentPage: 0,
        deviceIdentifier: "",
        pageSize: 1,
        detailIdList: []
      },
      deviceModelList: [],
      api: api.queryOutputPage
    };
  },
  mounted() {
    this.finishOutputInfo();
  },
  methods: {
    finishOutputInfo() {
      api.finishOutputInfo({ outputId: 1 }).then(res => {
        this.deviceModelList = res.infoResponseVOList;
        this.ruleForm = res;
      });
    },
    onClick_getData($item) {
      this.params = {
        currentPage: 0,
        deviceIdentifier: $item.deviceId,
        pageSize: 1,
        detailIdList: $item.deviceIdentifierList
      };
    },
    handleSelect($index) {
      this.activeIndex = $index;
    },
    onClick_edit($item) {
      $item.edit = true;
    },
    onClick_okEdit($item) {
      $item.edit = false;
      console.log($item);
    },
    onClick_cancelEdit($item) {
      $item.edit = false;
    },
    getHeadClass() {
      return "background:#EFEFEF";
    }
  }
};
</script>

<style scoped>
.table_box {
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
  right: 0;
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
.left_box {
  width: 290px;
  height: 457px;
  background: rgba(255, 255, 255, 1);
  border-right: 1px solid #ebeef5;
  float: left;
}
.right_box {
  float: left;
  width: calc(100% - 290px - 48px);
  margin: 24px;
}
.device_list {
  margin-top: 20px;
  height: 392px;
  overflow: auto;
}
.device_item {
  width: 100%;
  height: 48px;
}
.device_name {
  width: 101px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  line-height: 48px;
  float: left;
  margin-left: 30px;
}
.device_num {
  width: 31px;
  height: 22px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  float: right;
  margin-right: 30px;
}
</style>
