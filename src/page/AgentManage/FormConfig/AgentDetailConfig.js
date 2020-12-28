import api from "@/api/api_agentManage"
import { validPhone } from "youyun-vue-components/global/kit/validate";
export const FORM_CONFIG = {
  talkData: {
    formData: [
      {
        type: 1,
        label: '沟通主题',
        labelWidth: '120px',
        key: 'theme',
        urlOptions: {
          url: api.getThemeList,
          method: 'get',
          keyName: '',
          valueName: '沟通主题1',
          params: {}
        },
        rules: [
          { required: true, message: '请选择沟通主题', trigger: 'change' }
        ],
        span: 24
      },
      {
        type: 0,
        label: '沟通内容',
        inputType: 'textarea',
        maxlength: 200,
        labelWidth: '120px',
        key: 'content',
        rules: [
          { required: true, message: '请输入沟通内容', trigger: 'blur' }
        ],
        span: 24
      }
    ]
  },
  resetPassword: {
    formData: [
      {
        type: 13,
        label: '重置登录密码',
        initVal: '重置后密码以短信形式发送服务商',
        labelWidth: '120px',
        span: 24
      }
    ]
  },
  changeMoblie: {
    formData: [
      {
        type: 0,
        label: '新登录手机号',
        labelWidth: '120px',
        span: 24,
        rules: [
          { required: true, message: '请输入新登录手机号', trigger: 'blur' },
          {
            validator:function(rule, value, callback){
              if(!validPhone(value)){
                callback(new Error("请输入正确的手机号"));
              }else{
                callback();
              }
            }, trigger: 'blur'}
        ]
      },
      {
        type: 0,
        label: '短信验证码',
        key: 'code',
        labelWidth: '120px',
        initVal: '',
        style: 'width: 184px;',
        span: 24,
        maxlength: 6,
        slot: 'code',
        rules: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      }
    ]
  },
  rateSet: {
    formData: [
      {
        type: 0,
        label: '支付宝费率',
        labelWidth: '120px',
        key: 'alipayRate',
        isShowSlot: true,
        showSlotName: '%',
        rules: [
          { required: true, message: '请输入支付宝费率', trigger: 'blur' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确费率金额' }
        ],
        span: 24
      },
      {
        type: 0,
        label: '微信费率',
        labelWidth: '120px',
        key: 'wechatPayRate',
        isShowSlot: true,
        showSlotName: '%',
        rules: [
          { required: true, message: '请输入支付宝费率', trigger: 'blur' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确费率金额' }
        ],
        span: 24
      },
      {
        type: 0,
        label: '服务商利润分成',
        labelWidth: '120px',
        key: 'chargeFeePercent',
        isShowSlot: true,
        showSlotName: '％',
        rules: [
          { required: true, message: '请输入服务商利润分成', trigger: 'blur' },
          { pattern: /^([1-9][0-9]|[0-9]|100)$/, message: '请输入0-100的正整数' }
        ],
        span: 24
      },
    ]
  },
  bankSet: {
    formData: [
      {
        type: 12,
        label: '开户行',
        labelWidth: '120px',
        key: 'bankBranchName',
        urlOptions: {
          url: api.getBank,
          keyName: 'agentNo',
          valueName: 'bankName',
          method: 'get',
          searchKey: 'agentName',
          params: {
            currentPage: 1,
            pageSize: 10
          }
        },
        rules: [
          { required: true, message: '请选择开户行', trigger: 'blur' }
        ],
        span: 24
      },
      {
        type: 0,
        label: '银行卡号',
        labelWidth: '120px',
        key: 'bankCardNo',
        rules: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        span: 24
      },
      {
        type: 0,
        label: '开户人姓名',
        labelWidth: '120px',
        key: 'bankAccountHolder',
        rules: [
          { required: true, message: '请输入开户人姓名', trigger: 'blur' }
        ],
        span: 24
      },
    ]
  },
  validitySet: {
    formData: [
      {
        type: 11,
        label: '有效期',
        labelWidth: '120px',
        key: 'expireDate',
        rules: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        span: 24
      }
    ]
  },
  agentStop: {
    formData: [
      {
        type: 5,
        label: '服务商管理',
        labelWidth: '100px',
        key: 'blockStatus',
        initVal: '',
        options: [
          {
            label: '封禁（禁止服务商登录、结算。禁止商户收款）',
            value: 3
          },{
            label: '冻结（服务商可登录、禁止结算。商户可收款）',
            value: 4
          },
          {
            label: '禁用（禁止服务商登录、结算。商户可收款）',
            value: 2
          },
          {
            label: '启用（服务商可登录、结算。商户可收款）',
            value: 1
          }
        ],
        rules: [
          { required: true, message: '请选择服务商状态', trigger: 'change' }
        ],
        span: 24
      }
    ]
  },
  nameSet: {
    formData: [
      {
        type: 0,
        label: '服务商名称',
        labelWidth: '120px',
        key: 'agentName',
        initVal: '',
        rules: [
          { required: true, message: '请输入服务商名称', trigger: 'blur' }
        ],
      }
    ]
  },
  showSubmit: false,
  showFootBtn: false
}