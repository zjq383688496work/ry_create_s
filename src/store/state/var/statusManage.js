let { authInit, deepCopy, extendRmSL } = require('state/common')
const p = authInit(require('state/comp/picture'))

const voice_default = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  54,
			left: 88,
			width:  40,
			height: 40
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201805311433385479.png' }
		}
	}
})

// 组件状态管理
module.exports = {
	voice: {
		idx: 1,
		list: {
			1: { name: '默认',   components: [ voice_default ] },
			2: { name: '处理中', components: [] },
			3: { name: '成功',   components: [] },
			4: { name: '失败',   components: [] },
		},
		max: 4
	}
}