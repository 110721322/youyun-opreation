/**
 * 获取浏览器版本号
 * @return ie, firefox, chrome, opera, safari
 */
function computedBrowserVersion() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
      (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
          (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

  return Sys;
}

/**
 * 比较版本号
 *
 * @param v1 第一个版本号
 * @param v2 第二个版本号
 *
 * @return 如果版本号相等，返回 0,
 *         如果第一个版本号低于第二个，返回 -1，否则返回 1.
 */
function compareVersion(v1, v2) {
  var arr_v1 = String(v1).split(".");
  var arr_v2 = String(v2).split(".");
  var p_index = 0;
  var p_v1 = 0;
  var p_v2 = 0;
  if (v1 === v2) return 0;
  while(p_index < arr_v1.length) {
    p_v1 = Number(arr_v1[p_index]) ? Number(arr_v1[p_index]) : 0;
    p_v2 = Number(arr_v2[p_index]) ? Number(arr_v2[p_index]) : 0;
    if (Number(arr_v1[p_index]) > Number(arr_v2[p_index])) {
      return 1;
    } else if (Number(arr_v1[p_index]) === Number(arr_v2[p_index])) {
      p_index++;
    } else {
      return -1;
    }
  }
  return -1
}

/**
 * 打开新的窗口
 * @param $url
 */
function openWindow($url) {
  window.open($url)
}
