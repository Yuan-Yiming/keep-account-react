import Vue from "vue"
/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, format, type) => {
  let d
  if (timeStamp) {
    d = new Date(timeStamp)
  } else {
    d = new Date()
  }
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const day = getHandledValue(d.getDate())
  const hour = getHandledValue(d.getHours())
  const minute = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  if (!type) {
    type = '/'
  }
  const ymd = [year, month, day].map(formatNumber)
  switch (format) {
    case 'yyyymmdd':
      return [year, month, day].map(formatNumber).join(type)
    case '年月日':
      return ymd[0] + '年' + ymd[1] + '月' + ymd[2] + '日'
    case 'yyyymm':
      return [year, month].map(formatNumber).join(type)
    case 'mmdd':
      return [month, day].map(formatNumber).join(type)
    case 'mmdd hhmm':
      return [month, day].map(formatNumber).join(type) + ' ' + [hour, minute].map(formatNumber).join(':')
    case 'yyyy':
      return year
    case 'mm':
      return [month].map(formatNumber)
    case 'dd':
      return [day].map(formatNumber)
    case 'yyyymmddhhmmss':
      return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute, second].map(formatNumber).join(':')
    case 'yyyymmddhhmm':
      return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute].map(formatNumber).join(':')
    case 'hhmmss':
      return [hour, minute, second].map(formatNumber).join(':')
    case 'hhmm':
      return [hour, minute].map(formatNumber).join(':')
    case 'hh':
      return [hour].map(formatNumber)
    case 'mi':
      return [minute].map(formatNumber)
    default:
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// 获取url参数
export const getUrlParams = (url) => {
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

/**
 * 获取字符串中符合要求的字符个数
 * @param {str} 字符串
 * @param {reg} 正则表达式
 */
export const getStrNum = (str, reg) => {
  return str && str.match(reg).length
}

/**
 * 函数防抖
 * @param {Function} func 回调函数
 * @param {Number} timeout 时间
 */
export function debounce(func, timeout = 1000) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      func.apply(that, args)
    }, timeout)
  }
}

/**
 * 节流函数
 */
export function throttle(fn, delay = 1000) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

// 去掉前后中间空格,如果有传type，只去掉前后空格
export const RemoveTrim = (val, type) => {
  if (!val) return val;
  if (type) {
    return (val + '').replace(/(^\s*)|(\s*$)/g, "");
  } else {
    val = (val + '').replace(/(^\s*)|(\s*$)/g, "");
    if (val.indexOf("%") > -1) {
      return val.replace(/\%/g, '\\%');
    }
    return (val + '').replace(/(\s)|(^%)|(%$)/g, "");
  }
}
/**
 * 常用于cascader
 * 根据子级类型查找所有匹配的父级类型
 * id: 子级ID
 * data: 匹配数据
 * prop: 匹配的类型,默认用ID匹配
 */
export const getFathersById = (id, data, prop = 'id') => {
  var arrRes = []
  const rev = (data, id) => {
    for (var i = 0, length = data.length; i < length; i++) {
      const node = data[i]
      if (node[prop] === id) {
        arrRes.unshift(node[prop])
        return true
      } else {
        if (node.children && node.children.length) {
          if (rev(node.children, id)) {
            arrRes.unshift(node[prop])
            return true
          }
        }
      }
    }
    return false
  }
  rev(data, id)
  return arrRes
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  var isIE = isExplorer('MSIE');
  var isEdge = ua.indexOf("Edge") > -1 && !isIE;
  var isIE11 = ua.indexOf('Trident') > -1 && ua.indexOf("rv:11.0") > -1;

  if (isIE) return 'IE'
  else if (isEdge) return 'IE'
  else if (isIE11) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

// 判断域名是否是https
export const isHttps = () => {
  let protocol = document.location.protocol;
  return protocol === 'https:';
}


/**
 * 分割污染指标文本的字母和数字，如传入'PM2.5' => ['PM', '2.5']
 * @param {String} str 指标文本
 */
// 请使用v-aqi指令切割AQI指标
export const splitIndex = (str) => {
  if (!str || !str.trim()) {
    console.warn('splitIndex不能传空字符！');
    return [];
  }
  let index = str.length;

  for (let letter of str) {
    if (parseInt(letter)) {
      index = str.indexOf(letter);
      break;
    }
  }

  let str1 = str.slice(0, index);
  let str2 = str.slice(index);

  return [str1, str2];
}

/**
 * 格式化api指标值，如传入指数160 => [4, '中度']
 * @param {String} str 指标文本
 * 该函数可代替formatAQI、formatSO2、formatNO2...等几个函数使用
 */
export const formatIndex = (index, type = 'aqi') => {
  index = parseFloat(index);
  type = type.toLowerCase();
  type = type.split('.').join('');
  let ret;
  if (type === 'aqi') {
    ret = formatAQI(index);
  } else if (type === 'so2') {
    ret = formatSO2(index);
  } else if (type === 'no2') {
    ret = formatNO2(index);
  } else if (type === 'co') {
    ret = formatCO(index);
  } else if (type === 'o3') {
    ret = formatO3(index);
  } else if (type === 'pm10') {
    ret = formatPM10(index);
  } else if (type === 'pm25') {
    ret = formatPM25(index);
  } else if (type === 'tvoc') {
    ret = formatTVOC(index);
  }

  if (type !== 'tvoc') {
    if (ret.length === 2) {
      ret = [...ret, getFactorColor(ret[0])];
    }
  }

  return ret;
}

export const formatAQI = (aqi) => {
  if (aqi <= 50) {
    return [1, '优', getFactorColor(1)];
  } else if (aqi <= 100) {
    return [2, '良', getFactorColor(2)];
  } else if (aqi <= 150) {
    return [3, '轻度污染', getFactorColor(3)];
  } else if (aqi <= 200) {
    return [4, '中度污染', getFactorColor(4)];
  } else if (aqi <= 300) {
    return [5, '重度污染', getFactorColor(5)];
  } else {
    return [6, '严重污染', getFactorColor(6)];
  }
}

export const formatSO2 = (aqi) => {
  if (aqi <= 50) {
    return [1, '优'];
  } else if (aqi <= 150) {
    return [2, '良'];
  } else if (aqi <= 475) {
    return [3, '轻度污染'];
  } else if (aqi <= 800) {
    return [4, '中度污染'];
  } else if (aqi <= 1600) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

export const formatNO2 = (aqi) => {
  if (aqi <= 40) {
    return [1, '优'];
  } else if (aqi <= 80) {
    return [2, '良'];
  } else if (aqi <= 180) {
    return [3, '轻度污染'];
  } else if (aqi <= 280) {
    return [4, '中度污染'];
  } else if (aqi <= 565) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

export const formatCO = (aqi) => {
  if (aqi <= 2) {
    return [1, '优'];
  } else if (aqi <= 4) {
    return [2, '良'];
  } else if (aqi <= 14) {
    return [3, '轻度污染'];
  } else if (aqi <= 24) {
    return [4, '中度污染'];
  } else if (aqi <= 36) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

export const formatO3 = (aqi) => {
  if (aqi <= 100) {
    return [1, '优'];
  } else if (aqi <= 160) {
    return [2, '良'];
  } else if (aqi <= 215) {
    return [3, '轻度污染'];
  } else if (aqi <= 265) {
    return [4, '中度污染'];
  } else if (aqi <= 800) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

export const formatPM10 = (aqi) => {
  if (aqi <= 50) {
    return [1, '优'];
  } else if (aqi <= 150) {
    return [2, '良'];
  } else if (aqi <= 250) {
    return [3, '轻度污染'];
  } else if (aqi <= 350) {
    return [4, '中度污染'];
  } else if (aqi <= 420) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

export const formatPM25 = (aqi) => {
  if (aqi <= 35) {
    return [1, '优'];
  } else if (aqi <= 75) {
    return [2, '良'];
  } else if (aqi <= 115) {
    return [3, '轻度污染'];
  } else if (aqi <= 150) {
    return [4, '中度污染'];
  } else if (aqi <= 250) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

export const formatTVOC = (aqi) => {
  if (aqi <= 200) {
    return [1, '优', 'rgb(75,230,0)'];
  } else if (aqi <= 400) {
    return [2, '良', 'rgb(207,255,113)'];
  } else if (aqi <= 600) {
    return [3, '轻度污染', 'rgb(230,230,0)'];
  } else if (aqi <= 1000) {
    return [4, '中度污染', 'rgb(228,155,0)'];
  } else if (aqi <= 2000) {
    return [5, '重度污染', 'rgb(222,4,0)'];
  } else if (aqi <= 4000) {
    return [6, '严重污染', 'rgb(180,8,240)'];
  } else if (aqi > 4000) {
    return [7, '严重污染', 'rgb(78,0,120)'];
  }
}

export const formatO3With1h = (aqi) => {
  if (aqi <= 160) {
    return [1, '优'];
  } else if (aqi <= 200) {
    return [2, '良'];
  } else if (aqi <= 300) {
    return [3, '轻度污染'];
  } else if (aqi <= 400) {
    return [4, '中度污染'];
  } else if (aqi <= 800) {
    return [5, '重度污染'];
  } else {
    return [6, '严重污染'];
  }
}

/**
 * 根据对应传入level返回对应程度颜色，如传入指数1 => '00FF00'
 * @param {Number} level 级别
 */
export const getFactorColor = (level) => {
  let color = [
    "rgb(0,255,0)",
    "rgb(255,255,0)",
    "rgb(255,126,0)",
    "rgb(255,0,0)",
    "rgb(153,0,77)",
    "rgb(126,0,34)"
  ]
  return color[level - 1]
}

/**
 * 约等数字
 * @param {Number} num 需要处理的数字
 * @param {Int} d 保留的小数位
 */
export const toFixed = (num, d) => {
  d = d || 0; // 默认不保留小数
  if (num && num !== 0) {
    return num.toFixed(d);
  } else {
    return '-';
  }
}

/**
 * 导出
 * @param {Object} obj(url,params,fileName,intercept)
 * obj {
 *   @param {String} url 接口链接
 *   @param {Object} params 接口参数
 *   @param {String} fileName 导出文件名
 *   @param {String} method 导出请求方式
 *   @param {Object} body 导出请求体
 *   @param {String} intercept 拦截导出的对象 {String<err>:请求返回的数据信息,String<message>:拦截导出的提示信息 如不传则使用err}
 * }
 */
export const exportExcel = (obj) => {
  let { url, params, fileName, method, body, fileType, intercept } = obj;
  method = method || 'get'
  // 可以使用函数返回值中捕获请求失败进行以下转换处理 如在响应内即使用 intercept
  // .catch(err => {
  //   let reader = new FileReader();
  //   reader.addEventListener("loadend", e => {
  //  // 拿到读取结果转成对象获取响应信息
  //     if (JSON.parse(e.target.result).code.includes("40401")) {
  //       this.$Message.warning("未找到模板！");
  //     }
  //   });
  //   reader.readAsText(err.data);
  // 下载文件
  const getFileInfo = (res) => {
    let url = window.URL.createObjectURL(
      new Blob([res.data], {
        type: fileType || 'application/vnd.ms-excel;charset=utf-8'
      })
    );
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName || '文件.xls');
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
  return Vue.prototype.$api.$axios[method](
    url,
    { ...body, params }, {
    responseType: "blob"
  }
  ).then(res => {
    // 读取返回内容 拦截导出 提示信息
    if (intercept) {
      let reader = new FileReader();
      reader.addEventListener("loadend", e => {
        // 拿到读取结果
        if (e.target.result.includes(intercept.err)) {
          Vue.prototype.$Message.warning(intercept.message || intercept.err);
        } else {
          getFileInfo(res);
        }
      });
      reader.readAsText(res.data);
      // 下载文件
    } else {
      getFileInfo(res);
    }
  })
}

/**
 * 转化json为URL（列表转字典）
 * import: Object
 * export: String
**/
export const getUrlVars = (json) => {
  var params = Object.keys(json)
    .map(function (key) {
      if (json[key] === 0 && encodeURIComponent(key) === 'banStreet') {
        return encodeURIComponent(key) + "=" + '全部';
      } else {
        return encodeURIComponent(key) + "=" + json[key];
      }
    })
    .join("&");
  return params;
}

/**
 * 查找树形数据的整条内容
 * @param {Array} treeData 树形数据数组
 * @param {*} checkData  查找的数据 可以是一个数组
 * @param {Array[Object]} returnData 返回查找数据的数组对象
 * @param {String} checkName 查找的字段名 默认为id
 */
export const getTreeData = (treeData, checkData, returnData, checkName) => {
  // 判断要查找的数据是否为数组
  let checkDataType = Array.isArray(checkData);
  // 不传默认查找id字段
  checkName = checkName || 'id';
  for (let i = 0; i < treeData.length; i++) {
    let data = treeData[i][checkName];
    if (checkDataType ? checkData.includes(data) : data === checkData) {
      returnData.push(treeData[i]);
    }
    if (treeData[i].children && treeData[i].children.length) {
      getTreeData(treeData[i].children, checkData, returnData);
    }
  }
}
/**
 * 检查文件格式
 * @param {file} file 文件
 * @param {Array} formatList 格式列表
 * @param {String} errorMessage 提示内容
 * @returns {Boolean}
 */
export const checkFileFormat = (file, formatList, errorMessage) => {
  formatList = formatList || ["xls", "xlsx"]
  let fileType = file.name.split(".").pop(); // 文件后缀名
  if (!formatList.includes(fileType)) {
    errorMessage = errorMessage || '文件格式错误！'
    Vue.prototype.$Message.warning(errorMessage)
  }
  return formatList.includes(fileType);
}

/**
 * 检查文件大小
 * @param {file} file 文件
 * @param {Number} size 文件大小 单位KB
 * @param {String} errorMessage 提示内容
 * @returns {Boolean}
 */
export const checkFileSize = (file, size, errorMessage) => {
  size = size || 2048; // 默认文件大小限制
  let isfileSizeOver = file.size < (size * 1000);
  if (!isfileSizeOver) {
    let fileSize = (size / 1048).toFixed(0);
    // 默认错误提示
    errorMessage = errorMessage || `文件 ${file.name} 太大, 不能超过 ${fileSize}M!`
    Vue.prototype.$Message.warning(errorMessage)
  }
  return isfileSizeOver;
}

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

/** px转rem */
export const px2rem = (pxNum) => pxNum / 16 + 'rem';

// 判断是否为0，是返回0，否返回'-'
export const judgeIsZero = (value) => {
  return value ? value : (value === 0 ? value : '--')
}

/*简单的根据任务级别1,2,3返回汉字 num必须为对应下拉索引*/
export const reNtoH = (num) => {
  let _arrayCHNNum = [
    "〇",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九"
  ];
  return _arrayCHNNum[num];
}

// 空值用 - 来表示
export const hasVal = function () {
  let val = Array.prototype.pop.call(arguments);
  if ([null, undefined, ''].includes(val)) {
    return '-'
  }
  return val;
}