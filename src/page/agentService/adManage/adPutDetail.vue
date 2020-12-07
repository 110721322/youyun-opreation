<template>
  <div class="ad-detail-box">
    <div class="tab-head">
      <span class="title">投放广告</span>
    </div>
    <div v-loading="loading">
      <Form
        v-if="showForm"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="onClickCancel"
        @confirm="onClickConfirm"
      >
        <template v-slot="{ formItem }">
          <div v-if="formItem.putService === 4">{{ formItem.putService }}</div>
        </template>
        <template v-slot="{ formItem } ">
          <div v-if="formItem.putService === 4">
            <div class="select_data">
              <span class="el-icon-info icon" />
              <span>
                已添加
                <span class="blue">{{ dynamicTags.length }}</span> 项目
              </span>
              <el-button class="btn" type="text" @click="clickClearAll">清空</el-button>
            </div>
            <div class="tag-box">
              <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                closable
                class="tag-item"
                :disable-transitions="false"
                size="small"
                @close="clickClose(tag)"
              >{{ tag }}</el-tag>
              <el-button class="button-new-tag" size="small" @click="clickAddService">+ 添加服务商</el-button>
            </div>
          </div>
        </template>
      </Form>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ drawerTitle }}</div>
      <div class="search-box">
        <span class="label">精准筛选:</span>
        <el-input v-model="input" placeholder="请输入内容" class="input-with-select" size="40%">
          <el-select slot="prepend" v-model="select" class="input-select-box" placeholder="请选择">
            <el-option label="服务商ID" value="1"></el-option>
            <el-option label="服务商名称" value="2"></el-option>
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
        <el-button type="primary" size="medium" @click="clickSearch">搜索</el-button>
        <el-button size="medium" @click="clickReset">重置</el-button>
      </div>
      <div class="form-box">
        <!-- <div class="select_data2">
          <span class="el-icon-info icon" />
          <span>
            已选择
            <span class="blue">{{ selectData.length }}</span> 项目
          </span>
          <el-button class="btn" type="text" @click="clickClearMrechant">清空</el-button>
        </div> -->
        <BaseCrud
          v-if="drawer"
          ref="merchant"
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
        <el-button type="primary" size="medium" @click="clickConfirm">确定</el-button>
        <el-button size="medium" @click="clickCancel">关闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import apiAgent from "@/api/api_agent.js";
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
      loading: true,
      showForm: false,
      input: "",
      configData2: FORM_CONFIG2,
      areaData: areaData,
      select: "",
      select2: "",
      select3: "",
      par: {},
      options: [],
      testData: [],
      selectData: [],
      dynamicTags: [],
      myDynamicTags: [],
      drawerTitle: "添加投放的服务商",
      id: this.$route.query.id,
      api: apiAgent.queryAllDistributeAgent
    };
  },
  computed: {
    advertType: function() {
      return this.$store.state.dataMarket.advertType;
    }
  },
  watch: {
    advertType(newVal, oldVal) {
      const tempData = this.$g.utils.deepClone(FORM_CONFIG.addData.formData);
      tempData[0].initVal = newVal;
      tempData[1].urlOptions = {
        url: apiAgent.queryAllDistributeName,
        keyName: 'id',
        valueName: 'advertName',
        method: 'get',
        params: {
          advertType: newVal
        }
      };
      this.$set(this.fromConfigData, 'formData', tempData);
    }
  },
  created() {
    this.queryAllPrivilegeType();
    if (this.id) {
      this.queryById();
      return;
    }
    this.showForm = true;
    this.loading = false;
  },
  methods: {
    // 点击清空按钮重置数据
    clickClearAll() {
      this.dynamicTags = [];
    },

    // 点击清空重置表单数据
    clickClearMrechant() {
      this.$refs.merchant.$children[0].clearSelection()
    },

    // 查询数据
    queryAllPrivilegeType() {
      apiAgent.queryAllPrivilegeType({}).then(res => {
        this.options = res.data;
      })
    },

    // 获取详情数据
    queryById() {
      apiAgent.queryById({ id: this.id }).then(res => {
        // 编辑前重赋值
        FORM_CONFIG.editData.formData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        this.fromConfigData = FORM_CONFIG.editData;
        this.loading = false;
        this.showForm = true;
      })
    },

    // 关闭时截取数据
    clickClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    // 点击添加按钮弹出侧边弹窗
    clickAddService() {
      this.drawer = true;
    },

    // 查询数据
    getTableData() {
      this.par = {
        provinceCode: this.select2[0],
        cityCode: this.select2[1],
        businessType: this.select3
      };
      if (this.select === '1') {
        this.par.agentNo = this.input;
      } else if (this.select === '2') {
        this.par.agentName = this.input;
      }
      apiAgent.queryAllDistributeAgent(this.par).then(res => {
        this.testData = res.data;
      })
    },

    // 点击取消返回上一页
    onClickCancel() {
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

    // 点击确定
    clickConfirm() {
      this.dynamicTags = this.myDynamicTags;
      this.drawer = false;
    },

    // 点击重置清空数据
    clickReset() {
      this.input = "";
      this.select = "";
      this.select2 = "";
      this.select3 = "";
    },

    // 点击搜索查询数据
    clickSearch() {
      this.getTableData();
    },

    // 点击取消关闭侧边弹窗
    clickCancel() {
      this.drawer = false;
    },

    // 点击确认按钮
    onClickConfirm($form) {
      if (this.id) {
        apiAgent.advertDistributeUpdate({
          agentNoList: this.selectData,
          beginTime: $form.time[0],
          endTime: $form.time[1]
        }).then(res => {
          this.$router.back(-1);
        })
      } else {
        apiAgent.advertDistributeAdd({
          advertId: $form.id,
          agentNoList: this.selectData,
          distributeType: $form.putService,
          operationId: $form.operationId,
          sort: Number($form.sort),
          beginTime: $form.time[0],
          endTime: $form.time[1]
        }).then(res => {
          this.$router.back(-1);
        })
      }
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

.form-box {
  padding: 0 24px;
}

.input-select-box {
  width: 130px !important;
}

.tag-box {
  margin: 16px 0 0 126px;
  padding: 9px 15px;
  width: 50%;
  height: 82px;
  border-radius: 4px;
  border: 1px solid rgba(219, 223, 231, 1);

  .tag-item {
    margin: 0 5px;
  }
}

.select_data {
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

.select_data2 {
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
  padding: 0 24px;
  text-align: right;
}

.ad-detail-box {
  overflow: hidden;
}
</style>
