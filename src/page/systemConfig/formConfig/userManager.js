import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  editData: {
    title: '个人信息',
    showFootBtn: true,
    formData: [
      {
        type: 6,
        label: "头像",
        key: "img",
        // key: "headerImageSrc",
        initVal: "pdd",
        rules: setRules("头像").isRequired.get
      },
      {
        type: 0,
        label: "花名",
        key: "jobName",
        initVal: "pdd",
        rules: setRules("花名").isRequired.get
      },
      {
        type: 0,
        label: "姓名",
        key: "name",
        initVal: "pdd",
        rules: setRules("姓名").isRequired.get
      },
      {
        type: 5,
        label: "性别",
        key: "sex",
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
        rules: setRules("性别", 1).isRequired.get
      },
      {
        type: 1,
        label: "职位",
        key: "position",
        initVal: [],
        options: [
          {
            label: "唱",
            value: 0
          },
          {
            label: "跳",
            value: 1
          },
          {
            label: "rap",
            value: 2
          },
          {
            label: "篮球",
            value: 3
          }
        ]
      },
      {
        type: 1,
        label: "直属上级",
        key: "superiorId",
        initVal: [],
        options: [
          {
            label: "唱",
            value: 0
          },
          {
            label: "跳",
            value: 1
          },
          {
            label: "rap",
            value: 2
          },
          {
            label: "篮球",
            value: 3
          }
        ]
      },
      {
        type: 0,
        label: "手机号",
        key: "phone",
        initVal: "pdd",
        rules: setRules("姓名").isRequired.get
      },
      {
        type: 0,
        label: "工号",
        key: "jobNumber",
        initVal: "pdd",
        rules: setRules("姓名").isRequired.get
      },
      {
        type: 11,
        label: "生日",
        key: "birthday",
        initVal: null,
        dateType: "date"
      },
      {
        type: 0,
        label: "邮箱",
        key: "email",
        initVal: "pdd",
        rules: setRules("姓名").isRequired.get
      }
    ]
  }
}
