<template>
  <section>
    <yun-search
        style="margin-bottom: 24px;"
        :form-base-data="searchConfig"
        :is-show-all="true"
    ></yun-search>
    <div class="g-table">
      <div class="g-table-top flex-between">
        <p class="g-table-title">配置列表</p>
        <el-button type="primary" class="g-btn" @click="showAddRoleDialog">添加权限组</el-button>
      </div>
      <yun-table
          :grid-config="tableConfig.gridConfig"
          :grid-btn-config="tableConfig.gridBtnConfig"
          :grid-data="gridData"
      ></yun-table>
    </div>
    <yun-dialog
        :dialoger="addRoleDialoger"
        title="添加权限组"
        width="488px"
        @confirm="confirmAddRole"
        @cancel="closeAddRoleDialog"
    >
      <power-set
          slot="body"
          ref="powerSet"
          v-if="addRoleDialoger"
          :form-config="addRoleConfig"
          :template-list="templateList"
      ></power-set>
    </yun-dialog>
  </section>
</template>

<script>
  import { SEARCH_CONFIG, ADD_ROLE_CONFIG } from "./FormConfig/RoleListForm";
  import { TABLE_CONFIG } from "./TableConfig/RoleListTable";
  import PowerSet from "./components/PowerSet";

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
        gridData: [
          {
            id: 123
          }
        ],
        templateList: [
          {
            menuName: '首页',
            parentMenuId: 0,
            id: 1,
            childrenMenus: [
              {
                menuName: '账户中心',
                parentMenuId: 1,
                id: 2
              }
            ]
          },
          {
            menuName: '服务商管理',
            parentMenuId: 0,
            id: 3,
            childrenMenus: [
              {
                menuName: '服务商列表',
                parentMenuId: 3,
                id: 4
              },
              {
                menuName: '添加服务商',
                parentMenuId: 3,
                id: 5
              }
            ]
          },
          {
            menuName: '商户管理',
            parentMenuId: 0,
            id: 6,
            childrenMenus: [
              {
                menuName: '商户列表',
                parentMenuId: 6,
                id: 7
              }
            ]
          },
          {
            menuName: '门店管理',
            parentMenuId: 0,
            id: 8,
            childrenMenus: [
              {
                menuName: '门店列表',
                parentMenuId: 8,
                id: 9
              }
            ]
          },
          {
            menuName: '结算管理',
            parentMenuId: 0,
            id: 10,
            childrenMenus: [
              {
                menuName: '代理商结算管理',
                parentMenuId: 10,
                id: 11
              }
            ]
          },
          {
            menuName: '订单管理',
            parentMenuId: 0,
            id: 12,
            childrenMenus: [
              {
                menuName: '交易流水',
                parentMenuId:12,
                id: 13
              }
            ]
          },
          {
            menuName: '用户管理',
            parentMenuId: 0,
            id: 14,
            childrenMenus: [
              {
                menuName: '账户列表',
                parentMenuId: 14,
                id: 15
              },
              {
                menuName: '权限配置',
                parentMenuId: 14,
                id: 16
              }
            ]
          }
        ],
        addRoleDialoger: false
      }
    },
    methods: {
      showAddRoleDialog() {
        this.addRoleConfig = this.$g.utils.deepClone(ADD_ROLE_CONFIG);
        this.addRoleDialoger = true
      },
      closeAddRoleDialog() {
        this.addRoleDialoger = false
      },
      confirmAddRole() {
        const result = this.$refs.powerSet.clickConfirm();
        if (!result) {
          return false
        }
        const { menuIds, ruleForm } = result;
      }
    }
  }
</script>

<style scoped>

</style>
