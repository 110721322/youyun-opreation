<template>
  <div class>
    <router-view
      v-if="this.$route.path.indexOf('/detail') !== -1||this.$route.path.indexOf('/recordDetail') !== -1"
    />
    <div v-else>
      <div class="tab_head">
        <span class="title">商户间连审核</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="150"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
          @preApprove="handlePreApprove"
          @record="handleRecord"
        >
          <div slot="head" slot-scope="item">
            <span>{{ item.item.label }}</span>
            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
              <div slot="content">
                <div><span class="dot opened"></span>已开通</div>
                <div><span class="dot review"></span>审核中</div>
                <div><span class="dot reject"></span>驳回</div>
                <div><span class="dot unused"></span>未审核</div>
              </div>
              <i class="el-icon-info" />
            </el-tooltip>
          </div>
        </BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../formConfig/indirectListSearch";
import { INDIRECTLIST_CONFIG } from "./../tableConfig/indirectListConfig";

export default {
  name: "IndirectList",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: INDIRECTLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "320"
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleDetail() {
      this.$router.push({
        path: "/approval/checkMerchant/indirectList/detail"
      });
    },
    handlePreApprove() {
      this.$router.push({
        path: "/approval/checkMerchant/indirectList/detail"
      });
    },
    handleRecord() {
      this.$router.push({
        path: "/approval/checkMerchant/indirectList/recordDetail"
      });
    },
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {
      this.testData = [
        {
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          serviceName: "紫菜网络科技有限公司,ID: 13293127119831938",
          statusList: [
            { name: "乐刷", status: "opened" },
            { name: "乐刷", status: "review" },
            { name: "乐刷", status: "reject" },
            { name: "乐刷", status: "unused" }
          ],
          time: "2014-02-15 16:00:23",
          showDetail: true
        },
        {
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          serviceName: "紫菜网络科技有限公司,ID: 13293127119831938",
          statusList: [
            { name: "乐刷", status: "opened" },
            { name: "乐刷", status: "review" },
            { name: "乐刷", status: "reject" },
            { name: "乐刷", status: "unused" }
          ],
          time: "2014-02-15 16:00:23",
          showPreApprove: true
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
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
