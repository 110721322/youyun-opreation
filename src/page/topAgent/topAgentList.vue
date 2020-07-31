<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/addTopAgent') !== -1 || this.$route.path.indexOf('/topAgentDetail') !== -1" />
    <div v-else>
      <div class="p_head">服务商列表</div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />
      <div class="table_box">
        <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          :params="params"
          :api-service="apiService"
          @selectionChange="selectionChange"
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @addInfo="openDetail"
        />
      </div>
    </div>
  </div>
</template>
<script>
import search from "@/components/search/search.vue";
import api_dataMarket from "@/api/api_dataMarket";
import api from "@/api/api_agent";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/topAgentConfig";
import { FORM_CONFIG } from "./../agent/formConfig/agentListSearch";
import { mapActions } from 'vuex'

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "300",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      selectData: [],
      params: {
        channelAgentCode: null,
        channelAgentName: null,
        personName: null,
        personMobile: null,
        operationId: null,
        status: null
      },
      apiService: api_dataMarket.topAgentPageByCondition
    };
  },
  created() {},
  mounted() {
    this.queryInit();
  },
  methods: {
    ...mapActions(['setLabelList', 'setRegionList', 'setUserList']),
    queryInit() {
      api_dataMarket.queryInit().then(res => {
        const labelList = res.object.labelList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          }
        })
        const regionList = res.object.regionSetList.map($ele => {
          return {
            label: $ele.regionName,
            value: $ele.regionCode
          }
        })
        const userList = res.object.userDTOList.map($ele => {
          return {
            label: $ele.jobName || $ele.name,
            value: $ele.id
          }
        })
        this.setLabelList(labelList)
        this.setRegionList(regionList)
        this.setUserList(userList)
      })
    },
    getData() {
      this.testData = [
        {
          sort: '1',
          createTime: '2020-06-13',
          ID: '123456',
          agentName: '测试服务商',
          people: '张三',
          expireDate: '拉阿拉蕾',
          accountStatus: '通过'
        }
      ]
    },
    transfer() {
      if (this.selectData.length) {
        this.$confirm("是否批量转移运营？", "转移运营", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then(() => {
          api_dataMarket.transferOperate({
            agentNos: [],
            operateUserNo: ""
          }).then(res => {
            this.$message({
              type: "info",
              message: "转移成功"
            });
          });
        }).catch(() => {});
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
      console.log($form);
      this.params = {
        [$form.channelAgent]: $form.channelAgentVal ? $form.channelAgentVal : null,
        [$form.person]: $form.personVal ? $form.personVal : null,
        operationId: $form.operationId,
        status: $form.status
      }
    },
    openDetail($row) {
      this.$router.push({
        path: "/topAgent/topAgentList/topAgentDetail",
        query: {
          channelAgentCode: $row.channelAgentCode
        }
      })
    },
    thaw($row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 5,
          channelAgentCode: $row.channelAgentCode
        }).then((result) => {
          this.$message({
            type: "success",
            message: "已解冻"
          });
          this.$refs.table.getData();
        })
      })
    },
    frozen($row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 4,
          channelAgentCode: $row.channelAgentCode
        }).then((result) => {
          this.$message({
            type: "info",
            message: "已冻结"
          });
          this.$refs.table.getData();
        })
      })
    },
    openAgentManager() {},
    onClick_addServe() {
      this.$router.push({
        path: "/topAgent/topAgentList/addTopAgent"
      })
    }
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
