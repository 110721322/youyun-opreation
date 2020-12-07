<template>
  <div>
    <div class="tab-head">
      <span class="title">审批管理</span>
    </div>

    <div class="table-box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :api-service="configData.api"
        :grid-edit-width="150"
        :is-async="false"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @edit="onClickEdit"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">编辑按钮</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="审批流程:" style="margin: 16px 100px; width: 280px;">
          <el-radio-group v-model="form.resource" @input="clickResource">
            <el-radio label="1">上级审批</el-radio>
            <el-radio label="2">指定成员</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-for="(item, key) of form.checkList" v-show="form.resource==2" :key="key">
          <el-form-item style="margin: 16px 100px; width: 300px;" label-width="20px">
            <el-select v-model="form.checkList[key]" placeholder="请选择">
              <el-option
                v-for="(item2,key2) in options"
                :key="key2"
                :label="item2.label"
                :value="item2.value"
              ></el-option>
            </el-select>
            <el-button style="margin-left: 10px;">删除</el-button>
          </el-form-item>
          <div v-if="key<checkListLength-1" style="width: 100%;">
            <img src="@/assets/img/more.png" style="display: block; margin: 0 auto; width: 20px;" alt="icon" />
          </div>
        </div>

        <div v-show="form.resource==2" class="add-btn" @click="clickAddItem">
          <i class="el-icon-plus"></i>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import BaseCrud from "@/components/table/BaseCrud.vue";

import { USERLIST_CONFIG } from "./tableConfig/approvalManagerConfig";

export default {
  name: "ApprovalManager",
  components: { BaseCrud },
  data() {
    return {
      configData: USERLIST_CONFIG,
      fromConfigData: {},
      drawer: false,
      form: {
        resource: "1",
        checkList: []
      },
      options: []
    };
  },
  mounted() {},
  methods: {
    clickResource($value) {},

    cancel(done) {
      done();
    },

    onClickEdit() {
      this.drawer = true;
    },

    clickAddItem() {
      this.checkListLength++;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.add-btn {
  margin-left: 120px;
  width: 195px;
  height: 40px;
  line-height: 40px;
  background: rgba(243, 243, 243, 1);
  border-radius: 4px;
  border: 1px solid rgba(220, 223, 230, 1);
  text-align: center;
  cursor: pointer;

  .el-icon-plus {
    width: 24px;
    height: 24px;
    color: #909399;
  }
}
</style>
