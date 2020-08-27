let { authInit, deepCopy, extendRmSL } = require('state/common')
const pb = authInit(require('state/comp/pictureBind'))
const a  = authInit(require('state/comp/area'))

const PIC = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			left:   10,
			width:  90,
			height: 120
		},
		content: {
			bind: ''
		},
		style: {
		},
	}
})
const PICACT = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:    2,
			left:   12,
			width:  86,
			height: 116
		},
		content: {
			bind: ''
		},
		style: {
		},
	},
	feature: { active: true }
})
const AREAACT = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			left:   10,
			width:  90,
			height: 120
		},
		style:     {
			filterBox: {
				borderWidth:  2,
				borderStyle: 'solid',
				borderColor: { type: 'custom', color: '#ff6231' },
				backgroundColor: { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 },
				boxShadow: {
					h_shadow:   2,
					v_shadow:   2,
					blur_dis:   3,
					spread_dis: 0,
					color:      { type: 'custom', color: 'rgba(0,0,0,.25)', rgb: '#000', alpha: 25}
				},
			}
		},
	},
	feature: { active: true }
})
const ARROWACT = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			top:    55,
			left:   9,
			width:  10,
			height: 10
		},
		style:     {
			filterBox: {
				transform:    { rotate: 45 },
				borderWidth:  2,
				borderStyle: 'solid',
				borderColor: { type: 'custom', color: '#ff6231' },
				backgroundColor: { type: 'custom', color: '#fff' },
			}
		},
	},
	feature: { active: true }
})

// 精彩活动
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    110,
		height:   410
	},
	style:     {
		filter: {
			width:  90,
			height: 120,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 },
			margin: {
				top:     0,
				right:   0,
				bottom:  5,
				left:    0,
			},
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
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
	content: {
	},
	componentLayout: [ PIC, AREAACT, ARROWACT, PICACT ],
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
} 

module.exports = {
	name: 'listByActivity',
	type: 'layout',
	// 样式管理
	data: deepCopy(data),
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