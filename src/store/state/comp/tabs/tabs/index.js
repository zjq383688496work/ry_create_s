let { authInit, deepCopy, extendRmSL } = require('state/common')
const tab_1 = authInit(require('./tab_1'))
const tab_2 = authInit(require('./tab_2'))

// 组件状态管理
module.exports = [ tab_1, tab_2 ]