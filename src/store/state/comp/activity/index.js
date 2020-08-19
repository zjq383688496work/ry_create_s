let { authInit, deepCopy, extendRmSL } = require('state/common')
const list   = authInit(require('./content/list'))
const view   = authInit(require('./content/view'))
const button = authInit(require('./content/button'))
const area   = authInit(require('state/comp/area'))

const List = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			top:  0,
			left: 277,
			height: 410,
		}
	}
})
const View  = extendRmSL(deepCopy(view), {
	data: {
		layout: {
			top:  10,
			left: 10
		}
	}
})
const Area   = extendRmSL(deepCopy(area), {
	data: {
		layout: {
			top:  0,
			left: 0,
			width:  275,
			height: 410,
		},
		style:     {
			filterBox: {
				borderRadius: {
					topLeft:     2.5,
					topRight:    2.5,
					bottomRight: 2.5,
					bottomLeft:  2.5
				},
				boxShadow: {
					h_shadow:   0,
					v_shadow:   2.5,
					blur_dis:   5,
					spread_dis: 0,
					color:      { type: 'custom', color: 'rgba(0,0,0,.1)', rgb: '#000', alpha: 10 },
				},
				backgroundColor: { type: 'custom', color: '#f8f6ee' }
			}
		},
	}
})
const Button = extendRmSL(deepCopy(button), {
	data: {
		layout: {
			top:  360,
			left: 190
		}
	}
})

// 精彩活动
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    400,
		height:   420
	},
	style: {},
	content: {
		dbSource: -1,
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ Area, View, Button, List ]
}

module.exports = {
	name: 'activity',
	type: 'advanced',
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