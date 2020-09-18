<template>
  <div>
    <div class="tab_head">
      <span class="title">商户入件资料风控</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">商户入件资料列表</div>
        <el-button class="btn" @click="onClick_goBlackDetail">黑名单拦截记录</el-button>
        <el-button class="btn" type="primary" @click="onClick_addRiskMessage">新增风控信息</el-button>
      </div>
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="200"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @remove="onClick_remove"
        @movetoBlack="onClick_moveBlack"
        @movetoGrey="onClick_moveGrey"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :foot-btn-label="'确定'"
        label-width="130px"
        @cancel="onClick_cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { SEARCH_CONFIG } from "../formConfig/merchantDataIncomingSearch";
import { FORM_CONFIG } from "../formConfig/merchantDataIncomingFormConfig";
import { TABLE_CONFIG } from "../tableConfig/merchantDataIncomingConfig";

export default {
  name: "MerchantDataIncomingRisk",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      selectData: [],
      params: {},
      api: api.merchantBanListQueryByPage
    };
  },
  mounted() {},
  methods: {
    selectionChange($val) {
      this.selectData = $val;
    },
    onClick_reset() {
      this.input = "";
      this.select = "";
    },
    search($ruleForm) {
      const params = {
        operateUserNo: $ruleForm.operateUserNo,
        beginDate: $ruleForm.date[0],
        endDate: $ruleForm.date[1],
        type: $ruleForm.type
      }
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    onClick_remove(row) {
      this.$confirm("确定将该商户移出黑(灰)名单吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.deleteById({
          id: row.id
        }).then(res => {
          this.$message({
            message: '移出成功',
            type: 'success'
          })
          this.$refs.table.getData()
        }).catch(err => {
          this.$message(err);
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    onClick_moveBlack(row) {
      this.$confirm("该信息进入黑名单后，代理商入件时将被拦截。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateOfBlack({
          id: row.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '移入成功',
              type: 'success'
            })
          }
          this.$refs.table.getData()
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'info'
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
    },
    onClick_moveGrey(row) {
      this.$confirm("该信息进入灰名单后，商户的预审核资料将红字提示", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateOfGray({
          id: row.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '移入成功',
              type: 'success'
            })
          }
          this.$refs.table.getData()
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'info'
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
    },
    onClick_goBlackDetail() {
      this.$router.push({
        name: "blackListDetail"
      });
    },
    confirm($data) {
      if (!$data.banField || !$data.content || !$data.type) {
        this.$message({
          message: '请填写必填信息',
          type: 'info'
        })
        return false
      } else {
        api.merchantBanListAdd({
          banField: $data["banField"],
          content: $data["content"],
          type: $data["type"]
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.drawer = false
            this.$refs.table.getData()
          }
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'info'
          });
        });
      }
    },
    onClick_cancel() {
      this.drawer = false;
    },
    onClick_addRiskMessage() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.riskMessage;
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
.tabale_title_box {
  height: 52px;
  width: 100%;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
    // line-height: 52px;
  }
  .btn {
    float: right;
    &.btn {
      margin-left: 10px;
    }
  }
}
</style>
