<template>
  <div>
    <div class="tab_head">
      <span class="title">入库管理</span>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">入库列表</div>
        <el-button class="btn" type="primary" @click="onClick_addDevice">新增入库</el-button>
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
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :hide-edit-area="configData.hideEditArea"
        @detail="onClick_detail"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="head_title">新增入库</div>
      <div class="drawer_content">
        <el-form ref="form" :model="formVal" label-width="100px" :rules="rules">
          <el-form-item label="设备型号" prop="deviceId" label-width="120px">
            <el-select v-model="formVal.deviceId" placeholder="请选择设备型号">
              <el-option v-for="(item, index) in decviceList" :label="item.deviceModel" :value="item.deviceId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保修截止日期" prop="deadline" label-width="120px">
            <el-date-picker
                v-model="formVal.deadline"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入库时间" prop="inputTime" label-width="120px">
            <el-date-picker
                v-model="formVal.inputTime"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入库方式" prop="type" label-width="120px">
            <el-radio-group v-model="formVal.type" @change="radioChange">
              <el-radio :label="1">批量导入</el-radio>
              <el-radio :label="2">手动录入</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div style="padding-left: 120px;">
          <UploadFile v-if="formVal.type === 1"  class="btn" @handel_execl="upExecl" :form-item="formItem" :rule-form="ruleForm" type="primary"></UploadFile>
        </div>
        <div v-if="formVal.type === 2" class="box_cursor">
          <div class="cursorCount">
            <span>入库数量：{{list.length}}台</span>
            <span @click="handel_clear">清空</span></div>
          <div class="add_box">
            <el-input v-model="device"></el-input>
            <span @click="handel_add">添加</span>
          </div>
          <ul class="cursor" v-if="list.length > 0">
            <li v-for="(item, index) in list" :key="index">
              <el-input :value="item.id" v-model="item.id"></el-input>
              <span class="delete" @click="handel_delete(index)">删除</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom_btn">
        <el-button type="primary" @click="confirm">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_device";
import apiComm from "@/api/api_common";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "./../formConfig/saveDetail";
import { SEARCH_CONFIG } from "./../formConfig/saveSearch";
import { SAVELIST_CONFIG } from "./../tableConfig/savelistConfig";
import UploadFile from "@/components/form/components/UploadFile";
import { StockSave } from "@/libs/config/constant.config";

export default {
  name: "StockSave",
  components: { Search, BaseCrud, UploadFile },
  data() {
    return {
      list: [],
      device: "",
      searchMaxHeight: "200",
      searchConfig: SEARCH_CONFIG,
      configData: SAVELIST_CONFIG,
      fromConfigData: {},
      testData: [],
      decviceList: [],
      drawer: false,
      count: 0,
      params: {},
      api: "",
      excelData: "",
      formVal: {
        deviceId: "",
        deadline: "",
        inputTime: "",
        type: 1
      },
      ruleForm: {
        key: 'file'
      },
      formItem: {
        key: 'file'
        // dateUrl: ''
      },
      rules: {
        deviceId: [
          {required: true, message: '请选择设备型号', trigger: 'blur'}
        ],
        deadline: [
          {required: true, message: '请选择保修截止日期', trigger: 'change'}
        ],
        inputTime: [
          {required: true, message: '请选择设备入库时间', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请选择导入方式', trigger: 'change'}
        ]
      }
    };
  },
  computed: {
  },
  created() {
    this.params = {
      beginDate: this.$g.utils.getToday(-6) + ' 00:00:00',
      endDate: this.$g.utils.getToday(0) + ' 23:59:59'
    }
    this.api = api.deviceInputQueryByPage
  },
  methods: {
    handel_delete(index) {
      this.list.splice(index, 1)
    },
    handel_add() {
      if (!this.device) {
        return
      }
      var obj = {}
      obj.id = this.device
      this.list.push(obj)
      this.device = ""
    },
    handel_clear() {
      this.list = []
    },
    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : this.$g.utils.getToday(-6) + ' 00:00:00',
        endDate: $ruleForm.date ? $ruleForm.date[1] : this.$g.utils.getToday(0) + ' 23:59:59',
        deviceId: $ruleForm.deviceId ? $ruleForm.deviceId : null
      };
    },
    onClick_addDevice() {
      this.queryAllDevice()
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.formVal = {
        deviceId: "",
        deadline: "",
        inputTime: "",
        type: StockSave.IMPORT_MULTI
      }
      this.drawer = true;
    },
    queryAllDevice() {
      api.queryAllDeviceModel().then(res => {
        this.decviceList = res.data
      })
    },
    upExecl($data) {
      this.excelData = $data
    },
    confirm() {
      var $data = this.formVal
      if (!$data.deviceId || !$data.deadline || !$data.inputTime || !$data.type) {
        this.$message({
          message: "请填写必填信息",
          type: "warning"
        })
        return
      }
      if ($data.type === StockSave.IMPORT_MULTI && !this.excelData) {
        this.$message({
          message: "请导入模板信息",
          type: "warning"
        })
        return
      }
      if ($data.type === StockSave.IMPORT_MULTI && this.excelData) {
        this.importMulti($data)
      } else if ($data.type === StockSave.IMPORT_SINGLE) {
        this.importSingle($data)
      }
    },
    /**
     * 批量导入
     * @param $data
     */
    importMulti($data) {
      // exelc解析
      apiComm.excelUploadPic({
        url: this.excelData,
        type: "deviceInput"
      }).then(res => {
        if (res.data.length === 0) {
          this.$message({
            message: "请填写设备标识",
            type: "warning"
          })
          return
        }
        $data.deviceIdentifierList = res.data
        this.deviceInputAdd($data);
      })
    },
    /**
     * 单个导入
     */
    importSingle($data) {
      if (this.list.length === 0) {
        this.$message({
          message: "添加设备标识",
          type: "warning"
        })
        return;
      }
      let deviceIdentifierList = []
      deviceIdentifierList = this.list
        .filter(item => !!item.id)
        .map(item => item.id)
      if (deviceIdentifierList.length === 0) {
        this.$message({
          message: "设备标识不能为空",
          type: "warning"
        })
        return;
      }
      $data.deviceIdentifierList = deviceIdentifierList
      this.deviceInputAdd($data);
    },
    // 新增
    deviceInputAdd($data, arr) {
      api.deviceInputAdd({
        employeeId: this.$store.state.admin.userInfo.id,
        count: $data.deviceIdentifierList.length,
        deadline: $data.deadline,
        deviceId: $data.deviceId,
        inputTime: $data.inputTime,
        deviceIdentifierList: $data.deviceIdentifierList
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          })
          this.list = []
          this.$refs.table.getData();
          this.drawer = false;
        }
      })
    },
    onClick_detail($item) {
      this.$router.push({
        name: "stockDetail",
        query: {
          id: $item.id
        }
      });
    },
    cancel() {
      this.list = []
      this.drawer = false;
    },
    radioChange(val) {
      if (val === 2) {
        this.excelData = ""
      }
      if (val === 1) {
        this.list = []
      }
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

.drawer_content {
  width: 100%;
  margin-top: 96px;
  height: calc(100vh - 192px);
  overflow-y: auto;
  padding: 24px 0 0 0;
}

.bottom_btn {
  width: 500px;
  height: 96px;
  position: fixed;
  right: 0;
  bottom: 0;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  button {
    height: 40px;
    padding: 0 16px;
    line-height: 40px;
  }
}

.box_cursor {
  margin: 24px 24px 150px 24px;
  padding: 24px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;

  .cursorCount {
    width: 100%;
    margin-bottom: 16px;
    font-size: 16px;
    text-align: center;

    span:nth-child(2) {
      padding: 0 16px;
      color: #1989FA;
      cursor: pointer;
    }
  }

    .add_box {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ebeef5;

    .el-input--small {
      width: 200px;
    }

    span {
      color: #1989FA;
      padding-left: 16px;
      cursor: pointer;
    }
  }
}

.head_title {
  width: 500px;
  position: fixed;
  top: 0;
  right: 0;
  height: 96px;
  border-bottom: 1px solid #ebeef5;
  padding-left: 32px;
  font-size: 20px;
  line-height: 96px;
  background: #fff;
  z-index: 9999;
}

.cursor {
  padding: 16px 0;
  li {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-input--small {
      width: 200px;
    }
    .delete {
      color: #f5222d;
      padding-left: 16px;
    }
  }
}
</style>
