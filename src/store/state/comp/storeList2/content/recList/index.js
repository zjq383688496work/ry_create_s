let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const a  = authInit(require('state/comp/area'))
const p  = authInit(require('state/comp/picture'))
const pb = authInit(require('state/comp/pictureBind'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const Banner = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  0,
			left: 0,
			width:  150,
			height: 200
		},
		style: {
			image: {
				boxShadow: {
					h_shadow:   0,
					v_shadow:   15,
					blur_dis:   15,
					spread_dis: 0,
					color:      { type: 'custom', color: 'rgba(108,88,88,.2)', rgb: '#665858', alpha: .2 }
				}
			}
		},
		content: {
			bind: 'otherPic'
		}
	}
})
const LOGO = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  147.5,
			left: 7.5,
			width:  40,
			height: 40
		},
		style: {
			image: {
				borderRadius: {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
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
			top:  153,
			left: 52.5,
			width:  100,
			height: 14
		},
		content: {
			bind: 'name'
		},
		style: {
			text: {
				fontSize:   12,
				lineHeight: 14,
				textAlign: 'left',
				color: { type: 'custom', color: '#fff' }
			}
		}
	}
})
const BG = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			top:  135,
			left: 0,
			width:  150,
			height: 65
		},
		style: {
			filterBox: {
				backgroundColor: { type: 'custom', color: 'rgba(119,111,86,.4)', rgb: '#776f56', alpha: .4 }
			}
		}
	}
})
const Ico = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  182,
			left: 54,
			width:  10,
			height: 10
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202007011045563094.png' }
		}
	}
})
const Pos = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  180,
			left: 66,
			width:  60,
			height: 14
		},
		content: {
			bind: 'berthNumber'
		},
		style: {
			text: {
				fontSize:   10,
				lineHeight: 14,
				textAlign: 'left',
				color: { type: 'custom', color: '#fff' }
			}
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
		height: 500
	},
	style: {
		filter: {
			width:  150,
			height: 200,
			borderWidth:     0,
			borderStyle:     'solid',
			borderColor:     { type: 'custom', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 },
			margin: {
				top:     0,
				right:   0,
				bottom:  30,
				left:    25,
			},
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
			},
			boxShadow: {
				h_shadow:   -10,
				v_shadow:   10,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: 'rgba(255,255,255,.2)', rgb: '#fff', alpha: .2 }
			}
		},
	},
	componentLayout: [ Banner, BG, LOGO, Name, Ico, Pos ],
	content: {
		router: {},
		// swiperOptions: {
			// direction: 'horizontal',
			// loop: false,
			// spaceBetween:   0,
			// slidesPerView:  1,
			// slidesPerGroup: 1,
			// slidesOffsetBefore: 0,
		// },
		bufferOptions: {
			indexMultiple:  1,
			offsetX:        0,
			offsetXStr:     '',
			offsetY:        0,
			offsetYStr:     '',
			offsetS:        1,
			offsetSStr:     '',
			offsetR:        0,
			offsetRStr:     '',
			speed:          300,
			delay:          100,
			offsetT:        0,
		},
		remarks: { text: '缓冲配置: 慎用, 否则会有反效果, 不懂问开发', color: 'red' }
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
	name: 'recListByStore2',
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