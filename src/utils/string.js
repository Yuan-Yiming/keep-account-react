/**
 * 驼峰转横杠式
 * @param {String} str 驼峰式字符串
 * @return {String} 横杠式字符串
 */
export const camel2kebab = (str) => {
  let firstStep = true;
  return str.split('').reduce((a, b) => {
    a = /[A-Z]/.test(a) ? (firstStep ? '' : '-') + a.toLowerCase() : a;
    b = /[A-Z]/.test(b) ? '-' + b.toLowerCase() : b;
    firstStep && (firstStep = false);
    return a + b;
  })
}

// 下划线转驼峰
export const _2camel = (str) => {
  let strArr = str.split('_');
  let ret = strArr[0];
  strArr.slice(1).forEach(s => {
    ret += s[0].toUpperCase();
    ret += s.slice(1)
  })
  return ret;
}

/**
 * 获取style字符串
 * @param {Object} style 样式对象
 */
export const formatStyle = (style) => {
  let keys = Object.keys(style);
  let str = '';
  keys.forEach(key => {
    str += `${camel2kebab(key)}: ${style[key]}; `;
  })
  return `style="${str}"`;
}

// 解析URL的search，返回新对象
export const resolveUrlSearch = (url) => {
  if (!url) {
    url = document.location.toString()
  }
  var urlArr = url.split('?')
  if (urlArr.length < 1) return {}
  let reg = /([^=&\s]+)[=\s]*([^&\s]*)/g
  let urlObj = {}
  while (reg.exec(urlArr[1])) {
    urlObj[RegExp.$1] = RegExp.$2
  }
  return urlObj
}