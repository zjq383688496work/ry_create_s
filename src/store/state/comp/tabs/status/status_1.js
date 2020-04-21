let { authInit, deepCopy, extendRmSL } = require('state/common')
const p = authInit(require('state/comp/picture'))

const picture = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:    60,
			left:   20,
			width:  500,
			height: 284,
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/system/mcp/app/upload/d84bd24a-80c5-4d88-941a-30031fb705ad.jpeg' }
		}
	}
})

// 组件状态管理
module.exports = [
	picture
]