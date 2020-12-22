export const FORM_CONFIG = {
  basicInfoData: [
    {
      label: "所属服务商",
      key: "agentName"
      // formatter($ruleForm) {
      //   if ($ruleForm["agentNo"] === "shop") {
      //     return "门店"
      //   } else if ($ruleForm["agentNo"] === "supplier") {
      //     return "供应商"
      //   } else if ($ruleForm["agentNo"] === "manager") {
      //     return "区域经理"
      //   } else {
      //     return ""
      //   }
      // }
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
      label: "门店使用状态",
      key: "isDisabled",
      slotName: 'switch'
    },
    {
      label: "微信商户号",
      key: "merchantNo"
    },
    {
      label: "门店审核状态",
      key: "status",
      slotName: "status"
    }
  ],
  payInfoData: [
    {
      label: "费率信息",
      key: "rate",
      slotName: 'rateInfo'
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
      label: "门店结算类型",
      key: "settleType",
      slotName: "settleType",
      span: 24
    },
    {
      label: "门店名称",
      key: "shopName"
    },
    {
      label: "门店电话",
      key: "phone"
    },
    {
      label: "到期时间（MCC）",
      key: "key"
    },
    {
      label: "门店区域",
      key: "area",
      slotName: "area"
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
      filedType: 'image'
    }
  ],
  verityDetail: [
    {
      label: "门店类型",
      key: "shopType",
      slotName: "shopType",
      span: 24
    },
    {
      label: "营业执照编号",
      key: "shopLicenseNo"
    },
    {
      label: "营业执照有效期",
      key: "shopLicenseDate",
      slotName: "shopLicenseDate"
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
      slotName: "idCardDate"
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {label: '身份证正面', key: 'idCardPortraitImg'},
        {label: '身份证反面', key: 'idCardEmblemImg'},
        {label: '营业执照图片', key: 'shopLicenseImg'},
        {label: '门头照', key: 'shopFaceImg'},
        {label: '门店环境照', key: 'shopInnerImg'},
        {label: '收银台照片', key: 'shopCashdeskImg'},
      ],
      filedType: 'image'
    }
  ],
  settleDetail: [
    {
      label: "结算类型",
      key: "key",
      slotName: "settleType",
      span: 24
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
      label: "开户支行",
      key: "bankArea"
    },
    {
      label: "支行名称",
      key: "bankBranchName"
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {label: '开户许可证', key: 'bankOpenAccountLicenseImg'}
      ],
      filedType: 'image'
    }
  ],
  rateDetail: [
    {
      label: "支付宝",
      key: "alipayRate"
    },
    {
      label: "微信",
      key: "wechatPayRate"
    },
    {
      label: "云闪付>1000费率",
      key: "cloudPayGt1000Rate"
    },
    {
      label: "云闪付<=1000费率",
      key: "cloudPayLe1000Rate"
    }
  ],
  rejectConfig: [
    {
      type: 0,
      inputType: "textarea",
      label: '备注',
      key: 'remark',
      labelWidth: '120px',
      placeholder: "请输入驳回原因",
      style: "width: 379px;",
      maxlength: 100
    }
  ]
}
