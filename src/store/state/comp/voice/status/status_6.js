let { authInit, deepCopy, extendRmSL } = require('state/common')
const p    = authInit(require('state/comp/picture'))
const t    = authInit(require('state/comp/text'))
const bs   = authInit(require('state/comp/buttonStatus'))

const voice_icon = extendRmSL(deepCopy(bs), {
	data: {
		layout: {
			top:  318,
			left: 440,
			width:  75,
			height: 75
		},
		content: {
			text:   '',
			status: { type: 'status', url: '2' }
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
			top:  330,
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
			top:  340,
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
			text: '未知错误，请稍后再试！',
		}
	}
})

// 组件状态管理
module.exports = [
	voice_icon,
	voice_text_bg,
	voice_text
]