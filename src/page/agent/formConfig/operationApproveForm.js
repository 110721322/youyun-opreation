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
      initValArray: ["间连佣金【2019-08、2019-09、2019-10、2019-11…】", "直连佣金【2019-08、2019-09、2019-10、2019-11…】", "银联佣金【2019-08、2019-09、2019-10、2019-11…】"]
    },
    formData: [
      {
        type: 'show',
        label: '发票照片',
        key: 'food',
        isImage: true,
        initVal: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      {
        type: 'show',
        label: '发票快递单号',
        key: 'name7',
        initVal: '321341423273528268276'
      },
      {
        type: 'show',
        label: '结算账户',
        key: 'name6',
        initVal: '293092019209399929'
      },
      {
        type: 'show',
        label: '备用联系方式',
        key: 'name1',
        initVal: 'pdd'
      },
      {
        type: 'show',
        label: '服务商备注',
        key: 'name2',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元'
      },
      {
        type: 'show',
        label: '结算金额',
        key: 'name3',
        initVal: 'pdd'
      },
      {
        type: 0,
        label: '驳回原因',
        key: 'name4',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('驳回原因').isRequired.get
      }
    ]
  },
  rejectData2: {
    title: '驳回',
    showFootBtn: true,
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
      initValArray: ["间连佣金【2019-08、2019-09、2019-10、2019-11…】", "直连佣金【2019-08、2019-09、2019-10、2019-11…】", "银联佣金【2019-08、2019-09、2019-10、2019-11…】"]
    },
    formData: [
      {
        type: 'show',
        label: '发票照片',
        key: 'food2',
        isImage: true,
        initVal: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      {
        type: 'show',
        label: '发票快递单号',
        key: 'name72',
        initVal: '321341423273528268276'
      },
      {
        type: 'show',
        label: '结算账户',
        key: 'name62',
        initVal: '293092019209399929'
      },
      {
        type: 'show',
        label: '备用联系方式',
        key: 'name12',
        initVal: 'pdd'
      },
      {
        type: 'show',
        label: '服务商备注',
        key: 'name22',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元'
      },
      {
        type: 'show',
        label: '结算金额',
        key: 'name32',
        initVal: 'pdd'
      },
      {
        type: 'show',
        label: '运营备注',
        key: 'name42',
        initVal: '按服务商要求结算500元'
      }
    ]
  }
}
