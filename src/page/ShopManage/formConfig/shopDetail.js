import utils from "youyun-vue-components/global/kit/utils";
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
            { utils.AccMul(ruleForm.alipayRate) }%、
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
      key: "area",
      fieldType: 'slot',
      slot: "area"
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
      key: "shopTypeTxt"
    },
    {
      label: "营业执照编号",
      key: "shopLicenseNo"
    },
    {
      label: "营业执照有效期",
      key: "shopLicenseDate",
      fieldType: 'slot',
      slot: "shopLicenseDate"
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
      fieldType: 'slot',
      slot: "idCardDate"
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
      fieldType: 'image'
    }
  ],
  settleDetail: [
    {
      label: "结算类型",
      key: "settleTypeTxt"
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
      label: "银行预留手机号",
      key: "bankMobile"
    },
    {
      label: "图片信息",
      key: "key",
      span: 24,
      children: [
        {label: '开户许可证', key: 'bankOpenAccountLicenseImg'}
      ],
      fieldType: 'image'
    }
  ],
  rateDetail: [
    {
      label: "支付宝",
      key: "alipayRate",
      fieldType: 'render',
      render: (h, ruleForm) => {
        return (<span>{ utils.AccMul(ruleForm.alipayRate) }%</span>)
      }
    },
    {
      label: "微信",
      key: "wechatPayRate",
      fieldType: 'render',
      render: (h, ruleForm) => {
        return (<span>{ utils.AccMul(ruleForm.wechatPayRate) }%</span>)
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
