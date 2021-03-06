let { authInit, deepCopy, extendRmSL } = require('state/common')
const pb = authInit(require('state/comp/pictureBind'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))
const qr = authInit(require('state/comp/qrcode/qrcodeBind'))

const Name = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  10,
			left: 15,
			width:  275,
			height: 42
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   15,
				lineHeight: 20,
				color: { type: 'custom', color: '#666' }
			}
		},
		content: {
			bind: 'commodityName'
		}
	}
})
const PIcon = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  24,
			left: 314,
			width:  20,
			height: 28
		},
		style:     {
			text: {
				fontSize:   23,
				lineHeight: 28,
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			text:  '¥',
			text2: '¥',
		}
	}
})
const Price = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  12,
			left: 334,
			width:  110,
			height: 43
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   35,
				lineHeight: 43,
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			bind: 'currentPrice'
		}
	}
})
const OPT = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  60,
			left: 315,
			width:  30,
			height: 16
		},
		style:     {
			text: {
				// textAlign:  'left',
				// fontSize:   12,
				lineHeight: 16,
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			text: '原价:'
		}
	}
})
const OPrice = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  57,
			left: 346,
			width:  50,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   15,
				lineHeight: 20,
				textDecoration: 'line-through',
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			bind: 'originalPrice'
		}
	}
})
const QR = extendRmSL(deepCopy(qr), {
	data: {
		layout: {
			top:  16,
			left: 445,
			width:  60,
			height: 60
		},
		content: {
			bind: 'qrcode'
		}
	}
})

// 字母排序
const data = {
	layout: {
		position: 'fixed',
		top:  0,
		left: 0,
		width:  520,
		height: 90
	},
	style: {
		filterBox: {
			fontSize:       12,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
			color: { type: 'main', color: '#cfad81' }
		},
		filter: {
			width:  520,
			height: 90,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: '#fff' },
			margin: {
				top:     0,
				right:   0,
				bottom:  0,
				left:    0,
			},
			borderRadius: {
				topLeft:     6,
				topRight:    6,
				bottomLeft:  6,
				bottomRight: 6
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
	componentLayout: [ Name, PIcon, Price, OPT, OPrice, QR ],
	content: {
		showTop: 150
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
	name: 'goodsBar',
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