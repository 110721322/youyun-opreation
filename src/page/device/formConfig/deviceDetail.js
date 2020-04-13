import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  deviceData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'deviceType',
        initVal: "",
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
      },
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModel',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 6,
        label: '图片',
        key: 'deviceImg',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 0,
        label: '单台设备成本价',
        key: 'costPrice',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '单台设备售卖价',
        key: 'salePrice',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('法人姓名').isRequired.get
      },
      {
        type: 0,
        label: '排序',
        key: 'sort',
        initVal: 'pdd',
        rules: setRules('法人手机号').isRequired.get
      }
    ]
  },
  buyData: {
    title: '订购信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '销售人员',
        key: 'saleUserName',
        initVal: 'pdd',
        isDisable: () => {
          return true;
        },
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '设备型号',
        key: 'deviceId',
        initVal: 'pdd',
        isDisable: () => {
          return true;
        },
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '订购数量',
        key: 'count',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '台',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '订单金额',
        key: 'amount',
        initVal: 'pdd',
        isDisable: () => {
          return true;
        },
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '实付金额',
        key: 'actualAmount',
        initVal: 'pdd',

        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 1,
        label: '购买服务商',
        key: 'agentNo',
        initVal: "",
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
      },
      {
        type: 1,
        label: '支付方式',
        key: 'payType',
        initVal: "",
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
      },
      {
        type: 6,
        label: '打款凭证',
        key: 'voucher',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 0,
        label: '邮寄地址',
        key: 'buyerAddress',
        initVal: 'pdd',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'buyerRemark',
        initVal: 'pdd',
        inputType: 'textarea',
        rules: setRules('法人手机号').isRequired.get
      }
    ]
  },
  editData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'deviceType',
        initVal: "",
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
      },
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModel',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 6,
        label: '图片',
        key: 'deviceImg',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 0,
        label: '单台设备成本价',
        key: 'costPrice',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '单台设备售卖价',
        key: 'salePrice',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('法人姓名').isRequired.get
      },
      {
        type: 0,
        label: '排序',
        key: 'sort',
        initVal: 'pdd',
        rules: setRules('法人手机号').isRequired.get
      }
    ]
  }
}
