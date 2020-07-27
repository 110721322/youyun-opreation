import { setRules } from '@/libs/kit/formFns.js'

export const ORDER_RECORD_CONFIG = {
  gridConfig: [
    {
      label: "序号",
      prop: "rank",
      width: "72px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '180px'
    },
    {
      label: '订单号',
      prop: 'outputNo',
      width: '180px'
    },
    {
      label: '设备名称',
      prop: 'deviceModel',
      width: '100px'
    },
    {
      label: '订单金额',
      prop: 'amount',
      width: '100px'
    },
    {
      label: '联系人',
      prop: 'buyerName',
      width: '150px'
    },
    {
      label: '联系人电话',
      prop: 'buyerPhone',
      width: '150px'
    },
    {
      label: '邮件地址',
      prop: 'buyerAddress',
      width: '150px'
    },
    {
      label: '订单状态',
      prop: 'statusDesc',
      width: '150px'
    }
  ],
  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '订单详情',
        emitName: 'detail',
        type: 'text',
        style: 'color:#1989FA'
      }
    ]
  },
  deviceData: {
    title: '广告物料',
    showFootBtn: true,
    formData: [
      {
        type: 'input',
        label: '广告类型',
        key: 'advertType',
        initVal: 'pdd',
        rules: setRules('广告类型').isRequired.get
      },
      {
        type: 'upload',
        label: '广告图片',
        key: 'advertImg',
        class: 'max-width',
        labelWidth: '100px'
      },
      {
        type: 'input',
        label: '广告名称',
        key: 'advertName',
        initVal: 'pdd',
        rules: setRules('广告名称').isRequired.get
      },
      {
        type: 'input',
        label: '广告链接',
        key: 'advertUrl',
        initVal: 'pdd',
        rules: setRules('广告链接').isRequired.get
      },
      {
        type: 'input',
        label: '支付金额',
        key: 'amount',
        initVal: 'pdd'
      }
    ]
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  }
};
