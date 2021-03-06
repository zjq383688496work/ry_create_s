let { deepCopy } = require('state/common')

// 楼层地图
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   300
	},  
	style: {},
	content: {
		mapThemeColor: { type: 'custom', color: '#cfad81' },
		strokeWidth: 2,
		strokeColor: { type: 'custom', color: '#ff0055' },
		publicRatio: 1,
		peopleRatio: 1,
		walkSpeed:   1,
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
	name: 'mapByStore2',
	type: 'base',
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '样式1',
			img:   '',
			data:  deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}