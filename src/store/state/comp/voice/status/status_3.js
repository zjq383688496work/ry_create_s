let { authInit, deepCopy, extendRmSL } = require('state/common')
const list = authInit(require('./list'))
const voice_list = extendRmSL(deepCopy(list), {
	// data: {
	// 	layout: {
	// 		top:  75,
	// 		left: 40
	// 	}
	// }
})

// 组件状态管理
module.exports = [
	voice_list
]