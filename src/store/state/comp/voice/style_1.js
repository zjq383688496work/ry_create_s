// let { authInit, deepCopy, extendRmSL } = require('state/common')

// 商品列表
module.exports = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   500
	},
	style: {},
	content: {
		voice_default:        {},
		voice_listen:         {},
		voice_success:        {},
		voice_error_network:  {},
		voice_error_software: {},
		voice_error_hardware: {},
		voice_error_user:     {},
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: []
}
