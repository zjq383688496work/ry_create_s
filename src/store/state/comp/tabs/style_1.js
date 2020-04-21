// let { authInit, deepCopy, extendRmSL } = require('state/common')

// 商品列表
module.exports = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   400
	},
	style: {},
	content: {
		tab_default:        { type: 'status', url: '1' },
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
