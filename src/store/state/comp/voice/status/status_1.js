let { authInit, deepCopy, extendRmSL } = require('state/common')
const p    = authInit(require('state/comp/picture'))
const bs   = authInit(require('state/comp/buttonStatus'))

const voice_icon = extendRmSL(deepCopy(bs), {
	data: {
		layout: {
			top:  175,
			left: 430,
			width:  90,
			height: 90
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
const voice_text = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  193,
			left: 242,
			width:  190,
			height: 55
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202001131038426510.png' }
		}
	}
})

// 组件状态管理
module.exports = [
	voice_icon,
	voice_text
]