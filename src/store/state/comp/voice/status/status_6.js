let { authInit, deepCopy, extendRmSL } = require('state/common')
const t = authInit(require('state/comp/text'))


const voice_text = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  193,
			left: 242,
			width:  190,
			height: 55
		},
		content: {
			text: '软件错误',
		}
	}
})

// 组件状态管理
module.exports = [
	voice_text
]