<template>
  <div class="m-page">
    <div class="m-title">
      <span class="m-left">商户详情</span>
      <div class="m-right">
        <span @click="clickModify">修改</span>
        <span>|</span>
        <span @click="clickResetPassword">密码重置</span>
      </div>
    </div>
    <div class="m-detail">
      <yun-detail-mode
          :rule-form="ruleForm"
          :filed-config-list="configData"
          theme="border"
          module-title="商户信息"
      >
        <template slot="status" slot-scope="scope">
          <div
              class="flex-row flex-align-center f-fc-theme"
              :class="ruleForm[scope.item.key] ? 'f-fc-fail' : 'f-fc-theme'">
            {{ statusDesc }}
            <el-switch v-model="ruleForm[scope.item.key]" :active-value="0" :inactive-value="1" @change="changeSwitch"></el-switch>
          </div>
        </template>
      </yun-detail-mode>
    </div>
    <div class="profit-data">
      <!--数据统计开始-->
      <el-row>
        <el-col :span="item.span" v-for="(item, index) in infoList" :key="index">
          <yun-card-first
            :style="item.style"
            :label="item.label"
            :icon="item.icon"
            :icon-style="item.iconStyle"
            :tooltip="item.tooltip"
            :value="item.value"
            :children="item.children"
          >
          </yun-card-first>
        </el-col>
      </el-row>
    </div>
    <yun-search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">门店列表</div>
      </div>
      <div class="basecrud-box">
        <yun-table
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-select="false"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :grid-data="testData"
            :params="params"
            :api-service="api"
            @details="onClickDetails"
            @goMerchant="onClickGoMerchant"
        ></yun-table>
      </div>
    </div>
    <yun-dialog
        :title="title"
        :dialoger="drawer"
        width="488px"
        @cancel="drawer = false"
        @confirm="clickSubmit"
    >
      <div class="dialog-form" slot="body">
        <yun-form
            v-if="drawer"
            ref="formInfo"
            :form-base-data="fromConfigData"
            :show-foot-btn="fromConfigData.showFootBtn === false"
            label-width="130px"
        ></yun-form>
      </div>
    </yun-dialog>
  </div>
</template>

<script>
  import api from "@/api/api_merchantManage.js";
  import { LIST_CONFIG } from "./TableConfig/MerchantListConfig"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/MerchantDetailSearch"
  import { FORM_CONFIG } from "./FormConfig/MerchantDetailConfig"
  import { MERCHANT_DETAIL_CONFIG, MERCHANT_DETAIL_STATIC } from "./TableConfig/MerchantDetailConfig"
  export default {
    name: "MerchantDetail",
    data() {
      return {
        ruleForm: {},
        testData: [],
        title: '',
        drawerType: '',
        params: {
          merchantNo: this.$route.query.merchantNo
        },
        api: api.shopByPage,
        drawer: false,
        openType: '',
        fromConfigData: {},
        id: this.$route.query.id,
        merchantNo: this.$route.query.merchantNo,
        searchConfig: SEARCH_FORM_CONFIG,
        configData: LIST_CONFIG.configData,
        gridConfig: MERCHANT_DETAIL_CONFIG.gridConfig,
        gridBtnConfig: MERCHANT_DETAIL_CONFIG.gridBtnConfig,
        infoList: []
      }
    },
    computed: {
      statusDesc() {
        if (this.ruleForm.isDisabled) {
          return '禁用'
        } else {
          return '启用'
        }
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(MERCHANT_DETAIL_STATIC)
      this.getMerchantDetail(this.merchantNo)
      this.getMerchantStatic(this.merchantNo)
    },
    methods: {
      getMerchantDetail(merchantNo) {
        api.getDetailByMerchantNo({
          merchantNo: merchantNo
        }).then(res => {
          if (res.status === 0) {
            this.ruleForm = res.data
          }
        })
      },
      getMerchantStatic(merchantNo) {
        api.merchantDetailStatic({
          merchantNo: merchantNo
        }).then(res => {
          console.log(res)
          if (res.status === 0) {
            this.infoList[0].label = '实收总额（' + res.data.realTotalCount + '）笔'
            this.infoList[0].value = '¥' + res.data.realTotalAmount
            this.infoList[0].children[0].label = '今日订单金额（' + res.data.yesterdayRealAmount + '）笔'
            this.infoList[0].children[0].value = '¥' + res.data.yesterdayRealAmount
            this.infoList[1].label = '退款总额（' + res.data.refundTotalAmount + '）笔'
            this.infoList[1].value = '¥' + res.data.realTotalAmoun
            this.infoList[1].children[0].label = '今日订单金额（' + res.data.refundTotalCount + '）笔'
            this.infoList[1].children[0].value = '¥' + res.data.refundTotalAmount
            this.infoList[2].value = res.data.shopCount
            this.infoList[2].children[0].value = res.data.yesterdayActiveShopCount
            this.infoList[2].children[1].value = res.data.auditShopCount
            this.infoList[3].value = res.data.deviceNum
            this.infoList[3].children[0].value = res.data.yesterdayActiveDeviceNum
            this.infoList[3].children[1].value = res.data.unBindDeviceNum
          }
        })
      },
      onClickSearch($ruleForm) {
        this.params = {
          merchantNo: this.merchantNo,
          shopNo: $ruleForm.shopNo ? $ruleForm.shopNo : null,
          shopName: $ruleForm.shopName ? $ruleForm.shopName : null,
          isDisabled: $ruleForm.isDisabled,
          status: $ruleForm.status ? $ruleForm.status : null,
          phone: $ruleForm.phone ? $ruleForm.phone : null
        }
      },
      
      // 重置登录密码
      clickResetPassword() {
        this.title = '重置登录密码'
        this.drawer = true
        this.drawerType = 'resetPassword'
        this.fromConfigData = FORM_CONFIG.resetPassword.formData
      },
      
      // 修改商户状态
      changeSwitch(val) {
        api.disabeldMerchant({
          merchantNo: this.merchantNo,
          isDisabled: val
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: val === 0? '启用成功' : '禁用成功',
              type: 'success'
            })
            this.getMerchantDetail(this.merchantNo)
          }
        })
      },

      clickModify() {
        this.title = '修改信息'
        this.openType = 'changeName'
        this.drawer = true
        this.fromConfigData = FORM_CONFIG.shopInfo.formData
        this.fromConfigData[0].initVal = this.ruleForm.merchantName
      },
      
      onClickDetails(row) {
        this.$router.push({
          name: 'shopDetail',
          query: {
            shopNo: row.shopNo
          }
        }).catch(() => {})
      },
      onClickGoMerchant(row) {},
      clickSubmit() {
        this.$refs['formInfo'].$children[0].validate((valid) => {
          if (valid) {
            const infoData = this.$refs['formInfo'].ruleForm
            infoData.merchantNo = this.merchantNo
            const type = this.openType
            switch(type) {
              case "resetPassword":
                api.resetPassword({
                  merchantNo: this.merchantNo,
                  id: this.id
                }).then(res => {
                  if (res.status === 0) {
                    this.$message({
                      message: '重置成功',
                      type: 'success'
                    })
                    this.drawer = false
                  }
                })
                break;
              case "changeName":
                infoData.system = 'operation '
                api.updateMerchantInfo(infoData).then(res => {
                  if (res.status === 0) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    })
                    this.drawer = false
                    this.getMerchantDetail(this.merchantNo)
                  }
                })
                break;
            }
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .m-title {
      display: flex;
      justify-content: space-between;
      margin: 24px 24px 0 24px;
      padding: 0 24px;
      background: #fff;
      line-height: 54px;
      border-bottom: 1px solid #DCDFE6;
      .m-left {
        font-size: 16px;
        color: #000;
      }
      .m-right {
        color: #1989FA;
        font-size: 14px;
        cursor: pointer;
        span:nth-child(2) {
          width: 1px;
          height: 16px;
          color: #d7d8cd;
          padding: 0 16px;
        }
      }
    }
    .m-detail {
      margin: 0 24px;
      padding: 24px 24px;
      background: #fff;
    }
    .profit-data {
      margin: 24px 0 0 24px;
    }
    .m-data {
      width: 100%;
      height: 100px;
      background: #fff;
      margin-bottom: 24px;
    }
    .m-basecrud {
      padding: 24px 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 24px;
        background: #fff;
      }
      .basecrud-box {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
  .dialog-form {
    padding-top: 24px;
  }
  /deep/ .g-search-container {
    margin: 0 24px;
  }
  /deep/ .el-switch {
    margin-left: 4px;
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
</style>
