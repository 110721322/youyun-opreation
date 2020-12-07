<template>
  <div>
    <div class="tab-head">
      <span class="title">硬件订购订单</span>
    </div>

    <transition name="fade">
      <div>
        <Search
            :form-base-data="searchConfig.formData"
            :open-height="searchMaxHeight"
            @search="search"
        />
        <div class="table-box">
          <BaseCrud
              :grid-config="configData.gridConfig"
              :grid-btn-config="configData.gridBtnConfig"
              :grid-data="testData"
              :form-config="configData.formConfig"
              :form-data="configData.formModel"
              :grid-edit-width="100"
              :is-async="true"
              :is-select="false"
              :is-expand="true"
              :row-key="index"
              :default-expand-all="false"
              :hide-edit-area="configData.hideEditArea"
              :params="params"
              :api-service="api"
              @detail="handleDetail"
          >
            <template v-slot="{ row }">
              <el-form label-position="left" inline class="demo-table-expand">
                <div v-for="(item,index) in row.infoVOList" :key="index" class="form-box">
                  <el-form-item :label="item.deviceModel+':'">
                    <span>{{ item.count }}台</span>
                  </el-form-item>
                </div>
              </el-form>
            </template>
          </BaseCrud>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/hardwareOrderSearch";
import { TABLE_CONFIG } from "../tableConfig/hardwareOrderConfig";
import api from "@/api/api_agent.js";
export default {
  name: "HardwareOrder",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      searchMaxHeight: "320",
      configData: TABLE_CONFIG,
      testData: [],
      isChangeMode: true,
      params: {
        agentNo: null,
        outputNo: null,
        outputType: null,
        status: null,
        beginTime: this.$g.utils.getNowFormatDate() + ' ' + '00' + ':' + '00' + ':' + '00',
        endTime: this.$g.utils.getNowFormatDate() + ' ' + '23' + ':' + '59' + ':' + '59'
      },
      api: api.hardwarePageOrder
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    handleDetail($row) {
      this.$router.push({
        name: "hardwareOrderDetail",
        query: {
          id: $row.id
        }
      });
    },
    search($ruleForm) {
      this.params = {
        agentNo: $ruleForm.agentNo ? $ruleForm.agentNo : null,
        outputNo: $ruleForm.outputNo ? $ruleForm.outputNo : null,
        outputType: $ruleForm.outputType,
        status: $ruleForm.status,
        beginTime: $ruleForm.date ? $ruleForm.date[0] : this.$g.utils.getNowFormatDate() + ' 00:00:00',
        endTime: $ruleForm.date ? $ruleForm.date[1] : this.$g.utils.getNowFormatDate() + ' 23:59:59',
        [$ruleForm.search]: $ruleForm.searchVal
      };
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
</style>
