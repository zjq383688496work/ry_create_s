let { authInit, deepCopy, extendRmSL } = require('state/common')
const p    = authInit(require('state/comp/picture'))
const t    = authInit(require('state/comp/text'))
const bs   = authInit(require('state/comp/buttonStatus'))
const ev   = authInit(require('state/comp/eventTrigger'))

const event = extendRmSL(deepCopy(ev), {
	data: {
		content: {
			text:  '',
			event: { url: 'eventVoicelisten' }
		},
		style: {
			text: {
				opacity: 0,
			}
		}
	}
})

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

const voice_text = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  344,
			left: 328,
			width:  40,
			height: 26
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202001151751291077.gif' }
		}
	}
})

// 组件状态管理
module.exports = [
	event,
	voice_icon,
	voice_text_bg,
	voice_text
]