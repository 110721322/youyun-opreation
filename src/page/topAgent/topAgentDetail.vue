<template>
  <div>
    <div class="p_head_detail" :class="[activeClass]">
      <div class="top">
        <span>{{ ruleForm.channelAgentName }}</span>
      </div>
    </div>

    <detailMode :rule-form="ruleForm" :config-data="configData" v-if="ruleForm.businessType === 'enterprise'" @edit="itemEdit"></detailMode>
    <detailMode :rule-form="ruleForm" :config-data="configData1" v-if="ruleForm.businessType === 'individual'" @edit="itemEdit"></detailMode>

    <detailMode5 :rule-form="ruleForm" :config-data="configData2" @edit="itemEdit" @handle_seem="itemSeem"></detailMode5>

    <div class="bg_box">
      <div class="title">应用</div>
      <el-row>
        <el-col :span="8" class="app" @click.native="buyDevice('buyDevice')">
          <img src="../../assets/img/Group.png" alt />
          <div>订购设备</div>
        </el-col>
      </el-row>
    </div>

<!--    <el-row :gutter="20">-->
<!--      <el-col :span="9">-->
<!--        <div class="bg_box" style="margin-right:0;margin-top:0;height:314px">-->
<!--          <div class="title">沟通数据</div>-->
<!--          <div style="text-align:center;">-->
<!--            <el-date-picker-->
<!--              v-model="timeDate"-->
<!--              type="datetimerange"-->
<!--              :picker-options="pickerOptions"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              align="right"-->
<!--              format="yyyy-MM-dd HH:mm:ss"-->
<!--              value-format="yyyy-MM-dd HH:mm:ss"-->
<!--              @change="dateChange"-->
<!--              class="selectDate"-->
<!--            >-->
<!--            </el-date-picker>-->
<!--          </div>-->

<!--          <el-row v-if="summaryInfo">-->
<!--            <el-col :span="8" class="data_item" style="height:58px">-->
<!--              <div class="data_item_title">{{ summaryInfo.theme1 }}</div>-->
<!--              <div>{{ summaryInfo.theme1Count }}次</div>-->
<!--            </el-col>-->
<!--            <el-col :span="8" class="data_item" style="height:58px">-->
<!--              <div class="data_item_title">{{ summaryInfo.theme2 }}</div>-->
<!--              <div>{{ summaryInfo.theme2Count }}次</div>-->
<!--            </el-col>-->
<!--            <el-col :span="8" class="data_item border_none" style="height:58px">-->
<!--              <div class="data_item_title">沟通类型</div>-->
<!--              <div>{{ summaryInfo.otherThemeCount }}次</div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="15">-->
<!--        <div class="bg_box" style="margin-left:0;margin-top:0;height:314px">-->
<!--          <img class="title_img" src="@/assets/img/clock.png" alt />-->
<!--          <div class="title">-->
<!--            待沟通{{ willConactNum }}次-->
<!--            <el-button type="primary" style="float:right;margin:10px 24px" @click="addContacts">添加沟通计划</el-button>-->
<!--          </div>-->

<!--          <BaseCrud-->
<!--            ref="planTable"-->
<!--            :grid-config="tableConfigData.gridConfig"-->
<!--            :grid-btn-config="tableConfigData.gridBtnConfig"-->
<!--            :form-config="tableConfigData.formConfig"-->
<!--            :form-data="tableConfigData.formModel"-->
<!--            :grid-edit-width="100"-->
<!--            :table-height="212"-->
<!--            form-title="用户"-->
<!--            :is-async="false"-->
<!--            :params="params"-->
<!--            :api-service="api1"-->
<!--            style="margin:24px;border:1px solid #EBEEF5;height:212px;overflow:hidden"-->
<!--            @detail="editDetail"-->
<!--          ></BaseCrud>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <div class="bg_box" style="height:411px;margin-top:0;">-->
<!--      <div class="title">-->
<!--        历史沟通记录-->
<!--        <el-button type="primary" style="float:right;margin:10px 24px" @click="addSubtotal">添加沟通小计</el-button>-->
<!--        <el-button style="float:right;margin:10px 0px" @click="findLiaison = true">查看联系人</el-button>-->
<!--      </div>-->

<!--      <BaseCrud-->
<!--        :grid-config="tableConfigData2.gridConfig"-->
<!--        :grid-btn-config="tableConfigData2.gridBtnConfig"-->
<!--        :form-config="tableConfigData2.formConfig"-->
<!--        :form-data="tableConfigData2.formModel"-->
<!--        :grid-edit-width="100"-->
<!--        :table-height="309"-->
<!--        form-title="用户"-->
<!--        :is-async="true"-->
<!--        :params="params"-->
<!--        :api-service="api2"-->
<!--        style="margin:24px;border:1px solid #EBEEF5;height:309px;overflow:hidden"-->
<!--        @detail="viewDetail"-->
<!--      ></BaseCrud>-->
<!--    </div>-->

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :isDrawer="true"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>

    <el-drawer title="添加沟通计划" :visible.sync="addContactsDraw" :with-header="false" size="500px">
      <div class="p_head">{{ contactConfigData.title }}</div>
      <Form
        v-if="addContactsDraw"
        :form-base-data="contactConfigData"
        :isDrawer="true"
        :show-foot-btn="contactConfigData.showFootBtn"
        @confirm="handel_addContacts"
        @cancel="cancel"
      ></Form>
    </el-drawer>
    <el-drawer :visible.sync="findLiaison" :with-header="false" size="500px">
      <div class="top_title">
        <span class="the_title">查看联系人</span>
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
        :isDrawer="true"
        :form-base-data="liaisonConfigData.formData"
        :show-foot-btn="liaisonConfigData.showFootBtn"
        @confirm="handel_addLiaison"
        @cancel="addLiaison = false"
      ></Form>
    </el-drawer>
    <el-drawer :visible.sync="financeDrawer" :with-header="false" size="500px">
      <div class="financeTitle">财务信息</div>
      <el-form :model="financeModel" :rules="rules">
        <el-form-item label="结算卡类型" prop="bankAccountType" style="margin: 24px 20% 0 24px;" label-width="120px">
          <el-radio-group v-model="financeModel.bankAccountType">
            <el-radio label="public">对公</el-radio>
            <el-radio label="private">对私</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCardNo" style="margin: 24px 20% 0 24px;" label-width="120px">
          <el-input v-model="financeModel.bankCardNo" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="开户支行" prop="bankContactLine" style="margin: 24px 20% 0 24px;" label-width="120px">
          <el-select
            v-model="financeModel.bankContactLine"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="handleSelect"
            style="width:100%"
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
        <el-form-item label="开户支行地区" prop="bankArea" style="margin: 24px 20% 0 24px;" label-width="120px">
          <el-input v-model="area" disabled></el-input>
        </el-form-item>
        <el-form-item label="开户名" prop="bankAccountHolder" style="margin: 24px 20% 0 24px;" label-width="120px">
          <el-input v-model="financeModel.bankAccountHolder" placeholder="请输入开户名"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom-btn">
        <el-button type="primary" size="normal" @click="handel_save">保存</el-button>
        <el-button size="normal" @click="handel_cancle">取消</el-button>
      </div>
    </el-drawer>
    <el-dialog title="沟通记录详情" :visible.sync="dialogTableVisible">
      <ul class="liaison_detail">
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
    <el-drawer :visible.sync="innerDrawer" :with-header="false" size="550px">
      <power-set v-if="innerDrawer" :role-id="ruleForm.roleId" :template-list="permissionTemplate" :api-service="permissionApi" @confirm="saveUserPermission"></power-set>
    </el-drawer>
  </div>
</template>

<script>
import Form from "@/components/form/index.vue";
import api from "@/api/api_agent.js";
import api_dataMarket from "@/api/api_dataMarket.js";
import api_device from "@/api/api_device.js";
import api_systemConfig from "@/api/api_systemConfig";
import PowerSet from "../systemConfig/component/powerSet";
// import api_serve from "@/api/api_serve"
// import BaseCrud from "@/components/table/BaseCrud.vue";
import detailMode from "@/components/detailMode/detailMode.vue";
import detailMode5 from "@/components/detailMode/detailMode5.vue";
import { USER_CONFIG, USER_CONFIG2 } from "./../agent/tableConfig/config_communicate";
import { FORM_CONFIG } from "./formConfig/topAgentDetail";
import { configData, configData1, configData2 } from "./dataConfig/topAgentDetailData";
import {CONTACTS_CONFIG} from "../agent/formConfig/addContacts";
import {LISASION} from "../agent/formConfig/addLiasion";
import areaData from "@/assets/data/areaData";
import store from "@/store"
import api_topAgent from "@/api/api_topAgent";

export default {
  name: "TopAgentDetail",
  components: { detailMode, detailMode5, Form, PowerSet },
  data() {
    return {
      bankName: '',
      channelAgentCode: this.$route.query.channelAgentCode,
      financeDrawer: false,
      drawer: false,
      buyDeviceDrawer: true,
      systemDrawer: false,
      templateList: [],
      defaultProps: {
        children: "childrenMenus",
        label: "menuName"
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      formType: "",
      configData: configData,
      configData1: configData1,
      configData2: configData2,
      timeDate: [],
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
      summaryInfo: null, // 沟通数据
      willConactNum: null, // 沟通次数
      contactConfigData: {}, // 沟通计划详情
      addContactsDraw: false, // 添加编辑沟通计划弹窗
      dialogTableVisible: false, // 沟通记录详情窗口
      findLiaison: false, //  查看联系人窗口
      talkListDetail: {}, // 沟通记录详情
      contactsList: [], // 联系人数据
      addDrewerType: '',
      liaisonId: null,
      liaisonType: '',
      liaisonConfigData: {}, //  联系人表单
      addLiaison: false, //  添加联系人窗口
      tableConfigData: USER_CONFIG,
      tableConfigData2: USER_CONFIG2,
      fromConfigData: [],
      ruleForm: {},
      params: {
        relateCode: this.$route.query.channelAgentCode
      },
      rules: {
        bankAccountType: [
          { required: true, message: '请选择结算卡类型', trigger: 'change' }
        ],
        bankCardNo: [
          { required: true, message: '请填写银行卡号', trigger: 'blur' }
        ],
        bankContactLine: [
          { required: true, message: '请填写开户支行', trigger: 'change' }
        ],
        bankAccountHolder: [
          { required: true, message: '请填写开户名', trigger: 'blur' }
        ]
      },
      api1: api.queryTalkPlan,
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
      // activeClass: "red",
      activeValue: "情绪客户",
      financeModel: {
        bankAccountType: "public",
        bankCardNo: "",
        bankContactLine: "",
        bankAccountHolder: ""
      },
      area: "",
      loading: false,
      areaCodeNum: "",
      bankOptions: [],
      innerDrawer: false,
      permissionApi: api_systemConfig.getPermistionTemplate,
      permissionTemplate: []
    };
  },
  created() {
    const now = new Date();
    const year = now.getFullYear() // 得到年份
    const month = now.getMonth() + 1// 得到月份
    const date = now.getDate() // 得到日期
    const month1 = month < 10 ? "0" + month : month
    const date1 = date < 10 ? "0" + date : date
    var start = year + '-' + month1 + '-' + date1 + ' ' + '00' + ':' + '00' + ':' + '00'
    var end = year + '-' + month1 + '-' + date1 + ' ' + '23' + ':' + '59' + ':' + '59'
    this.timeDate = [start, end]
  },
  mounted() {
    this.getAgentDetail();
    // this.initCommunication();
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          api.listBankLineByName({
            name: query,
            limit: 30
          }).then(res => {
            if (res.object) {
              this.bankOptions = res.object
            }
          })
        }, 200);
      } else {
        this.bankOptions = [];
      }
    },
    handleSelect(item) {
      api.getBankLineByNo({
        unionCode: item
      }).then(res => {
        var provinceName = ''
        var cityName = ''
        var areaName = ''
        var result = this.$g.utils.getNestedArr(areaData, 'children')
        result.forEach(m => {
          if (m.value === res.object.provinceCode) {
            provinceName = m.label
          }
          if (m.value === res.object.cityCode) {
            cityName = m.label
          }
          if (m.value === res.object.areaCode) {
            areaName = m.label
          }
        })
        this.bankName = res.object.bankName
        this.area = provinceName + '/' + cityName + '/' + areaName
        this.areaCodeNum = res.object.areaCode
      })
    },
    onClick_changeClientType($item) {
      this.activeClass = $item.colorName;
      this.activeValue = $item.value;
    },
    // 沟通模块
    initCommunication() {
      this.getSelectSummary();
      this.getQueryWait();
      this.getAddressBookQuery();
    },
    // 沟通计划切换时间
    dateChange(value) {
      this.timeDate = value;
      this.getSelectSummary();
    },
    // 查询沟通数据
    getSelectSummary() {
      api.selectSummary({
        relateCode: this.channelAgentCode,
        beginDate: this.timeDate[0],
        endDate: this.timeDate[1]
      }).then(res => {
        this.summaryInfo = res.object
      })
    },
    // 查询通讯簿
    getAddressBookQuery() {
      api.addressBookQuery({
        relateCode: this.channelAgentCode
      }).then(res => {
        if (res.datas) {
          this.contactsList = res.datas
        }
      })
    },
    // 查询沟通次数
    getQueryWait() {
      api.queryWait({
        relateCode: this.channelAgentCode
      }).then(res => {
        this.willConactNum = res.object
      }).catch(() => {})
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
          item.initVal = res.object[item.key];
        });
        this.contactConfigData = newFromConfigData;
      }).catch(() => {})
    },
    // 弹出添加沟通计划侧弹窗
    addContacts() {
      this.addDrewerType = 'contactsType'
      this.addContactsDraw = true
      this.contactConfigData = CONTACTS_CONFIG.formData
    },
    // 添加沟通小计侧弹窗
    addSubtotal() {
      this.addDrewerType = 'subtotalType'
      this.addContactsDraw = true
      this.contactConfigData = CONTACTS_CONFIG.formData1
    },
    // 查看沟通记录详情
    viewDetail(row) {
      this.dialogTableVisible = true
      api.talkListsGetById({
        id: row.id
      }).then(res => {
        this.talkListDetail = res.object
      })
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
            relateCode: this.channelAgentCode,
            remark: row.remark,
            remindType: row.remindType
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.addContactsDraw = false
              this.$refs.planTable.getData()
            }
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
            relateCode: this.channelAgentCode
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: "添加成功",
                type: 'success'
              })
              this.addContactsDraw = false
              this.$refs.planTable.getData()
            }
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
            relateCode: this.channelAgentCode,
            remark: row.remark,
            remindType: row.remindType
          }).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.addContactsDraw = false
            this.$refs.planTable.getData()
          })
        }
      }
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
            relateCode: this.channelAgentCode
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
            relateCode: this.channelAgentCode,
            id: this.liaisonId
          }).then(res => {
            this.addLiaison = false
            this.getAddressBookQuery()
          })
        }
      }
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
    itemEdit($model) {
      this.financeModel.bankAccountType = ''
      if ($model === 'finance') {
        this.financeDrawer = true
        if (this.ruleForm.bankBranchName) {
          this.remoteMethod(this.ruleForm.bankBranchName)
          this.handleSelect(this.ruleForm.bankContactLine)
        }
        this.areaCodeNum = this.ruleForm.bankArea
        this.bankName = this.ruleForm.bankBranchName
        this.financeModel = {
          bankContactLine: this.ruleForm.bankContactLine,
          bankCardNo: this.ruleForm.bankCardNo,
          bankAccountType: this.ruleForm.bankAccountType,
          bankAccountHolder: this.ruleForm.bankAccountHolder
        }
      } else {
        this.fromConfigData = {}
        setTimeout(() => {
          const commonData = FORM_CONFIG[$model]
          for (const $item of commonData.formData) {
            $item.initVal = this.ruleForm[$item.key];
          }
          this.fromConfigData = this.$g.utils.deepClone(commonData)
          this.formType = $model
        }, 200)
        this.drawer = true;
      }
      this.formType = $model
    },
    buyDevice($model) {
      this.drawer = true;
      FORM_CONFIG[$model].formData[5].initVal = this.ruleForm.channelAgentName;
      FORM_CONFIG[$model].formData[8].initVal = this.ruleForm.expAddress;
      FORM_CONFIG[$model].formData[11].initVal = this.ruleForm.channelAgentCode;
      this.formType = $model;
      this.fromConfigData = FORM_CONFIG[$model];
    },
    itemSeem() {
      const params = {
        system: 'operation',
        userId: this.ruleForm.userId,
        roleId: this.ruleForm.roleId
      }
      api_systemConfig.getPermistionTemplate(params).then(res => {
        if (res.status === 0) {
          this.permissionTemplate = res.object;
          this.innerDrawer = true;
        }
      })
    },
    saveUserPermission($result) {
      Object.assign($result, { userId: this.ruleForm.userId })
      api_systemConfig.saveUserPermission($result).then(res => {
        if (res.status === 0) {
          this.innerDrawer = false;
          this.$message({
            type: 'success',
            message: '已保存'
          })
        }
      })
    },
    closeDrawer() {
      this.systemDrawer = false;
      this.templateList = [];
    },
    cancel() {
      this.editType = ''
      this.drawer = false;
      this.addContactsDraw = false
    },
    confirm($ruleForm) {
      switch (this.formType) {
        case "buyDevice":
          this.deviceOutputAdd($ruleForm)
          break;
        case "basicData":
          if (!$ruleForm.businessType || !$ruleForm.channelAgentName || !$ruleForm.personName || !$ruleForm.personMobile || !$ruleForm.area || !$ruleForm.address) {
            this.$message({
              message: '请填写必填信息',
              type: 'warning'
            })
            return false
          }
          if ($ruleForm.email) {
            if (!this.$g.utils.checkEmail($ruleForm.email)) {
              this.$message({
                message: '请填写正确的邮箱格式',
                type: 'warning'
              })
              return false
            }
          }
          if (!this.$g.utils.checkPhone($ruleForm.personMobile)) {
            this.$message({
              message: '请填写正确的手机格式',
              type: 'warning'
            })
            return false
          }
          if (!$ruleForm.licenseImg && $ruleForm.businessType === 'enterprise') {
            this.$message({
              message: '请上传营业执照',
              type: 'warning'
            })
            return false
          }
          Object.assign($ruleForm, {
            channelAgentCode: this.channelAgentCode,
            provinceCode: $ruleForm.area[0],
            cityCode: $ruleForm.area[1],
            areaCode: $ruleForm.area[2],
            licenseImg: $ruleForm.businessType === 'enterprise' ? $ruleForm.licenseImg : ''
          })
          this.baseInfo($ruleForm);
          break;
        case "address":
          if (!$ruleForm.expReceiver || !$ruleForm.expMobile || !$ruleForm.expAreaData || !$ruleForm.expAddress) {
            this.$message({
              message: '请填写必填信息',
              type: 'warning'
            })
            return false
          }
          Object.assign($ruleForm, {
            channelAgentCode: this.channelAgentCode
          })
          this.addressInfo($ruleForm);
          break;
        case "rateInfo":
          if (!$ruleForm.wechatPayRate || !$ruleForm.cloudPayLe1000Rate || !$ruleForm.cloudPayGt1000Rate) {
            this.$message({
              message: '请填写必填信息',
              type: 'warning'
            })
            return false
          }
          this.drawer = false;
          $ruleForm.alipayRate = this.$g.utils.AccDiv($ruleForm.wechatPayRate, 1000)
          $ruleForm.wechatPayRate = this.$g.utils.AccDiv($ruleForm.wechatPayRate, 1000)
          $ruleForm.cloudPayLe1000Rate = this.$g.utils.AccDiv($ruleForm.cloudPayLe1000Rate, 1000)
          $ruleForm.cloudPayGt1000Rate = this.$g.utils.AccDiv($ruleForm.cloudPayGt1000Rate, 1000)
          this.rateInfo($ruleForm);
          break;
        default:
          break;
      }
    },
    // 编辑保存财务信息
    handel_save() {
      var $ruleForm = {
        bankContactLine: this.financeModel.bankContactLine,
        bankBranchName: this.bankName,
        bankArea: this.areaCodeNum,
        bankCardNo: this.financeModel.bankCardNo,
        channelAgentCode: this.channelAgentCode,
        bankAccountType: this.financeModel.bankAccountType,
        bankAccountHolder: this.financeModel.bankAccountHolder
      }
      api_topAgent.updateFinancial($ruleForm).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.financeDrawer = false
          this.formType = null;
          this.getAgentDetail();
        }
      })
    },
    handel_cancle() {
      this.financeDrawer = false
    },
    /**
     * 更新顶级服务商基础信息
     */
    baseInfo($ruleForm) {
      api_topAgent.updateBaseInfo({
        channelAgentCode: this.channelAgentCode,
        businessType: $ruleForm.businessType,
        channelAgentName: $ruleForm.channelAgentName,
        licenseImg: $ruleForm.licenseImg,
        personName: $ruleForm.personName,
        personMobile: $ruleForm.personMobile,
        address: $ruleForm.address,
        email: $ruleForm.email ? $ruleForm.email : '',
        provinceCode: $ruleForm.provinceCode,
        cityCode: $ruleForm.cityCode,
        areaCode: $ruleForm.areaCode
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.drawer = false;
          this.formType = null;
          this.getAgentDetail();
        }
      })
    },
    /**
     * 更新顶级服务商邮寄地址
     */
    addressInfo($ruleForm) {
      console.log($ruleForm)
      if (!this.$g.utils.checkPhone($ruleForm.expMobile)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        })
        return false
      }
      api_topAgent.updateAddress({
        expReceiver: $ruleForm.expReceiver,
        expMobile: $ruleForm.expMobile,
        expProvinceCode: $ruleForm.expAreaData[0],
        expCityCode: $ruleForm.expAreaData[1],
        expAreaCode: $ruleForm.expAreaData[2],
        expAddress: $ruleForm.expAddress,
        channelAgentCode: this.channelAgentCode
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.drawer = false;
          this.formType = null;
          this.getAgentDetail();
        }
      })
    },
    /**
     * 更新服务商信息
     */
    rateInfo($ruleForm) {
      api_topAgent.updateFee({
        channelAgentCode: this.channelAgentCode,
        wechatPayRate: $ruleForm.wechatPayRate,
        alipayRate: $ruleForm.alipayRate,
        cloudPayLe1000Rate: $ruleForm.cloudPayLe1000Rate,
        cloudPayGt1000Rate: $ruleForm.cloudPayGt1000Rate
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.formType = null;
          this.getAgentDetail();
        }
      })
    },
    /**
     * 提交设备订单
     */
    deviceOutputAdd($ruleForm) {
      const params = {
        saleUserId: this.$store.state.admin.userInfo.id,
        saleUserName: this.$store.state.admin.userInfo.name,
        amount: $ruleForm.amount,
        buyerAddress: $ruleForm.buyerAddress,
        buyerName: this.ruleForm.expReceiver,
        buyerPhone: this.ruleForm.expMobile,
        outputType: 2, // 运营订购
        actualAmount: $ruleForm.actualAmount,
        agentNo: $ruleForm.agentNo,
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
        this.$message("订购成功");
      })
    },
    getAgentDetail() {
      api_dataMarket.getTopAgentDetail({
        channelAgentCode: this.channelAgentCode,
        roleCode: store.state.admin.userInfo.roleId
      }).then(res => {
        const ruleForm = res.object
        var provinceName = ''
        var cityName = ''
        var areaName = ''
        var result = this.$g.utils.getNestedArr(areaData, 'children')
        result.forEach(m => {
          if (m.value === res.object.expProvinceCode) {
            provinceName = m.label
          }
          if (m.value === res.object.expCityCode) {
            cityName = m.label
          }
          if (m.value === res.object.expAreaCode) {
            areaName = m.label
          }
        })
        if (res.object.provinceCode) {
          var area = []
          area.push(res.object.provinceCode, res.object.cityCode, res.object.areaCode)
          res.object.area = area
        }
        if (res.object.expAreaCode) {
          var expAreaData = []
          expAreaData.push(res.object.expProvinceCode, res.object.expCityCode, res.object.expAreaCode)
          res.object.expAreaData = expAreaData
        }
        if (res.object.businessModes) {
          res.object.businessModes.forEach(m => {
            if (m.modeName === '小马哥代理') {
              res.object.businessExpiredDate = m.expiredDate
            } else {
              res.object.businessExpiredDate = ''
            }
          })
        }
        res.object.emailDetailAddress = provinceName + cityName + areaName
        ruleForm.wechatPayRate = this.$g.utils.AccMul(ruleForm.wechatPayRate, 1000);
        ruleForm.alipayRate = this.$g.utils.AccMul(ruleForm.alipayRate, 1000);
        ruleForm.cloudPayLe1000Rate = this.$g.utils.AccMul(ruleForm.cloudPayLe1000Rate, 1000);
        ruleForm.cloudPayGt1000Rate = this.$g.utils.AccMul(ruleForm.cloudPayGt1000Rate, 1000);
        this.ruleForm = ruleForm;
      });
    }
  }
};
</script>

<style lang="scss">
  .p_head_detail {
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
      padding-left: 24px;
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

  .top_title {
    width: 100%;
    height: 72px;
    padding: 0 24px 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EBEEF5;
    .the_title {
      font-size: 20px;
      font-weight: 500;
      color: #000000;
    }
    button {
      width: 80px;
      height: 28px;
      color: #ffffff;
      font-size: 12px;
      text-align: center;
      line-height: 28px;
      padding: 0 0;
    }
  }

  .liaisonList {
    padding: 32px 24px 100px 24px;
    width: 100%;
    height: 100vh;
    overflow: auto;
    .liaison-contant {
      width: 100%;
      height: 190px;
      margin-bottom: 24px;
      border: 1px solid #E9E9E9;
      border-radius: 4px;
      .liaison-top {
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #EBEEF5;
        background: #EBEEF5;
        padding: 0 24px 0 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 14px;
          color: #000000;
          opacity: 85%;
          font-weight: 500;
        }
        .liaison-editor {
          color: #1989FA;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .liasion-info {
        padding: 24px 0 0 32px;
        position: relative;
        top: 0;
        left: 0;
        .info-list {
          margin-bottom: 14px;
          line-height: 22px;
          font-size: 14px;
          span:nth-child(1) {
            color: #000000;
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

  .liaison_detail {
    width: 100%;
    padding-left: 20%;
    li{
      display: flex;
      line-height: 24px;
      margin-bottom: 8px;
      span:nth-child(1) {
        font-size: 16px;
        color: #333333;
        padding-right: 20px;
      }
      span:nth-child(2) {
        font-size: 16px;
      }
    }
  }
  .selectDate {
    margin-top: 24px;
    width: 100%!important;
    max-width: 360px;
  }
  .border_none {
    border: none;
  }

.financeTitle {
  width: 100%;
  height: 84px;
  border-bottom: 1px solid #ececec;
  line-height: 84px;
  padding-left: 24px;
  font-size: 28px;
  margin-bottom: 32px;
}

.bottom-btn {
  // position: fixed;
  // bottom: 0;
  // right: 0;
  // height: 96px;
  width: 500px;
  padding: 16px 0px;
  // height: 96px;
  background: white;
  border-top: 1px solid #ebeef5;
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
</style>
