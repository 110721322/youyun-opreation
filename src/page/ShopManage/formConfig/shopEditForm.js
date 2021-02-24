import areaData from "youyun-vue-components/assets/data/areaData.ws";
import api from '@/api/api_agentManage';
import utils from "youyun-vue-components/global/kit/utils";
import commonApi from "@/api/api_common"
import { checkPersonId, validPhone } from "youyun-vue-components/global/kit/validate";

export const FORM_CONFIG = {
  shopInfoConfigData: [
    {
      type: 0,
      label: "门店全称",
      key: "shopName",
      labelWidth: "120px",
      initVal: "",
      maxlength: 40,
      rules: [
        { required: true, message: '请输入门店全称', trigger: 'blur' },
        {
          validator:function(rule, value, callback){
            if(value.length < 2){
              callback(new Error("门店全称长度不得小于2位"));
            }else{
              callback();
            }
          }, trigger: 'blur'}
      ]
    },
    {
      type: 0,
      label: '门店简称',
      labelWidth: '120px',
      key: 'shopShortName',
      maxlength: 20,
      rules: [
        { required: true, message: '请输入门店简称', trigger: 'blur' },
        {
          validator:function(rule, value, callback){
            if(value.length < 2){
              callback(new Error("门店简称长度不得小于2位"));
            } else{
              callback();
            }
          }, trigger: 'blur'}
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
      type: 8,
      label: '门店类目(MCC)',
      key: 'mccCodeData',
      labelWidth: "120px",
      placeholder: '请选择门店类目(MCC)',
      rules: [
        { required: true, message: '请选择门店类目', trigger: 'change' }
      ],
      formatter($params) {
        return [$params.grandpaCode, $params.fatherCode, $params.mccCode]
      },
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
      formatter($params) {
        return [$params.provinceCode, $params.cityCode, $params.areaCode]
      },
      options: areaData
    },
    {
      type: 0,
      label: "门店详细地址",
      key: "address",
      labelWidth: "120px",
      maxlength: 40,
      initVal: "",
      rules: [
        { required: true, message: '请输入门店详细地址', trigger: 'blur' },
        {
          validator:function(rule, value, callback){
            if(value.length < 5){
              callback(new Error("门店详细地址长度不得小于5位"));
            } else{
              callback();
            }
          }, trigger: 'blur'}
      ]
    },
    {
      type: 14,
      span: 24,
      label: '图片信息',
      key: 'shopImg',
      labelWidth: '120px',
      children: [
        {
          label: '门店LOGO或门头照',
          key: 'shopImg',
          type: 6,
          initVal: '',
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E9%97%A8%E5%A4%B4%E7%85%A7.png',
          rules: [
            { required: true, message: '请上传门店LOGO或者门店照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        }
      ]
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
        {label: '个人', value: 'personal'}
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
      maxlength: 18,
      initVal: "",
      rules: [
        { required: true, message: '请输入营业执照编号', trigger: 'blur' }
      ],
      isShow: (params) => {
        return params.shopType !== 'personal'
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
      formatter($params) {
        return [$params.shopLicenseBegDate, $params.shopLicenseEndDate]
      },
      isShow: (params) => {
        return params.shopType !== 'personal'
      }
    },
    {
      type: 0,
      label: "法人姓名",
      key: "lawPerson",
      labelWidth: "120px",
      maxlength: 20,
      initVal: "",
      rules: [
        { required: true, message: '请输入法人姓名', trigger: 'blur' },
        {
          validator:function(rule, value, callback){
            if(value.length < 2){
              callback(new Error("法人姓名长度不得小于2位"));
            } else{
              callback();
            }
          }, trigger: 'blur'}
      ]
    },
    {
      label: '法人身份证有效期',
      type: 3,
      labelWidth: "120px",
      key: 'idCardDate',
      checkedType: 'long', //长期有效选择
      formatter($params) {
        return [$params.idCardBeginDate, $params.idCardExpireDate]
      },
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
      type: 14,
      span: 24,
      label: '图片信息',
      key: 'authImg',
      labelWidth: '120px',
      children: [
        {
          label: '身份证正面',
          key: 'idCardPortraitImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg',
          rules: [
            { required: true, message: '请上传身份证人像照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '身份证反面',
          key: 'idCardEmblemImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E8%83%8C%E9%9D%A2.jpg',
          rules: [
            { required: true, message: '请上传身份证国徽照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '营业执照图片',
          key: 'shopLicenseImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传营业执照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '门头照',
          key: 'shopFaceImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E9%97%A8%E5%A4%B4%E7%85%A7.png',
          rules: [
            { required: true, message: '请上传门头照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '门店环境照',
          key: 'shopInnerImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E9%97%A8%E5%BA%97%E5%86%85%E6%99%AF%E7%85%A7.png',
          rules: [
            { required: true, message: '请上传门店环境照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '收银台照',
          key: 'shopCashdeskImg',
          type: 6,
          exampleImg: 'http://horse-pay-develop-back.oss-cn-hangzhou.aliyuncs.com/common/20210105165343543_YU6vUfqgNBzb.jpg',
          rules: [
            { required: true, message: '请上传收银台照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        }
      ],
      isShow: (params) => {
        return params.shopType !== 'personal'
      },
    },
    {
      type: 14,
      span: 24,
      label: '图片信息',
      key: 'authImg',
      labelWidth: '120px',
      children: [
        {
          label: '身份证正面',
          key: 'idCardPortraitImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg',
          rules: [
            { required: true, message: '请上传身份证人像照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '身份证反面',
          key: 'idCardEmblemImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E8%83%8C%E9%9D%A2.jpg',
          rules: [
            { required: true, message: '请上传身份证国徽照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '手持身份证照',
          key: 'idCardHandImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/common/20200829155232141_vXrpwr7TxoHG.jpg',
          rules: [
            { required: true, message: '请上传手持身份证照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '门头照',
          key: 'shopFaceImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E9%97%A8%E5%A4%B4%E7%85%A7.png',
          rules: [
            { required: true, message: '请上传门头照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '门店环境照',
          key: 'shopInnerImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E9%97%A8%E5%BA%97%E5%86%85%E6%99%AF%E7%85%A7.png',
          rules: [
            { required: true, message: '请上传门店环境照', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '收银台照',
          key: 'shopCashdeskImg',
          type: 6,
          exampleImg: 'http://horse-pay-develop-back.oss-cn-hangzhou.aliyuncs.com/common/20210105165343543_YU6vUfqgNBzb.jpg',
          rules: [
            {required: true, message: '请上传收银台照', trigger: 'change'}
          ],
          uploadService: commonApi.queryOssImgToken
        }
      ],
      isShow: (params) => {
        return params.shopType === 'personal'
      }
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
      maxlength: 18,
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
      label: "银行预留手机号",
      key: "bankMobile",
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
      labelWidth: '120px',
      children: [
        {
          label: '开户许可证',
          key: 'bankOpenAccountLicenseImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E5%BC%80%E6%88%B7%E8%AE%B8%E5%8F%AF%E8%AF%81.png',
          rules: [
            { required: true, message: '请上传开户许可证', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
      ],
      isShow: (params) => {
        return params.settleType === '0'
      }
    },
    {
      type: 14,
      span: 24,
      label: '图片信息',
      key: 'settleImg',
      labelWidth: '120px',
      children: [
        {
          label: '银行卡正面',
          key: 'bankCardImg',
          type: 6,
          exampleImg: 'http://horse-pay-develop-back.oss-cn-hangzhou.aliyuncs.com/common/20210105165429729_TYxGrNJZbttN.jpg',
          rules: [
            { required: true, message: '请上传银行卡正面', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
      ],
      isShow: (params) => {
        return params.settleType === '1'
      },
    },
    {
      type: 14,
      span: 24,
      label: '图片信息',
      key: 'settleImg',
      labelWidth: '120px',
      children: [
        {
          label: '结算人身份证正面',
          key: 'nonLawIdCardPortraitImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg',
          rules: [
            { required: true, message: '请上传结算人身份证正面', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '结算人身份证反面',
          key: 'nonLawIdCardEmblemImg',
          type: 6,
          exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E8%83%8C%E9%9D%A2.jpg',
          rules: [
            { required: true, message: '请上传结算人身份证反面', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '结算银行卡正面',
          key: 'bankCardImg',
          type: 6,
          exampleImg: 'http://horse-pay-develop-back.oss-cn-hangzhou.aliyuncs.com/common/20210105165429729_TYxGrNJZbttN.jpg',
          rules: [
            { required: true, message: '请上传结算银行卡正面', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        },
        {
          label: '非法人结算授权书',
          key: 'nonLawSettleAuthImg',
          type: 6,
          exampleImg: 'http://horse-pay-develop-back.oss-cn-hangzhou.aliyuncs.com/common/20210105165510901_IFIDb6g2f9aL.jpg',
          rules: [
            { required: true, message: '请上传非法人结算授权书', trigger: 'change' }
          ],
          uploadService: commonApi.queryOssImgToken
        }
      ],
      isShow: (params) => {
        return params.settleType === '2'
      },
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
      formatter($params) {  
        return utils.AccMul($params.alipayRate, 100)
      },
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
      label: "微信费率",
      key: "wechatPayRate",
      labelWidth: '120px',
      isShowSlot: true,
      showSlotName: '%',
      formatter($params) {  
        return utils.AccMul($params.wechatPayRate, 100)
      },
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
    }
  ]
}
