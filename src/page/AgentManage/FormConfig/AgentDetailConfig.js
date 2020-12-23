import { validPhone } from "youyun-vue-components/global/kit/validate";
export const FORM_CONFIG = {
  talkData: {
    formData: [
      {
        type: 1,
        label: '沟通主题',
        labelWidth: '120px',
        key: 'theme',
        options: [
          {
            label: '你好啊',
            value: 1
          },
          {
            label: '吃饭了么',
            value: 2
          },
          {
            label: '真难吃',
            value: 3
          }
        ],
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
        type: 0,
        label: '开户行',
        labelWidth: '120px',
        key: 'bankBranchName',
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
        type: 1,
        label: '服务商禁用',
        labelWidth: '120px',
        key: 'validityDate',
        initVal: 1,
        options: [
          {
            label: '禁止服务商登录及商户支付服务',
            value: 1
          },{
            label: '禁止服务商结算（可正常登录和商户支付）',
            value: 2
          },
          {
            label: '禁止服务号登录（商户支付正常）',
            value: 3
          }
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