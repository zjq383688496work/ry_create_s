let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const pb = authInit(require('state/comp/pictureBind'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const gPic = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  12,
			left: 12,
			width:  152,
			height: 152
		},
		content: {
			bind: 'commodityPicList'
		}
	}
})
const gName = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  166,
			left: 12,
			width:  152,
			height: 36
		},
		content: {
			bind: 'commodityName'
		},
		style: {
			text: {
				textAlign: 'left',
				color: { type: 'custom', color: '#666' }
			}
		}
	}
})
const OPT = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  208,
			left: 12,
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
			top:  208,
			left: 46,
			width:  50,
			height: 16
		},
		style:     {
			text: {
				textAlign:  'left',
				// fontSize:   12,
				lineHeight: 16,
				textDecoration: 'line-through',
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			bind: 'originalPrice'
		}
	}
})
const rmbIcon = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  230,
			left: 12,
			width:  20,
			height: 30
		},
		content: {
			text:  '¥',
			text2: '',
		},
		style: {
			text: {
				textAlign: 'left',
				color: { type: 'custom', color: '#ee3852' }
			}
		}
	}
})
const gPrice = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  224,
			left: 20,
			width:  100,
			height: 30
		},
		content: {
			bind: 'currentPrice'
		},
		style: {
			text: {
				textAlign:  'left',
				fontSize:   22,
				lineHeight: 24,
				color: { type: 'custom', color: '#ee3852' }
			}
		}
	}
})
const gBuy = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  205,
			left: 124,
			width:  40,
			height: 40
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201808271717186978.png' }
		}
	}
})

// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  535,
		height: 540
	},
	style: {
		filter: {
			width:  174,
			height: 260,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: '#fff' },
			margin: {
				top:     0,
				right:   4,
				bottom:  4,
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
	componentLayout: [ gPic, gName, OPT, OPrice, rmbIcon, gPrice, gBuy ],
	content: {
		router: {},
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
	name: 'listByGoods',
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