let { authInit, deepCopy, extendRmSL } = require('state/common')
const sp = authInit(require('state/comp/swiperImgAndVideo'))

const picture = extendRmSL(deepCopy(sp), {
	data: {
		layout: {
			position: 'absolute',
			top:    60,
			left:   20,
			width:  500,
			height: 284,
			lockAspectRatio: true
		},
	}
})

// 组件状态管理
module.exports = [
	picture
]