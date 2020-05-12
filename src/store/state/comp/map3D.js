let { deepCopy } = require('state/common')

// 按钮
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   540,
		lockAspectRatio:true
	}, 
	style: {
		text: {}
	},
	content: {
		themeColor: { type: 'custom', color: '#cfad81', rgb: '#cfad81' },
		bgColor:    { type: 'custom', color: '#e1e1e1', rgb: '#e1e1e1' },
	},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'map3D',
	type: 'base',
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: []
	},
	// 功能特性
	feature: {
	}
}