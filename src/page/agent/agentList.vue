<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1 || this.$route.path.indexOf('/addAgent') !== -1" />
    <div v-else>
      <div class="p_head">服务商列表</div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />

      <!-- <data-mode></data-mode> -->
      <div class="table_box">
        <div class="two-btn">
          <el-button @click="transfer">批量转移运营</el-button>
          <el-button @click="onClick_addServe" type="primary">添加服务商</el-button>
        </div>
        <div class="select_data">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
          <el-button class="btn" type="text">清空</el-button>
        </div>
        <BaseCrud
          ref="child"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :params="params"
          :api-service="api"
          @selectionChange="selectionChange"
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @goMerchantList="goMerchantList"
          @completion="onCompletion"
        />
      </div>
    </div>
  </div>
</template>
<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentConfig";
import { FORM_CONFIG } from "./formConfig/agentListSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "380",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      selectData: [],
      params: {},
      api: api.agentList
    };
  },
  created() {},
  mounted() {},
  methods: {
    transfer() {
      if (this.selectData.length) {
        this.$confirm("是否批量转移运营？", "转移运营", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
          .then(() => {
            api
              .transferOperate({
                agentNos: [],
                operateUserNo: ""
              })
              .then(res => {
                this.$message({
                  type: "info",
                  message: "转移成功"
                });
              });
          })
          .catch(() => {});
      } else {
        this.$message({
          type: "info",
          message: "请选择代理商"
        });
      }
    },
    selectionChange($val) {
      this.selectData = $val;
    },
    search($form) {
      this.params = {
        agentGrade: $form.agentGrade,
        activeDateStart: $form.date[0],
        activeDateEnd: $form.date[1],
        agentNo: $form.agentNo,
        agentName: $form.agentName,
        status: $form.status,
        labelId: $form.labelId,
        regionCode: $form.regionCode,
        operateUserNo: $form.operateUserNo
      };
      if ($form.area) {
        this.params.provinceCode = $form.area[0];
        this.params.cityCode = $form.area[1];
        this.params.areaCode = $form.area[2];
      }
      this.params[$form.inputSelect] = $form.inputForm;
    },
    openDetail($row) {
      console.log($row)
      this.$router.push({
        path: "/agent/list/detail",
        query: {
          agentNo: $row.agentNo
        }
      });
    },
    thaw(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .unfrozen({
              agentNo: row.agentNo
            })
            .then(res => {
              this.$message({
                type: "info",
                message: "已解冻"
              });
            });
        })
        .catch(() => {});
    },
    frozen(row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      })
        .then(res => {
          api
            .frozen({
              agentNo: row.agentNo
            })
            .then(res => {
              this.$message({
                type: "info",
                message: "已冻结"
              });
              this.$refs.child.getData()
            });
        })
        .catch(() => {});
    },
    openAgentManager() {},
    goMerchantList() {
      this.$router.push({
        path: "/merchant/list"
      });
    },
    onClick_addServe() {
      this.$router.push({
        path: "/agent/list/addAgent"
      })
    },
    onCompletion() {}
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
.two-btn {
  display: flex;
  justify-content: space-between;
}
.select_data {
  width: 100%;
  height: 40px;
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(186, 231, 255, 1);
  line-height: 40px;
  margin: 16px 0;
  .icon {
    color: rgba(24, 144, 255, 1);
    margin: 0 8px 0 16px;
  }

  .blue {
    color: rgba(24, 144, 255, 1);
  }

  .btn {
    margin-left: 16px;
    font-size: 14px;
  }
}
</style>
