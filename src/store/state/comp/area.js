let { deepCopy } = require('state/common')

// 图片
const data = {
	style:     {
		filterBox: {
			transform:    { rotate: 0 },
			opacity: 1,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			},
			backgroundColor: { type: 'custom', color: '#f00' }
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120 
	}, 
	content: {},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'area',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
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