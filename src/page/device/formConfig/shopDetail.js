import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  editData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: "show",
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
        type: "show",
        label: '设备型号',
        key: 'deviceId',
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
        key: 'sort',
        initVal: 'pdd',
        rules: setRules('排序').isRequired.get
      },
      {
        type: 6,
        label: '宣传视频',
        key: 'video',
        initVal: 'pdd',
        rules: setRules('宣传视频').isRequired.get
      },
      {
        type: 6,
        label: '宣传图片',
        key: 'img',
        initVal: 'pdd',
        rules: setRules('宣传图片').isRequired.get
      },
      {
        type: 7,
        label: '详情',
        key: 'desc',
        initVal: 'pdd',
        rules: setRules('详情').isRequired.get
      }
    ]
  },
  addData: {
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
        type: 1,
        label: '设备型号',
        key: 'deviceId',
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
        key: 'sort',
        initVal: 'pdd',
        rules: setRules('排序').isRequired.get
      },
      {
        type: 6,
        label: '宣传视频',
        key: 'video',
        initVal: 'pdd',
        rules: setRules('宣传视频').isRequired.get
      },
      {
        type: 6,
        label: '宣传图片',
        key: 'img',
        initVal: 'pdd',
        rules: setRules('宣传图片').isRequired.get
      },
      {
        type: 7,
        label: '详情',
        key: 'desc',
        initVal: 'pdd',
        rules: setRules('详情').isRequired.get
      }
    ]
  }
}
