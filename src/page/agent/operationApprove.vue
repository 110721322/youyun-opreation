<template>
  <div>
    <div class="tab-head">
      <span class="title">运营结算审核</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
      <div class="tabale-title-box">
        <div class="title">运营结算列表</div>
        <el-button class="btn" type="primary" @click="clickAddBlackList">新增入件黑名单</el-button>
      </div>
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="200"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        :header-cell-style="headerCellStyle"
        @detail="onClickDetail"
        @reject="onClickReject"
        @adopt="onClickAdopt"
        @reviewing="onClickReviewing"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <div v-if="fromConfigData.processData" class="process-box">
        <template v-for="(item,index) in fromConfigData.processData">
          <div :key="index" class="process-item">
            <div>
              <img class="process-icon" :src="item.icon" />
            </div>
            <div class="label">
              {{ item.label }}
              <span v-if="item.name" class="name">{{ item.name }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
          <img
            v-if="!(index===fromConfigData.processData.length-1)"
            :key="'img'+index"
            :src="arrow"
            class="arrow-img"
          />
        </template>
      </div>
      <elForm v-if="fromConfigData.settlementData" class="formTemplate" :label-width="'130px'">
        <el-form-item :label="fromConfigData.settlementData.label+':'" class="formTemplate-item">
          <div
            v-for="(item,index) in fromConfigData.settlementData.initValArray"
            :key="index"
            class="ellipsis"
          >{{ item }}</div>
        </el-form-item>
      </elForm>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        :foot-btn-label="fromConfigData.footBtnLabel"
        @cancel="clickCancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import arrowImg from "@/assets/img/arrow.png";
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "./formConfig/operationApproveForm";
import { SEARCH_CONFIG } from "./formConfig/operationApproveSearch";
import { OPERATIONAPPROVE_CONFIG } from "./tableConfig/operationApproveConfig";

export default {
  name: "OperationApprove",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260", // 搜索项展开高度
      searchConfig: SEARCH_CONFIG, // 搜索项的参数
      configData: OPERATIONAPPROVE_CONFIG, // 列表展示参数
      fromConfigData: {},
      drawer: false,
      arrow: arrowImg
    };
  },
  mounted() {
  },
  methods: {
    search($form) {
      this.params = {
        [$form.search]: $form.searchVal
      }
    },

    // 点击进入详情页面
    onClickDetail() {
      this.$router.push({ name: "dividedOverview" });
    },

    // 点击拒绝
    onClickReject() {
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },

    // 点击审核通过
    onClickAdopt() {
      this.fromConfigData = FORM_CONFIG.rejectData2;
      this.drawer = true;
    },

    // 审批中
    onClickReviewing() {
      this.$alert("任务已处理，审批中", "提示信息", {
        confirmButtonText: "确定"
      });
    },
    clickCancel() {
      this.drawer = false;
    },
    clickAddBlackList() {}
  }
};
</script>

<style lang="scss" scoped>
.process-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  overflow: hidden;

  .process-item {
    width: 120px;
    text-align: center;

    .process-icon {
      height: 44px;
      width: 44px;
      border-radius: 50%;
    }

    .label {
      font-size: 14px;
      font-weight: 400;
      color: #333335;
      line-height: 22px;
    }

    .name {
      color: #8c8c8c;
    }

    .time {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 12px;
    }
  }

  .arrow-img {
    width: 75px;
    height: 9px;
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.formTemplate {
  margin: 20px 20px 0;
}

.formTemplate-item {
  margin-right: 20px;
}
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
}

.form-box {
  display: flex;
  justify-content: space-between;
}

.tabale-title-box {
  height: 52px;
  width: 100%;

  .title {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
  }

  .btn {
    float: right;
  }
}
</style>
