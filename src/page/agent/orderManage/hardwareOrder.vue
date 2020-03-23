<template>
  <div class>
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">硬件订购订单</span>
      </div>

      <transition name="fade">
        <div>
          <Search
            :form-base-data="searchConfig.formData"
            :open-height="searchMaxHeight"
            @search="search"
          />
          <div class="table_box">
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
              :row-key="'order'"
              :default-expand-all="false"
              :hide-edit-area="configData.hideEditArea"
              @detail="handleDetail"
            >
              <template v-slot="{ row }">
                <el-form label-position="left" inline class="demo-table-expand">
                  <div v-for="(item,index) in row.childrenData" :key="index" class="form-box">
                    <el-form-item :label="item.label+':'">
                      <span>{{ item.value }}</span>
                    </el-form-item>
                  </div>
                </el-form>
              </template>
            </BaseCrud>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/hardwareOrderSearch";
import { TABLE_CONFIG } from "../tableConfig/hardwareOrderConfig";

export default {
  name: "Theme",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      searchMaxHeight: "320",
      configData: TABLE_CONFIG,
      testData: [],
      isChangeMode: true
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleDetail() {
      this.$router.push({ path: "/agent/orderManage/hardwareOrder/detail" });
    },
    getTableData() {
      this.testData = [
        {
          order: "日常任务1",
          time: "商户结算失败",
          buyService: "提醒",
          contact: "XXXX店铺",
          status: "222.22",
          amount: "222.22",
          type: "222.22",
          childrenData: [
            {
              label: "微信刷脸-青蛙",
              value: "400台"
            },
            {
              label: "微信刷脸-青蛙",
              value: "400台"
            },
            {
              label: "微信刷脸-青蛙",
              value: "400台"
            }
          ]
        },
        {
          order: "日常任务",
          time: "商户结算失败",
          buyService: "提醒",
          contact: "XXXX店铺",
          status: "222.22",
          amount: "222.22",
          type: "222.22",
          childrenData: [
            {
              label: "微信刷脸-青蛙",
              value: "400台"
            },
            {
              label: "微信刷脸-青蛙",
              value: "400台"
            },
            {
              label: "微信刷脸-青蛙",
              value: "400台"
            }
          ]
        }
      ];
    },
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
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
