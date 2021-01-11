let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const pb = authInit(require('state/comp/pictureBind'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const LOGO = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  10,
			left: 29,
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
			top:  50,
			left: 0,
			width:  100,
			height: 14
		},
		content: {
			bind: 'name'
		},
		style: {
			text: {
				fontSize:   8,
				lineHeight: 14,
				textAlign: 'center',
				color: { type: 'custom', color: '#666' }
			}
		}
	}
})
const Recom = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  0,
			left: 70,
			width:  20,
			height: 20
		},
		content: {
			text: '荐',
			text2: 'Recommend',
		},
		style: {
			text: {
				fontSize:   12,
				lineHeight: 20,
				textAlign: 'center',
				color: { type: 'custom', color: '#fff' },
				backgroundImage: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201811271625344267.png' },
				backgroundSize: 'cover'
			}
		}
	}
})
const Ico = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  66,
			left: 30,
			width:  8,
			height: 8
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202007011045563094.png' }
		}
	}
})
const Pos = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  63,
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
				color: { type: 'custom', color: '#cfad81' }
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
		},
		'::-webkit-scrollbar': {
			display: 'block',
			width: 6,
			backgroundColor: { type: 'custom', color: '#b3b3b3' },
			borderRadius: {
				topLeft:     6,
				topRight:    6,
				bottomLeft:  6,
				bottomRight: 6
			},
		},
		'::-webkit-scrollbar-thumb': {
			backgroundColor: { type: 'custom', color: '#444444' },
			borderWidth:     0,
			borderColor:     { type: 'custom', color: '#444444' },
			borderRadius: {
				topLeft:     6,
				topRight:    6,
				bottomLeft:  6,
				bottomRight: 6
			},
		}
	},
	componentLayout: [ LOGO, Name, Ico, Pos, Recom ],
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
	name: 'listByStore2',
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