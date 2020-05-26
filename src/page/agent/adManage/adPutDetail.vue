<template>
  <div class="ad-detail-box">
    <div class="tab_head">
      <span class="title">编辑广告</span>
    </div>
    <Form
      :form-base-data="fromConfigData.formData"
      :show-foot-btn="fromConfigData.showFootBtn"
      label-width="130px"
      @cancel="cancel"
    >
      <template v-slot="{ formItem } ">
        <div v-if="formItem.putService===3">
          <div class="select_data">
            <span class="el-icon-info icon" />
            <span>
              已添加
              <span class="blue">{{ dynamicTags.length }}</span> 项目
            </span>
            <el-button class="btn" type="text">清空</el-button>
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
        <el-select v-model="select2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-box">
        <span class="label">服务商类型:</span>
        <el-select v-model="select3" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
          :grid-config="configData2.gridConfig"
          :grid-btn-config="configData2.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData2.formConfig"
          :form-data="configData2.formModel"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :hide-edit-area="true"
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
import Form from "@/components/form/adPutDetailEdit.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "./../formConfig/adPutDetailForm";
import { FORM_CONFIG2 } from "./../formConfig/adPutDetailInnerForm";

export default {
  name: "AdPutDetail",
  components: { Form, BaseCrud },
  data() {
    return {
      fromConfigData: FORM_CONFIG.deviceData,
      drawer: false,
      input: "",
      configData2: FORM_CONFIG2,
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
      dynamicTags: ["标签一", "标签二", "标签三"],
      drawerTitle: "添加投放的服务商"
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    addService() {
      this.drawer = true;
    },
    getTableData() {
      this.testData = [
        {
          index: "111",
          serviceId: "商户结算失败",
          serviceName: "4"
        },
        {
          index: "111",
          serviceId: "商户结算失败",
          serviceName: "4"
        }
      ];
    },
    cancel(done) {
      this.$router.back(-1);
    },
    selectionChange($val) {
      this.selectData = $val;
    },
    onClick_confirm() {
      this.drawer = false;
    },
    onClick_reset() {
      this.input = "";
      this.select = "";
      this.select2 = "";
      this.select3 = "";
    },
    onClick_search() {},
    onClick_cancel() {
      this.drawer = false;
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
