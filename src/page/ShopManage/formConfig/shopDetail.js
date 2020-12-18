export const FORM_CONFIG = {
  basicInfoData: {
    name: "基础信息",
    items: [
      {
        name: "所属服务商",
        key: "agentNo",
        formatter($ruleForm) {
          if ($ruleForm["agentNo"] === "shop") {
            return "门店"
          } else if ($ruleForm["agentNo"] === "supplier") {
            return "供应商"
          } else if ($ruleForm["agentNo"] === "manager") {
            return "区域经理"
          } else {
            return ""
          }
        }
      },
      {
        name: "所属商户",
        key: "merchantNo"
      },
      {
        name: "手机号码",
        key: "phone"
      },
      {
        name: "门店ID",
        key: "shopNo"
      },
      {
        name: "门店名称",
        key: "shopName"
      },
      {
        name: "添加时间",
        key: "createTime"
      },
      {
        name: "门店状态",
        key: "disabled",
        slotName: 'switch'
      },
      {
        name: "微信商户号",
        key: "merchantNo"
      },
      {
        name: "门店审核状态",
        key: "status",
        slotName: "status"
      }
    ]
  },
  payInfoData: {
    name: "支付信息",
    items: [
      {
        name: "费率信息",
        key: "key",
        slotName: 'rateInfo'
      }
    ]
  },
  openInfoData: {
    name: "开户信息",
    items: [
      {
        name: "开户行支行",
        key: "bankBranchName"
      },
      {
        name: "银行卡账号",
        key: "bankCardNo"
      },
      {
        name: "开户人姓名",
        key: "bankAccountName"
      }
    ]
  },
  shopInfoDetail: {
    name: "门店信息",
    items: [
      {
        name: "门店结算类型",
        key: "settleType",
        slotName: "settleType"
      },
      {
        name: "门店名称",
        key: "shopName"
      },
      {
        name: "门店电话",
        key: "phone"
      },
      {
        name: "到期时间（MCC）",
        key: "key"
      },
      {
        name: "门店区域",
        slotName: "area"
      },
      {
        name: "门店详细地址",
        key: "address"
      },
      {
        name: "图片信息",
        key: "key"
      }
    ]
  },
  verityDetail: {
    name: "认证信息",
    items: [
      {
        name: "门店类型",
        key: "shopType",
        slotName: "shopType"
      },
      {
        name: "营业执照编号",
        key: "shopLicenseNo"
      },
      {
        name: "营业执照有效期",
        key: "shopLicenseDate",
        slotName: "shopLicenseDate"
      },
      {
        name: "法人姓名",
        key: "lawPerson"
      },
      {
        name: "法人身份证号",
        key: "lawIdCard"
      },
      {
        name: "法人身份证有效期",
        key: "idCardDate",
        slotName: "idCardDate"
      },
      {
        name: "图片信息",
        key: "key"
      }
    ]
  },
  settleDetail: {
    name: "结算信息",
    items: [
      {
        name: "结算类型",
        key: "key",
        slotName: "settleType"
      },
      {
        name: "开户名",
        key: "bankAccountName"
      },
      {
        name: "开户银行账号",
        key: "bankCardNo"
      },
      {
        name: "开户支行",
        key: "bankArea"
      },
      {
        name: "支行名称",
        key: "bankBranchName"
      },
      {
        name: "图片信息",
        key: "key"
      }
    ]
  },
  rateDetail: {
    name: "费率信息",
    items: [
      {
        name: "支付宝",
        key: "alipayRate"
      },
      {
        name: "微信",
        key: "wechatPayRate"
      },
      {
        name: "云闪付",
        key: "key"
      }
    ]
  },
  rejectConfig: [
    {
      type: 0,
      inputType: "textarea",
      label: '备注',
      key: 'remark',
      lableWidth: '120px',
      placeholder: "请输入驳回原因",
      style: "width: 379px;",
      maxlength: 100
    }
  ]
}
