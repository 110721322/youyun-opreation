import api from '@/api/api_agentManage';
import areaData from "youyun-vue-components/assets/data/areaData.ws";
import { validPhone } from "youyun-vue-components/global/kit/validate";
export const ADD_AGENT = {
  serviceData: {
    formData: [
      {
        type: 0,
        label: '服务商名称',
        maxlength: 40,
        labelWidth: '120px',
        key: 'agentName',
        rules: [
          { required: true, message: '请输入服务商名称', trigger: 'blur' }
        ]
      },
      {
        type: 0,
        label: '登录手机号码',
        maxlength: 11,
        labelWidth: '120px',
        key: 'account',
        rules: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!validPhone(value)) {
                return callback(new Error("请输入规范11位手机号"))
              }
              return callback();
            },
            trigger: 'blur'
          }
        ]
      },
      {
        type: 11,
        label: '到期时间',
        labelWidth: '120px',
        key: 'expireDate',
        format: 'yyyy-MM-dd',
        rules: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ]
      },
      {
        type: 8,
        label: '所在区域',
        key: 'area',
        labelWidth: '120px',
        options: areaData,
        rules: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ]
      },
      {
        type: 0,
        label: '详细地址',
        labelWidth: '120px',
        key: 'address',
        rules: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
    ],
  },
  rateData: {
    formData: [
      {
        type: 0,
        label: '支付宝费率',
        labelWidth: '120px',
        isShowSlot: true,
        showSlotName: '%',
        key: 'alipayRate',
        rules: [
          { required: true, message: '请输入支付宝费率', trigger: 'blur' },
          { validator: function(rule, value, callback){
              if(value < 0.2 || value > 0.6){
                callback(new Error("费率范围为0.2~0.6"));
              }else{
                callback();
              }
            }, trigger: 'blur'},
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确费率' }
        ]
      },
      {
        type: 0,
        label: '微信费率',
        labelWidth: '120px',
        isShowSlot: true,
        showSlotName: '%',
        key: 'wechatPayRate',
        rules: [
          { required: true, message: '请输入微信费率', trigger: 'blur' },
          { validator: function(rule, value, callback){
              if(value < 0.2 || value > 0.6){
                callback(new Error("费率范围为0.2~0.6"));
              }else{
                callback();
              }
            }, trigger: 'blur'},
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确微信费率' }
        ]
      },
      {
        type: 0,
        label: '该服务商利润分成',
        labelWidth: '120px',
        isShowSlot: true,
        showSlotName: '%',
        key: 'chargeFeePercent',
        rules: [
          { required: true, message: '请输入服务商利润分成', trigger: 'blur' },
          { pattern: /^([1-9][0-9]|[0-9]|100)$/, message: '请输入0-100的正整数' }
        ]
      }
    ]
  },
  settleData: {
    formData: [
      {
        type: 1,
        label: '开户行',
        labelWidth: '120px',
        key: 'bankContactLine',
        isSearch: true,
        urlOptions: {
          searchKey: 'bankName',
          url: api.getBank,
          keyName: 'unionCode',
          valueName: 'bankName',
          methods: 'get',
          params: {
            currentPage: 1,
            pageSize: 20
          }
        },
        callback: (item, data) => {
          item.bankBranchName = data.bankName
        },
        rules: [
          { required: true, message: '请选择开户行', trigger: 'blur' }
        ]
      },
      {
        type: 0,
        label: '银行卡号',
        labelWidth: '120px',
        key: 'bankCardNo',
        rules: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      },
      {
        type: 0,
        label: '开户人姓名',
        maxlength: 40,
        labelWidth: '120px',
        key: 'bankAccountHolder',
        rules: [
          { required: true, message: '请输入开户人姓名', trigger: 'blur' }
        ]
      }
    ]
  },
  operationData: {
    formData: [
      {
        type: 1,
        label: '管理员昵称',
        key: 'operationId',
        urlOptions: {
          url: api.queryAllOperation,
          method: 'get',
          keyName: 'operationId',
          valueName: 'operationName',
          params: {}
        },
        rules: [
          { required: true, message: '请输入开户人姓名', trigger: 'change' }
        ]
      }
    ]
  },
  showSubmit: false,
  showFootBtn: false
}
