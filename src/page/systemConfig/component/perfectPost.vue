<template>
  <div>
    <div class="p_head">完善岗位信息</div>
    <el-form ref="form" :model="form" label-width="80px">
      <div style="margin:24px">
        <el-form-item label="直属上级">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <span>未设置</span>
          <el-button type="text" style="font-size:14px" @click="onClick_setPower">设置</el-button>
        </el-form-item>
        <el-form-item label="审批">
          <span>未设置</span>
          <el-button type="text" style="font-size:14px" @click="onClick_setPower">设置</el-button>
        </el-form-item>
      </div>

      <div class="foot_btn_box">
        <el-button type="primary" class="foot_btn" @click="onClick_saveJobInformation">确定</el-button>
        <el-button class="foot_btn">取消</el-button>
      </div>
    </el-form>
    <el-drawer :append-to-body="true" :visible.sync="innerDrawer" :with-header="false" size="40%">
      <power-set></power-set>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_memberManage.js";
import PowerSet from "./powerSet.vue";

export default {
  name: "Theme",
  components: { PowerSet },
  data() {
    return {
      innerDrawer: false,
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {},
  methods: {
    onClick_saveJobInformation() {
      api.saveJobInformation();
    },
    onClick_setPower() {
      this.innerDrawer = true;
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
