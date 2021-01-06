import utils from "youyun-vue-components/global/kit/utils";
export const FORM_CONFIG = {
  basicInfoData: [
    {
      label: "所属服务商",
      key: "agentName"
    },
    {
      label: "所属商户",
      key: "merchantName"
    },
    {
      label: "手机号码",
      key: "phone"
    },
    {
      label: "门店ID",
      key: "shopNo"
    },
    {
      label: "门店名称",
      key: "shopName"
    },
    {
      label: "添加时间",
      key: "createTime"
    },
    {
      label: "门店状态",
      key: "isDisabled",
      fieldType: 'slot',
      slot: 'switch'
    },
    {
      label: "微信商户号",
      key: "merchantNo"
    },
    {
      label: "门店审核状态",
      key: "statusTxt"
    }
  ],
  payInfoData: [
    {
      label: "费率信息",
      key: "rate",
      fieldType: 'render',
      render: (h, ruleForm) => {
        return (
          <p class="f-fc-606266">
            <i class="iconfont iconzhifubao f-fc-ali"></i>
            { utils.AccMul(ruleForm.alipayRate) }%
            <i class="iconfont iconweixin f-fc-wx"></i>
            { utils.AccMul(ruleForm.wechatPayRate) }%
          </p>
        )
      }
    }
  ],
  openInfoData: [
    {
      label: "开户行支行",
      key: "bankBranchName"
    },
    {
      label: "银行卡账号",
      key: "bankCardNo"
    },
    {
      label: "开户人姓名",
      key: "bankAccountName"
    }
  ],
  shopInfoDetail: [
    {
      label: "门店名称",
      key: "shopName"
    },
    {
      label: "门店简称",
      key: "shopShortName"
    },
    {
      label: "门店服务电话",
      key: "phone"
    },
    {
      label: "门店类目（MCC）",
      key: "mccCodeCN"
    },
    {
      label: "门店区域",
      key: "areasStr"
    },
    {
      label: "门店详细地址",
      key: "address"
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {label: '门店LOGO或门头照', key: 'shopFaceImg'}
      ],
      fieldType: 'image'
    }
  ],
  verityDetail: [
    {
      label: "门店类型",
      key: "shopType",
      fieldType: 'render',
      render: (h, params) => {
        if (params.shopType === 'personal') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '个人'
          )
        } else if (params.shopType === 'enterprise') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '企业'
          )
        }
        if (params.shopType === 'individual') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '个体工商'
          )
        }
      }
    },
    {
      label: "营业执照编号",
      key: "shopLicenseNo",
      isShow: (params) => {
        return params.shopType === 'personal' ? false : true
      }
    },
    {
      label: "营业执照有效期",
      key: "shopLicenseDate",
      fieldType: 'render',
      render: (h, params) => {
        if (params.shopLicenseEndDate === '2199-12-31') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '长期有效'
          )
        } else {
          return h(
            'span', { 'class': 'f-fc-606266' }, params.shopLicenseBegDate + '至' + params.shopLicenseEndDate
          )
        }
      },
      isShow: (params) => {
        return params.shopType === 'personal' ? false : true
      }
    },
    {
      label: "法人姓名",
      key: "lawPerson"
    },
    {
      label: "法人身份证号",
      key: "lawIdCard"
    },
    {
      label: "法人身份证有效期",
      key: "idCardDate",
      fieldType: 'render',
      render: (h, params) => {
        if (params.idCardExpireDate === '2199-12-31') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '长期有效'
          )
        } else {
          return h(
            'span', { 'class': 'f-fc-606266' }, params.idCardBeginDate + '至' + params.idCardExpireDate
          )
        }
      }
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      isShow: (params) => {
        return params.shopType === 'personal' ? false : true
      },
      children: [
        {
          label: "身份证正面",
          key: "idCardPortraitImg"
        },
        {
          label: "身份证反面",
          key: "idCardEmblemImg"
        },
        {
          label: "营业执照图片",
          key: "shopLicenseImg"
        },
        {
          label: "门头照",
          key: "shopFaceImg"
        },
        {
          label: "门店环境照",
          key: "shopInnerImg"
        },
        {
          label: "收银台照片",
          key: "shopCashdeskImg"
        }
      ],
      fieldType: 'image'
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      isShow: (params) => {
        return params.shopType === 'personal'
      },
      children: [
        {
          label: "身份证正面",
          key: "idCardPortraitImg"
        },
        {
          label: "身份证反面",
          key: "idCardEmblemImg"
        },
        {
          label: "手持身份证照",
          key: "idCardHandImg"
        },
        {
          label: "门头照",
          key: "shopFaceImg"
        },
        {
          label: "门店环境照",
          key: "shopInnerImg"
        },
        {
          label: "收银台照片",
          key: "shopCashdeskImg"
        }
      ],
      fieldType: 'image'
    }
  ],
  settleDetail: [
    {
      label: "结算类型",
      key: "settleType",
      fieldType: 'render',
      render: (h, params) => {
        if (params.settleType === '0') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '对公法人'
          )
        } else if (params.settleType === '1') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '对私法人'
          )
        }
        if (params.settleType === '2') {
          return h(
            'span', { 'class': 'f-fc-606266' }, '对私非法人'
          )
        }
      }
    },
    {
      label: "开户名",
      key: "bankAccountName"
    },
    {
      label: "开户银行账号",
      key: "bankCardNo"
    },
    {
      label: "开户支行名称",
      key: "bankBranchName"
    },
    {
      label: "银行预留手机号",
      key: "bankMobile"
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {
          label: "开户许可证",
          key: "bankOpenAccountLicenseImg"
        }
      ],
      fieldType: 'image',
      isShow: (params) => {
        return params.settleType=== '0'
      }
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {
          label: "银行卡正面",
          key: "bankCardImg"
        }
      ],
      fieldType: 'image',
      isShow: (params) => {
        return params.settleType=== '1'
      }
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {
          label: "结算人身份证正面",
          key: "nonLawIdCardPortraitImg"
        },
        {
          label: "结算人身份证反面",
          key: "nonLawIdCardEmblemImg"
        },
        {
          label: "结算银行卡正面",
          key: "nonLawIdCardPortraitImg"
        },
        {
          label: "非法人结算授权书",
          key: "nonLawSettleAuthImg"
        }
      ],
      fieldType: 'image',
      isShow: (params) => {
        return params.settleType=== '2'
      }
    }
  ],
  rateDetail: [
    {
      label: "支付宝",
      key: "alipayRate",
      fieldType: 'render',
      render: (h, params) => {
        return (
          <p class="f-fc-606266">
            <i class="iconfont iconzhifubao f-fc-ali"></i>
            {utils.AccMul(params.alipayRate, 100)}%
          </p>
        )
      }
    },
    {
      label: "微信",
      key: "wechatPayRate",
      fieldType: 'render',
      render: (h, params) => {
        return (
          <p class="f-fc-606266">
          <i class="iconfont iconweixin f-fc-wx"></i>
        { utils.AccMul(params.wechatPayRate, 100) }%
      </p>
      )
      }
    }
  ],
  rejectConfig: [
    {
      type: 0,
      inputType: "textarea",
      label: '备注',
      key: 'reason',
      labelWidth: '120px',
      placeholder: "请输入驳回原因",
      style: "width: 379px;",
      maxlength: 100,
      rules: [
        { required: true, message: '请输入驳回备注', trigger: 'blur' }
      ]
    }
  ]
}
