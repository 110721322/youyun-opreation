<template>
  <section>
    <yun-search
        style="margin-bottom: 24px;"
        :form-base-data="searchConfig"
        :is-show-all="true"
        @search="search"
    ></yun-search>
    <div class="g-table">
      <div class="g-table-top flex-between">
        <p class="g-table-title">配置列表</p>
        <el-button type="primary" class="g-btn" @click="showAddRoleDialog">添加权限组</el-button>
      </div>
      <yun-table
          ref="refTable"
          is-async
          :grid-edit-width="120"
          :api-service="apiService"
          :params="params"
          :grid-config="tableConfig.gridConfig"
          :grid-btn-config="tableConfig.gridBtnConfig"
          @edit="showEditRoleDialog"
          @del="delRole"
      ></yun-table>
    </div>
    <yun-dialog
        :dialoger="addRoleDialoger"
        title="添加权限组"
        width="488px"
        @confirm="confirmAddRole"
        @cancel="closeRoleDialog"
    >
      <power-set
          slot="body"
          ref="addPowerSet"
          v-if="addRoleDialoger"
          :form-config="addRoleConfig"
          :template-list="templateList"
      ></power-set>
    </yun-dialog>
    <yun-dialog
        :dialoger="editRoleDialoger"
        title="添加权限组"
        width="488px"
        @confirm="confirmEditRole"
        @cancel="closeRoleDialog"
    >
      <power-set
          slot="body"
          ref="editPowerSet"
          v-if="editRoleDialoger"
          :form-config="editRoleConfig"
          :template-list="editTemplateList"
      ></power-set>
    </yun-dialog>
  </section>
</template>

<script>
  import { RoleList } from "@/libs/config/constant.config";
  import { SEARCH_CONFIG, ADD_ROLE_CONFIG } from "./FormConfig/RoleListForm";
  import { TABLE_CONFIG } from "./TableConfig/RoleListTable";
  import PowerSet from "./components/PowerSet";
  import api_accountManage from "@/api/api_accountManage";

  export default {
    name: "RoleList",
    components: {
      PowerSet
    },
    data() {
      return {
        searchConfig: SEARCH_CONFIG,
        tableConfig: TABLE_CONFIG,
        addRoleConfig: null,
        editRoleConfig: null,
        gridData: [
          {
            id: 123
          }
        ],
        templateList: [],
        editTemplateList: [],
        addRoleDialoger: false,
        editRoleDialoger: false,
        apiService: api_accountManage.queryRoleListByPage,
        params: {
          platformType: RoleList.OPERATION_PLATFORM
        }
      }
    },
    created() {
      this.getTemplateList();
    },
    methods: {
      getTemplateList() {
        api_accountManage.selectMenuOfRole({system: RoleList.OPERATION_SYSTEM})
          .then(res => {
            this.templateList = res.data.map(item => {
              return {
                menuName: item.menuName,
                parentMenuId: item.parentMenuId,
                id: item.id,
                childrenMenus: item.childrenMenus
              }
            })
          })
      },
      search($ruleForm) {
        this.params = {
          roleName: $ruleForm.roleName,
          platformType: RoleList.OPERATION_PLATFORM
        }
      },
      showAddRoleDialog() {
        this.addRoleConfig = this.$g.utils.deepClone(ADD_ROLE_CONFIG);
        this.addRoleDialoger = true
      },
      closeRoleDialog() {
        this.addRoleDialoger = false
        this.editRoleDialoger = false
      },
      showEditRoleDialog($row) {
        const params = {
          system: RoleList.OPERATION_SYSTEM,
          roleId: $row.id
        }
        this.editRoleConfig = this.$g.utils.deepClone(ADD_ROLE_CONFIG)
        this.editRoleConfig.forEach(item => {
          item.initVal = $row[item.key]
        })
        api_accountManage.selectMenuOfRole(params).then(res => {
          this.editTemplateList = res.data;
          this.editRoleDialoger = true;
        })
      },
      confirmAddRole() {
        const result = this.$refs.addPowerSet.clickConfirm();
        if (!result) {
          return false
        }
        const { menuIds, ruleForm } = result;
        const params = {
          roleName: ruleForm.roleName,
          platformType: RoleList.OPERATION_PLATFORM,
          menuIds: menuIds
        }
        api_accountManage.addRole(params).then(() => {
          this.$refs.refTable.getData();
          this.closeRoleDialog()
          this.$message({
            type: 'success',
            message: '新增权限组成功'
          })
        })
      },
      confirmEditRole() {
        const result = this.$refs.editPowerSet.clickConfirm();
        if (!result) {
          return false
        }
        const { menuIds, ruleForm } = result;
        const params = {
          roleName: ruleForm.roleName,
          roleId: ruleForm.id,
          platformType: RoleList.OPERATION_PLATFORM,
          menuIds: menuIds
        }
        api_accountManage.editRoleAndMenu(params).then(() => {
          this.$refs.refTable.getData();
          this.closeRoleDialog()
          this.$message({
            type: 'success',
            message: '编辑权限组成功'
          })
        })
      },
      delRole($row) {
        const that = this;
        this.$confirm('确定要删除吗？删除后不可恢复。', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: $row.id
          }
          api_accountManage.deleteRole(params).then(() => {
            that.$refs.refTable.getData();
            that.$message({
              type: 'success',
              message: '已删除'
            })
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
