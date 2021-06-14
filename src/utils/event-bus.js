const Bus = function () {
  this.handlers = {}
}


Bus.prototype = {
  constructor: Bus,

  // 订阅
  on: function (key, handler) {
    if (!(key in this.handlers)) this.handlers[key] = [];

    if (this.handlers[key].includes(handler)) return false

    this.handlers[key].push(handler)
    return true

  },

  // 一次性订阅
  once: function (key, handler) {
    if (!(key in this.handlers)) this.handlers[key] = [];

    if (this.handlers[key].includes(handler)) return false

    const onceHandler = (...args) => {
      handler.call(this, ...args)
      this.off(key, onceHandler)
    }

    this.handlers[key].push(onceHandler)
    return true
  },

  // 触发
  emit: function (key, ...args) {
    if (!Array.isArray(this.handlers[key])) return false;

    this.handlers[key].forEach(fn => {
      fn.call(this, ...args)
    })

    return true
  },

  // 卸载
  off: function (key, handler) {
    if (!Array.isArray(this.handlers[key])) return false;

    const index = this.handlers[key].findIndex(item => item === handler)

    if (index < 0) return false;

    if (this.handlers[key].length === 1) {
      delete this.handlers[key];
    } else {
      this.handlers[key].splice(index, 1)
    }

    return true
  },

  // 清空
  clear: function (key) {
    if (!Array.isArray(this.handlers[key])) return false

    delete this.handlers[key]
    return true
  }
}

export default new Bus()