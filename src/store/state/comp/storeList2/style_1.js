let { authInit, deepCopy, extendRmSL } = require('state/common')
const list = authInit(require('./content/list'))
const catg = authInit(require('./content/catg'))
const reset  = authInit(require('./content/reset'))

const storeList = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			top:  75,
			left: 40
		}
	}
})

const storeCatg = extendRmSL(deepCopy(catg), {})

const storeReset = deepCopy(reset)

// 商品列表
module.exports = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   630
	},
	style: {},
	content: {
		size: 12
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ storeCatg, storeList, storeReset ]
}
