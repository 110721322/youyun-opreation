import utils from "youyun-vue-components/global/kit/utils";
import { DataCenter } from "@/libs/config/constant.config";

const lineStrategies = {
  [DataCenter.PAY_AMOUNT]() {
    return {
      color: '#1890FF',
      id: DataCenter.PAY_AMOUNT,
      name: '支付金额',
      formatter($params) {
        return `支付金额: ¥${utils.toLocaleString($params.data)}`
      }
    }
  },
  [DataCenter.PAY_COUNT]() {
    return {
      color: '#2FC25B',
      id: DataCenter.PAY_COUNT,
      name: '支付笔数',
      formatter($params) {
        return `支付笔数: ${utils.toLocaleString($params.data)}笔`
      }
    }
  }
}

const computedLine = ($strategy) => {
  return lineStrategies[$strategy]()
}

const amountLine = computedLine(DataCenter.PAY_AMOUNT)
const countLine = computedLine(DataCenter.PAY_COUNT)


export const ECHARTS_LINE_CONFIG =  {
  tooltip: {
    trigger: 'axis',
    formatter($params) {
      let template = `<p>${$params[0].name}</p>`;
      $params.forEach(item => {
        const line = computedLine(item.seriesId)
        template += `<p><i style="display: inline-block;width: 12px;height: 12px;background: ${line.color};border-radius: 50%;margin-right: 8px;"></i>${line.formatter(item)}</p>`
      })
      return template
    }
  },
  legend: {
    top: 20,
    textStyle: {
      color: '#2C3542'
    },
    data: ['支付金额', '支付笔数']
  },
  dataZoom: [
    {
      show: true,
      realtime: true
    },
    {
      type: 'inside',
      realtime: true
    }
  ],
  grid: {
    left: '24',
    right: '24',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: amountLine.name,
      id: amountLine.id,
      type: 'line',
      lineStyle: {
        color: amountLine.color
      },
      itemStyle: {
        color: amountLine.color
      },
      data: []
    },
    {
      name: countLine.name,
      id: countLine.id,
      type: 'line',
      lineStyle: {
        color: countLine.color
      },
      itemStyle: {
        color: countLine.color
      },
      data: []
    }
  ]
};
