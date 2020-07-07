let { authInit, deepCopy, extendRmSL } = require('state/common')

const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  256,
		height: 340
	},
	style: {
		image: {
			opacity:   1,
			borderWidth:  0,
			borderStyle:  'solid',
			borderColor:  { type: 'custom', color: '#fff' },
			borderRadius: {
				topLeft:     2.4,
				topRight:    2.4,
				bottomRight: 2.4,
				bottomLeft:  2.4
			}
		}
	},
	content: {
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'viewByActivity',
	type: 'base',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}