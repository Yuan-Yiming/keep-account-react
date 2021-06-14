/**
 * 平铺树状列表
 * @param {array|object} tree 树状结构数据
 * @param {string} key 树状数据节点id/键值
 * @param {dict} dict 传一个空字典，或不传
 */
export const tree2dict = (tree, key = 'id', dict) => {
  if (!Array.isArray(tree)) {
    tree = [tree]
  }
  if (!dict) {
    dict = {}
  }
  tree.forEach((item) => {
    dict[item[key]] = item
    if (Array.isArray(item.children) && item.children.length) {
      tree2dict(item.children, key, dict)
    } else {
      delete item.children;
    }
  })

  return dict
}

/**
 * 用于处理树状结构的每个节点
 * @param {array|object} tree 树状结构数据
 * @param {function} fn 传入回调函数，两个参数nade、parentNode
 * @param {string} childrenKey 获取子列表的key，通常通过node.children来获取
 */
export const handleTreeNode = (tree, fn, childrenKey = 'children') => {
  if (!tree) return

  if (!Array.isArray(tree)) {
    tree = [tree]
  }

  function treat(tree, parent) {
    tree.forEach((node) => {
      fn.call(null, node, parent)
      if (node[childrenKey]) {
        treat(node[childrenKey], node)
      } else {
        delete node.children;
      }
    })
  }

  treat(tree, null)

  return tree
}

/**
 * 过滤树状结构（只要父节点不保留，即不会继续深度遍历子节点）
 * @param {array|object} tree 树状结构数据
 * @param {function} fn 传入回调函数，两个参数nade，parent，回调函数需要返回boolean（和Array.prototype.filter回调用法类似）
 * @param {string} childrenKey 获取子列表的key，通常通过node.children来获取
 */
export const filterTree = (tree, fn, childrenKey = 'children') => {
  if (!Array.isArray(tree)) {
    tree = [tree]
  }

  tree = tree.filter((node) => {
    let save = fn.call(null, node)

    if (save && node[childrenKey]) {
      node[childrenKey] = filterTree(node[childrenKey], fn)
    }
    return save;
    
  })

  return tree
}