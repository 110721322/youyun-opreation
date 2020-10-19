import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG = {
  sendMessageData: {
    title: '公告信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '公告标题',
        key: 'title',
        initVal: '',
        rules: setRules('公告标题').isRequired.get,
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '这里可以进行编辑'
      },
      {
        type: 1,
        label: '公告类型',
        key: 'messageType',
        initVal: 2,
        options: [
          {
            label: '弹窗消息',
            value: 1
          },
          {
            label: '普通消息',
            value: 2
          }
        ],
        style: 'width:364px',
        showDemoImg: true,
        demoImgUrl: '',
        className: ['inline-block'],
        clearable: false
      },

      {
        type: 3,
        label: '显示日期',
        key: 'time',
        initVal: [],
        dateType: 'daterange',
        style: 'width:364px',
        isShow: ($item) => {
          if ($item.messageType === 1) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 1,
        label: '显示方式',
        key: 'displayType',
        initVal: 1,
        options: [
          // {
          //   label: '不显示',
          //   value: 0
          // },
          {
            label: '只显示一次',
            value: 1
          },
          {
            label: '每天只显示一次',
            value: 2
          },
          {
            label: '每次开启后台显示',
            value: 3
          }
        ],
        placeholder: '请选择',
        style: 'width:364px',
        isShow: ($item) => {
          if ($item.messageType === 1) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 5,
        label: '强制阅读',
        key: 'isReadable',
        initVal: false,
        options: [
          {
            label: '否',
            value: false
          },
          {
            label: '是',
            value: true
          }
        ],
        isShow: ($item) => {
          if ($item.messageType === 1) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 0,
        label: '阅读时间',
        key: 'readableTime',
        initVal: '',
        rules: setRules('阅读时间').isRequired.get,
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入1-1000整数',
        showSec: true,
        isDisabled: false,
        isShowSlot: true,
        showSlotName: '秒',
        isShow: ($item) => {
          if ($item.messageType === 1) {
            return true;
          } else {
            return false;
          }
        },
        isDisable: ($item) => {
          if ($item.isReadable === 1) {
            return false;
          } else {
            return true;
          }
        }
      },
      {
        type: 7,
        label: '公告内容',
        key: 'content',
        initVal: '',
        rules: setRules('公告内容').isRequired.get,
        style: 'width:364px',
        isShow: ($item) => {
          return true;
        }
      }
    ]
  }
};
