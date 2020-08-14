import api from "@/api/api_task"
export const FORM_CONFIG = {
  formData: [
    {
      type: 1,
      label: '任务类型',
      key: 'undoType',
      labelWidth: '100px',
      options: [
        {
          label: '日常任务',
          value: '1'
        },
        {
          label: '审批任务',
          value: '2'
        }
      ]
    },
    {
      type: 1,
      label: '任务名称',
      key: 'taskType',
      style: 'width:294px',
      labelWidth: '100px',
      urlOptions: {
        url: api.queryTaskType,
        method: 'post',
        keyName: 'taskType',
        valueName: 'taskValue'
      }
    },
    {
      type: 1,
      label: '成员',
      key: 'recevierId',
      style: 'width:294px',
      labelWidth: '100px',
      urlOptions: {
        url: api.queryAllEmployeeList,
        method: 'post',
        keyName: 'id',
        valueName: 'name'
      }
    }
  ]
}
