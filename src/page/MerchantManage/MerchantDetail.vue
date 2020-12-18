<template>
  <div class="m-page">
    <DetailMode :rule-form="ruleForm" :config-data="configData"></DetailMode>
    <Search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">门店列表</div>
      </div>
      <div class="basecrud-box">
        <BaseCrud
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
        ></BaseCrud>
      </div>
    </div>
    <el-dialog
        :title="title"
        :visible.sync="drawer"
        width="488px"
    >
      <Form
          v-if="drawer"
          ref="formInfo"
          :form-base-data="fromConfigData"
          :show-foot-btn="fromConfigData.showFootBtn === false"
          label-width="130px"
      ></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="clickSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from "@/api/api_agentManage.js";
  import { LIST_CONFIG } from "./TableConfig/MerchantListConfig"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/MerchantDetailSearch"
  import { FORM_CONFIG } from "./FormConfig/MerchantDetailConfig"
  import { MERCHANT_DETAIL_CONFIG } from "./TableConfig/MerchantDetailConfig"
  export default {
    name: "MerchantDetail",
    data() {
      return {
        ruleForm: {},
        testData: [],
        title: '',
        params: {},
        api: '',
        drawer: false,
        openType: '',
        fromConfigData: {},
        id: this.$route.query.id,
        merchantNo: this.$route.query.merchantNo,
        searchConfig: SEARCH_FORM_CONFIG,
        configData: LIST_CONFIG.configData,
        gridConfig: MERCHANT_DETAIL_CONFIG.gridConfig,
        gridBtnConfig: MERCHANT_DETAIL_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.testData = [
        {
          shopNo: 146,
          shopName: '元芳的奶茶店',
          merchantCategory: '便民类',
          phone: '13214784568',
          address: '浙大森林小马哥',
          disabled: 0,
          status: 0
        },
        {
          shopNo: 146,
          shopName: '元芳的奶茶店',
          merchantCategory: '便民类',
          phone: '13214784568',
          address: '浙大森林小马哥',
          disabled: 1,
          status: 1
        }
      ]
      this.getMerchantDetail(this.merchantNo)
    },
    methods: {
      getMerchantDetail(merchantNo) {
        api.getDetailByMerchantNo({
          merchantNo: merchantNo
        }).then(res => {
          if (res.status === 0) {
            if (res.data.disabled === 0) {
              res.data.disabledSn = '禁用'
            } else if (res.data.disabled === 1) {
              res.data.disabledSn = '启用'
            }
            this.ruleForm = res.data
          }
        })
      },
      onClickSearch($ruleForm) {
        this.params = {
          shopNo: $ruleForm.shopNo ? $ruleForm.shopNo : null,
          shopName: $ruleForm.shopName ? $ruleForm.shopName : null,
          disabled: $ruleForm.disabled ? $ruleForm.disabled : null,
          status: $ruleForm.status ? $ruleForm.status : null,
          phone: $ruleForm.phone ? $ruleForm.phone : null
        }
      },
      onClickDetails(row) {},
      onClickGoMerchant(row) {},
      clickSubmit() {
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
            api.updateMerchantInfo({
              merchantName: '111'
            }).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.drawer = false
              }
            })
            break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
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
  /deep/ .tab-color {
    color: #1989FA;
  }
  /deep/ .tab-reject {
    color: #F5222D;
  }
</style>
