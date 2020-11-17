// import { validEmail } from "@/libs/kit/validate";

// export const FORM_CONFIG = {
//   editData: {
//     title: '个人信息',
//     showFootBtn: true,
//     formData: [
//       {
//         type: 6,
//         label: "头像",
//         key: "img",
//         initVal: "",
//         rules: [
//           {required: true, message: '请上传图片', trigger: 'change'}
//         ]
//       },
//       {
//         type: 0,
//         label: "花名",
//         key: "jobName",
//         initVal: "",
//         rules: [
//           {required: true, message: '请输入花名', trigger: 'blur'}
//         ]
//       },
//       {
//         type: 0,
//         label: "姓名",
//         key: "name",
//         initVal: "",
//         rules: [
//           {required: true, message: '请输入姓名', trigger: 'blur'}
//         ]
//       },
//       {
//         type: 5,
//         label: "性别",
//         key: "sex",
//         initVal: "male",
//         options: [
//           {
//             label: "男",
//             value: 1
//           },
//           {
//             label: "女",
//             value: 0
//           }
//         ],
//         rules: [
//           {required: true, message: '请选择性别', trigger: 'blur'}
//         ]
//       },
//       {
//         type: 0,
//         label: "工号",
//         key: "jobNumber",
//         initVal: "",
//         rules: [
//           {required: true, message: '请输入工号', trigger: 'blur'}
//         ]
//       },
//       {
//         type: 11,
//         label: "生日",
//         key: "birthday",
//         initVal: null,
//         format: 'yyyy-MM-dd',
//         dateType: "date",
//         rules: [
//           {required: true, message: '请选择生日', trigger: 'change'}
//         ]
//       },
//       {
//         type: 0,
//         label: "邮箱",
//         key: "email",
//         initVal: "",
//         rules: [
//           {required: true, message: '请输入邮箱', trigger: 'blur'},
//           {
//             validator: (rule, value, callback) => {
//               if (!validEmail(value)) {
//                 callback(new Error("请输入正确的邮箱"))
//               } else {
//                 callback();
//               }
//             },
//             trigger: "blur"
//           }
//         ]
//       }
//     ]
//   }
// }
// import { validEmail } from "@/libs/kit/validate";

export const FORM_CONFIG = {
  editData: {
    title: '个人信息',
    showFootBtn: true,
    formData: [
      {
        type: 6,
        id: 3,
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
        id: 4,
        initVal: "",
        rules: [
          {required: true, message: '请输入花名', trigger: 'blur'}
        ]
      },
      {
        type: 0,
        label: "姓名",
        key: "name",
        id: 5,
        initVal: "",
        rules: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
      },
      {
        type: 5,
        label: "性别",
        id: 8,
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
        rules: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ]
      },
      {
        type: 4,
        label: "状态",
        id: 11,
        key: "status",
        initVal: "",
        activeValue: "normal",
        inactiveValue: "lock",
        rules: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      },
      // {
      //   type: 1,
      //   id: 7,
      //   label: "职位",
      //   key: "position",
      //   initVal: [],
      //   options: [],
      //   rules: [
      //     {required: true, message: '请选择状态', trigger: 'blur'}
      //   ]
      // },
      // {
      //   type: 1,
      //   id: 12,
      //   label: "直属上级",
      //   key: "superiorId",
      //   initVal: [],
      //   options: [],
      //   rules: [
      //     {required: true, message: '请选择直属上级', trigger: 'blur'}
      //   ]
      // },
      {
        type: 0,
        label: "密码",
        inputType: "password",
        maxlength: 20,
        id: 1,
        key: "password",
        initVal: "",
        rules: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback()
              } else if (value.length < 6) {
                callback(new Error("请输入6-20位数字和字母组合"))
              } else {
                callback()
              }
            }
          }
        ]
      },
      {
        type: 0,
        id: 6,
        label: "工号",
        key: "jobNumber",
        initVal: "",
        rules: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ]
      },
      {
        type: 11,
        id: 9,
        label: "生日",
        key: "birthday",
        format: "yyyy-MM-dd",
        initVal: "",
        dateType: "date",
        rules: [
          {required: true, message: '请选择生日', trigger: 'blur'}
        ]
      },
      {
        type: 0,
        id: 10,
        label: "邮箱",
        key: "email",
        initVal: "",
        rules: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
          // {
          //   validator: (rule, value, callback) => {
          //     if (!validEmail(value)) {
          //       callback(new Error("请输入正确的邮箱"))
          //     } else {
          //       callback();
          //     }
          //   },
          //   trigger: "blur"
          // }
        ]
      }
    ]
  }
}
