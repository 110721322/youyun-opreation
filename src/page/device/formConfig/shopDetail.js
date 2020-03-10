import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  deviceData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'food',
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
      },
      {
        type: 1,
        label: '沟通类型',
        key: 'food1',
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
      },
      {
        type: 0,
        label: '排序',
        key: 'name7',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 6,
        label: '宣传视频',
        key: 'name6',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 6,
        label: '宣传图片',
        key: 'name8',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 7,
        label: '详情',
        key: 'name3',
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
        key: 'name7',
        initVal: 'pdd',
        isDisable: () => {
          return true;
        },
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '设备型号',
        key: 'name8',
        initVal: 'pdd',
        isDisable: () => {
          return true;
        },
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '订购数量',
        key: 'namea',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '台',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '订单金额',
        key: 'namev',
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
        key: 'names',
        initVal: 'pdd',

        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 1,
        label: '购买服务商',
        key: 'food',
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
      },
      {
        type: 1,
        label: '支付方式',
        key: 'food1',
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
      },
      {
        type: 6,
        label: '打款凭证',
        key: 'name6',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 0,
        label: '邮寄地址',
        key: 'name1',
        initVal: 'pdd',
        rules: setRules('公司地址').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'name3',
        initVal: 'pdd',
        inputType: 'textarea',
        rules: setRules('法人手机号').isRequired.get
      }
    ]
  }
}
