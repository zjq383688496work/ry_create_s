let { authInit, deepCopy, extendRmSL } = require('state/common')

// 可见图片
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120,
		lockAspectRatio: true
	},
	style: {
		image: {
			transform: { rotate: 0 },
			opacity:   1,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		}
	},
	content: {
		img:           { type: 'custom', img: '' },	// 图片url
		visibleStatus: {},
		remarks:       { text: '可见状态: 需要筛选 可见开关 配合使用.', color: 'red' }
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
	name: 'pictureByStore2',
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