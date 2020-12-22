import { AccountList } from "@/libs/config/constant.config";

export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '账户ID',
      prop: 'id',
      render: (h, params) => {
        return (
          <span class="f-fc-theme">{ params.row.id }</span>
        )
      },
      width: '120px'
    },
    {
      label: '账户名称',
      prop: 'name',
      width: '120px'
    },
    {
      label: '登录手机号',
      prop: 'phone',
      width: '120px'
    },
    {
      label: '所属权限组',
      prop: 'roleName',
      width: '120px'
    },
    {
      label: '备注',
      prop: 'remark',
      width: '120px'
    },
    {
      label: '操作人',
      prop: 'editorName',
      width: '120px'
    }
  ],
  gridBtnConfig: {  // 启用状态：可进行禁用、编辑操作  禁用状态：可进行启用、编辑、删除操作
    expands: [
      {
        name: '启用',
        emitName: 'enable',
        type: 'text',
        isShow($row) {
          return $row.status === AccountList.ACCOUNT_LOCK;
        }
      },
      {
        name: '禁用',
        emitName: 'disable',
        type: 'text',
        style: 'color:#F5222D',
        isShow($row) {
          return $row.status === AccountList.ACCOUNT_NORMAL;
        }
      },
      {
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      },
      {
        name: '删除',
        emitName: 'del',
        type: 'text',
        style: 'color:#F5222D',
        isShow($row) {
          return $row.status === AccountList.ACCOUNT_LOCK;
        }
      }
    ]
  }
}
