import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectData: {
    title: '驳回',
    showFootBtn: true,
    footBtnLabel: "确定",
    processData: [{
      icon: "",
      label: "入库",
      time: "2019-10-12 10:12:21"
    }, {
      icon: "",
      label: "入库",
      time: "2019-10-12 10:12:21",
      name: "天阳"
    }],
    settlementData: {
      label: "结算类型",
      initValArray: []
    },
    formData: [
      {
        type: 'show',
        label: '发票照片',
        key: 'expressImg',
        isImage: true,
        initVal: ""
      },
      {
        type: 'show',
        label: '发票快递单号',
        key: 'expressNumber',
        initVal: '321341423273528268276'
      },
      {
        type: 'show',
        label: '结算账户',
        key: 'settleAccount',
        initVal: '293092019209399929'
      },
      {
        type: 'show',
        label: '备用联系方式',
        key: 'alternatePhone',
        initVal: 'pdd'
      },
      {
        type: 'show',
        label: '服务商备注',
        key: 'settleRemark',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元'
      },
      {
        type: 'show',
        label: '结算金额',
        key: 'actualAmount',
        initVal: 'pdd'
      },
      {
        type: 0,
        label: '驳回原因',
        key: 'rejectReason',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('驳回原因').isRequired.get
      }
    ]
  },
  adoptData: {
    title: '通过',
    showFootBtn: true,
    processData: [],
    settlementData: {
      label: "结算类型",
      initValArray: []
    },
    formData: [
      {
        type: 'show',
        label: '发票照片',
        key: 'expressImg',
        isImage: true,
        initVal: ""
      },
      {
        type: 'show',
        label: '发票快递单号',
        key: 'expressNumber',
        initVal: ''
      },
      {
        type: 'show',
        label: '结算账户',
        key: 'settleAccount',
        initVal: ''
      },
      {
        type: 'show',
        label: '备用联系方式',
        key: 'alternatePhone',
        initVal: ''
      },
      {
        type: 'show',
        label: '服务商备注',
        key: 'settleRemark',
        initVal: '',
        isShowSlot: true,
        showSlotName: '元'
      },
      {
        type: 'show',
        label: '结算金额',
        key: 'actualAmount',
        initVal: ''
      },
      {
        type: 0,
        label: '建议结算金额',
        key: 'adviseCommission',
        initVal: '',
        rules: setRules('建议结算金额').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'operationRemark',
        initVal: '',
        inputType: 'textarea'
      }
    ]
  }
}

export const DETAIL_FORM_CONFIG = {
  detailData: {
    title: '',
    showFootBtn: true,
    formData: [
      {
        label: '发票照片',
        type: 'show',
        width: '100px',
        prop: 'expressImg',
        key: 'photo',
        initVal: ''
      },
      {
        type: 'show',
        label: '发票快递单号',
        key: 'expressNumber',
        initVal: '12345678900987654321'
      },
      {
        type: 'show',
        label: '结算账户',
        key: 'settleAccount',
        initVal: '2342179'
      },
      {
        type: 'show',
        label: '联系电话',
        key: 'settleMobile',
        initVal: '15735655521'
      },
      {
        type: 'show',
        label: '备用联系方式',
        key: 'alternatePhone',
        initVal: '15735655521'
      },
      {
        type: 'show',
        label: '备注',
        key: 'settleRemark',
        initVal: '没有备注'
      }
    ]
  }
}
