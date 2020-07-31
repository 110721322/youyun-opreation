<template>
  <div class>
    <div class="tab_head">
      <span class="title">服务商入件风控</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">服务商列表</div>
        <el-button class="btn" type="primary" @click="onClick_addBlackList">新增入件黑名单</el-button>
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
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <div class="search-box">
        <span class="label">精准筛选:</span>
        <el-input v-model="input" placeholder="请输入内容" class="input-with-select" size="40%">
          <el-select slot="prepend" v-model="select" style="width:130px" placeholder="请选择">
            <el-option label="服务商名称" value="1"></el-option>
            <el-option label="服务商ID" value="2"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="search-btn">
        <el-button type="primary" size="medium" @click="onClick_search">搜索</el-button>
        <el-button size="medium" @click="onClick_reset">重置</el-button>
      </div>
      <div class="form-box">
        <div class="select_data">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
          <el-button class="btn" type="text">清空</el-button>
        </div>
        <BaseCrud
          :grid-config="configData2.gridConfig"
          :grid-btn-config="configData2.gridBtnConfig"
          :grid-data="testData2"
          :form-config="configData2.formConfig"
          :form-data="configData2.formModel"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :hide-edit-area="true"
          @selectionChange="selectionChange"
        />
      </div>
      <div class="oper-box">
        <el-button type="primary" size="medium" @click="onClick_confirm">确定</el-button>
        <el-button size="medium" @click="onClick_cancel">关闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/serviceIncomingSearch";
import { SERVICEINCOMING_CONFIG } from "../tableConfig/serviceIncomingConfig";
import { FORM_CONFIG } from "../formConfig/serviceIncomingForm";

export default {
  name: "Theme",
  components: { Search, BaseCrud },
  data() {
    return {
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: SERVICEINCOMING_CONFIG,
      configData2: FORM_CONFIG,
      input: "",
      select: "",
      fromConfigData: {
        title: "新增入件黑名单服务商"
      },
      testData: [],
      testData2: [],
      drawer: false,
      direction: "rtl",
      selectData: [],
      params: {},
      api: api.agentBanListQueryByPage
    };
  },
  mounted() {
  },
  methods: {
    selectionChange($val) {
      this.selectData = $val;
    },
    onClick_reset() {
      this.input = "";
      this.select = "";
    },
    onClick_search() {},
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        contractStatus: $ruleForm.operateUserNo
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    onClick_remove() {
      this.$confirm("确定将该服务商移出黑名单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .deleteByAgentNo({
              agentNo: ""
            })
            .then(res => {
              this.$message("移出成功");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onClick_confirm() {
      this.drawer = false;
      api
        .agentBanListAdd({
          agentNos: [
            {
              agentNo: ""
            }
          ]
        })
        .then(res => {
          this.$message("添加成功");
        })
        .catch(err => {
          this.$message(err);
        });
    },
    onClick_cancel() {
      this.drawer = false;
    },
    onClick_addBlackList() {
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.oper-box {
  text-align: center;
  position: absolute;
  bottom: 28px;
  width: 100%;
  border-top: 1px solid #ebeef5;
  padding-top: 30px;
  .el-button {
    padding: 10px 35px;
  }
}
.form-box {
  padding: 0 24px;
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
.search-box {
  display: flex;
  align-items: center;
  padding: 24px;
  .label {
    width: 100px;
  }
}
.search-btn {
  text-align: right;
  padding: 0 24px;
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
  }
}
</style>
