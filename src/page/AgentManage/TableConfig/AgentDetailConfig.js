import utils from "youyun-vue-components/global/kit/utils";
export const DETAILCONFIG = {
  shopInfoData: [
    {
      label: "服务商ID",
      key: "agentNo"
    },
    {
      label: "服务商名称",
      key: "agentName"
    },
    {
      label: "手机号码",
      key: "personMobile"
      // TODO emitEdit: 'editTel'
    },
    {
      label: "到期时间",
      key: "expireDate"
    },
    {
      label: "服务商状态",
      key: "blockStatus",
      emitEdit: 'editStatus',
      fieldType: 'slot',
      slot: 'status'
    },
    {
      label: "管理员",
      key: "opreationer"
    },
    {
      label: "地址",
      key: "companyAddress"
    }
  ],
  rateInfoData: [
    {
      label: '费率信息',
      key: 'payRate',
      filedType: 'render',
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
    },
    {
      label: '服务商利润分成',
      key: 'chargeFeePercent',
      formatter($ruleForm) {
        return utils.AccMul($ruleForm.chargeFeePercent) + '%'
      }
    }
  ],
  bankInfoData: [
    {
      label: "开户支行",
      key: "bankBranchName"
    },
    {
      label: '银行卡账号',
      key: 'bankCardNo'
    },
    {
      label: '开户人姓名',
      key: 'bankAccountHolder'
    }
  ]
}
