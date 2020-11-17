import { PERSON_MANAGE_COMPLETE, PERSON_MANAGE_EDIT } from "../../../libs/data/permissionBtns";

export const USERLIST_CONFIG = {
  gridConfig: [
    {
      label: '花名',
      prop: 'jobName',
      render: (h, params) => {
        return h(
          'span', params.row.jobName ? params.row.jobName : '-'
        )
      }
    },
    {
      label: '工号',
      prop: 'jobNumber',
      render: (h, params) => {
        return h(
          'span', params.row.jobNumber ? params.row.jobNumber : '-'
        )
      }
    },
    {
      label: '姓名',
      prop: 'name',
      render: (h, params) => {
        return h(
          'span', params.row.name ? params.row.name : '-'
        )
      }
    },
    {
      label: '职位',
      prop: 'positionName',
      render: (h, params) => {
        return h(
          'span', params.row.positionName ? params.row.positionName : '-'
        )
      }
    },
    {
      label: '上级',
      prop: 'superiorName',
      render: (h, params) => {
        return h(
          'span', params.row.superiorName ? params.row.superiorName : '-'
        )
      }
    },
    {
      label: '手机号',
      prop: 'phone',
      width: '120px'
    },
    {
      label: '性别',
      prop: 'sex',
      formatter($row) {
        const sex = $row[this.prop];
        if (sex === 0) {
          return '女';
        } else if (sex === 1) {
          return '男';
        }
        return '-'
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '邮箱',
      prop: 'email',
      render: (h, params) => {
        return h(
          'span', params.row.email ? params.row.email : '-'
        )
      }
    },
    {
      label: '状态',
      prop: 'status',
      formatter($row) {
        const status = $row[this.prop];
        if (status === 'lock') {
          return '冻结';
        } else if (status === 'normal') {
          return '正常';
        }
        return ''
      }
    }
  ],

  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '完善岗位信息',
        emitName: 'perfect',
        type: 'text',
        permission: PERSON_MANAGE_COMPLETE,
        isShow($row) {
          const infoStatus = $row.infoStatus;
          const userType = $row.userType
          if (userType !== 11) {
            switch (infoStatus) {
              case 0:
                return true;
              case 1:
                return true;
              case 2:
                return false;
              case 3:
                return false;
              default:
                return true;
            }
          } else {
            return false
          }
        }
      },
      {
        name: '编辑基础信息',
        emitName: 'editBasics',
        type: 'text',
        isShow($row) {
          const userType = $row.userType
          const infoStatus = $row.infoStatus;
          if (userType !== 11) {
            switch (infoStatus) {
              case 0:
                return false;
              case 1:
                return false;
              case 2:
                return true;
              case 3:
                return true;
              default:
                return false;
            }
          } else {
            return false
          }
        }
      },
      {
        name: '编辑岗位信息',
        emitName: 'editPost',
        type: 'text',
        permission: PERSON_MANAGE_EDIT,
        isShow($row) {
          const userType = $row.userType
          const infoStatus = $row.infoStatus;
          if (userType !== 11) {
            switch (infoStatus) {
              case 0:
                return false;
              case 1:
                return false;
              case 2:
                return true;
              case 3:
                return true;
              default:
                return false;
            }
          } else {
            return false
          }
        }
      }
    ]
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  },
  hideEditArea: false
};
