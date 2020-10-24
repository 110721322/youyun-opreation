<template>
  <div>
    <div class="tab_head">
      <span class="title">后台角色权限</span>
    </div>

    <div class="table_box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :api-service="apiService"
        :params="params"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @edit="onClick_edit"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <role-menu-set
        v-if="drawer"
        :template-list="templateList"
        :default-props="defaultProps"
        @confirm="saveRolePermission"
        @cancel="closeDrawer"
      ></role-menu-set>
    </el-drawer>
  </div>
</template>
<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import RoleMenuSet from "../component/RoleMenuSet";

import api_systemConfig from "@/api/api_systemConfig";

import { AGENTPC_CONFIG } from "./../tableConfig/agentPcManagerConfig";

export default {
  name: "AgentPcManager",
  components: { BaseCrud, RoleMenuSet },
  data() {
    return {
      searchMaxHeight: "340",
      configData: AGENTPC_CONFIG,
      fromConfigData: {},
      drawer: false,
      apiService: api_systemConfig.getSystemRole, // 角色列表api
      params: {
        system: 'agent'
      },
      templateList: [],
      checkedList: [], // 已选中的权限
      defaultProps: {
        children: "childrenMenus",
        label: "menuName"
      },
      selectRoleId: null
    };
  },
  computed: {
    checkedIds() {
      return this.checkedList.map($ele => {
        return $ele.id
      })
    }
  },
  mounted() {},
  methods: {
    onClick_edit($row) {
      const params = {
        roleId: $row.roleId,
        system: 'agent'
      }
      this.selectRoleId = $row.roleId;
      api_systemConfig.getRolePermission(params).then(res => {
        this.templateList = res.datas;
        this.drawer = true;
      })
    },
    saveRolePermission($checkedIds) {
      const params = {
        roleId: this.selectRoleId,
        menuIds: $checkedIds,
        system: 'agent'
      }
      api_systemConfig.saveRolePermission(params).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '已保存'
          });
          this.closeDrawer();
        }
      })
    },
    closeDrawer() {
      this.drawer = false;
      this.templateList = [];
      this.roleId = null;
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
.m-tree-container {
  width: 100%;
  height: 750px;
  overflow-y: scroll;
}
.foot_btn_box {
  width: 100%;
  height: 96px;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  .foot_btn {
    width: 113px;
    height: 40px;
    margin-top: 28px;
    margin-left: 12px;
    margin-right: 12px;
  }

  .form_box {
    margin: 0 59px;
  }
}
</style>
