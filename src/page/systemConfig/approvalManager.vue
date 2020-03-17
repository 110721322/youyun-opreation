<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">审批管理</span>
    </div>

    <div class="table_box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
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

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">编辑按钮</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="审批流程:" style="margin:16px 100px;width:280px">
          <el-radio-group v-model="form.resource" @input="onChange_resource">
            <el-radio label="1">上级审批</el-radio>
            <el-radio label="2">指定成员</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-for="(item,key) of form.checkList" v-show="form.resource==2" :key="key">
          <el-form-item style="margin:16px 100px;width:300px" label-width="20px">
            <el-select v-model="form.checkList[key]" placeholder="请选择">
              <el-option
                v-for="(item2,key2) in options"
                :key="key2"
                :label="item2.label"
                :value="item2.value"
              ></el-option>
            </el-select>
            <el-button style="margin-left:10px">删除</el-button>
          </el-form-item>
          <div v-if="key<checkListLength-1" style="width:100%;">
            <img src="@/assets/img/more.png" style="display:block;margin:0 auto;width:20px" />
          </div>
        </div>

        <div v-show="form.resource==2" class="add_btn" @click="onClick_addItem">
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
  name: "Theme",
  components: { BaseCrud },
  data() {
    return {
      searchMaxHeight: "340",
      configData: USERLIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      form: {
        resource: "1",
        checkList: []
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ]
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onChange_resource($value) {
      console.log($value);
    },
    search() {
      // eslint-disable-next-line no-console
      if (this.ruleForm === 2) {
        this.form.checkList.push({
          value: 1
        });
      }
    },

    getTableData() {
      this.testData = [
        {
          id: 1,
          type: "日常任务",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系"
        },
        {
          id: 2,
          type: "日常任务",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系"
        }
      ];
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    cancel(done) {
      done();
    },
    onClick_edit() {
      this.drawer = true;
    },
    onClick_addItem() {
      this.checkListLength++;
      console.log(this.checkListLength);
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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
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
.add_btn {
  width: 195px;
  height: 40px;
  line-height: 40px;
  background: rgba(243, 243, 243, 1);
  border-radius: 4px;
  border: 1px solid rgba(220, 223, 230, 1);
  text-align: center;
  margin-left: 120px;
  cursor: pointer;
  .el-icon-plus {
    width: 24px;
    height: 24px;
    color: #909399;
  }
}
</style>
