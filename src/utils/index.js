import * as array from './array' // 数组相关
import * as _const from './const' // 常量
import * as datetime from './datetime' // 日期时间相关
import * as dom from './dom' // dom操作相关
import * as object from './object' // 对象相关
import * as reg from './reg' // 正则表达式
import * as string from './string' // 字符串相关
import * as tool from './tool' // 其他工具函数
import * as tree from './tree' // 树状结构相关
import * as verify from './verify' // 验证相关
import * as number from './number'

export default {
  array: { ...array },
  const: { ..._const },
  datetime: { ...datetime },
  object: { ...object },
  reg: { ...reg },
  string: { ...string },
  tool: { ...tool },
  tree: { ...tree },
  dom: { ...dom },
  verify: { ...verify },
  number: { ...number },
}