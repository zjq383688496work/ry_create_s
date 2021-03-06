let { deepCopy } = require('state/common')

// 楼层地图
const data = {
	layout: {
		position: 'absolute',
		top:      340,
		left:     0,
		width:    540,
		height:   300
	}, 
	style: {
		
	},
	content: {themeColor:{type:'background',color:'#f4f4f4'}},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	} 
} 

module.exports = {
	name: 'floorMap',
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