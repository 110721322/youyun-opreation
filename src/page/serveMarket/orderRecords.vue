<template>
  <div class="container">
    <div class="p_head">订购记录</div>
    <search
      :is-show-all="true"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-expand="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @detail="onClickDetail"
      >
        <template v-slot="{ row }">
          <el-form label-position="left" inline class="demo-table-expand">
            <div v-for="(item,index) in row.infoVOList" :key="index">
              <el-form-item :label="item.deviceModel + ':'">
                <span>{{ item.count+'台' }}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </BaseCrud>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { ORDER_RECORD_CONFIG } from "./tableConfig/orderRecordConfig";
import { ORDER_RECORD_SEARCH } from "./formConfig/orderRecordSearch";

export default {
  name: "OrderRecords",
  components: { search, BaseCrud },
  data() {
    return {
      searchConfig: ORDER_RECORD_SEARCH,
      configData: ORDER_RECORD_CONFIG,
      testData: [],
      rankListData: [],
      params: {},
      fromConfigData: {},
      drawer: false,
      formStatus: "",
      api: api.queryOrderList
    };
  },
  created() {
    this.params = {
      agentNo: this.$store.state.admin.userInfo.number,
      beginTime: this.$g.utils.getToday(-6),
      endTime: this.$g.utils.getToday(0)
    }
  },
  mounted() {
  },
  methods: {
    onClickDetail($row) {
      this.$router.push({
        name: 'equimentOrderDetail',
        query: {
          id: $row.id
        }
      });
    },

    search($ruleForm) {
      this.params = {
        agentNo: this.$store.state.admin.userInfo.number,
        buyerName: $ruleForm.buyerName,
        buyerPhone: $ruleForm.buyerPhone,
        outputNo: $ruleForm.outputNo,
        status: $ruleForm.status,
        beginTime: $ruleForm.data[0] ? $ruleForm.data[0] : this.$g.utils.getToday(-6),
        endTime: $ruleForm.data[0] ? $ruleForm.data[1] : this.$g.utils.getToday(0)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .p_head {
    margin-bottom: 24px;
  }

  .container {
    padding: 0 0;
  }

  .table-box {
    margin-top: 24px;
    padding: 24px;
    overflow: hidden;
    background: #fff;
  }
</style>
