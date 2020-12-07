<template>
  <div class="ad-detail-box">
    <div class="tab-head">
      <span class="title">编辑广告</span>
    </div>
    <Form
      :form-base-data="fromConfigData.formData"
      :show-foot-btn="fromConfigData.showFootBtn"
      label-width="130px"
      @cancel="clickCancel"
    >
      <template v-slot="{ formItem } ">
        <div v-if="formItem.putService === 3">
          <div class="select-data">
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
            <el-button class="button-new-tag" size="small" @click="clickAddService">+ 添加服务商</el-button>
          </div>
        </div>
      </template>
    </Form>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ drawerTitle }}</div>
      <div class="search-box">
        <span class="label">精准筛选:</span>
        <el-input v-model="input" placeholder="请输入内容" class="input-with-select" size="40%">
          <el-select slot="prepend" v-model="select" class="el-select-tab" placeholder="请选择">
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
        <el-button type="primary" size="medium" @click="clickSearch">搜索</el-button>
        <el-button size="medium" @click="clickReset">重置</el-button>
      </div>
      <div class="form-box">
        <!--TODONEXT <div class="select-data2">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
          <el-button class="btn" type="text">清空</el-button>
        </div> -->
        <BaseCrud
          :grid-config="configData2.gridConfig"
          :grid-btn-config="configData2.gridBtnConfig"
          :form-config="configData2.formConfig"
          :form-data="configData2.formModel"
          form-title="用户"
          :is-async="true"
          :is-select="true"
          :hide-edit-area="true"
          @selectionChange="selectionChange"
        >
        </BaseCrud>
      </div>
      <div class="oper-box">
        <el-button type="primary" size="medium" @click="clickConfirm">确定</el-button>
        <el-button size="medium" @click="clickClose">关闭</el-button>
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
      fromConfigData: FORM_CONFIG.deviceData, // 表单项数据
      drawer: false, // 控制侧边弹窗的显示与隐藏
      input: "", // 精准筛选的输入值
      configData2: FORM_CONFIG2, // 服务商数据
      select: "", // 选择1
      select2: "", // 选择2
      select3: "", // 选择3
      options: [], // 选择项数据
      selectData: [], // 下拉框选择数据
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

    // 点击添加投放服务商弹出侧边抽屉
    clickAddService() {
      this.drawer = true;
    },
    getTableData() {},

    // 点击返回上一页
    clickCancel(done) {
      this.$router.back(-1);
    },

    // 选择项更换数据
    selectionChange($val) {
      this.selectData = $val;
    },

    // 点击确定
    clickConfirm() {
      this.drawer = false;
    },

    // 点击重置
    clickReset() {
      this.input = "";
      this.select = "";
      this.select2 = "";
      this.select3 = "";
    },

    // 点击搜索
    clickSearch() {},

    // 点击关闭，关闭侧边弹窗
    clickClose() {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.button-new-tag {
  margin-left: 10px;
  padding-top: 0;
  padding-bottom: 0;
  height: 24px;
  line-height: 24px;
}

.oper-box {
  position: absolute;
  bottom: 28px;
  padding-top: 30px;
  width: 100%;
  border-top: 1px solid #ebeef5;
  text-align: center;

  .el-button {
    padding: 10px 35px;
  }
}

.el-select-tab {
  width: 130px;
}

.form-box {
  padding: 0 24px;
}

.tag-box {
  padding: 9px 15px;
  margin: 16px 0 0 126px;
  width: 50%;
  height: 82px;
  border-radius: 4px;
  border: 1px solid rgba(219, 223, 231, 1);

  .tag-item {
    margin: 0 5px;
  }
}
.select-data {
  margin: 16px 0 0 126px;
  width: 50%;
  height: 40px;
  background: #e6f7ff;
  border: 1px solid #bae7ff;
  line-height: 40px;

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

.select-data2 {
  margin: 16px 0;
  width: 100%;
  height: 40px;
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(186, 231, 255, 1);
  line-height: 40px;

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
    flex-shrink: 0;
    width: 95px;
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
