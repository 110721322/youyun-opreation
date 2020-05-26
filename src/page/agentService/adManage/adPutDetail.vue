<template>
  <div class="ad-detail-box">
    <div class="tab_head">
      <span class="title">投放广告</span>
    </div>
    <Form
      :form-base-data="fromConfigData.formData"
      :show-foot-btn="fromConfigData.showFootBtn"
      label-width="130px"
      @cancel="cancel"
      @confirm="confirm"
    >
      <template v-slot="{ formItem } ">
        <div v-if="formItem.putService===4">
          <div class="select_data">
            <span class="el-icon-info icon" />
            <span>
              已添加
              <span class="blue">{{ dynamicTags.length }}</span> 项目
            </span>
            <el-button class="btn" type="text" @click="onClick_clearAll">清空</el-button>
          </div>
          <div class="tag-box">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              closable
              class="tag-item"
              :disable-transitions="false"
              size="small"
              @close="handleClose(tag)"
            >{{ tag }}</el-tag>
            <el-button class="button-new-tag" size="small" @click="addService">+ 添加服务商</el-button>
          </div>
        </div>
      </template>
    </Form>
    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ drawerTitle }}</div>
      <div class="search-box">
        <span class="label">精准筛选:</span>
        <el-input v-model="input" placeholder="请输入内容" class="input-with-select" size="40%">
          <el-select slot="prepend" v-model="select" style="width:130px" placeholder="请选择">
            <el-option label="服务商名称" value="1"></el-option>
            <el-option label="服务商ID" value="2"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="search-box">
        <span class="label">服务地区:</span>
        <el-cascader
          v-model="select2"
          :options="areaData"
        ></el-cascader>
      </div>
      <div class="search-box">
        <span class="label">服务商类型:</span>
        <el-select v-model="select3" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.status"
            :label="item.statusDesc"
            :value="item.status"
          ></el-option>
        </el-select>
      </div>
      <div class="search-btn">
        <el-button type="primary" size="medium" @click="onClick_search">搜索</el-button>
        <el-button size="medium" @click="onClick_reset">重置</el-button>
      </div>
      <div class="form-box">
        <div class="select_data2">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
          <el-button class="btn" type="text">清空</el-button>
        </div>
        <BaseCrud
          v-if="drawer"
          :grid-config="configData2.gridConfig"
          :grid-btn-config="configData2.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData2.formConfig"
          :form-data="configData2.formModel"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :hide-edit-area="true"
          :api-service="api"
          @selectionChange="selectionChange"
        />
      </div>
      <div class="oper-box">
        <el-button type="primary" size="medium" @click="onClick_confirm">确定</el-button>
        <el-button size="medium" @click="onClick_cancel">关闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from "@/api/api_agent.js";
import Form from "@/components/form/adPutDetailEdit.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "./../formConfig/adPutDetailForm";
import { FORM_CONFIG2 } from "./../formConfig/adPutDetailInnerForm";
import areaData from "@/assets/data/areaData";

export default {
  name: "AdPutDetail",
  components: { Form, BaseCrud },
  data() {
    return {
      fromConfigData: FORM_CONFIG.addData,
      drawer: false,
      input: "",
      configData2: FORM_CONFIG2,
      areaData: areaData,
      select: "",
      select2: "",
      select3: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      testData: [],
      selectData: [],
      dynamicTags: [],
      myDynamicTags: [],
      drawerTitle: "添加投放的服务商",
      id: this.$route.query.id,
      api: api.queryAllDistributeAgent
    };
  },
  watch: {
    fromConfigData: function($value, $old) {
      console.log('改变值', $value);
    }
  },
  mounted() {
    this.queryAllPrivilegeType();
    if (this.id) {
      this.queryById();
    }
  },
  methods: {
    onClick_clearAll() {
      this.dynamicTags = [];
    },
    queryAllPrivilegeType() {
      api
        .queryAllPrivilegeType({
        })
        .then(res => {
          this.options = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    queryById() {
      api
        .queryById({
          id: this.id
        })
        .then(res => {
          // 编辑前重赋值
          FORM_CONFIG.editData.formData.forEach((item, index) => {
            item.initVal = res.object[item.key];
          });
          this.fromConfigData = FORM_CONFIG.editData;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    onChange($val) {
      console.log('$val', $val);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    addService() {
      this.drawer = true;
    },
    getTableData() {
      api
        .queryAllDistributeAgent({
          agentNo: this.input,
          provinceCode: this.select2[0],
          cityCode: this.select2[1],
          businessType: this.select3
        })
        .then(res => {
          this.testData = res.datas;
        });
    },
    cancel() {
      this.$router.go(-1);
    },
    selectionChange($val) {
      var dynamicTags = [];
      var selectData = [];
      $val.forEach(item => {
        dynamicTags.push(item.agentName);
      })
      this.myDynamicTags = dynamicTags;
      $val.forEach(item => {
        selectData.push(item.agentNo);
      })
      this.selectData = selectData;
    },
    onClick_confirm() {
      this.dynamicTags = this.myDynamicTags;
      this.drawer = false;
    },
    onClick_reset() {
      this.input = "";
      this.select = "";
      this.select2 = "";
      this.select3 = "";
      // this.getTableData();
    },
    onClick_search() {
      this.getTableData();
    },
    onClick_cancel() {
      this.drawer = false;
    },
    confirm($form) {
      console.log($form);
      if (this.id) {
        api
          .advertDistributeUpdate({
            agentNoList: this.selectData,
            beginTime: $form.time[0],
            endTime: $form.time[1]
          })
          .then(res => {
            this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.back(-1);
              }
            });
          });
      } else {
        api
          .advertDistributeAdd({
            advertId: $form.id,
            agentNoList: this.selectData,
            distributeType: $form.putService,
            operationId: $form.operationId,
            sort: Number($form.sort),
            beginTime: $form.time[0],
            endTime: $form.time[1]
          })
          .then(res => {
            this.$alert("添加成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.back(-1);
              }
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.button-new-tag {
  margin-left: 10px;
  height: 24px;
  line-height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.oper-box {
  text-align: center;
  position: absolute;
  bottom: 28px;
  width: 100%;
  border-top: 1px solid #ebeef5;
  padding-top: 30px;
  .el-button {
    padding: 10px 35px;
  }
}
.form-box {
  padding: 0 24px;
}
.tag-box {
  padding: 9px 15px;
  width: 50%;
  height: 82px;
  margin: 16px 0 0 126px;
  border-radius: 4px;
  border: 1px solid rgba(219, 223, 231, 1);
  .tag-item {
    margin: 0 5px;
  }
}
.select_data {
  width: 50%;
  height: 40px;
  background: #e6f7ff;
  border: 1px solid #bae7ff;
  line-height: 40px;
  margin: 16px 0 0 126px;
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
.select_data2 {
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
.search-box {
  display: flex;
  align-items: center;
  margin: 16px 24px;
  .label {
    width: 95px;
    flex-shrink: 0;
  }
}
.search-btn {
  text-align: right;
  padding: 0 24px;
}
.ad-detail-box {
  overflow: hidden;
}
</style>
