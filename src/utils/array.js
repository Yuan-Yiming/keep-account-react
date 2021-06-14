// 数组去重
export function removeRepeat(arr) {
  return [...new Set(arr)];
}

// 比较两个数组，数组元素为不重复的数字（id）或字符串
export const compareArray = (n = [], o = []) => {
  let del = [];
  let add = [];
  n.forEach(item => {
    if (!o.includes(item)) {
      add.push(item);
    }
  });
  o.forEach(item => {
    if (!n.includes(item)) {
      del.push(item);
    }
  });
  return { 'del': del, 'add': add }
}

/**
 * 数组转对象（列表转字典）
 * import: arr, key
 * export: obj
**/
export const arrToObj = (arr, key) => {
  let obj = {};
  arr.forEach(item => {
    obj[item[key]] = item;
  })
  return obj;
}

// 将后端返回的下拉菜单数组转化为iview可用的格式（label & value）
export const arrToSelect = (arr, labelKey = 'name', valueKey = 'id') => {
  return arr.map(item => {
    item.label = item[labelKey];
    item.value = item[valueKey];
    return item;
  })
}