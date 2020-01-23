let { authInit, deepCopy, extendRmSL } = require('state/common')
const p    = authInit(require('state/comp/picture'))
const t    = authInit(require('state/comp/text'))
const area = authInit(require('state/comp/area'))
const list = authInit(require('./list'))
const bs   = authInit(require('state/comp/buttonStatus'))
const ba   = authInit(require('state/comp/buttonAuto'))

const shop_list = deepCopy(list)

const shop_bg = extendRmSL(deepCopy(area), {
	data: {
		layout: {
			top:  304,
			left: 19,
			width:  502,
			height: 350
		},
		style: {
			filterBox: {
				borderRadius: {
					topLeft:     10,
					topRight:    10,
					bottomRight: 10,
					bottomLeft:  10
				},
				backgroundColor: { type: 'custom', color: '#fff' }
			}
		},
	}
})

const bg = extendRmSL(deepCopy(area), {
	data: {
		layout: {
			top:  0,
			left: 0,
			width:  540,
			height: 960
		},
		style:     {
			filterBox: {
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0.4)', rgb: '#000', alpha: 40 }
			}
		},
	}
})

const back = extendRmSL(deepCopy(bs), {
	data: {
		layout: {
			top:  600,
			left: 232,
			width:  75,
			height: 30
		},
		content: {
			text:   '',
			status: { type: 'status', url: '1' }
		},
		style: {
			text: {
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				backgroundImage: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202001161013384411.png' },
				borderWidth: 0,
			}
		}
	}
})

const voice_icon = extendRmSL(deepCopy(bs), {
	data: {
		layout: {
			top:  218,
			left: 440,
			width:  75,
			height: 75
		},
		content: {
			text:   ''
		},
		style: {
			text: {
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				backgroundImage: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202001131033200295.png' },
				borderWidth: 0,
			}
		}
	}
})

const voice_text_bg = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  230,
			left: 250,
			width:  200,
			height: 55
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202001151750500923.png' }
		}
	}
})

const voice_text = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  240,
			left: 260,
			width:  175,
			height: 36
		},
		style: {
			text: {
				fontSize:       10,
				lineHeight:     34,
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				textShadow:     {
					h_shadow:   1,
					v_shadow:   1,
					blur_dis:   1,
					color:      { type: 'custom', color: 'rgba(147, 66, 0, 0.5)', rgb: '#934200', alpha: 50 }
				},
				color:          { type: 'custom', color: '#fff' }
			}
		},
		content: {
			text: '为您搜索出一下店铺... ...',
		}
	}
})

const autoBack = extendRmSL(deepCopy(ba), {
	data: {
		layout: {
			top:  100,
			left: 168,
			width:  200,
			height: 30
		},
		content: {
			text:   '{{second}} 秒自动返回',
			status: { type: 'status', url: '1' },
			defer:  10,
		},
		style: {
			text: {
				lineHeight:  30,
				backgroundColor: { type: 'custom', color: '#fff' },
				borderWidth: 0,
				fontSize: 12,
			}
		}
	}
})

// 组件状态管理
module.exports = [
	bg,
	shop_bg,
	shop_list,
	back,
	autoBack,
	voice_icon,
	voice_text_bg,
	voice_text
]