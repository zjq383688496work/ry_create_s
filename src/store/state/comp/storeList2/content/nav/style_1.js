let { authInit, deepCopy, extendRmSL } = require('state/common')
const a  = authInit(require('state/comp/area'))
const p  = authInit(require('state/comp/picture'))
const pb = authInit(require('state/comp/pictureBind'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const BG = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  0,
			left: 0,
			width:  121,
			height: 47
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201909260951137268.png' },
		}
	}
})
const Logo = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  3,
			left: 3,
			width:  30,
			height: 30
		},
		content: {
			bind: 'logo'
		},
		style: {
			image: {
				borderWidth:  2,
				borderStyle: 'solid',
				borderColor: { type: 'custom', color: '#fff' },
				borderRadius: {
					topLeft:     40,
					topRight:    40,
					bottomRight: 40,
					bottomLeft:  40
				}
			}
		}
	}
})
const Name = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  4,
			left: 32,
			width:  84,
			height: 16
		},
		style: {
			text: {
				textAlign:  'center',
				fontSize:   8,
				lineHeight: 16,
				color: { type: 'custom', color: '#fff' }
			}
		},
		content: {
			bind: 'name'
		}
	}
})
const NavText = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  15,
			left: 32,
			width:  84,
			height: 16
		},
		style: {
			text: {
				textAlign:  'center',
				fontSize:   10,
				lineHeight: 16,
				color: { type: 'custom', color: '#fff' },
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
			}
		},
		content: {
			text: '点击导航'
		}
	}
})

// 字母排序
module.exports = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  121,
		height: 47
	},
	style: {
		filterBox: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: '#fff' },
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
	componentLayout: [ BG, Logo, Name, NavText ],
	content: {
		centerX: 60,
		centerY: 47,
		router:  {},
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}