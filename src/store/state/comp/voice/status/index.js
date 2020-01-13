let { authInit, deepCopy, extendRmSL } = require('state/common')
const status_1 = require('./status_1')
const status_2 = require('./status_2')
const status_3 = require('./status_3')
const status_4 = require('./status_4')
const status_5 = require('./status_5')
const status_6 = require('./status_6')
const status_7 = require('./status_7')
const status_8 = require('./status_8')

// 组件状态管理
module.exports = {
	idx: 1,
	list: {
		1: { name: '默认',        components: [ ...status_1 ] },
		2: { name: '监听',        components: [ ...status_2 ] },
		3: { name: '成功(有结果)', components: [ ...status_3 ] },
		4: { name: '成功(无结果)', components: [ ...status_4 ] },
		5: { name: '失败(网络)',   components: [ ...status_5 ] },
		6: { name: '失败(软件)',   components: [ ...status_6 ] },
		7: { name: '失败(硬件)',   components: [ ...status_7 ] },
		8: { name: '失败(用户)',   components: [ ...status_8 ] },
	},
	max: 8
}