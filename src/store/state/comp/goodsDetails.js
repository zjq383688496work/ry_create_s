/**
 * @Author: Along
 * @Date:   2018-05-10
 */

const common = require('state/common')
let { authInit, deepCopy, extend } = common
const p  = authInit(require('./picture'))
const pb = authInit(require('./pictureBind'))
const t  = authInit(require('./text'))
const tb = authInit(require('./textBind'))
const sb = authInit(require('./swiperBind'))

const s1Spr = extend(deepCopy(sb), {
	data: {
		layout: {
			top:  14,
			left: 33,
			width:  153,
			height: 168
		},
		content: {
			bind: 'pics'
		}
	}
})
const s1Name = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  10,
			left: 225,
			width:  285,
			height: 42
		},
		style:     {
			text: { 
				textAlign:  'left',
				fontSize:   15,
				lineHeight: 20
			}
		},
		content: {
			bind: 'name'
		}
	}
})
const s1PIcon = extend(deepCopy(t), {
	data: {
		layout: {
			top:  80,
			left: 226,
			width:  20,
			height: 28
		},
		style:     {
			text: { 
				// textAlign:  'left',
				fontSize:   23,
				lineHeight: 28,
				fontFamily: 'Impact',
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			text: '¥'
		}
	}
})
const s1Price = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  68,
			left: 246,
			width:  155,
			height: 43
		},
		style:     {
			text: { 
				textAlign:  'left',
				fontSize:   35,
				lineHeight: 43,
				fontFamily: 'Impact',
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			bind: 'price'
		}
	}
})
const s1OPT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  114,
			left: 228,
			width:  30,
			height: 16
		},
		style:     {
			text: { 
				// textAlign:  'left',
				// fontSize:   12,
				lineHeight: 16,
				color: { type: 'custom', color: '#666666' }
			}
		},
		content: {
			text: '原价:'
		}
	}
})
const s1OPrice = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  111,
			left: 260,
			width:  50,
			height: 20
		},
		style:     {
			text: { 
				textAlign:  'left',
				fontSize:   15,
				lineHeight: 20,
				color: { type: 'custom', color: '#666666' }
			}
		},
		content: {
			bind: 'oldPrice'
		}
	}
})
const s1QR = extend(deepCopy(pb), {
	data: {
		layout: {
			top:  99,
			left: 416,
			width:  94,
			height: 94
		},
		content: {
			bind: 'QRPic'
		}
	}
})
const s1QRT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  194,
			left: 416,
			width:  94,
			height: 14
		},
		style:     {
			text: { 
				// textAlign:  'left',
				// fontSize:   12,
				lineHeight: 14,
				color: { type: 'custom', color: '#666666' }
			}
		},
		content: {
			text: '扫码即可购买'
		}
	}
})

const data = {
	style: {
		filterBox: {
			borderRadius: {
				topLeft:     6,
				topRight:    6,
				bottomRight: 6,
				bottomLeft:  6
			},
			backgroundColor: { type: 'custom', color: '#fff' }
		}
	},
	layout:    {
		position: 'absolute',
		top:      10,
		left:     10,
		width:    520,
		height:   220
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	// 组件管理
	components: [ s1Spr, s1Name, s1PIcon, s1Price, s1OPT, s1OPrice, s1QR, s1QRT ] 
} 

module.exports = {  
	name: 'goodsDetails',
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
	feature: {}
}


