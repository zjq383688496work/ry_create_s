let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))
const sb = authInit(require('state/comp/swiperBind'))
const qr = authInit(require('state/comp/qrcode/qrcodeBind'))

const Name = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  25,
			left: 25,
			width:  210,
			height: 42
		},
		content: {
			bind: 'commodityName'
		},
		style: {
			text: {
				fontSize:   15,
				lineHeight: 20,
				textAlign: 'left',
				color: { type: 'custom', color: '#666' }
			}
		}
	}
})
const PIcon = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  114,
			left: 25,
			width:  20,
			height: 28
		},
		style:     {
			text: {
				// textAlign:  'left',
				fontSize:   23,
				lineHeight: 28,
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			text:  '¥',
			text2: '',
		}
	}
})
const Price = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  101,
			left: 45,
			width:  155,
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
const PriceT = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  108,
			left: 154,
			width:  64,
			height: 12
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201808271801007506.png' }
		}
	}
})
const OPT = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  122.5,
			left: 150,
			width:  30,
			height: 16
		},
		style:     {
			text: {
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
			top:  120,
			left: 181.5,
			width:  50,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left',
				textDecoration: 'line-through',
				fontSize:   15,
				lineHeight: 20,
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
			top:  26.5,
			left: 274,
			width:  95,
			height: 115
		},
		style: {
			text: {
				lineHeight: 14,
				color: { type: 'custom', color: '#999' },
				marginTop: 2
			}
		},
		content: {
			bind: 'qrcode',
			text: '扫码即可购买'
		}
	}
})
const Spr = extendRmSL(deepCopy(sb), {
	data: {
		layout: {
			top:  154,
			left: 25,
			width:  344,
			height: 344
		},
		content: {
			bind: 'showPicList'
		}
	}
})
const DescT = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  75,
			left: 25,
			width:  200,
			height: 24
		},
		style:     {
			text: {
				textAlign:  'left',
				lineHeight: 12,
				color: { type: 'custom', color: '#da2339' },
				padding: {
					top:    1,
					right:  8,
					bottom: 1,
					left:   8,
				},
				borderRadius:    {
					topLeft:     4,
					topRight:    4,
					bottomRight: 4,
					bottomLeft:  4
				},
				borderWidth:     1,
				borderStyle:     'solid',
				borderColor: 	 { type: 'custom', color: '#da2339' },
			}
		},
		content: {
			bind: 'recommendReason'
		}
	}
})


// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  540,
		height: 600
	},
	style: {
		filterBox: {
			width:  394,
			height: 523,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     20,
				topRight:    20,
				bottomLeft:  20,
				bottomRight: 20
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   60,
				spread_dis: 0,
				color:      { type: 'custom', color: 'rgba(0,0,0,0.24)', alpha: 24 }
			}
		},
		paginationBox: {
			height: 4,
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
			},
			backgroundColor: { type: 'custom', color: 'rgba(239, 116, 132, 0.14)', alpha: 14 },
			margin: {
				top:    -30,
				right:  0,
				bottom: 0,
				left:   0
			}
		},
		pagination: {
			width:  16,
			height: 8,
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
			},
			backgroundColor: { type: 'custom', color: '#ef7484' },
			margin: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			},
			opacity: 0
		},
		paginationActive: {
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			backgroundColor: { type: 'custom', color: '#ef7484' },
			opacity: 1
		}
	},
	componentLayout: [ Name, DescT, PIcon, Price, PriceT, OPT, OPrice, QR, Spr ],
	content: {
		swiperOptions: {
			direction: 'horizontal',
			effect:  'slide',
			autoplay: true,
			loop:  false,
			speed: 500,
			delay: 3000,
			spaceBetween:   150,
			slidesPerView:  2,
			slidesPerGroup: 1,
			slidesOffsetBefore: 0,
			centeredSlides: true,
			pagination: true
		},
		rel: 0,
		router: {}
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
	name: 'swiperByGoods',
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