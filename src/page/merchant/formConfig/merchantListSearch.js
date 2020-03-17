import areaData from "@/assets/data/areaData";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px',
      isSelectToday: true
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      placeholder: "请输入商户号",
      options: [
        {
          label: '服务商ID',
          value: 'id'
        },
        {
          label: '服务商名称',
          value: 'name'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '使用通道',
      key: 'useChannel',
      style: 'width:294px',
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
      label: '通道情况',
      key: 'channelStatus',
      style: 'width:294px',
      labelWidth: '185px',
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
      label: '行业类目',
      key: 'industryKind',
      style: 'width:294px',
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
      type: 8,
      label: '开通通道详情',
      key: 'channelType',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          'value': '1',
          'label': '乐刷',
          'children': [
            {
              'value': '1',
              'label': '已开通'
            },
            {
              'value': '2',
              'label': '审核中'
            },
            {
              'value': '3',
              'label': '驳回'
            },
            {
              'value': '4',
              'label': '未开通'
            }
          ]
        },
        {
          'value': '1',
          'label': '新大陆',
          'children': [
            {
              'value': '1',
              'label': '已开通'
            },
            {
              'value': '2',
              'label': '审核中'
            },
            {
              'value': '3',
              'label': '驳回'
            },
            {
              'value': '4',
              'label': '未开通'
            }
          ]
        },
        {
          'value': '1',
          'label': '支付宝直连',
          'children': [
            {
              'value': '1',
              'label': '已开通'
            },
            {
              'value': '2',
              'label': '审核中'
            },
            {
              'value': '3',
              'label': '驳回'
            },
            {
              'value': '4',
              'label': '未开通'
            }
          ]
        },
        {
          'value': '2',
          'label': '微信直连',
          'children': [
            {
              'value': '1',
              'label': '已开通'
            },
            {
              'value': '2',
              'label': '审核中'
            },
            {
              'value': '3',
              'label': '驳回'
            },
            {
              'value': '4',
              'label': '未开通'
            }
          ]
        }
      ]
    },
    {
      type: 8,
      label: '地区',
      key: 'area',
      style: 'width:294px',
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'oper',
      style: 'width:294px',
      labelWidth: '185px',
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
}
