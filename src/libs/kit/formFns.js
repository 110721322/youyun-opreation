import axios from 'axios'
import * as g from '@/libs/global.js'
import { rules } from '../rules' // 引入规则配置
/**
 * 定义组件名
 */
export const transFormType = typeNum => {
  let componentName = ''
  switch (typeNum) {
    case 0:
      componentName = 'Input'
      break
    case 1:
      componentName = 'Select'
      break
    case 2:
      componentName = 'Check'
      break
    case 3:
      componentName = 'Date'
      break
    case 4:
      componentName = 'iSwitch'
      break
    case 5:
      componentName = 'Radio'
      break
    case 6:
      componentName = 'Upload'
      break
    case 7:
      componentName = 'Tinymce'
      break
    case 8:
      componentName = 'Cascader'
      break
    case 9:
      componentName = 'DateSelect'
      break
    case 10:
      componentName = 'SelectInput'
      break
    default:
    // throwError("formType \"" + typeNum + "\" does not exist.open fn.js and add it");
  }
  return componentName
}

/**
 * 链式设置校验规则
 */
export const setRules = (function() {
  return function(keyName, keyType) {
    const fnStack = []
    const proxy = new Proxy(
      {},
      {
        get(target, fnName) {
          if (fnName === 'get') {
            return fnStack.reduce((val, fn) => fn(val), [
              {
                keyName,
                keyType
              }
            ])
          }
          fnStack.push(rules[fnName])
          return proxy
        }
      }
    )

    return proxy
  }
})()

/**
 * 格式化表单数据
 */
export const formatFormData = (obj, keys) => {
  for (const key of keys) {
    const value = obj[key]
    if (g.utils.isArr(value)) {
      obj[key] = value.toString()
    }
    if (g.utils.isBoolean(value)) {
      obj[key] = value ? 1 : 0
    }
    if (obj[key] === '' || g.utils.isUndefined(value)) {
      obj[key] = null
    }
  }
}

/**
 * 清空表单数据
 */
export const clearFormData = (obj, keys) => {
  for (const key of keys) {
    const value = obj[key]
    if (g.utils.isArr(value)) {
      obj[key] = []
    }
    if (g.utils.isString(value)) {
      obj[key] = ''
    }
    if (g.utils.isNumber(value)) {
      obj[key] = null
    }
    if (g.utils.isBoolean(value)) {
      obj[key] = false
    }
  }
}

/**
 * 通过请求获取选项列表
 */
export const getOptionsByUrl = urlOptions => {
  const { url, method, keyName } = urlOptions
  const p = () =>
    axios({
      url,
      method
    })
  return p()
    .then(res => {
      const data = res.data.data
      const result = g.utils.getDeepArr(data, keyName)
      return result
    })
    .catch(() => {
      // console.log(err)
    })
}
