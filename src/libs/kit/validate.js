
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 验证手机号
 * @param {string} phone
 * @returns {boolean}
 */
export function validPhone(phone) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return reg.test(phone);
}

/**
 * 验证身份证号
 * @param {string} personId
 * @returns {boolean}
 */
export function validPersonId(personId) {
  // trace(str)
  if (personId === null || personId === '') {
    return false;
  }
  var exp1 = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; // 中国居民身份证验证
  var exp = /(^(H|M)\d{10}$)/; // 港澳通行证验证
  if (exp1.test(personId) === false && exp.test(personId) === false) {
    return false;
  } else if (personId.length === 18) {
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
      iSs += iw[i] * (personId.substr(i, 1) - '0');
    }
    iY = iSs % 11;
    var eChr = personId.substr(17, 1);
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
}
