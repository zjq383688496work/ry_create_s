let { authInit, deepCopy, extendRmSL } = require('state/common')
const swiper = authInit(require('./content/swiper'))
const catg   = authInit(require('./content/catg'))
const reset  = authInit(require('./content/reset'))

const goodsList = extendRmSL(deepCopy(swiper), {
	data: {
		layout: {
			top:  60,
			height: 600
		}
	}
})

const goodsCatg  = extendRmSL(deepCopy(catg), {
	data: {
		layout: {
			left:  100,
			width: 440
		},
		style: {
			filterBox: {
				padding: {
					right: 0,
					left:  0
				}
			}
		}
	}
})
var { componentLayout } = deepCopy(reset).data
componentLayout[0].feature.active = true
componentLayout[1].feature.active = true
delete componentLayout[2].feature.active
delete componentLayout[3].feature.active
delete componentLayout[4].feature.active
const goodsReset = extendRmSL(deepCopy(reset), {
	data: { componentLayout }
})

// 推荐商品
module.exports = {
	layout: {
		position: 'absolute',
		top:    0,
		left:   0,
		width:  540,
		height: 660
	},
	style: {},
	content: {
		size: 6
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ goodsList, goodsCatg, goodsReset ]
}
