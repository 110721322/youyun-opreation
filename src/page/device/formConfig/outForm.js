import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  sendData: {
    title: '设备发货',
    showFootBtn: true,
    formData: [
      {
        type: 3,
        label: '选择出库时间',
        key: 'outputTime',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '快递单号',
        key: 'expressNo',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'outputRemark',
        initVal: 'pdd',
        inputType: 'textarea',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 'uploadFile',
        label: '设备标识',
        key: 'deviceIdentifierList',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      }
    ]
  },
  checkData: {
    title: '订单信息',
    showFootBtn: true,
    footBtnLabel: "确定",
    formData: [
      {
        type: 'show',
        label: '销售人员',
        key: 'saleUserName',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '订单号',
        key: 'outputNo',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '订单类型',
        key: 'outputType',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '订单金额',
        key: 'amount',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '实付金额',
        key: 'actualAmount',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '购买服务商',
        key: 'agentName',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '支付方式',
        key: 'payType',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '打款凭证',
        key: 'voucher',
        isImage: true,
        initVal: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      {
        type: 'show',
        label: '运营备注',
        key: 'financeRemark',
        initVal: "XXXX"
      },
      {
        type: 'show',
        label: '驳回原因',
        key: 'rejectRemark',
        initVal: "XXXX"
      }
    ]
  },
  distributionData: {
    title: '分配出库人员',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '出库人员',
        key: 'distributionUserId',
        initVal: [],
        // urlOptions: {
        //     url: './demo.js',
        //     keyName: 'records',
        //     method: 'get'
        // }
        options: [
          {
            label: '川菜',
            value: 0
          },
          {
            label: '粤菜',
            value: 1
          },
          {
            label: '杭帮菜',
            value: 2
          }
        ]
      }
    ]
  },
  rejectData: {
    title: '驳回',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'reason',
        initVal: 'pdd',
        inputType: 'textarea',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  }
}
