<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <router-view v-else-if="this.$route.path.indexOf('/indent') !== -1" />
    <div v-else>
      <div class="p_head" style="margin-bottom: 24px;">订购记录</div>
      <search
              class="searchForm"
              :is-show-all="true"
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
                :grid-edit-width="300"
                form-title="用户"
                :is-async="true"
                :is-expand="true"
                :is-select="false"
                :params="params"
                :api-service="api"
                @detail="handel_detail"
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
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { ORDER_RECORD_CONFIG } from "./tableConfig/orderRecordConfig";
import { ORDER_RECORD_SEARCH } from "./formConfig/orderRecordSearch";

export default {
  name: "AdvertisingPutin",
  components: { search, BaseCrud },
  data() {
    return {
      searchConfig: ORDER_RECORD_SEARCH,
      configData: ORDER_RECORD_CONFIG,
      testData: [],
      rankListData: [],
      params: {
        agentNo: localStorage.getItem('agentNo'),
        currentPage: 0,
        pageSize: 10,
        beginTime: this.$g.utils.getToday(),
        endTime: this.$g.utils.getToday()
      },
      fromConfigData: {},
      drawer: false,
      formStatus: "",
      api: api.queryOrderList
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    handel_detail($row) {
      this.$router.push({
        path: '/serveMarket/equipmentMall/equimentOrderDetail',
        query: {
          id: $row.id
        }
      });
    },
    search($ruleForm) {
      const params = {
        agentNo: localStorage.getItem('agentNo'),
        buyerName: $ruleForm.buyerName,
        buyerPhone: $ruleForm.buyerPhone,
        outputNo: $ruleForm.outputNo,
        status: $ruleForm.status,
        beginTime: $ruleForm.data[0],
        endTime: $ruleForm.data[1]
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    }
  }
};
</script>

<style lang="scss" scoped>
  .main_page {
    padding: 0 0;
  }
  .data-item {
    // margin: 0;
    width: 63%;
    flex-grow: 1;
  }
  .data-item2 {
    // margin: 0;
    width: 30%;
    margin-left: 24px;
    flex-grow: 1;
  }
  .searchForm {
    padding: 0 0 !important;
  }
  .s_box {
    margin: 0 0;
  }
  .table_box {
    margin-top: 24px;
    padding: 24px;
    overflow: hidden;
    background: #fff;
  }
  .add_btn {
    float: right;
    width: 109px;
    height: 32px;
  }
</style>
