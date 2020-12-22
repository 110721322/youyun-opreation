<template>
  <section>
    <yun-search
        style="margin-bottom: 24px;"
        :form-base-data="searchConfig"
        @search="search"
    ></yun-search>
    <div class="g-table">
      <div class="g-table-top flex-between">
        <p class="g-table-title">账户列表</p>
        <el-button type="primary" class="g-btn" @click="showAddAccount">添加用户</el-button>
      </div>
      <yun-table
          ref="refTable"
          :is-async="true"
          :grid-config="tableConfig.gridConfig"
          :grid-btn-config="tableConfig.gridBtnConfig"
          :params="params"
          :api-service="apiService"
          @enable="enableAccount"
          @disable="disableAccount"
          @edit="editAccount"
          @del="delAccount"
      ></yun-table>
    </div>
    <yun-dialog
        :dialoger="addAccountDialoger"
        width="488px"
        title="添加用户"
        @confirm="submitAddAccount"
        @cancel="closeAccountDialog"
    >
      <yun-form
          slot="body"
          style="margin: 24px 20px;"
          ref="addAccountForm"
          v-if="addAccountDialoger"
          :show-foot-btn="false"
          :form-base-data="addAccountForm"
      ></yun-form>
    </yun-dialog>

    <yun-dialog
        :dialoger="editAccountDialoger"
        width="488px"
        title="编辑用户"
        @confirm="submitEditAccount"
        @cancel="closeAccountDialog"
    >
      <yun-form
          slot="body"
          style="margin: 24px 20px;"
          ref="editAccountForm"
          v-if="editAccountDialoger"
          :show-foot-btn="false"
          :form-base-data="editAccountForm"
      ></yun-form>
    </yun-dialog>
  </section>
</template>

<script>
  import { SEARCH_CONFIG, ACCOUNT_FORM } from "./FormConfig/AccoutListForm";
  import { TABLE_CONFIG } from "./TableConfig/AccountListTable";
  import api_accountManage from "@/api/api_accountManage";

  export default {
    name: "AccountList",
    data() {
      return {
        searchConfig: null,
        tableConfig: TABLE_CONFIG,
        addAccountForm: null,
        editAccountForm: null,
        params: {
          phone: '',
          name: null,
          roleId: null
        },
        apiService: api_accountManage.queryEmployeeList,
        addAccountDialoger: false,
        editAccountDialoger: false
      }
    },
    created() {
      this.searchConfig = this.$g.utils.deepClone(SEARCH_CONFIG)
    },
    methods: {
      search($ruleForm) {
        this.params = {
          phone: $ruleForm.phone || '',
          name: $ruleForm.name,
          roleId: $ruleForm.roleId
        }
      },
      showAddAccount() {
        this.addAccountForm = this.$g.utils.deepClone(ACCOUNT_FORM)
        this.addAccountDialoger = true
      },
      closeAccountDialog() {
        this.addAccountDialoger = false;
        this.editAccountDialoger = false;
      },
      editAccount($row) {
        const params = {
          id: $row.id
        }
        api_accountManage.getUserById(params).then(res => {
          this.editAccountForm = this.$g.utils.deepClone(ACCOUNT_FORM)
          this.editAccountForm[3].isShow = true;
          this.editAccountForm.forEach(formItem => {
            formItem.initVal = res.data[formItem.key]
          })
          this.editAccountDialoger = true;
        })
      },
      /**
       * 添加用户,提交资料
       */
      submitAddAccount() {
        const that = this;
        const ruleForm = this.$refs.addAccountForm.clickFootBtn();
        if (!ruleForm) {
          this.$message('请完善资料')
          return
        }
        api_accountManage.addUser(ruleForm).then(() => {
          that.$message({
            type: 'success',
            message: '添加成功'
          })
          that.$refs.refTable.getData();
          that.closeAccountDialog();
        })
      },
      /**
       * 编辑用户,提交资料
       */
      submitEditAccount() {
        const that = this;
        const ruleForm = this.$refs.editAccountForm.clickFootBtn();
        if (!ruleForm) {
          this.$message('请完善资料')
          return
        }
        api_accountManage.editUser(ruleForm).then(() => {
          that.$message({
            type: 'success',
            message: '已修改'
          })
          that.$refs.refTable.getData();
          that.closeAccountDialog();
        })
      },
      /**
       * 启用用户
       * @param $row 用户信息
       */
      enableAccount($row) {
        const that = this;
        this.$confirm('确定要启用吗？启用后账户可正常登陆后台管理系统。', '确认启用', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: $row.id
          }
          api_accountManage.unfreezeUser(params).then(() => {
            that.$message({
              type: 'success',
              message: '已启用'
            })
            that.$refs.refTable.getData();
          })
        })
      },
      /**
       * 禁用用户
       * @param $row 用户信息
       */
      disableAccount($row) {
        const that = this;
        this.$confirm('确定要禁用吗？启用后账户无法登陆后台管理系统。', '确认禁用', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: $row.id
          }
          api_accountManage.freezeUser(params).then(() => {
            that.$message({
              type: 'success',
              message: '已禁用'
            })
            that.$refs.refTable.getData();
          })
        })
      },
      /**
       * 删除用户
       * @param $row 用户信息
       */
      delAccount($row) {
        const that = this;
        this.$confirm('确定要删除吗？删除后不可恢复。', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: $row.id
          }
          api_accountManage.deleteUser(params).then(() => {
            that.$message({
              type: 'success',
              message: '已删除'
            })
            that.$refs.refTable.getData();
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
