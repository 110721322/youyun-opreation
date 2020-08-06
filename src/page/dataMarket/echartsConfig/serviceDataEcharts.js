export const mapOption = {
  tooltip: {
    triggerOn: "mousemove"
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 56,
    bottom: 40,
    showLabel: !0,
    text: ["高", "低"],
    pieces: [
      {
        gt: 100,
        label: "> 100 人",
        color: "#0050B3"
      },
      {
        gte: 10,
        lte: 100,
        label: "10 - 100 人",
        color: "#1890FF"
      },
      {
        gte: 1,
        lt: 10,
        label: "1 - 9 人",
        color: "#69C0FF"
      },
      {
        gt: 0,
        lt: 1,
        label: "1",
        color: "#BAE7FF"
      },
      {
        value: 0,
        color: "#E1E9F0"
      }
    ],
    show: !0
  },
  geo: {
    map: "china",
    roam: !1,
    scaleLimit: {
      min: 1,
      max: 2
    },
    zoom: 1.2,
    top: 45,
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        borderColor: "#fff",
        textStyle: {
          show: false
        }
      },

      emphasis: {
        areaColor: "#FAD337",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0
      }
    }
  },
  series: [
    {
      name: "商户数量",
      type: "map",
      geoIndex: 0,
      data: []
    }
  ]
}

export const pieOptionList = [
  {
    dataList: [],
    title: {
      text: "服务商大区分布",
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
        name: "服务商大区分布",
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
    dataList: [],
    title: {
      text: "服务商等级分布",
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
        name: "服务商等级分布",
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
          { value: 0.36, name: "国", itemStyle: { color: "#00A1FF" } },
          { value: 0.2, name: "省", itemStyle: { color: "#37CBCB" } },
          { value: 0.1, name: "市", itemStyle: { color: "#FAD337" } }
        ]
      }
    ]
  },
  {
    dataList: [],
    title: {
      text: "服务商类型分布",
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
        name: "服务商类型分布",
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
          { value: 0.36, name: "小马哥", itemStyle: { color: "#00A1FF" } },
          { value: 0.2, name: "OEM", itemStyle: { color: "#37CBCB" } },
          { value: 0.1, name: "源码", itemStyle: { color: "#FAD337" } }
        ]
      }
    ]
  }
]

export const lineOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    },
    formatter: "{b0}<br />{a0}: ¥ {c0}"
  },
  grid: {
    top: "50",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23",
        "12-23"
      ]
    }
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    }
  ],
  series: [
    {
      name: "商户平均交易额",
      type: "line",
      lineStyle: {
        color: "#1890FF"
      },
      // symbol: "none",
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
      // emphasis: {
      //   itemStyle: {
      //     // 高亮时点的颜色。
      //     color: "blue"
      //   },
      //   label: {
      //     show: true,
      //     // 高亮时标签的文字。
      //     formatter: "This is a emphasis label."
      //   }
      // },
      itemStyle: {
        normal: {
          color: "#1890FF",
          lineStyle: {
            color: "#1890FF"
          }
        }
      },
      data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 330]
    }
  ]
}
