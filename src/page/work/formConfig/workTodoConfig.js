import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  communicationData: {
    title: '添加沟通小记',
    showFootBtn: true,
    footBtnLabel: "添加",
    formData: [
      {
        type: 1,
        label: "联系人",
        key: "contactPerson",
        initVal: "male",
        options: [
          {
            label: "男",
            value: "male"
          },
          {
            label: "女",
            value: "female"
          }
        ],
        rules: setRules("性别").isRequired.get
      },
      {
        type: 0,
        label: "职位",
        key: "position",
        initVal: "pdd",
        rules: setRules("姓名").isRequired.get,
        isDisable: () => {
          return true;
        }
      },
      {
        type: 0,
        label: "手机号",
        key: "phone",
        initVal: "pdd",
        rules: setRules("姓名").isRequired.get,
        isDisable: () => {
          return true;
        }
      },
      {
        type: 1,
        label: "沟通方式",
        key: "contactWay",
        initVal: "male",
        options: [
          {
            label: "男",
            value: "male"
          },
          {
            label: "女",
            value: "female"
          }
        ],
        rules: setRules("性别").isRequired.get
      },
      {
        type: 0,
        label: "沟通主题",
        key: "contactTheme",
        initVal: "pddpddpdd",
        rules: setRules("姓名").isRequired.get,
        isDisable: () => {
          return true;
        }
      },
      {
        type: 1,
        label: "问题商户",
        key: "questionMerchant",
        initVal: ["male"],
        options: [
          {
            label: "男",
            value: "male"
          },
          {
            label: "女",
            value: "female"
          }
        ],
        rules: setRules("性别").isRequired.get
      },
      {
        type: 0,
        label: '沟通内容',
        key: 'contactContent',
        initVal: 'pdd',
        inputType: 'textarea'
      },
      {
        type: 11,
        label: "下次沟通时间",
        key: "nextContactTime",
        initVal: null,
        format: "yyyy-MM-dd",
        datatype: "date"
      },
      {
        type: 1,
        label: "提醒时间",
        key: "remindType",
        initVal: "male",
        options: [
          {
            label: "男",
            value: "male"
          },
          {
            label: "女",
            value: "female"
          }
        ],
        isShow: ($item) => {
          return $item.nextContactTime
        },
        rules: setRules("性别").isRequired.get
      },
      {
        type: 1,
        label: "联系人",
        key: "contactPerson2",
        initVal: "male",
        options: [
          {
            label: "男",
            value: "male"
          },
          {
            label: "女",
            value: "female"
          }
        ],
        isShow: ($item) => {
          return $item.nextContactTime
        },
        rules: setRules("性别").isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'remark',
        initVal: 'pdd',
        isShow: ($item) => {
          return $item.nextContactTime
        },
        inputType: 'textarea'
      }
    ]
  }
}
