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
        maxNum: 1,
        // key: "headerImageSrc",
        initVal: ""
      },
      {
        type: 0,
        label: "花名",
        key: "jobName",
        initVal: "",
        rules: setRules("花名").isRequired.get
      },
      {
        type: 0,
        label: "姓名",
        key: "name",
        initVal: "",
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
            value: 1
          },
          {
            label: "女",
            value: 0
          }
        ],
        rules: setRules("性别", 1).isSelected.get
      },
      {
        type: 0,
        label: "手机号",
        key: "phone",
        initVal: "",
        rules: setRules("手机号").isRequired.get
      },
      {
        type: 0,
        label: "工号",
        key: "jobNumber",
        initVal: "",
        rules: setRules("工号").isRequired.get
      },
      {
        type: 11,
        label: "生日",
        key: "birthday",
        initVal: null,
        dateType: "date",
        rules: setRules("生日").isSelected.get
      },
      {
        type: 0,
        label: "邮箱",
        key: "email",
        initVal: "",
        rules: setRules("邮箱").isRequired.get
      }
    ]
  }
}
