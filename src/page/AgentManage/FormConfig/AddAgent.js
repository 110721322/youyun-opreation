import api from '@/api/api_agentManage';
import areaData from "youyun-vue-components/assets/data/areaData.ws";
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
            validator:function(rule, value, callback){
              if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
              }else{
                callback();
              }
            }, trigger: 'blur'}
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
          { required: true, message: '请输入支付宝费率', trigger: 'blur' }
        ]
      },
      {
        type: 0,
        label: '微信费率',
        labelWidth: '120px',
        isShowSlot: true,
        showSlotName: '%',
        key: 'wechatRate',
        rules: [
          { required: true, message: '请输入微信费率', trigger: 'blur' }
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
          { required: true, message: '请输入服务商利润分成', trigger: 'blur' }
        ]
      }
    ]
  },
  settleData: {
    formData: [
      {
        type: 0,
        label: '开户行',
        labelWidth: '120px',
        key: 'bankBranchName',
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
