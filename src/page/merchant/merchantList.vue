<template>
  <div>
    <div class="p_head">商户列表</div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table_box">
      <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="80"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          :params="params"
          :api-service="api"
          @selectionChange="selectionChange"
          @detail="go_detail"
          @openAgentManager="openAgentManager"
          @openMerchantManager="openMerchantManager"
      >
        <div slot="head" slot-scope="item">
          <span>{{ item.item.label }}</span>
          <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
            <div slot="content">
              <div>
                <span class="dot opened"></span>已开通
              </div>
              <div>
                <span class="dot review"></span>审核中
              </div>
              <div>
                <span class="dot reject"></span>驳回
              </div>
              <div>
                <span class="dot unused"></span>未审核
              </div>
            </div>
            <i class="el-icon-info" />
          </el-tooltip>
        </div>
      </BaseCrud>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_merchant";
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/merchantConfig";
import { FORM_CONFIG } from "./formConfig/merchantListSearch";

export default {
  name: "MerchantList",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380",
      searchConfig: FORM_CONFIG,
      configData: USER_CONFIG,
      testData: [],
      params: {},
      api: api.queryPageByCondition
    };
  },
  created() {
    this.params.beginDate = this.getDay(0);
    this.params.endDate = this.getDay(0);
  },
  mounted() {
    this.queryInit()
  },
  methods: {
    getDay(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    queryInit() {
      api.queryInit({
      }).then(res => {
        console.log(res.object)
      }).catch(err => {
        console.log(err)
      })
    },
    selectionChange($val) {
      console.log('11111', $val)
    },
    go_detail(row) {
      this.$router.push({
        name: "merchantDetail",
        query: {
          merchantNo: row.merchantNo
        }
      });
    },
    search($ruleForm) {
      if ($ruleForm.inputFormVal) {
        this.params = {
          [$ruleForm.inputForm]: $ruleForm.inputFormVal
        }
      } else {
        this.params = {
          beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
          endDate: $ruleForm.date ? $ruleForm.date[1] : null,
          provinceCode: $ruleForm.address ? $ruleForm.address[0] : null,
          cityCode: $ruleForm.address ? $ruleForm.address[1] : null,
          useChannelCode: $ruleForm.useChannelCode,
          channelStatus: $ruleForm.channelStatus,
          categoryCOde: $ruleForm.categoryCOde,
          operateNo: $ruleForm.operateNo
        };
      }
    },
    openAgentManager() {},
    openMerchantManager() {}
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #52c41a;
  vertical-align: middle;
  margin: 0 5px;
  &.opened {
    background-color: #52c41a;
  }
  &.review {
    background-color: #ffc620;
  }
  &.reject {
    background-color: #f5222d;
  }
  &.unused {
    background-color: #9c9c9c;
  }
}
</style>
