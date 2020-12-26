import areaData from "youyun-vue-components/assets/data/areaData.ws";
import { validPhone } from "youyun-vue-components/global/kit/validate";

export const FORM_CONFIG = {
  shopInfoConfigData: [
    {
      type: 0,
      label: "门店全称",
      key: "shopName",
      labelWidth: "120px",
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入门店全称', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: '门店简称',
      labelWidth: '140px',
      key: 'shopShortName',
      rules: [
        { required: true, message: '请输入门店简称', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: '门店服务电话',
      key: 'phone',
      labelWidth: "120px",
      maxlength: 11,
      placeholder: '请输入门店服务电话',
      rules: [
        { required: true, message: '请输入门店服务电话', trigger: 'blur' },
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
      type: 1,
      label: '门店类目(MCC)',
      key: 'mccCode',
      labelWidth: "120px",
      placeholder: '请选择门店类目(MCC)',
      rules: [
        { required: true, message: '请选择门店类目', trigger: 'change' }
      ],
      options: []
    },
    {
      type: 8,
      label: '门店区域',
      key: 'areaData',
      labelWidth: "120px",
      rules: [
        { required: true, message: '请选择门店区域', trigger: 'change' }
      ],
      options: areaData
    },
    {
      type: 0,
      label: "门店详细地址",
      key: "address",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入门店详细地址', trigger: 'blur' }
      ]
    },
    {
      type: 6,
      span: 24,
      labelWidth: "120px",
      render() {
        return (
          <span>
            门店LOGO或门头照
            <el-tooltip effect="dark" content="单个文件大小限制5MB以内" placement="top-start">
              <i class="iconfont iconshuoming" style="margin-left: 4px;"></i>
            </el-tooltip>
            :
          </span>
        )
      },
      showExample: true,
      exampleUrl: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E5%BC%80%E6%88%B7%E8%AE%B8%E5%8F%AF%E8%AF%81.png',
      key: 'bankOpenAccountLicenseImgComplete'
    }
  ],
  verityInfoConfigData: [
    {
      type: 5,
      label: '门店类型',
      span: 24,
      key: 'shopType',
      labelWidth: "120px",
      initVal: "enterprise",
      options: [
        {label: '企业', value: 'enterprise'},
        {label: '个体工商', value: 'individual'},
        {label: '个人', value: 'person'}
      ],
      rules: [
        { required: true, message: '请选择门店类型', trigger: 'change' }
      ]
    },
    {
      type: 0,
      label: "营业执照编号",
      key: "shopLicenseNo",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入营业执照编号', trigger: 'blur' }
      ],
      isShow: (params) => {
        if (params.shopType === 'person') {
          return false
        } else {
          return true
        }
      }
    },
    {
      label: '营业执照有效期',
      type: 3,
      labelWidth: "120px",
      key: 'shopLicenseDate',
      checkedType: 'long', //长期有效选择
      rules: [
        { required: true, message: '请选择营业执照有效期', trigger: 'change' }
      ],
      isShow: (params) => {
        if (params.shopType === 'person') {
          return false
        } else {
          return true
        }
      }
    },
    {
      type: 0,
      label: "法人姓名",
      key: "lawPerson",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入法人姓名', trigger: 'blur' }
      ]
    },
    {
      label: '法人身份证有效期',
      type: 3,
      labelWidth: "120px",
      key: 'idCardDate',
      checkedType: 'long', //长期有效选择
      rules: [
        { required: true, message: '请选择法人身份证有效期', trigger: 'change' }
      ]
    },
    {
      type: 0,
      label: "法人身份证号",
      key: "lawIdCard",
      initVal: "",
      labelWidth: "120px",
      rules: [
        { required: true, message: '请输入法人身份证号', trigger: 'blur' },
        {
          validator:function(rule, value, callback){
            if(!checkPersonId(value)){
              callback(new Error("请输入正确的法人身份证号"));
            }else{
              callback();
            }
          }, trigger: 'blur'}
      ]
    },
    {
      label: '图片信息',
      key: 'UploadGroup',
      type: 14,
      span: 24,
      labelWidth: "120px",
      children: [
        {
          label: '身份证正面',
          key: 'idCardPortraitImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传身份证人像照', trigger: 'change' }
          ]
        },
        {
          label: '身份证反面',
          key: 'idCardEmblemImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传身份证国徽照', trigger: 'change' }
          ]
        },
        {
          label: '营业执照图片',
          key: 'shopLicenseImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传营业执照', trigger: 'change' }
          ]
        },
        {
          label: '门头照',
          key: 'shopFaceImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传门头照', trigger: 'change' }
          ]
        },
        {
          label: '门店环境照',
          key: 'shopInnerImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传门店环境照', trigger: 'change' }
          ]
        },
        {
          label: '收银台照片',
          key: 'shopCashdeskImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传收银台照', trigger: 'change' }
          ],
          isShow: (params) => {
            return params.shopType === 'person' ? false : true
          },
        }
      ]
    }
  ],
  settleInfoConfigData: [
    {
      type: 5,
      span: 24,
      label: '结算类型',
      key: 'settleType',
      labelWidth: "120px",
      initVal: "0",
      options: [
        {label: '对公法人', value: '0'},
        {label: '对私法人', value: '1'},
        {label: '对私非法人', value: '2'}
      ],
      rules: [
        { required: true, message: '请选择结算类型', trigger: 'change' }
      ]
    },
    {
      type: 0,
      label: "开户名",
      key: "bankAccountName",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入开户名', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "开户银行账号",
      key: "bankCardNo",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入开户银行账号', trigger: 'blur' }
      ]
    },
    {
      type: 8,
      label: '开户支行',
      key: 'bankArea',
      labelWidth: "120px",
      rules: [
        { required: true, message: '请选择开户支行', trigger: 'change' }
      ],
      options: areaData
    },
    {
      type: 1,
      label: '支行名称',
      key: 'bankBranchName',
      labelWidth: "120px",
      placeholder: '请选择支行名称',
      rules: [
        { required: true, message: '请选择支行名称', trigger: 'change' }
      ],
      options: []
    },
    {
      type: 0,
      label: "银行预留手机号",
      key: "bankCardNo",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入银行预留手机号', trigger: 'blur' },
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
      type: 14,
      span: 24,
      label: '图片信息',
      key: 'settleImg',
      labelWidth: '140px',
      isShow: (params) => {
        if (params.settleType === 0 || params.settleType === 1) {
          return true
        } else {
          return false
        }
      },
      children: [
        {
          label: '开户许可证',
          key: 'bankOpenAccountLicenseImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传开户许可证', trigger: 'change' }
          ]
        },
      ]
    }
  ],
  rateInfoConfigData: [
    {
      type: 0,
      label: "支付宝费率",
      key: "alipayRate",
      labelWidth: '120px',
      isShowSlot: true,
      showSlotName: '%',
      rules: [
        { required: true, message: '请输入支付宝费率', trigger: 'blur' },
        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确支付宝费率金额' }
      ]
    },
    {
      type: 0,
      label: "微信费率",
      key: "wechatPayRate",
      labelWidth: '140px',
      isShowSlot: true,
      showSlotName: '%',
      rules: [
        { required: true, message: '请输入微信费率', trigger: 'blur' },
        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确微信费率金额' }
      ]
    },
    {
      type: 0,
      label: "云闪付>1000",
      key: "cloudPayGt1000Rate",
      labelWidth: '140px',
      isShowSlot: true,
      showSlotName: '%',
      rules: [
        { required: true, message: '请输入云闪付费率', trigger: 'blur' },
        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确云闪付费率金额' }
      ]
    },
    {
      type: 0,
      label: "云闪付<=1000",
      key: "cloudPayLe1000Rate",
      labelWidth: '140px',
      isShowSlot: true,
      showSlotName: '%',
      rules: [
        { required: true, message: '请输入云闪付费率', trigger: 'blur' },
        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确云闪付费率金额' }
      ]
    }
  ]
}
