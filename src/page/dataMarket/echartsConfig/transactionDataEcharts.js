export const lineOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  grid: {
    top: "30px",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "刷脸总交易额",
      type: "line",
      stack: "刷脸总交易额",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#6CDE61" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ffffff" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        normal: {
          color: "#6CDE61",
          lineStyle: {
            color: "#6CDE61"
          }
        }
      },
      data: []
    },
    {
      name: "订单总交易额",
      type: "line",
      stack: "订单总交易额",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#4EA6FF" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ffffff" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        normal: {
          color: "#4EA6FF",
          lineStyle: {
            color: "#4EA6FF"
          }
        }
      },
      data: []
    }
  ]
}

export const barOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: []
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "刷脸总交易额",
      type: "bar",
      stack: "刷脸总交易额",
      itemStyle: {
        color: "#34B64C"
      },
      data: []
    },
    {
      name: "订单总交易额",
      type: "bar",
      stack: "订单总交易额",
      itemStyle: {
        color: "#1890FF"
      },
      data: []
    }
  ]
}

export const pieOptionList = [
  {
    title: {
      text: "交易额大区占比",
      left: "center",
      textStyle: {
        color: "rgba(0,0,0,0.85)",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)"
    },
    series: [
      {
        name: "交易额大区占比",
        type: "pie",
        avoidLabelOverlap: false,
        radius: ["40%", "80%"],
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 0.36, name: "华东", itemStyle: { color: "#00A1FF" } },
          { value: 0.2, name: "华中", itemStyle: { color: "#37CBCB" } },
          { value: 0.1, name: "华北", itemStyle: { color: "#FAD337" } },
          { value: 0.09, name: "华南", itemStyle: { color: "#F2637B" } },
          { value: 0.09, name: "华西", itemStyle: { color: "#975FE4" } }
        ]
      }
    ]
  },
  {
    title: {
      text: "交易额行业占比",
      left: "center",
      textStyle: {
        color: "rgba(0,0,0,0.85)",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)"
    },
    series: [
      {
        name: "交易额大区占比",
        type: "pie",
        avoidLabelOverlap: false,
        radius: ["40%", "80%"],
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 0.36, name: "华东", itemStyle: { color: "#00A1FF" } },
          { value: 0.2, name: "华中", itemStyle: { color: "#37CBCB" } },
          { value: 0.1, name: "华北", itemStyle: { color: "#FAD337" } },
          { value: 0.09, name: "华南", itemStyle: { color: "#F2637B" } },
          { value: 0.09, name: "华西", itemStyle: { color: "#975FE4" } }
        ]
      }
    ]
  }
]
