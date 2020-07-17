<template>
  <div class>
    <div class="p_head_detail" :class="[activeClass]">
      <div class="top">
        <span>{{agentDetail.agentName}}</span>
        <el-dropdown trigger="click" @command="onClick_changeClientType">
          <div class="el-dropdown-link">
            <div class="doit" :class="[activeClass]"></div>
            <div>
              {{ activeValue }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in clientList"
              :key="index"
              :command="item"
            >{{ item.value }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="tags">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          size="small"
          @close="handleClose(tag)"
        >{{ tag }}</el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </div>
    </div>

    <detailMode :rule-form="ruleForm" :config-data="configData" @edit="itemEdit"></detailMode>

    <detailMode :rule-form="ruleForm" :config-data="configData2" @edit="rateEdit"></detailMode>

    <div class="bg_box">
      <div class="title">应用</div>
      <el-row>
        <el-col :span="8" class="app">
          <img src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4" alt />
          <div>订购设备</div>
        </el-col>
        <el-col :span="8" class="app">
          <img src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4" alt />
          <div>佣金结算</div>
        </el-col>
        <el-col :span="8" class="app border_none">
          <img src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4" alt />
          <div>第三方对接</div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="9">
        <div class="bg_box" style="margin-right:0;margin-top:0;height:314px">
          <div class="title">沟通数据</div>

          <el-select
            v-model="value"
            size="medium"
            placeholder="请选择"
            style="margin:32px;width:calc(100% - 64px)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-row>
            <el-col :span="8" class="data_item" style="height:58px">
              <div class="data_item_title">客情维护</div>
              <div>55次</div>
            </el-col>
            <el-col :span="8" class="data_item" style="height:58px">
              <div class="data_item_title">客情维护</div>
              <div>55次</div>
            </el-col>
            <el-col :span="8" class="data_item border_none" style="height:58px">
              <div class="data_item_title">客情维护</div>
              <div>55次</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="bg_box" style="margin-left:0;margin-top:0;height:314px">
          <img class="title_img" src="@/assets/img/clock.png" alt />
          <div class="title">
            待沟通{{ planCount }}次
            <el-button type="primary" style="float:right;margin:10px 24px">添加沟通计划</el-button>
          </div>

          <BaseCrud
            :grid-config="tableConfigData.gridConfig"
            :grid-btn-config="tableConfigData.gridBtnConfig"
            :grid-data="testData"
            :form-config="tableConfigData.formConfig"
            :form-data="tableConfigData.formModel"
            :grid-edit-width="100"
            :table-height="212"
            form-title="用户"
            :is-async="false"
            :params="params1"
            :api-service="api1"
            style="margin:24px;border:1px solid #EBEEF5;height:212px;overflow:hidden"
          ></BaseCrud>
        </div>
      </el-col>
    </el-row>
    <div class="bg_box" style="height:411px;margin-top:0;">
      <div class="title">
        历史沟通记录
        <el-button type="primary" style="float:right;margin:10px 24px">添加沟通计划</el-button>
        <el-button style="float:right;margin:10px 0px">查看联系人</el-button>
      </div>

      <BaseCrud
        :grid-config="tableConfigData.gridConfig"
        :grid-btn-config="tableConfigData.gridBtnConfig"
        :grid-data="testData"
        :form-config="tableConfigData.formConfig"
        :form-data="tableConfigData.formModel"
        :grid-edit-width="100"
        :table-height="309"
        form-title="用户"
        :is-async="false"
        :params="params2"
        :api-service="api2"
        style="margin:24px;border:1px solid #EBEEF5;height:309px;overflow:hidden"
      ></BaseCrud>
    </div>

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        @confirm="handel_confirm"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import Form from "@/components/form/index.vue";
import api from "@/api/api_agent.js";
import BaseCrud from "@/components/table/BaseCrud.vue";
import detailMode from "@/components/detailMode/detailMode.vue";
import { USER_CONFIG, USER_CONFIG2 } from "./tableConfig/config_communicate";
import { FORM_CONFIG } from "./formConfig/agentDetail";

export default {
  name: "Theme",
  components: { detailMode, BaseCrud, Form },
  data() {
    return {
      agentDetail: {},
      drawer: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      configData: {
        name: "基本信息",
        child: [
          {
            name: "基本资料",
            modelName: "basicData",
            models: [
              {
                items: [
                  {
                    name: "公司名称",
                    key: "agentName"
                  },
                  {
                    name: "法人手机号",
                    key: "personMobile"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "邮箱",
                    key: "email"
                  },
                  {
                    name: "营业执照图",
                    key: "businessLicenseImg",
                    type: "img"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "法人姓名",
                    key: "personName"
                  },
                  {
                    name: "公司地址",
                    key: "companyAddress"
                  }
                ]
              }
            ]
          },
          {
            name: "财务",
            modelName: "finance",
            models: [
              {
                items: [
                  {
                    name: "结算卡类型",
                    key: "bankAccountType"
                  },
                  {
                    name: "开户支行地区",
                    key: "bankArea"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "开户名",
                    key: "bankAccountHolder"
                  },
                  {
                    name: "开户支行",
                    key: "bankBranchName"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "银行卡号",
                    key: "bankCardNo"
                  }
                ]
              }
            ]
          },
          {
            name: "邮寄地址",
            modelName: "address",
            models: [
              {
                items: [
                  {
                    name: "收件人",
                    key: "personName"
                  },
                  {
                    name: "详细地址",
                    key: "detailAddress"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "手机号",
                    key: "personMobile"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "地区",
                    key: "name3"
                  }
                ]
              }
            ]
          }
        ]
      },
      configData2: {
        name: "行业信息",
        child: [
          {
            name: "费率",
            modelName: "rateInfo",
            models: [
              {
                items: [
                  {
                    name: "微信/支付宝费率",
                    key: "wechatPayRate"
                  },
                  {
                    name: "云闪付费率单笔＞1000",
                    key: "cloudPayGt1000Rate"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "云闪付费率单笔≤1000",
                    key: "cloudPayLe1000Rate"
                  }
                ]
              }
            ]
          },
          {
            name: "续费",
            modelName: "renew",
            models: [
              {
                items: [
                  {
                    name: "开户时间",
                    key: "activeDate"
                  },
                  {
                    name: "缴费金额",
                    key: "renewValue"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "到期时间",
                    key: "expireDate"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "续费方式",
                    key: "renewType"
                  }
                ]
              }
            ]
          },
          {
            name: "权限",
            modelName: "mailAddress",
            models: [
              {
                items: [
                  {
                    name: "服务地区",
                    key: "name1"
                  },
                  {
                    name: "平台分润抽成",
                    key: "chargeFeePercent"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "是否开通下级",
                    key: "expandSub"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "服务类型",
                    key: "activeMode"
                  }
                ]
              }
            ]
          }
        ]
      },
      value: "",
      options: [
        {
          value: 1,
          label: "a"
        }
      ],
      testData: [],
      tableConfigData: USER_CONFIG,
      tableConfigData2: USER_CONFIG2,
      fromConfigData: [],
      ruleForm: {},
      agentNo: '',
      planCount: 0,
      params1: {
        id: 1,
        addressBookId: 1,
        relateCode: "",
        remark: "",
        nextContactTime: "",
        remindTime: "",
        remindType: "",
        createTime: ""
      },
      api1: api.queryPlan,
      params2: {
        id: 1,
        addressBookId: 1,
        relateCode: "",
        theme: "",
        way: "",
        content: "",
        createTime: ""
      },
      api2: api.queryPlanList,
      clientList: [
        {
          value: "情绪客户",
          colorName: "red"
        },
        {
          value: "优质客户",
          colorName: "green"
        },
        {
          value: "普通客户",
          colorName: "yellow"
        }
      ],
      activeClass: "red",
      activeValue: "情绪客户",
      editType: ''
    };
  },
  created() {
    this.agentNo = this.$route.query.agentNo
    this.getDetail(this.agentNo);
    this.getPlanCount();
  },
  mounted() {},
  methods: {
    onClick_changeClientType($item) {
      this.activeClass = $item.colorName;
      this.activeValue = $item.value;
    },
    getDetail(agentNo) {
      api.getAgentDetail({
        agentNo: agentNo
      }).then(res => {
        if (res.object) {
          this.agentDetail = res.object
          res.object.labelList.forEach(item => {
            this.dynamicTags.push(item.name);
          });
          this.ruleForm = res.object
        }
      });
    },
    getPlanCount() {
      api
        .planCount({
          relateCode: ""
        })
        .then(res => {
          this.planCount = res.object;
        });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    go_detail() {
      // eslint-disable-next-line no-console
      this.$router.push("/agent/list/detail");
    },
    itemEdit($model) {
      if ($model === 'basicData') {
        this.editType = 'editBasicData'
      }
      if ($model === 'finance') {
        this.editType = 'editFincance'
      }
      this.drawer = true;
      const newFromConfigData = FORM_CONFIG[$model];
      newFromConfigData.formData.forEach((item, index) => {
        item.initVal = this.agentDetail[item.key];
      });
      this.fromConfigData = newFromConfigData;
    },
    rateEdit($model) {
      if ($model === 'rateInfo') {
        this.editType = 'editRateInfo'
      }
      if ($model === 'mailAddress') {
        this.editType = 'editMailAddress'
      }
      this.drawer = true;
      const newFromConfigData = FORM_CONFIG[$model];
      newFromConfigData.formData.forEach((item, index) => {
        item.initVal = this.agentDetail[item.key];
      });
      this.fromConfigData = newFromConfigData;
    },
    cancel() {
      this.editType = ''
      this.drawer = false;
    },
    handel_confirm(row) {
      console.log(row)
      if (this.editType === 'editBasicData') {
        if (!row.businessType || !row.agentName || !row.personName || !row.personMobile || !row.email || !row.companyAddress || !row.businessLicenseImg) {
          this.$message({
            message: '请填写完整信息',
            type: 'info'
          })
          return false
        } else {
          api.updateAgentBaseInfo({
            agentNo: this.$route.query.agentNo,
            businessType: row.businessType,
            agentName: row.agentName,
            personName: row.personName,
            personMobile: row.personMobile,
            email: row.email,
            companyAddress: row.companyAddress,
            businessLicenseImg: row.businessLicenseImg.dialogImageUrl
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '基础资料更新成功',
                type: 'success'
              })
              this.getDetail(this.$route.query.agentNo)
              this.editType = ''
              this.drawer = false
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
      if (this.editType === 'editFincance') {
        api.updateFinancial({
          agentNo: this.$route.query.agentNo,
          bankAccountHolder: row.bankAccountHolder,
          bankCardNo: row.bankCardNo,
          bankArea: row.bankArea,
          bankBranchName: row.bankBranchName,
          bankAccountType: row.bankAccountType
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '财务资料更新成功',
              type: 'success'
            })
            this.getDetail(this.$route.query.agentNo)
            this.editType = ''
            this.drawer = false
          }
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.editType === 'editRateInfo') {
        if (!row.wechatPayRate || !row.cloudPayLe1000Rate || !row.cloudPayGt1000Rate) {
          this.$message({
            message: '请填写完整费率信息',
            type: "warning"
          })
          return false
        } else {
          if (row.wechatPayRate < 3 || row.wechatPayRate > 6) {
            this.$message({
              message: '请输入正确的费率',
              type: "warning"
            })
            return false
          } else if ((row.cloudPayLe1000Rate || row.cloudPayGt1000Rate) < 2.3 || (row.cloudPayLe1000Rate || row.cloudPayGt1000Rate) > 10) {
            this.$message({
              message: '请输入正确的费率',
              type: "warning"
            })
            return false
          } else {
            api.updateAgentRate({
              agentNo: this.$route.query.agentNo,
              wechatPayRate: Number(row.wechatPayRate),
              alipayRate: Number(row.wechatPayRate),
              cloudPayLe1000Rate: Number(row.cloudPayLe1000Rate),
              cloudPayGt1000Rate: Number(row.cloudPayGt1000Rate)
            }).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: '财务资料更新成功',
                  type: 'success'
                })
                this.getDetail(this.$route.query.agentNo)
                this.editType = ''
                this.drawer = false
              }
            })
          }
        }
      }
      if (this.editType === 'editMailAddress') {
        if (!row.activeMode || !row.chargeFeePercent || !row.expandSub) {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          })
          return false
        } else {
          // api.updateAgentPrivilege({
          //   activeMode: row.activeMode,
          //   chargeFeePercent: row.chargeFeePercent,
          //   expandSub: row.expandSub,
          //   agentNo: this.$route.query.agentNo,
          // })
        }
      }
    }
  }
};
</script>

<style lang="scss">
.p_head_detail {
  height: 114px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  &.red {
    border-bottom: 2px solid #f5222d;
  }
  &.green {
    border-bottom: 2px solid #30b08f;
  }
  &.yellow {
    border-bottom: 2px solid #fec171;
  }
  .top {
    margin: 24px 32px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    span {
      margin-right: 24px;
    }
  }
  .doit {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    float: left;
    margin-top: 5px;
    margin-right: 5px;
    &.red {
      background: #f5222d;
    }
    &.green {
      background: #30b08f;
    }
    &.yellow {
      background: #fec171;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #333335;
    width: 100px;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: top;
    height: 23px;
    line-height: 23px;
  }
  .tags {
    margin-left: 32px;
  }
  .el-input--mini .el-input__inner {
    height: 24px !important;
    line-height: 24px !important;
  }
}

.bg_box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .title {
    height: 54px;
    line-height: 54px;
    padding-left: 32px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
  }
  .title_img {
    width: 20px;
    height: 20px;
    margin: 18px 24px 0;
    float: left;
  }
}
.app {
  border-right: 1px solid #ebeef5;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 88px;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
}

.data_item {
  border-right: 1px solid #ccc;
  margin-top: 16px;
  .data_item_title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    border: none;
    text-align: center;
    margin: 3px 0 17px;
  }
  div {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}

.border_none {
  border: none;
}
</style>
