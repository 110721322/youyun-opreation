import { validPhone, validEmail } from "@/libs/kit/validate";

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
        rules: [
          {required: true, message: '请上传图片', trigger: 'change'}
        ]
      },
      {
        type: 0,
        label: "花名",
        key: "jobName",
        initVal: "",
        rules: [
          {required: true, message: '请输入花名', trigger: 'blur'}
        ]
      },
      {
        type: 0,
        label: "姓名",
        key: "name",
        initVal: "",
        rules: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
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
        rules: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ]
      },
      {
        type: 0,
        label: "手机号",
        key: "phone",
        initVal: "",
        rules: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (!validPhone(value)) {
                callback(new Error("请输入正确的手机号"))
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      {
        type: 0,
        label: "工号",
        key: "jobNumber",
        initVal: "",
        rules: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ]
      },
      {
        type: 11,
        label: "生日",
        key: "birthday",
        initVal: null,
        format: 'yyyy-MM-dd',
        dateType: "date",
        rules: [
          {required: true, message: '请选择生日', trigger: 'change'}
        ]
      },
      {
        type: 0,
        label: "邮箱",
        key: "email",
        initVal: "",
        rules: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (!validEmail(value)) {
                callback(new Error("请输入正确的邮箱"))
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    ]
  }
}
