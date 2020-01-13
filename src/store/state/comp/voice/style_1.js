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
		voice_default:        { type: 'status', url: '1' },
		voice_listen:         { type: 'status', url: '2' },
		voice_success:        { type: 'status', url: '3' },
		voice_success_null:   { type: 'status', url: '4' },
		voice_error_network:  { type: 'status', url: '5' },
		voice_error_software: { type: 'status', url: '6' },
		voice_error_hardware: { type: 'status', url: '7' },
		voice_error_user:     { type: 'status', url: '8' },
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
