import { setRules } from '@/libs/kit/formFns.js'
import store from "@/store";

export const FORM_CONFIG = {
  editData: {
    title: '个人信息',
    showFootBtn: true,
    formData: [
      {
        type: 6,
        label: "头像",
        key: "img",
        initVal: "",
        rules: setRules("头像").isRequired.get
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
        initVal: "",
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
        rules: setRules("性别", 1).isRequired.get
      },
      {
        type: 1,
        label: "职位",
        key: "position",
        initVal: [],
        options: store.state.system.positionList
      },
      {
        type: 1,
        label: "直属上级",
        key: "superiorId",
        initVal: [],
        options: store.state.system.employeeList
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
        format: "yyyy-MM-dd",
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
