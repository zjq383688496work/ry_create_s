let { authInit, deepCopy, extendRmSL } = require('state/common')
const page   = authInit(require('./content/page'))
const swiper = authInit(require('./content/swiperBlock'))

const Page = extendRmSL(deepCopy(page), {
	data: {
		layout: {
			top:    374,
			left:   40,
			width:  430,
			height: 20
		}
	}
})

const Swiper = extendRmSL(deepCopy(swiper), {
	data: {
		layout: {
			width:  336,
			height: 344,
		}
	}
})

let [ media, title, desc ] = Swiper.data.componentLayout
extendRmSL(media, {
	data: {
		layout: {
			width:  336,
			height: 188
		},
	}
})
extendRmSL(title, {
	data: {
		layout: {
			top:   205,
			width: 296,
		},
	}
})
extendRmSL(desc, {
	data: {
		layout: {
			top:   230,
			width: 296,
		},
	}
})

//
module.exports = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   500
	},
	style: {},
	content: {
		dbSource: ''
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ Swiper, Page ]
}
