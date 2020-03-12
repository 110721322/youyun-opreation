export const TASKLIST_CONFIG = {
  // Type 1为日常沟通 2为审核未处理 3为已处理
  dailyType: 1,
  approvalType: 2,
  handleType: 3,
  dailyCssConfig: {
    itemHeight: "236px",
    detailWidth: "357px"
  },
  approvalCssConfig: {
    itemHeight: "192px",
    detailWidth: "226px"
  },
  dailyListData: [
    {
      title: "商户结算失败",
      status: "任务已创建",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      detail: [
        {
          label: "",
          value: "2020-02-23 11:00:00"
        },
        {
          label: "商户名称",
          value: "红莲水果店（4322392734404802）"
        },
        {
          label: "所属服务商",
          value: "杭州有云科技公司（24172434848490）"
        },
        {
          label: "交易通道",
          value: "乐刷"
        },
        {
          label: "金额",
          value: "220.00元"
        },
        {
          label: "渠道商户号",
          value: "22380238012"
        },
        {
          label: "失败原因",
          value: "银行卡填写错误，失败原因更多银行 卡填写错误，失败原因更多银行卡填写错误"
        }
      ]
    },

    {
      title: "商户结算失败",
      status: "任务已创建",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      detail: [
        {
          label: "",
          value: "2020-02-23 11:00:00"
        },
        {
          label: "商户名称",
          value: "红莲水果店（4322392734404802）"
        },
        {
          label: "所属服务商",
          value: "杭州有云科技公司（24172434848490）"
        },
        {
          label: "交易通道",
          value: "乐刷"
        },
        {
          label: "金额",
          value: "220.00元"
        },
        {
          label: "渠道商户号",
          value: "22380238012"
        },
        {
          label: "失败原因",
          value: "银行卡填写错误，失败原因更多银行 卡填写错误，失败原因更多银行卡填写错误"
        }
      ]
    },

    {
      title: "商户结算失败",
      status: "任务已创建",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      detail: [
        {
          label: "",
          value: "2020-02-23 11:00:00"
        },
        {
          label: "商户名称",
          value: "红莲水果店（4322392734404802）"
        },
        {
          label: "所属服务商",
          value: "杭州有云科技公司（24172434848490）"
        },
        {
          label: "交易通道",
          value: "乐刷"
        },
        {
          label: "金额",
          value: "220.00元"
        },
        {
          label: "渠道商户号",
          value: "22380238012"
        },
        {
          label: "失败原因",
          value: "银行卡填写错误，失败原因更多银行 卡填写错误，失败原因更多银行卡填写错误"
        }
      ]
    }
  ],

  approvalListData: [
    {
      title: "运营佣金结算",
      status: "任务已创建",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "这是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里..."
        }
      ]
    },
    {
      title: "运营佣金结算",
      status: "任务已创建",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "无误"
        }
      ]
    },
    {
      title: "运营佣金结算",
      status: "任务已创建",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "无误"
        }
      ]
    }
  ],

  handleListData: [
    {
      title: "运营佣金结算",
      status: "任务完成时长",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      // handleStatus 1,2,3,4 分别代表通过、拒绝、审核中、已撤销
      handleStatus: 1,
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "这是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里..."
        }
      ]
    },
    {
      title: "运营佣金结算",
      status: "任务完成时长",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      // handleStatus 1,2,3,4 分别代表通过、拒绝、审核中、已撤销
      handleStatus: 2,
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "这是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里..."
        }
      ]
    },
    {
      title: "运营佣金结算",
      status: "任务完成时长",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      // handleStatus 1,2,3,4 分别代表通过、拒绝、审核中、已撤销
      handleStatus: 3,
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "这是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里..."
        }
      ]
    },
    {
      title: "运营佣金结算",
      status: "任务完成时长",
      time: new Date(new Date().getTime() - 3600 * 24 * 3 * 1000),
      // handleStatus 1,2,3,4 分别代表通过、拒绝、审核中、已撤销
      handleStatus: 4,
      detail: [
        {
          label: "发起人",
          value: "曲理理"
        },
        {
          label: "服务商ID",
          value: "2372947197910"
        },
        {
          label: "建议结算金额",
          value: "220.00元"
        },
        {
          label: "发起人备注",
          value: "这是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里是一句备注，这里..."
        }
      ]
    }
  ]
}
