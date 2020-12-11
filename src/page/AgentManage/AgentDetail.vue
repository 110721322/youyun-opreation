<template>
  <div class="m-page">
    <DetailMode :rule-form="ruleForm" :config-data="configData" @edit="editInfo" @editIcon="editOther"></DetailMode>
    <div class="m-box"></div>
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-basecrud-left">沟通记录</div>
        <el-button type="primary" @click="clickAddTalk">添加沟通记录</el-button>
      </div>
      <div class="m-table">
        <BaseCrud
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :params="params"
            :api-service="api"
        ></BaseCrud>
      </div>
    </div>
    <el-dialog
        :title="title"
        :visible.sync="drawer"
        width="488px"
    >
      <Form
          v-if="drawer"
          ref="formInfo"
          :form-base-data="fromConfigData"
          :show-foot-btn="fromConfigData.showFootBtn === false"
          label-width="130px"
      ></Form>
      <BaseCrud
          v-if="drawerBase"
          ref="table"
          :grid-config="agentConfig"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="true"
          :is-data-select="false"
          :is-table-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="false"
          :grid-data="testData"
          :params="params"
          :api-service="api"
          @selectionChange="selectionChange"
      ></BaseCrud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="clickSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Form from "@/components/form/index.vue";
  import DetailMode from "@/components/detailMode/detailMode4.vue";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import { AGENT_TALK_DATA } from "./TableConfig/AgentTalkConfig";
  import { DETAILCONFIG } from "./TableConfig/AgentDetailConfig";
  import { FORM_CONFIG } from "./FormConfig/AgentDetailConfig";
  import { AGENT_TRANSFER } from "./TableConfig/AgebtTransferConfig"

  export default {
    name: "AgentDetail",
    components: { DetailMode, BaseCrud, Form },
    data() {
      return {
        api: '',
        params: {},
        ruleForm: {},
        configData: DETAILCONFIG.configData,
        gridConfig: AGENT_TALK_DATA.gridConfig,
        agentConfig: AGENT_TRANSFER,
        fromConfigData: FORM_CONFIG,
        gridBtnConfig: false,
        drawer: false,
        drawerBase: false,
        drawerType: '',
        title: '',
        testData: []
      }
    },
    created() {
    },
    methods: {
      editInfo($modelName) {
        console.log($modelName)
      },
      editOther($modelName) {
        console.log($modelName)
      },
      clickAddTalk() {
        this.drawer = true
        this.drawerType = 'addTalk'
        this.title = '添加沟通计划'
        this.fromConfigData = FORM_CONFIG.rateSet.formData
      },
      selectionChange() {},
      clickSubmit() {
        console.log(this.$refs.formInfo.ruleForm)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .m-box {
      width: 100%;
      height: 100px;
      background: #fff;
    }
    .m-basecrud {
      margin-top: 24px;
      padding: 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px;
        background: #fff;
        .m-basecrud-left {
          font-size: 16px;
          font-weight: 400;
          color: #000;
        }
        button {
          padding: 8px 20px;
        }
      }
      .m-table {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
  
  /deep/ .el-dialog__header {
    padding: 16px 24px;
    background: #FAFAFA;
    font-size: 16px;
    color: #606266;
    border-bottom: 1px solid #EBEEF5;
  }
  
  /deep/ .el-dialog__footer {
    padding-top: 20px;
    border-top: 1px solid #EBEEF5;
  }
</style>