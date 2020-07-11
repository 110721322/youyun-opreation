import { TASK_SEARCH_1 } from "../../../libs/data/permissionBtns";

export const FORM_CONFIG = {
  permission: {
    search: TASK_SEARCH_1
  },
  formData: [
    {
      type: 1,
      label: '任务类型',
      key: 'taskType',
      style: 'width:294px',
      labelWidth: '100px',
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
      label: '任务名称',
      key: 'name',
      style: 'width:294px',
      labelWidth: '100px', options: [
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
      label: '成员',
      key: 'member',
      style: 'width:294px',
      labelWidth: '100px',
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
