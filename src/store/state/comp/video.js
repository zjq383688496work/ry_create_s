let { deepCopy } = require('state/common')

// 视频
const data = {
	style:     {},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   150,
		lockAspectRatio:true
	}, 
	// 内容管理
	content: { 
		video:    { type: 'custom', video: '',preview:''},
	},  
	// 动画设置 
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'video',
	type: 'base',
	// 样式管理
	data: deepCopy(data),
	// 组件样式
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}],
	}, 
	// 功能特性
	feature: {
	},
}