<template>
  <div>
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

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
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
        <!-- <div class="select_data">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
                 <el-button class="btn" type="text">清空</el-button>
        </div> -->
        <BaseCrud
          ref="agentTable"
          :params="params1"
          :grid-config="configData2.gridConfig"
          :grid-btn-config="configData2.gridBtnConfig"
          :grid-data="testData2"
          :form-config="configData2.formConfig"
          :form-data="configData2.formModel"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :hide-edit-area="true"
          :api-service="agentApi"
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
import agentApi from "@/api/api_agent"
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/serviceIncomingSearch";
import { SERVICEINCOMING_CONFIG } from "../tableConfig/serviceIncomingConfig";
import { FORM_CONFIG } from "../formConfig/serviceIncomingForm";

export default {
  name: "ServiceIncomingRisk",
  components: { Search, BaseCrud },
  data() {
    return {
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: SERVICEINCOMING_CONFIG,
      configData2: FORM_CONFIG,
      input: "",
      select: "1",
      fromConfigData: {
        title: "新增入件黑名单服务商"
      },
      testData: [],
      testData2: [],
      drawer: false,
      selectData: [],
      params: {},
      params1: {},
      api: api.agentBanListQueryByPage,
      agentApi: agentApi.agentList
    };
  },
  mounted() {
  },
  methods: {
    selectionChange($val) {
      this.selectData = []
      const selectValue = []
      $val.forEach(v => {
        selectValue.push(v.agentNo)
      })
      this.selectData = selectValue
    },
    onClick_reset() {
      this.input = "";
      this.select = "";
    },
    onClick_search() {
      if (!this.select) {
        this.params1 = {}
      }
      if (this.select === '1') {
        this.params1 = {
          agentName: this.input
        }
      } else {
        this.params1 = {
          agentNo: this.input
        }
      }
    },
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        operateUserNo: $ruleForm.operateUserNo
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    onClick_remove(row) {
      this.$confirm("确定将该服务商移出黑名单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.deleteByAgentNo({
          agentNo: row.agentNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$refs.table.getData()
          } else {
            this.$message({
              message: res.errorMessage,
              type: 'info'
            })
          }
        }).catch(err => {
          this.$message({
            type: "info",
            message: err.errorMessage
          });
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      })
    },
    onClick_confirm() {
      if (this.selectData.length === 0) {
        this.$message({
          message: '请选择服务商',
          type: 'info'
        })
        return false
      } else {
        console.log(this.selectData)
        api.agentBanListAdd({
          agentNos: this.selectData
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.drawer = false
            this.selectData = []
            this.params = {}
            this.$refs.table.getData()
          }
        })
      }
    },
    onClick_cancel() {
      this.drawer = false;
      this.$refs['agentTable'].$children[0].clearSelection()
    },
    onClick_addBlackList() {
      this.select = "1"
      this.input = ""
      this.params1 = {
        agentName: "",
        agentNo: ""
      }
      if (this.$refs['agentTable']) {
        this.$refs['agentTable'].$children[0].clearSelection()
      }
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-with-select{
  width: auto;
}
.oper-box {
  text-align: center;
  // position: absolute;
  // bottom: 28px;
  margin-top: 24px;
  width: 100%;
  border-top: 1px solid #ebeef5;
  padding: 24px 0;
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
