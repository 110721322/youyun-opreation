import api_memberManage from "@/api/api_memberManage";
import { PERSON_MANAGE_CONDITION } from "../../../libs/data/permissionBtns";
import store from '@/store'

export const SEARCH_CONFIG = {
  permission: {
    condition: PERSON_MANAGE_CONDITION
  },
  formData: [
    {
      type: 9,
      querySelectAll: true,
      timeType: 'datetimerange',
      isSelectToday: true,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'inputForm',
      class: 'max-width',
      options: [
        {
          label: '工号',
          value: 'jobNumber'
        },
        {
          label: '成员花名',
          value: 'jobName'
        },
        {
          label: '成员姓名',
          value: 'name'
        },
        {
          label: '手机号',
          value: 'phone'
        }
      ],
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '性别',
      key: 'sex',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '女',
          value: 0
        },
        {
          label: '男',
          value: 1
        }
      ]
    },
    {
      type: 1,
      label: '职位',
      key: 'position',
      labelWidth: '80px',
      span: 11,
      options: store.state.system.positionList
    },
    {
      type: 1,
      label: '上级',
      key: 'superiorName',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: api_memberManage.superiorsList,
        keyName: 'id',
        valueName: 'nickName',
        method: 'post'
      }
    }
  ]
}
