import { validPhone } from 'youyun-vue-components/global/kit/validate'
import { AccountList } from "@/libs/config/constant.config";
import api_accountManage from "@/api/api_accountManage";

export const SEARCH_CONFIG = [
  {
    type: 0,
    label: '账户名称',
    key: 'name',
    span: 12
  },
  {
    type: 0,
    label: '登录手机',
    key: 'phone',
    span: 12
  },
  {
    type: 1,
    label: '所属权限组',
    key: 'roleId',
    span: 12,
    urlOptions: {
      url: api_accountManage.queryRoleListByPage,
      params: {
        platformType: AccountList.OPERATION_PLATFORM
      },
      valueName: 'roleName',
      keyName: 'id'
    }
  }
]

export const ACCOUNT_FORM = [
  {
    type: 0,
    initVal: '',
    label: 'id',
    key: 'id',
    maxlength: 12,
    span: 24,
    isShow: false
  },
  {
    type: 0,
    initVal: '',
    label: '账户名称',
    key: 'name',
    maxlength: 12,
    span: 24,
    rules: [
      { required: true, message: '请输入账户名称', trigger: 'blur' }
    ]
  },
  {
    type: 0,
    initVal: '',
    label: '登录手机',
    key: 'phone',
    maxlength: 11,
    span: 24,
    rules: [
      { required: true, message: '请输入登录手机号', trigger: 'blur' },
      {
        validator: (rules, value, callback) => {
          if (!validPhone(value)) {
            callback('请输入正确手机号')
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  },
  {
    type: 0,
    inputType: 'password',
    initVal: '',
    label: '修改密码',
    key: 'password',
    span: 24,
    isShow: false,
    rules: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  },
  {
    type: 1,
    initVal: '',
    label: '权限',
    key: 'roleId',
    urlOptions: {
      url: api_accountManage.queryRoleListByPage,
      params: {
        platformType: AccountList.OPERATION_PLATFORM
      },
      valueName: 'roleName',
      keyName: 'id'
    },
    span: 24,
    rules: [
      { required: true, message: '请选择权限', trigger: 'blur' }
    ]
  },
  {
    type: 0,
    inputType: "textarea",
    label: '备注',
    key: 'remark',
    placeholder: "请输入",
    span: 24,
    maxlength: 50
  }
]
