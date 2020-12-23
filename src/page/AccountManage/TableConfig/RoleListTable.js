export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: 'ID',
      prop: 'id',
      render: (h, params) => {
        return (
          <span class="f-fc-theme">{ params.row.id }</span>
        )
      },
      width: '180px'
    },
    {
      label: '权限组名称',
      prop: 'roleName',
      width: '180px'
    },
    {
      label: '操作人',
      prop: 'editorName',
      width: '180px'
    },
    {
      label: '添加时间',
      prop: 'createTime',
      width: '180px'
    }
  ],
  gridBtnConfig: {
    expands: [
      {
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      },
      {
        name: '删除',
        emitName: 'del',
        type: 'text',
        style: 'color:#F5222D'
      }
    ]
  }
}
