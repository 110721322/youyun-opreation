import areaData from "@/assets/data/areaData.ws";
import { validPhone } from "@/libs/kit/validate";

export const FORM_CONFIG = {
  shopInfoConfigData: [
    {
      type: 5,
      label: '门店结算类型',
      key: 'businessCategory',
      labelWidth: '120px',
      initVal: "",
      options: [
        {label: '独立结算门店（需审核）', value: 'shop'},
        {label: '非独立结算门店（无需审核）', value: 'supplier'}
      ]
    },
    {
      type: 0,
      label: "门店名称",
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入门店名称', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: '门店电话',
      key: 'relationTel',
      labelWidth: '120px',
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
      labelWidth: '120px',
      placeholder: '请选择到期时间(MCC)',
      options: [
        {
          label: '启用',
          value: 0
        },
        {
          label: '禁用',
          value: 1
        }
      ]
    },
    {
      type: 8,
      label: '门店区域',
      key: 'areaData',
      labelWidth: '120px',
      rules: [
        { required: true, message: '请选择门店区域', trigger: 'change' }
      ],
      options: areaData
    },
    {
      type: 0,
      label: "门店详细地址",
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      rules: [
        { required: true, message: '请输入门店详细地址', trigger: 'blur' }
      ]
    },
    {
      type: 6,
      render() {
        return (
          <span>
            图片信息
            <el-tooltip effect="dark" content="单个文件大小限制5MB以内" placement="top-start">
              <i class="iconfont iconshuoming" style="margin-left: 4px;"></i>
            </el-tooltip>
            :
          </span>
        )
      },
      labelWidth: '120px',
      showExample: true,
      exampleUrl: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E5%BC%80%E6%88%B7%E8%AE%B8%E5%8F%AF%E8%AF%81.png',
      key: 'bankOpenAccountLicenseImgComplete'
    }
  ],
  verityInfoConfigData: [
    {
      type: 5,
      label: '门店类型',
      key: 'businessCategory',
      labelWidth: '120px',
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
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入营业执照编号', trigger: 'blur' }
      ]
    },
    {
      type: 11,
      label: '营业执照有效期',
      labelWidth: '120px',
      hasChecked: true,
      checked: false,
      key: 'idCardEndDate',
      format: "yyyy-MM-dd",
      showDateBtn: true
    },
    {
      type: 0,
      label: "法人姓名",
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入法人姓名', trigger: 'blur' }
      ]
    },
    {
      type: 11,
      label: '法人身份证有效期',
      labelWidth: '120px',
      hasChecked: true,
      checked: false,
      key: 'idCardEndDate',
      format: "yyyy-MM-dd",
      showDateBtn: true
    },
    {
      type: 0,
      label: "法人身份证号",
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入法人身份证号', trigger: 'blur' }
      ]
    },
    {
      type: 6,
      render() {
        return (
          <span>
            图片信息
            <el-tooltip effect="dark" content="单个文件大小限制5MB以内" placement="top-start">
              <i class="iconfont iconshuoming" style="margin-left: 4px;"></i>
            </el-tooltip>
            :
          </span>
        )
      },
      labelWidth: '120px',
      showExample: true,
      exampleUrl: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E5%BC%80%E6%88%B7%E8%AE%B8%E5%8F%AF%E8%AF%81.png',
      key: 'bankOpenAccountLicenseImgComplete'
    }
  ],
  settleInfoConfigData: [
    {
      type: 5,
      label: '结算类型',
      key: 'businessCategory',
      labelWidth: '120px',
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
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入开户名', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "开户银行账号",
      key: "shopCode",
      labelWidth: '120px',
      initVal: "",
      maxlength: 10,
      rules: [
        { required: true, message: '请输入开户银行账号', trigger: 'blur' }
      ]
    },
    {
      type: 8,
      label: '开户支行',
      key: 'areaData',
      labelWidth: '120px',
      rules: [
        { required: true, message: '请选择开户支行', trigger: 'change' }
      ],
      options: areaData
    },
    {
      type: 1,
      label: '支行名称',
      key: 'isDisabled',
      labelWidth: '120px',
      placeholder: '请选择支行名称',
      options: []
    },
    {
      type: 6,
      render() {
        return (
          <span>
            图片信息
            <el-tooltip effect="dark" content="单个文件大小限制5MB以内" placement="top-start">
              <i class="iconfont iconshuoming" style="margin-left: 4px;"></i>
            </el-tooltip>
            :
          </span>
        )
      },
      labelWidth: '120px',
      showExample: true,
      exampleUrl: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E5%BC%80%E6%88%B7%E8%AE%B8%E5%8F%AF%E8%AF%81.png',
      key: 'bankOpenAccountLicenseImgComplete'
    }
  ],
  rateInfoConfigData: [
    {
      type: 0,
      label: "支付宝",
      key: "shopCode",
      initVal: "",
      labelWidth: '120px',
      maxlength: 10,
      rules: [
        { required: true, message: '请输入支付宝', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "微信",
      key: "shopCode",
      initVal: "",
      labelWidth: '120px',
      maxlength: 10,
      rules: [
        { required: true, message: '请输入微信', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "云闪付",
      key: "shopCode",
      initVal: "",
      labelWidth: '120px',
      maxlength: 10,
      rules: [
        { required: true, message: '请输入云闪付', trigger: 'blur' }
      ]
    }
  ]
}
