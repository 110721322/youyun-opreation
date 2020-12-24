import areaData from "youyun-vue-components/assets/data/areaData.ws";
import { validPhone } from "youyun-vue-components/global/kit/validate";

export const FORM_CONFIG = {
  shopInfoConfigData: [
    {
      type: 5,
      label: '门店结算类型',
      key: 'shopType',
      initVal: "",
      labelWidth: "120px",
      span: 24,
      options: [
        {label: '独立结算门店（需审核）', value: 'shop'},
        {label: '非独立结算门店（无需审核）', value: 'supplier'}
      ]
    },
    {
      type: 0,
      label: "门店名称",
      key: "shopName",
      labelWidth: "120px",
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入门店名称', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: '门店电话',
      key: 'phone',
      labelWidth: "120px",
      maxlength: 11,
      placeholder: '请输入门店电话',
      rules: [
        { required: true, message: '请输入门店电话', trigger: 'blur' },
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
      label: '到期时间(MCC)',
      key: 'isDisabled',
      labelWidth: "120px",
      placeholder: '请选择到期时间(MCC)',
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
      initVal: "",
      options: [
        {label: '企业', value: 'shop'},
        {label: '个体工商', value: 'supplier'},
        {label: '个人', value: 'manager'}
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
      ]
    },
    {
      label: '营业执照有效期',
      type: 11,
      labelWidth: "120px",
      key: 'shopLicenseEndDate',
      checkedType: 'long' //长期有效选择
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
      type: 11,
      labelWidth: "120px",
      key: 'idCardExpireDate',
      checkedType: 'long' //长期有效选择
    },
    {
      type: 0,
      label: "法人身份证号",
      key: "lawIdCard",
      initVal: "",
      labelWidth: "120px",
      rules: [
        { required: true, message: '请输入法人身份证号', trigger: 'blur' }
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
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
        },
        {
          label: '身份证反面',
          key: 'idCardEmblemImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
        },
        {
          label: '营业执照图片',
          key: 'shopLicenseImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
        },
        {
          label: '门头照',
          key: 'shopFaceImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
        },
        {
          label: '门店环境照',
          key: 'shopInnerImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
        },
        {
          label: '收银台照片',
          key: 'shopCashdeskImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg'
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
      initVal: "",
      options: [
        {label: '对公法人', value: 'shop'},
        {label: '对私法人', value: 'supplier'},
        {label: '对私非法人', value: 'manager'}
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
      options: []
    },
    {
      type: 6,
      span: 24,
      labelWidth: "120px",
      render() {
        return (
          <span>
            开户许可证
            <el-tooltip effect="dark" content="单个文件大小限制5MB以内" placement="top-start">
              <i class="iconfont iconshuoming" style="margin-left: 4px;"></i>
            </el-tooltip>
            :
          </span>
        )
      },
      showExample: true,
      exampleUrl: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E5%BC%80%E6%88%B7%E8%AE%B8%E5%8F%AF%E8%AF%81.png',
      key: 'bankOpenAccountLicenseImg'
    }
  ],
  rateInfoConfigData: [
    {
      type: 0,
      label: "支付宝",
      key: "alipayRate",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入支付宝费率', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "微信",
      key: "wechatPayRate",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入微信费率', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "云闪付>1000费率",
      key: "cloudPayGt1000Rate",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入云闪付费率', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "云闪付<=1000费率",
      key: "cloudPayLe1000Rate",
      labelWidth: "120px",
      initVal: "",
      rules: [
        { required: true, message: '请输入云闪付费率', trigger: 'blur' }
      ]
    }
  ]
}
