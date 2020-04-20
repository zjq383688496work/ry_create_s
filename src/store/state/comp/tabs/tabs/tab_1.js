let { authInit, deepCopy, extendRmSL } = require('state/common')
const t    = authInit(require('state/comp/text'))

const gName = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  0,
			width:  60,
			height: 24
		},
		content: {
			text: '标签1',
			text2: '',
		},
		style: {
			text: {
				lineHeight:      24,
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				borderRadius:    {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				},
				borderColor: 	 { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				color:           { type: 'custom', color: '#666' }
			}
		},
	}
})
const gNameAV = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  0,
			width:  60,
			height: 24
		},
		content: {
			text: '标签1',
			text2: '',
		},
		style: {
			text: {
				lineHeight:      20,
				backgroundColor: { type: 'custom', color: '#cfad81' },
				borderRadius:    {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				},
				borderWidth:     2,
				borderColor: { type: 'auxiliary', color: '#e5c7a2' },
				color: { type: 'textHigh', color: '#fff' },
			}
		},
	},
	feature: { active: true }
})

const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  441,
		height: 300
	},
	style: {
		filter: {
			width:  100,
			height: 90,
			borderWidth:  1,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: '#fff' },
			margin: {
				top:     0,
				right:   10,
				bottom:  10,
				left:    0,
			},
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		}
	},
	componentLayout: [ gName, gNameAV ],
	content: {
		status: { type: 'status', url: '1' }
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

// 组件状态管理
module.exports = {
	name: 'tabByTabs',
	type: 'layout',
	// 位置大小
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