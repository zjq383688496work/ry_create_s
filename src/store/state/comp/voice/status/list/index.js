let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const pb = authInit(require('state/comp/pictureBind'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const LOGO = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  18.5,
			left: 30,
			width:  50,
			height: 50
		},
		style: {
			image: {
				borderRadius: {
					topLeft:     25,
					topRight:    25,
					bottomRight: 25,
					bottomLeft:  25
				}
			}
		}, 
		content: {
			bind: 'logo'
		}
	}
})
const Name = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  75,
			left: 0,
			width:  110,
			height: 16
		},
		content: {
			bind: 'name'
		},
		style: {
			text: {
				fontSize:   10,
				lineHeight: 14,
				textAlign: 'center',
				color: { type: 'custom', color: '#333' }
			}
		}
	}
})
const Ico = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  95,
			left: 30,
			width:  8,
			height: 8
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201805191128322385.png' }
		}
	}
})
const Pos = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  92,
			left: 40,
			width:  60,
			height: 14
		},
		content: {
			bind: 'berthNumber'
		},
		style: {
			text: {
				fontSize:   8,
				lineHeight: 14,
				textAlign: 'left',
				color: { type: 'custom', color: '#333' }
			}
		}
	}
})

// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  320,
		left: 32,
		width:  500,
		height: 277
	},
	style: {
		filter: {
			width:  110,
			height: 120,
			borderWidth:  0.5,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#e2e2e2' },
			backgroundColor: { type: 'custom', color: '#fafafa' },
			margin: {
				top:     0,
				right:   12,
				bottom:  13,
				left:    0,
			},
			borderRadius:    {
				topLeft:     5,
				topRight:    5,
				bottomLeft:  5,
				bottomRight: 5
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 }
			}
		}
	},
	componentLayout: [ LOGO, Name, Ico, Pos ],
	content: {
		size: 8,
		storeRouter:  {},
		publicRouter: {},
		goodsRouter:  {},
		appRouter:    {},
		onlySwitch:   true,
		remarks:      { text: '唯一跳转: 指的是只有一条搜索结果的时候是否自动跳转', color: 'red' },
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
	name: 'listByVoice',
	type: 'layout',
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