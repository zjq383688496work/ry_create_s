let { authInit, deepCopy, extendRmSL } = require('state/common')
const status_1 = require('./status_1')
const status_2 = require('./status_2')

// 组件状态管理
module.exports = {
	idx: 1,
	list: {
		1: { name: '标签1', components: [ ...status_2 ] },
		2: { name: '标签2', components: [ ...status_1 ] },
	},
	max: 2
}