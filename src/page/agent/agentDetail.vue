<template>
  <div>
    <div class="p-head-detail" :class="[activeClass]">
      <div class="top">
        <span>{{ agentDetail.agentName }}</span>
        <!--TODO 后续版本开发
        <el-dropdown trigger="click" @command="onClick_changeClientType">
          <div class="el-dropdown-link">
            <div class="doit" :class="[activeClass]"></div>
            <div>
              {{ activeValue }}
              <i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in clientList"
              :key="index"
              :command="item"
            >{{ item.value }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
      </div>
      <!--TODO  后续版本开发
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
          @input="tagInput"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </div>-->
    </div>

    <detailMode
      v-if="ruleForm.businessType === 'enterprise'"
      :rule-form="ruleForm"
      :config-data="configData"
      @edit="onClickItemEdit"
    ></detailMode>
    <detailMode
      v-if="ruleForm.businessType === 'individual'"
      :rule-form="ruleForm"
      :config-data="configData1"
      @edit="onClickItemEdit"
    ></detailMode>
    <detailMode
      :rule-form="ruleForm"
      :config-data="configData2"
      @edit="rateEdit"
    >
    </detailMode>

    <div class="bg-box">
      <div class="title">应用</div>
      <el-row>
        <el-col :span="8" class="app" @click.native="orderEquipment">
          <img src="../../assets/img/Group.png" alt />
          <div>订购设备</div>
        </el-col>
      </el-row>
    </div>

    <!--TODO  后续版本开发
    <el-row :gutter="20">
      <el-col :span="9">
        <div class="bg-box" style="margin-right:0;margin-top:0;height:314px">
          <div class="title">沟通数据</div>
          <div style="text-align:center;">
            <el-date-picker
              v-model="timeDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              class="select-date"
              @change="dateChange"
            >
            </el-date-picker>
          </div>
          <div class="talk-info">
            <el-row>
              <el-col :span="8" class="data-item">
                <div class="data-item-title">{{ summaryInfo.theme1 }}</div>
                <div>{{ summaryInfo.theme1Count }}次</div>
              </el-col>
              <el-col :span="8" class="data-item">
                <div class="data-item_title">{{ summaryInfo.theme2 }}</div>
                <div>{{ summaryInfo.theme2Count }}次</div>
              </el-col>
              <el-col :span="8" class="data-item border-none">
                <div class="data-item-title">沟通类型</div>
                <div>{{ summaryInfo.otherThemeCount }}次</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="bg-box" style="margin-left:0;margin-top:0;height:314px">
          <img class="title-img" src="@/assets/img/clock.png" alt />
          <div class="title">
            待沟通<span style="color: #1989FA; padding: 0 4px;">{{ willConactNum }}</span>次
            <el-button type="primary" style="float: right; margin: 10px 24px;" @click="addContacts">添加沟通计划</el-button>
          </div>

          <BaseCrud
            :grid-config="tableConfigData.gridConfig"
            :grid-btn-config="tableConfigData.gridBtnConfig"
            :grid-data="talkPlanList"
            :form-config="tableConfigData.formConfig"
            :form-data="tableConfigData.formModel"
            :grid-edit-width="100"
            :table-height="212"
            form-title="用户"
            :is-async="true"
            :params="params1"
            style="margin:24px;border:1px solid #EBEEF5;height:212px;overflow:hidden"
            @detail="editDetail"
          ></BaseCrud>
        </div>
      </el-col>
    </el-row>
    <div class="bg-box" style="height:411px;margin-top:0;">
      <div class="title">
        历史沟通记录
        <el-button type="primary" style="float:right;margin:10px 24px" @click="addSubtotal">添加沟通小计</el-button>
        <el-button style="float:right;margin:10px 0px" @click="viewLiaison">查看联系人</el-button>
      </div>

      <BaseCrud
        :grid-config="tableConfigData2.gridConfig"
        :grid-btn-config="tableConfigData2.gridBtnConfig"
        :grid-data="channelList"
        :form-config="tableConfigData2.formConfig"
        :form-data="tableConfigData2.formModel"
        :grid-edit-width="100"
        :table-height="309"
        form-title="用户"
        :is-async="true"
        :params="params2"
        style="margin:24px;border:1px solid #EBEEF5;height:309px;overflow:hidden"
        @detail="viewDetail"
      ></BaseCrud>
    </div>-->

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <Form
        :is-drawer="true"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        @confirm="onClickcConfirm"
        @cancel="cancel"
      ></Form>
    </el-drawer>
    <el-drawer :visible.sync="financeDrawer" :with-header="false" size="500px">
      <div class="finance-title">财务信息</div>
      <div class="finance-box">
        <el-form :model="financeModel" :rules="rules">
          <el-form-item label="结算卡类型" prop="bankAccountType" label-width="110px">
            <el-radio-group v-model="financeModel.bankAccountType">
              <el-radio label="public">对公</el-radio>
              <el-radio label="private">对私</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bankCardNo" label-width="110px">
            <el-input v-model="financeModel.bankCardNo" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户支行" prop="bankContactLine" label-width="110px">
            <el-select
              v-model="financeModel.bankContactLine"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              @change="clickChangeSelect"
            >
              <el-option
                v-for="item in bankOptions"
                :key="item.unionCode"
                :label="item.bankName"
                :value="item.unionCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户支行地区" prop="bankArea" label-width="110px">
            <el-input v-model="area" disabled></el-input>
          </el-form-item>
          <el-form-item label="开户名" prop="bankAccountHolder" label-width="110px">
            <el-input v-model="financeModel.bankAccountHolder" placeholder="请输入开户名"></el-input>
          </el-form-item>
        </el-form>
        <div class="bottom-btn">
          <el-button type="primary" size="normal" @click="clickSave">保存</el-button>
          <el-button size="normal" @click="clickClose">取消</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :visible.sync="equipment" :with-header="false" size="500px">
      <div class="p-head">{{ equipmentConfigData.title }}</div>
      <Form
        ref="liaisonRef"
        :is-drawer="true"
        :form-base-data="equipmentConfigData.formData"
        :show-foot-btn="equipmentConfigData.showFootBtn"
        @confirm="onClickEquipmentConfirm"
        @cancel="cancel"
      ></Form>
    </el-drawer>
    <!--TODO 后续版本开发
    <el-drawer :title="contactConfigData.title" :visible.sync="addContactsDraw" :with-header="false" size="500px">
      <div class="p-head">{{ contactConfigData.title }}</div>
      <Form
        ref="liaisonRef"
        :is-drawer="true"
        :form-base-data="contactConfigData"
        :show-foot-btn="contactConfigData.showFootBtn"
        @confirm="handel_addContacts"
        @cancel="cancel"
      ></Form>
    </el-drawer>
    <el-drawer :visible.sync="findLiaison" :with-header="false" size="500px">
      <div class="top-title">
        <span class="the-title">查看联系人</span>
        <el-button type="primary" @click="liaisonAdd">添加联系人</el-button>
      </div>
      <ul class="liaisonList">
        <li v-for="(item, index) in contactsList" :key="index" class="liaison-contant">
          <div class="liaison-top">
            <span class="liaison-name">{{ item.linkmanName }}</span>
            <div class="liaison-editor" @click="editLiaison(item)">编辑</div>
          </div>
          <div class="liasion-info">
            <div class="info-list">
              <span>手机号：</span>
              <span>{{ item.phoneNum }}</span>
            </div>
            <div class="info-list">
              <span>职位：</span>
              <span>{{ item.jobName || '' }}</span>
            </div>
            <div class="info-list">
              <span>备注：</span>
              <span>{{ item.remark || '' }}</span>
            </div>
            <div class="jobStatus">
              <img v-if="item.jobStatus === 'on'" src="../../assets/img/injob.png" alt="">
              <img v-else src="../../assets/img/outjob.png" alt="">
            </div>
          </div>
        </li>
      </ul>
    </el-drawer>
    <el-drawer :visible.sync="addLiaison" :with-header="false" size="500px">
      <Form
        ref="liaisonRef"
        :is-drawer="true"
        :form-base-data="liaisonConfigData.formData"
        :show-foot-btn="liaisonConfigData.showFootBtn"
        @confirm="handel_addLiaison"
        @cancel="liaisonCancel"
      ></Form>
    </el-drawer>
    <el-dialog title="沟通记录详情" :visible.sync="dialogTableVisible">
      <ul class="liaison-detail">
        <li>
          <span>联系人：</span>
          <span>{{ talkListDetail.linkmanName }}</span>
        </li>
        <li>
          <span>职位：</span>
          <span>{{ talkListDetail.jobName }}</span>
        </li>
        <li>
          <span>手机号：</span>
          <span>{{ talkListDetail.phoneNum }}</span>
        </li>
        <li>
          <span>创建人：</span>
          <span>{{ talkListDetail.operationName }}</span>
        </li>
        <li>
          <span>创建时间：</span>
          <span>{{ talkListDetail.createTime }}</span>
        </li>
        <li>
          <span>沟通方式：</span>
          <span>{{ talkListDetail.way }}</span>
        </li>
        <li>
          <span>沟通主题：</span>
          <span>{{ talkListDetail.theme }}</span>
        </li>
        <li v-if="talkListDetail.merchantList && talkListDetail.merchantList.length>0">
          <div>问题商户：</div>
          <div v-for="(item, index) in talkListDetail.merchantList" :key="index">
            <p>{{ item.merchantName }}</p>
            <p>李四</p>
          </div>
        </li>
        <li>
          <span>沟通内容：</span>
          <span>{{ talkListDetail.content }}</span>
        </li>
      </ul>
    </el-dialog>
    -->
  </div>
</template>

<script>
import Form from "@/components/form/index.vue";
import api from "@/api/api_agent.js";
import api_device from "@/api/api_device.js";
import detailMode from "@/components/detailMode/detailMode.vue";
import {ORDER_EQUIPMENT} from "./formConfig/orderEquipmentForm";
import {USER_CONFIG, USER_CONFIG2} from "./tableConfig/config_communicate";
import {DETAILCONFIG} from "./tableConfig/agentDetailConfig";
import {FORM_CONFIG} from "./formConfig/agentDetail";
import areaData from "@/assets/data/areaData";

export default {
  name: "AgentDetail",
  components: {detailMode, Form},
  data() {
    return {
      channelList: [],
      talkPlanList: [],
      contactId: '',
      talkListDetail: {},
      dialogTableVisible: false,
      liaisonId: '',
      equipment: false,
      addLiaison: false,
      findLiaison: false,
      addDrewerType: '',
      willConactNum: 0,
      agentDetail: {},
      drawer: false,
      addContactsDraw: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      configData: DETAILCONFIG.configData,
      configData1: DETAILCONFIG.configData1,
      configData2: DETAILCONFIG.configData2,
      equipmentConfigData: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timeDate: [],
      tableConfigData: USER_CONFIG,
      tableConfigData2: USER_CONFIG2,
      liaisonConfigData: {},
      contactConfigData: {},
      fromConfigData: [],
      ruleForm: {},
      agentNo: this.$route.query.agentNo,
      params1: {},
      api1: api.queryTalkPlan,
      params2: {},
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
      activeClass: "",
      activeValue: "情绪客户",
      editType: '',
      contactsList: [],
      liaisonType: '',
      summaryInfo: {},
      financeModel: {
        bankAccountType: 'public',
        bankCardNo: '',
        bankContactLine: '',
        bankAccountHolder: ''
      },
      rules: {
        bankAccountType: [
          {required: true, message: '请选择结算卡类型', trigger: 'change'}
        ],
        bankCardNo: [
          {required: true, message: '请填写银行卡号', trigger: 'blur'}
        ],
        bankContactLine: [
          {required: true, message: '请填写开户支行', trigger: 'change'}
        ],
        bankAccountHolder: [
          {required: true, message: '请填写开户名', trigger: 'blur'}
        ]
      },
      area: '',
      loading: false,
      areaCodeNum: '',
      bankOptions: [],
      financeDrawer: false
    };
  },
  created() {
    this.getDetail();
    const now = new Date();
    const year = now.getFullYear() // 得到年份
    const month = now.getMonth() + 1// 得到月份
    const date = now.getDate() // 得到日期
    const month1 = month < 10 ? "0" + month : month
    const date1 = date < 10 ? "0" + date : date
    var start = year + '-' + month1 + '-' + date1 + ' ' + '00' + ':' + '00' + ':' + '00'
    var end = year + '-' + month1 + '-' + date1 + ' ' + '23' + ':' + '59' + ':' + '59'
    this.timeDate = [start, end]
    /* TODO 后续版本开发
       localStorage.setItem('liasionAgent', this.agentNo)
       this.getQueryWait()
       this.gatTag()
       this.getAddressBookQuery()
       this.getRelatedLabels()
       this.getSelectSummary(this.timeDate)
       this.getQueryTalkPlan()
       this.getQueryPlanList()
     */
  },
  mounted() {
  },
  methods: {
    // 远程搜索开户支行
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          api.listBankLineByName({
            name: query,
            limit: 30
          }).then(res => {
            if (res.data) {
              this.bankOptions = res.data
            }
          })
        }, 200);
      } else {
        this.bankOptions = [];
      }
    },

    // 点击更换开户支行
    clickChangeSelect(item) {
      api.getBankLineByNo({
        unionCode: item
      }).then(res => {
        var provinceName = '';
        var cityName = '';
        var areaName = '';
        var result = this.$g.utils.getNestedArr(areaData, 'children')
        result.forEach(m => {
          if (m.value === res.data.provinceCode) {
            provinceName = m.label
          }
          if (m.value === res.data.cityCode) {
            cityName = m.label
          }
          if (m.value === res.data.areaCode) {
            areaName = m.label
          }
        })
        this.bankName = res.data.bankName
        this.area = provinceName + '/' + cityName + '/' + areaName
        this.areaCodeNum = res.data.areaCode
      })
    },

    // 保存修改的财务信息
    clickSave() {
      if (!this.financeModel.bankAccountType ||
        !this.financeModel.bankCardNo ||
        !this.financeModel.bankContactLine ||
        !this.financeModel.bankAccountHolder) {
        this.warnMessage()
      }
      api.updateFinancial({
        agentNo: this.agentNo,
        bankAccountHolder: this.financeModel.bankAccountHolder,
        bankCardNo: this.financeModel.bankCardNo,
        bankContactLine: this.financeModel.bankContactLine,
        bankBranchName: this.bankName,
        bankArea: this.areaCodeNum,
        bankAccountType: this.financeModel.bankAccountType
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '财务资料更新成功',
            type: 'success'
          })
          this.getDetail()
          this.editType = ''
          this.financeDrawer = false
        }
      })
    },

    // 关闭打开的财务信息编辑弹窗
    clickClose() {
      this.financeDrawer = false
    },

    // 查询服务商详情
    getDetail() {
      api.getAgentDetail({
        agentNo: this.agentNo
      }).then(res => {
        if (res.status === 0) {
          const agentDetail = this.$g.utils.deepClone(res.data)
          if (agentDetail.expandSub === 1) {
            agentDetail.expandSubCn = '是'
          } else if (agentDetail.expandSub === 0 || agentDetail.expandSub === null) {
            agentDetail.expandSub = 0
            agentDetail.expandSubCn = '否'
          }
          agentDetail.renewTypeCn = '固定续费'
          this.dynamicTags = agentDetail.labelList.map(item => item.name)
          if (agentDetail.wechatPayRate) {
            agentDetail.alipayRate = this.$g.utils.AccMul(agentDetail.alipayRate, 1000);
            agentDetail.wechatPayRate = this.$g.utils.AccMul(agentDetail.wechatPayRate, 1000);
            agentDetail.cloudPayGt1000Rate = this.$g.utils.AccMul(agentDetail.cloudPayGt1000Rate, 1000);
            agentDetail.cloudPayLe1000Rate = this.$g.utils.AccMul(agentDetail.cloudPayLe1000Rate, 1000);
          }
          if (agentDetail.chargeFeePercent) {
            agentDetail.chargeFeePercent = this.$g.utils.AccMul(agentDetail.chargeFeePercent, 100)
          }
          if (agentDetail.provinceCode) {
            agentDetail.area = [agentDetail.provinceCode, agentDetail.cityCode, agentDetail.areaCode]
          }
          if (agentDetail.activeMode) {
            agentDetail.activeMode = 'relyus'
            agentDetail.activeModeCn = '产品代理'
          }
          if (agentDetail.bankAccountType === 'private') {
            agentDetail.bankAccountTypeCn = '对私'
          } else if (agentDetail.bankAccountType === 'public') {
            agentDetail.bankAccountTypeCn = '对公'
          }
          agentDetail.activeScopeCode = [agentDetail.activeScope.provinceCode, agentDetail.activeScope.cityCode]
          if (agentDetail.postId) {
            agentDetail.detailAddress = agentDetail.postDetailAddress
            agentDetail.personMobile = agentDetail.postPersonMobile
            agentDetail.personName = agentDetail.postPersonName
            agentDetail.provinceName = agentDetail.postProvinceMsg
            agentDetail.cityName = agentDetail.postCityMsg
            agentDetail.areaName = agentDetail.postAreaMsg
            agentDetail.postArea = [agentDetail.postProvinceCode, agentDetail.postCityCode, agentDetail.postAreaCode]
          }
          this.agentDetail = agentDetail
          this.ruleForm = agentDetail
        }
      });
    },

    // 订购设备弹出框
    orderEquipment() {
      this.equipment = true
      this.equipmentConfigData = ORDER_EQUIPMENT
      this.equipmentConfigData.formData[7].initVal = this.agentDetail.postProvinceMsg ? this.agentDetail.postProvinceMsg + this.agentDetail.postCityMsg + this.agentDetail.postAreaMsg + this.agentDetail.postDetailAddress : ''
    },

    // 点击编辑按钮
    onClickItemEdit($model) {
      if ($model === 'address') {
        this.editAddress();
      } else if ($model === 'basicData') {
        this.editBasic();
      } else if ($model === 'finance') {
        this.editFinance();
      }
    },

    // 邮寄地址编辑的数据回显
    editAddress() {
      this.editType = 'editMailAddress'
      this.fromConfigData = {}
      this.drawer = true;
      this.$nextTick(() => {
        const newFromConfigData = this.$g.utils.deepClone(FORM_CONFIG.address);
        newFromConfigData.formData.forEach(item => {
          item.initVal = this.agentDetail[item.key];
        });
        this.fromConfigData = newFromConfigData;
      })
    },

    // 基础信息编辑的数据回显
    editBasic() {
      this.fromConfigData = {}
      this.drawer = true;
      this.$nextTick(() => {
        this.editType = 'editBasicData'
        const newFromConfigData = this.$g.utils.deepClone(FORM_CONFIG.basicData);
        newFromConfigData.formData.forEach((item, index) => {
          item.initVal = this.agentDetail[item.key];
        });
        this.fromConfigData = newFromConfigData;
      })
    },

    // 财务信息编辑的数据回显
    editFinance() {
      this.editType = 'editFincance'
      if (this.ruleForm.bankBranchName) {
        this.remoteMethod(this.ruleForm.bankBranchName)
        this.clickChangeSelect(this.ruleForm.bankContactLine)
      }
      this.areaCodeNum = this.ruleForm.bankArea
      this.bankName = this.ruleForm.bankBranchName
      this.financeModel = {
        bankContactLine: this.ruleForm.bankContactLine,
        bankCardNo: this.ruleForm.bankCardNo,
        bankAccountType: this.ruleForm.bankAccountType,
        bankAccountHolder: this.ruleForm.bankAccountHolder
      }
      this.financeDrawer = true
    },

    // 编辑的数据回显
    rateEdit($model) {
      if ($model === 'rateInfo') {
        this.editType = 'editRateInfo'
      }
      if ($model === 'mailAddress') {
        this.editType = 'editAuthority'
      }
      if ($model === 'renew') {
        this.editType = 'editRenew'
      }
      this.drawer = true;
      setTimeout(() => {
        const newFromConfigData = FORM_CONFIG[$model];
        newFromConfigData.formData.forEach((item, index) => {
          item.initVal = this.agentDetail[item.key];
        });
        this.fromConfigData = this.$g.utils.deepClone(newFromConfigData);
      }, 200)
    },

    // 取消按钮，隐藏侧边弹出框
    cancel() {
      this.editType = ''
      this.drawer = false;
      this.addContactsDraw = false
    },

    // 点击form表单的确认
    onClickcConfirm(row) {
      switch (this.editType) {
        case "editBasicData":
          this.editBasicData(row);
          break
        case "editRateInfo":
          this.editRateInfo(row);
          break
        case "editMailAddress":
          this.editMailAddress(row);
          break
        case "editRenew":
          this.editRenew(row);
          break
        case "editAuthority":
          this.editAuthority(row);
          break
      }
    },

    // 提交保存基础信息
    editBasicData($row) {
      if (!$row.businessType ||
        !$row.agentName ||
        !$row.personName ||
        !$row.personMobile ||
        !$row.companyAddress ||
        !$row.area) {
        this.warnMessage()
      }
      let businessLicenseImg = ''
      if ($row.businessType === 'enterprise') {
        if (!$row.businessLicenseImg) {
          this.$message({
            message: "请上传营业执照",
            type: ""
          })
          return
        }
        var img = $row.businessLicenseImg.split('.com')
        if (img[1]) {
          businessLicenseImg = img[1].slice(1, img[1].length)
        } else {
          businessLicenseImg = $row.businessLicenseImg
        }
      }
      api.updateAgentBaseInfo({
        agentNo: this.agentNo,
        businessType: $row.businessType,
        agentName: $row.agentName,
        personName: $row.personName,
        personMobile: $row.personMobile,
        email: $row.email ? $row.email : '',
        provinceCode: $row.area[0],
        cityCode: $row.area[1],
        areaCode: $row.area[2],
        companyAddress: $row.companyAddress,
        businessLicenseImg: businessLicenseImg
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '基础资料更新成功',
            type: 'success'
          })
          this.getDetail()
          this.editType = ''
          this.drawer = false
        }
      })
    },

    // 提交保存费率信息
    editRateInfo($row) {
      if (!$row.wechatPayRate ||
        !$row.cloudPayLe1000Rate ||
        !$row.cloudPayGt1000Rate) {
        this.warnMessage()
      }
      const exp = $row.wechatPayRate < 3 || $row.wechatPayRate > 6 ||
        ($row.cloudPayLe1000Rate || $row.cloudPayGt1000Rate) < 2.3 ||
        ($row.cloudPayLe1000Rate || $row.cloudPayGt1000Rate) > 10
      if (exp) {
        this.$message({
          message: '请输入正确的费率',
          type: "warning"
        })
        return false
      } else {
        api.updateAgentRate({
          agentNo: this.agentNo,
          wechatPayRate: this.$g.utils.AccDiv($row.wechatPayRate, 1000),
          alipayRate: this.$g.utils.AccDiv($row.wechatPayRate, 1000),
          cloudPayLe1000Rate: this.$g.utils.AccDiv($row.cloudPayLe1000Rate, 1000),
          cloudPayGt1000Rate: this.$g.utils.AccDiv($row.cloudPayGt1000Rate, 1000)
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '财务资料更新成功',
              type: 'success'
            })
            this.getDetail()
            this.editType = ''
            this.drawer = false
          }
        })
      }
    },

    // 保存邮寄地址
    editMailAddress($row) {
      const apiJudge = this.agentDetail.postId ? 'updatePostAddress' : 'addPostAddress'
      api[apiJudge]({
        id: this.agentDetail.postId,
        relateCode: this.agentNo,
        personName: $row.personName,
        personMobile: $row.personMobile,
        provinceCode: $row.postArea[0],
        cityCode: $row.postArea[1],
        areaCode: $row.postArea[2],
        detailAddress: $row.detailAddress
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '邮寄地址更新成功',
            type: 'success'
          })
          this.getDetail()
          this.editType = ''
          this.drawer = false
        }
      })
    },

    // 保存续费信息
    editRenew($row) {
      if (!$row.monthCount || !$row.renewValue) {
        this.warnMessage()
      }
      api.updateRenewAmount({
        agentNo: this.agentNo,
        monthCount: $row.monthCount,
        renewType: 'fixed',
        renewValue: $row.renewValue
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.getDetail()
          this.editType = ''
          this.drawer = false
        }
      })
    },

    // 保存编辑权限
    editAuthority($row) {
      if (!$row.activeMode ||
        !$row.activeScopeCode[0] ||
        !$row.chargeFeePercent || ($row.expandSub === '')) {
        this.warnMessage()
      }
      if (!$row.addressObj) {
        var arr = []
        arr = [
          {
            label: this.agentDetail.activeScope.cityName,
            value: this.agentDetail.activeScope.cityCode
          },
          {
            label: this.agentDetail.activeScope.provinceName,
            value: this.agentDetail.activeScope.provinceCode
          }
        ]
        $row.addressObj = arr
      }
      api.updateAgentPrivilege({
        agentNo: this.agentNo,
        activeScope: {
          provinceCode: $row.addressObj[0].value,
          provinceName: $row.addressObj[0].label,
          cityCode: $row.addressObj[1].value,
          cityName: $row.addressObj[1].label
        },
        expandSub: $row.expandSub,
        activeMode: $row.activeMode,
        chargeFeePercent: this.$g.utils.AccDiv($row.chargeFeePercent, 100)
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: "编辑权限成功",
            type: "success"
          })
          this.getDetail()
          this.editType = ''
          this.drawer = false
        }
      })
    },

    // 保存设备订购的信息
    onClickEquipmentConfirm($ruleForm) {
      const params = {
        saleUserId: this.$store.state.admin.userInfo.id,
        saleUserName: this.$store.state.admin.userInfo.name,
        amount: $ruleForm.amount,
        buyerAddress: $ruleForm.buyerAddress,
        buyerName: this.ruleForm.expReceiver,
        buyerPhone: this.ruleForm.expMobile,
        outputType: 2, // 运营订购
        actualAmount: $ruleForm.actualAmount,
        agentNo: this.agentNo,
        payType: $ruleForm.payType,
        voucher: $ruleForm.voucher.dialogImageUrl,
        buyerRemark: $ruleForm.buyerRemark,
        infoVOList: [{
          count: $ruleForm.count,
          deviceModel: $ruleForm.deviceModel,
          deviceId: $ruleForm.deviceId,
          salePrice: $ruleForm.actualAmount
        }]
      }
      api_device.deviceOutputAdd(params).then(res => {
        this.drawer = false;
        if (res.status === 0) {
          this.$message({
            message: '订购成功',
            type: 'success'
          });
        }
      })
    },

    // 提醒填写必填信息
    warnMessage() {
      this.$message({
        message: "请填写必填信息",
        type: "warning"
      })
      return
    }

    /* TODO  后续版本开发 沟通小记
    // 查询服务商已关联的标签
    getRelatedLabels() {
      api.queryRelatedLabels({
        agentNo: this.agentNo
      }).then(res => {

      })
    },
    // 弹出添加沟通计划侧弹窗
    addContacts() {
      this.addDrewerType = 'contactsType'
      this.addContactsDraw = true
      this.contactConfigData = CONTACTS_CONFIG.formData
      this.contactConfigData.title = '添加沟通计划'
    },
    // 添加沟通小计侧弹窗
    addSubtotal() {
      this.addDrewerType = 'subtotalType'
      this.addContactsDraw = true
      this.contactConfigData = CONTACTS_CONFIG.formData1
      this.contactConfigData.title = '添加沟通小计'
    },
    // 编辑沟通计划
    editDetail($row) {
      this.contactId = $row.id
      api.getTalkPlan({
        id: $row.id
      }).then(res => {
        this.addDrewerType = 'editcontactsType'
        this.addContactsDraw = true
        const newFromConfigData = CONTACTS_CONFIG.formData2;
        newFromConfigData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        this.contactConfigData = newFromConfigData;
        this.contactConfigData.title = '编辑沟通计划'
      }).catch(() => {})
    },
    // 添加沟通计划确定按钮
    handel_addContacts(row) {
      if (this.addDrewerType === 'contactsType') {
        if (!row.addressBookId || !row.nextContactTime || !row.remark || !row.remindType) {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          })
        } else {
          api.addTalkPlan({
            addressBookId: row.addressBookId,
            nextContactTime: row.nextContactTime,
            relateCode: this.agentNo,
            remark: row.remark,
            remindType: row.remindType
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.addContactsDraw = false
              this.getQueryTalkPlan()
            }
          }).catch(() => {
          })
        }
      }
      if (this.addDrewerType === 'subtotalType') {
        if (!row.addressBookId || !row.way || !row.theme || !row.content) {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          })
          return false
        } else {
          api.addTalkLists({
            addressBookId: row.addressBookId,
            way: row.way,
            content: row.content,
            theme: row.theme[0],
            subTheme: row.theme[1],
            relateCode: this.agentNo
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: "添加成功",
                type: 'success'
              })
              this.addContactsDraw = false
              this.getQueryPlanList()
            }
          }).catch(() => {
          })
        }
      }
      if (this.addDrewerType === 'editcontactsType') {
        if (!row.addressBookId || !row.nextContactTime || !row.remark || !row.remindType) {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          })
        } else {
          api.updateTalkPlan({
            id: this.contactId,
            addressBookId: row.addressBookId,
            nextContactTime: row.nextContactTime,
            relateCode: this.agentNo,
            remark: row.remark,
            remindType: row.remindType
          }).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.addContactsDraw = false
            this.getQueryTalkPlan()
          }).catch(err => {
            this.$message({
              message: err.errMessage,
              type: 'success'
            })
          })
        }
      }
    },
    // 标签输入框
    tagInput(value) {},
    // 沟通计划切换时间
    dateChange(value) {
      this.timeDate = value
      this.getSelectSummary(value)
    },
    onClick_changeClientType($item) {
      this.activeClass = $item.colorName;
      this.activeValue = $item.value;
    },
    // 获取标签信息
    gatTag() {
      api.queryLaBleAgent({
        agentNo: this.agentNo
      }).then(res => {

      }).catch(err => {
        console.log(err)
      })
    },
    // 查询沟通数据
    getSelectSummary(value) {
      api.selectSummary({
        relateCode: this.agentNo,
        beginDate: value[0],
        endDate: value[1]
      }).then(res => {
        this.summaryInfo = res.data
      }).catch(() => {})
    },
    // 查询沟通计划列表
    getQueryTalkPlan() {
      api.queryTalkPlan({
        relateCode: this.agentNo
      }).then(res => {
        this.talkPlanList = res.data
      })
    },
    // 查询沟通记录列表
    getQueryPlanList() {
      api.queryPlanList({
        relateCode: this.agentNo
      }).then(res => {
        res.data.forEach(m => {
          if (m.theme === 'dailyTalk') {
            m.themeName = '日常沟通'
            if (m.subTheme === 'question') {
              m.subThemeName = '问题处理'
            }
            if (m.subTheme === 'guest') {
              m.subThemeName = '客情维护'
            }
            if (m.subTheme === 'train') {
              m.subThemeName = '通知'
            }
            if (m.subTheme === 'notify') {
              m.subThemeName = '培训'
            }
          }
          if (m.theme === 'dailyTask') {
            m.themeName = '日常沟通'
            if (m.subTheme === 'settleFail') {
              m.subThemeName = '结算失败'
            }
            if (m.subTheme === 'msgRecharge') {
              m.subThemeName = '短信充值'
            }
            if (m.subTheme === 'priceException') {
              m.subThemeName = '客单价异常'
            }
            if (m.subTheme === 'tradeException') {
              m.subThemeName = '交易数据异常'
            }
          }
          if (m.theme === 'newTalk') {
            m.themeName = '新单沟通选项'
            if (m.subTheme === 'open') {
              m.subThemeName = '开户'
            }
            if (m.subTheme === 'customerInfo') {
              m.subThemeName = '了解客户信息'
            }
            if (m.subTheme === 'teaching') {
              m.subThemeName = '新单教学'
            }
          }
        })
        this.channelList = res.data
      }).catch(() => {
      })
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
    // 查询通讯簿
    getAddressBookQuery() {
      api.addressBookQuery({
        relateCode: this.agentNo
      }).then(res => {
        if (res.data) {
          this.contactsList = res.data
        }
      }).catch(() => {
      })
    },
    // 查看沟通记录详情
    viewDetail(row) {
      this.dialogTableVisible = true
      api.talkListsGetById({
        id: row.id
      }).then(res => {
        this.talkListDetail = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 弹出查看联系人列表的右边抽屉
    viewLiaison() {
      this.findLiaison = true
    },
    // 弹出新增联系人的右边抽屉
    liaisonAdd() {
      this.liaisonType = 'add'
      this.liaisonConfigData = LISASION.addData
      this.addLiaison = true
    },
    // 编辑联系人的右边抽屉
    editLiaison(row) {
      this.liaisonId = row.id
      this.addLiaison = true
      const newFromConfigData = LISASION.editData;
      // 编辑前重赋值
      newFromConfigData.formData.forEach((item, index) => {
        item.initVal = row[item.key];
      });
      this.liaisonConfigData = newFromConfigData;
      this.liaisonType = 'edit'
    },
    // 关闭添加、编辑联系人的侧边抽屉
    liaisonCancel() {
      this.addLiaison = false
    },
    // 新增联系人
    handel_addLiaison(row) {
      if (!row.linkmanName || !row.phoneNum || !row.jobStatus || !row.jobName) {
        this.$message({
          message: '请填写必填信息',
          type: 'warning'
        })
        return false
      } else {
        if (this.liaisonType === 'add') {
          api.addTalkAddressBook({
            linkmanName: row.linkmanName,
            phoneNum: row.phoneNum,
            jobName: row.jobName,
            jobStatus: row.jobStatus,
            remark: row.remark,
            relateCode: this.agentNo
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '添加联系人成功',
                type: 'success'
              })
              this.addLiaison = false
              this.getAddressBookQuery()
            } else {
              this.$message({
                message: res.errMessage,
                type: 'fail'
              })
            }
          }).catch(() => {})
        } else {
          api.updateTalkAddressBook({
            linkmanName: row.linkmanName,
            phoneNum: row.phoneNum,
            jobName: row.jobName,
            jobStatus: row.jobStatus,
            remark: row.remark,
            relateCode: this.agentNo,
            id: this.liaisonId
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '编辑联系人成功',
                type: 'success'
              })
              this.addLiaison = false
              this.getAddressBookQuery()
            } else {
              this.$message({
                message: res.errMessage,
                type: 'fail'
              })
            }
          }).catch(() => {})
        }
      }
    },
    // 查询沟通次数
    getQueryWait() {
      api.queryWait({
        relateCode: this.agentNo
      }).then(res => {
        this.willConactNum = res.data
      }).catch(() => {})
    }
    */
  }
};
</script>

<style lang="scss">
<<<<<<< HEAD
  .p-head-detail {
=======
  .p-head_detail {
>>>>>>> dev-yunshi
    height: 76px;
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
      padding-left: 24px;
      line-height: 76px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);

      span {
        margin-right: 24px;
      }
    }

    .doit {
      float: left;
      margin-top: 5px;
      margin-right: 5px;
      width: 6px;
      height: 6px;
      border-radius: 50%;

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
      padding: 0 0;
      height: 24px;
      line-height: 24px;
    }

    .input-new-tag {
      margin-left: 10px;
      vertical-align: top;
      width: 90px;
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

  .bg-box {
    margin: 24px;
    background: #fff;
    overflow: hidden;

    .title {
      padding-left: 24px;
      height: 54px;
      line-height: 54px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 53, 1);
      border-bottom: 1px solid #ebeef5;
    }

    .title-img {
      margin: 18px 24px 0;
      float: left;
      width: 20px;
      height: 20px;
    }
  }

  .app {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-right: 1px solid #ebeef5;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
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

  .data-item {
    margin-top: 16px;
    border-right: 1px solid #ccc;
    height: 58px;

    .data-item-title {
      margin: 3px 0 17px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      border: none;
      text-align: center;
    }

    div {
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .border-none {
    border: none;
  }

  .top-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 0 32px;
    width: 100%;
    height: 72px;
    border-bottom: 1px solid #ebeef5;

    .the-title {
      font-size: 20px;
      font-weight: 500;
      color: #000;
    }

    button {
      padding: 0 0;
      width: 80px;
      height: 28px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 28px;
    }
  }

  .liaisonList {
    padding: 32px 24px 100px 24px;
    width: 100%;
    height: 100vh;
    overflow: auto;

    .liaison-contant {
      margin-bottom: 24px;
      width: 100%;
      height: 190px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;

      .liaison-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px 0 32px;
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #ebeef5;
        background: #ebeef5;

        span {
          font-size: 14px;
          color: #000;
          opacity: 85%;
          font-weight: 500;
        }

        .liaison-editor {
          color: #1989fa;
          font-size: 14px;
          cursor: pointer;
        }
      }

      .liasion-info {
        position: relative;
        top: 0;
        left: 0;
        padding: 24px 0 0 32px;

        .info-list {
          margin-bottom: 14px;
          line-height: 22px;
          font-size: 14px;

          span:nth-child(1) {
            color: #000;
          }

          span:nth-child(2) {
            color: #606266;
          }
        }

        .jobStatus {
          position: absolute;
          right: 40px;
          top: 20px;

          img {
            width: 104px;
            height: 104px;
          }
        }
      }
    }
  }

  .liaison-detail {
    padding-left: 20%;
    width: 100%;

    li {
      display: flex;
      margin-bottom: 8px;
      line-height: 24px;

      span:nth-child(1) {
        font-size: 16px;
        color: #333;
        padding-right: 20px;
      }

      span:nth-child(2) {
        font-size: 16px;
      }
    }
  }

  .select-date {
    margin-top: 24px;
    width: 100% !important;
    max-width: 360px;
  }

  .talk-info {
    margin-top: 50px;
  }

  .finance-title {
    margin-bottom: 32px;
    padding-left: 24px;
    width: 100%;
    height: 84px;
    border-bottom: 1px solid #ececec;
    line-height: 84px;
    font-size: 28px;
  }

  .finance-box {
    .el-form-item {
      margin: 24px 60px 0 24px !important;

      .el-select {
        width: 100%;
      }

      .el-input {
        width: 100%;
      }
    }
  }

  .bottom-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding: 16px 0;
    width: 500px;
    background: white;
    border-top: 1px solid #ebeef5;
  }
</style>
