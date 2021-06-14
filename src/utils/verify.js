
import { Message } from 'view-design'
// 要求为数字
export const requireNum = (item, msg, allowEmpty = false) => {
  let ret = true;
  // 不允许为空
  if (allowEmpty && item === "") {
    ret = true;
  } else {
    let num = Number(item);
    if (!num && num !== 0) {
      Message.warning(msg + "必须为数字！");
      ret = false;
    } else if (num < 0) {
      Message.warning(msg + "必须大于0！");
      ret = false;
    }
  }

  return ret;
};
// 必填项
export const require = (item, msg, isNum) => {
  let ret = true;
  if (!item && item !== 0) {
    Message.warning(msg + "不能为空！");
    ret = false;
  } else if (isNum) {
    ret = requireNum(item, msg);
  }
  return ret;
};
// 两数值比较
// 放在最后，保证min、max存在
export const compare = (min, max, minMsg, maxMsg) => {
  min = Number(min);
  max = Number(max);
  let ret = true;
  if (min && max && max <= min) {
    Message.warning(maxMsg + "必须大于" + minMsg);
    ret = false;
  }
  return ret;
};