// import * as API from '../../api';
// import * as g from '../global';

export default {
  //乘法
  AccMul(arg1 = 0, arg2 = 1){
    arg1 = Number(arg1); arg2 = Number(arg2)
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  //除法
  AccDiv(arg1 = 0, arg2 = 1){
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return this.AccMul((r1 / r2), Math.pow(10, t2 - t1));
  },
  //加法
  AccAdd(arg1 = 0, arg2 = 0){
    arg1 = Number(arg1); arg2 = Number(arg2)
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  //减法
  Subtr(arg1 = 0, arg2 = 0){
    arg1 = Number(arg1); arg2 = Number(arg2)
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  toLocaleString($num) {
    $num = this.AccMul($num);
    if ($num) {
      return Number($num).toLocaleString();
    } else {
      return 0
    }
  },
  // 一下方法已经加入到工具类库中,在此只作为实例.
  setSessionData: (k, v) => {
    sessionStorage.setItem(k, JSON.stringify(v));
  },
  getSessionData: (k) => {
    let v = sessionStorage.getItem(k);
    if (v === null || v === undefined || v === 'null' || v === 'undefined') {
      v = '';
      return v;
    }
    return JSON.parse(v);
  },
  getChange: (k, v) => v && v !== '' ? ('&' + k + '=' + v) : '',
  // 第一个get请求转换
  getChange1: (k, v) => v && v !== '' ? ('?' + k + '=' + v) : '',
  // 时间转换
  dateChange: (data) => {
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = data.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },
  // 时间转换
  dateChangeMonth: (data) => {
    data = new Date(data);
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    return y + '-' + m + '-01';
  },
  dateChangeMonth1: (data) => {
    data = new Date(data);
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    return y + '-' + m;
  },
  // 数据库时间转换
  dateInChange: (data) => {
    const y = data.getFullYear();
    let m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = data.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d + 'T00:00:00.000Z';
  },
  // 中国区一周时间转换
  changeCNDay: (data) => {
    let CNDay = data + 7;
    if (CNDay > 7) {
      CNDay = CNDay - 7
    }
    return CNDay;
  },
  // 身份证校验
  checkPersonId: (str) => {
    // trace(str)
    if (str === null || str === '') {
      return false;
    }
    var exp1 = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; // 中国居民身份证验证
    var exp = /(^(H|M)\d{10}$)/; // 港澳通行证验证
    if (exp1.test(str) === false && exp.test(str) === false) {
      return false;
    } else if (str.length === 18) {
      var iSs = 0;
      var iY = 0;
      var szVerCode = '10X98765432';
      var iw = [];
      iw[0] = 7;
      iw[1] = 9;
      iw[2] = 10;
      iw[3] = 5;
      iw[4] = 8;
      iw[5] = 4;
      iw[6] = 2;
      iw[7] = 1;
      iw[8] = 6;
      iw[9] = 3;
      iw[10] = 7;
      iw[11] = 9;
      iw[12] = 10;
      iw[13] = 5;
      iw[14] = 8;
      iw[15] = 4;
      iw[16] = 2;
      for (let i = 0; i < 17; i++) {
        iSs += iw[i] * (str.substr(i, 1) - '0');
      }
      iY = iSs % 11;
      var eChr = str.substr(17, 1);
      var vChr = szVerCode.substr(iY, 1);
      if (eChr === vChr) {
        return true;
      } else {
        return false;
      }
    } else {
      // 15位 未增加算法验证
      return true;
    }
  },

  // 根据id获取地区数据的该项
  getAreaItem: ($obj, $id) => {
    var that = this;
    for (var a in $obj) {
      if (typeof ($obj[a]) === 'object') {
        var ro = that.getAreaItem($obj[a], $id); // 递归遍历
        if (ro !== undefined) {
          return ro;
        }
      } else {
        if (a === 'value' && $obj[a] === $id) {
          return $obj;
        }
      }
    }
  },

  // 遍历公共数据
  forObj: ($obj, $value) => {
    for (const $item of $obj) {
      if ($item.value === $value) {
        return $item;
      }
    }
  },

  /**
   * 封装一个防抖动方法
   * debounce: 防抖函数,  它的两个参数=>  func:函数(要进行防抖的函数)    delay: 毫秒(传入一个时间限制,毫秒)
   * let timer = null;  声明一个timer为null
   * if(timer) clearTimeout(timer) ===============> 如果timer不为空,那么清空它(干掉他)
   * 
   * delay :传入的毫秒,在这也就是延迟时间
   */
  debounce:(func, wait, immediate) => {
    let time
    let debounced = function() {
      let context = this
      if(time) clearTimeout(time)

      if(immediate) {
        let callNow = !time
        if(callNow) func.apply(context, arguments)
        time = setTimeout(
          ()=>{time = null} //见注解
          , wait)
      } else {
        time = setTimeout(
          ()=>{func.apply(context, arguments)}
          , wait)
      }
    }

    debounced.cancel = function() {
      clearTimeout(time)
      time = null
    }

    return debounced
  },


    // 时间转换
  time: (value) => {
    if (value) {
      let out = '';
      const date = new Date(value);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      hour = hour < 10 ? ('0' + hour) : hour;
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      out = y + '-' + m + '-' + d + ' ' + hour + ':' + minute + ':' + second;
      return out;
    }
  },
  date: (value) => {
    if (value) {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        return value.replace(/\./g, '-');
      } else {
        let out = '';
        const date = new Date(value);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        out = y + '-' + m + '-' + d;
        return out;
      }
    }
  },
  // 获取ago当前日期
  getToday: (ago = -1) => {
    var _time = new Date(Date.now() + ago * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' + pad((_time.getMonth() + 1), 2) + '-' + pad(_time.getDate(), 2);
  },
  // 获取ago当前日期   年月日
  getToday2: (ago = 0) => {
    var _time = new Date(Date.now() + ago * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '年' + pad((_time.getMonth() + 1), 2) + '月' + pad(_time.getDate(), 2) + '日';
  },
  // 获取ago当前时间
  getTime: (ago = -1) => {
    var _time = new Date(Date.now() + ago * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' +
      pad((_time.getMonth() + 1), 2) + '-' +
      pad(_time.getDate(), 2) + " " +
      pad(_time.getHours(), 2) + ":" +
      pad(_time.getMinutes(), 2) + ":" +
      pad(_time.getSeconds(), 2);
  },
  // 获取前几个月的日期
  getAMonthAgo: (yue) => {
    var date = new Date();
    date.setMonth(date.getMonth() - yue * 1);
    var _time = new Date(date.getTime());
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' + pad((_time.getMonth() + 1), 2) + '-' + pad(_time.getDate(), 2);
  },
  // 获取前几天的日期
  getDayAgo: (day) => {
    var _time = new Date(Date.now() - (day) * 24 * 60 * 60 * 1000);
    var pad = function (n, width, z) {
      z = z || '0';
      n = n + '';
      width = width || 2;
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return _time.getFullYear() + '-' + pad((_time.getMonth() + 1), 2) + '-' + pad(_time.getDate(), 2);
  },

  jugeType(obj) {
    const getType = Object.prototype.toString;
    return getType.call(obj);
  },

  isArr(target) {
    return this.jugeType(target) === '[object Array]';
  },

  isObj(target) {
    return this.jugeType(target) === '[object Object]';
  },

  isString(target) {
    return this.jugeType(target) === '[object String]';
  },

  isNumber(target) {
    return this.jugeType(target) === '[object Number]';
  },

  isBoolean(target) {
    return this.jugeType(target) === '[object Boolean]';
  },

  isUndefined(target) {
    return this.jugeType(target) === '[object Undefined]';
  },

  isNull(target) {
    return this.jugeType(target) === '[object Null]';
  },

  isFunction(target) {
    return this.jugeType(target) === '[object Function]';
  },

  isPromise(target) {
    return this. jugeType(target) === '[object Promise]';
  },

  /**
     * 对象深拷贝
     */
  deepClone(data) {
    let obj;
    if (this.isArr(data)) {
      obj = [];
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (this.isObj(data)) {
      obj = {};
      for (const key in data) {
        obj[key] = this.deepClone(data[key]);
      }
    } else {
      // 不再具有下一层次
      return data;
    }
    return obj;
  },

  /**
     * 获取深层次的数组
     * keyName需要为a.b.c 对应data[a][b][c]
     */
  getDeepArr(data, keyName) {
    // debugger;
    if (isUndefined(keyName) || isNull(keyName)) {
        // 没有对象数组键名
        // 直接返回data数组
        if (this.isArr(data)) return data
        throwError("the data is not an Array, please provide the keyName to match correct Array");
    } else {
        const keyList = keyName.split(',')
        let value = data
        for (const iterator of keyList) {
            if (!value.hasOwnProperty(iterator) || isUndefined(value)) {
                throwError("please check the keyName's level")
            }
            value = value[iterator]
        }
        if (this.isArr(value)) return value
        throwError("the data is not an Array, please provide the keyName to match correct Array");
    }
  },

  /**
   * 映射高维数组
   * @param $data { Array }
   * @param $secondArrKey { String }
   * @param $callback { Function }
   * @returns {*[]}
   */
  mapNestedArr($data = [], $secondArrKey = 'data' , $callback) {
    let that = this,
        result = [];

    result = $data.map($ele => {
      if(that.isFunction($callback)){
        $ele = $callback($ele)
      }
      if(that.isArr($ele[$secondArrKey]) && $ele[$secondArrKey].length > 0){
        $ele[$secondArrKey] = that.mapNestedArr($ele[$secondArrKey], $secondArrKey, $callback)
      }
      return $ele
    });

    return result;
  },

  /**
   * 解构高维数组并以同级集合返回
   * @param $data  传入数组
   * @param $keyName   嵌套数组键值
   * @param $isPushFirst 是否导入一级数组
   * @returns {[]}
   * @author liuyun
   */
  getNestedArr($data = [], $keyName = '', $isPushFirst= true) {
    let result = [],
        that = this;
    if($isPushFirst)
      result.push(...loopDeep($data));
    else
      loopDeep($data);

    function loopDeep ($nextData = []) {
      //过滤筛选keyName数组
      $nextData = $nextData.filter(item => {
        if (!that.isNull(item) && !that.isUndefined(item)) {
          return item
        }
      })
      //递归导入下一级数组
      $nextData.forEach(item => {
        if(that.isArr(item[$keyName]) && item[$keyName].length > 0){
          result.push(...loopDeep(item[$keyName]))
        }
      })
      return $nextData
    }

    return result;
  },

  /**
   * 按键的boolean值过滤高维数组
   * @param $data  过滤数组
   * @param $filterArrKey  高维数组key
   * @param $isShowKey     过滤凭据boolean值
   * @returns {[]}
   * @author liuyun
   */
  filterNestedArr($data,$filterArrKey,$isShowKey) {
    if(this.isArr($data) && $data.length > 0)
    {
      $data = $data.filter(item => {
        item[$filterArrKey] = this.filterNestedArr(item[$filterArrKey], $filterArrKey , $isShowKey);
        if ($isShowKey) {
          if(item[$isShowKey])
          {
            return item;
          }
        } else {
          return item
        }
      })
    }

    return $data;
  },

  /**
   * 递归回调过滤高维数组
   * @param $data  过滤数组
   * @param $filterArrKey  高维数组key
   * @param $callback     过滤回调
   * @returns {[]}
   * @author liuyun
   */
  filterNestedArr2($data,$filterArrKey = 'data',$callback) {
    let that = this,
      result = [];
    if (!that.isArr($data)) return result;
    result = $data.filter($ele => {
      if(!that.isUndefined($ele[$filterArrKey]) && that.isFunction($callback)){
        if ($callback($ele)) {
          if(that.isArr($ele[$filterArrKey]) && $ele[$filterArrKey].length > 0){
            if (that.filterNestedArr2($ele[$filterArrKey], $filterArrKey, $callback).length > 0) {
              $ele[$filterArrKey] = that.filterNestedArr2($ele[$filterArrKey], $filterArrKey, $callback);
            }
          }
          return $ele;
        }
      }
    });

    return result;
  },

  throwError(msg) {
    throw new ReferenceError(msg);
  },
  traversalObject($data, $fn) {
    for (const key in $data) {
      if ($data.hasOwnProperty(key)) {
        const item = $data[key];
        if (
          Object.prototype.toString.call(item) === "[object Object]"
        ) {
          this.traversalObject(item, $fn);
        } else {
          $fn && $fn(key, item);
        }
      }
    }
  },
  expandKeys($data) {
    const newObj = {};
    this.traversalObject($data, (key, value) => {
      newObj[key] = value;
    })
    return newObj
  },
  /**
   * 下载流文件
   * @param $data 文件流
   * @param $config 文件类型
   * @param $fileName 文件名称
   */
  downloadBlob($data, $config = {}, $fileName = '') {
    const blob = new Blob([$data], $config);
    if('msSaveOrOpenBlob' in navigator){
      //ie使用的下载方式
      window.navigator.msSaveOrOpenBlob(blob);
    }else{
      //其他浏览器下载方式
      const url = window.URL.createObjectURL(blob);
      const aTag = document.createElement("a");
      if ($fileName) {
        aTag.download = $fileName
      }
      aTag.href = url;
      aTag.click();
      URL.revokeObjectURL(aTag.href);
    }
  },
  /**
   * 手机号中间四位掩饰为****
   * @param $phone
   * @return {string}
   */
  phoneProtect($phone) {
    return $phone.substr(0, 3) + '****' + $phone.substr(7)
  }
};
