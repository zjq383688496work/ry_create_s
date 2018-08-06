let { authInit, deepCopy } = require('state/common')

// 轮播图
const data = {
	style: {
		swiperImage:{
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		}
	},
	layout: {
		position: 'absolute',
		top:    0,
		left:   0,
		width:  540,
		height: 200
	},
	content: {
		bind: '',
		swiperOptions: {
			direction: 'horizontal',
			effect:  'slide',
			autoplay: true,
			loop:  true,
			speed: 300,
			delay: 2000,
			spaceBetween:   0,
			slidesPerView:  1,
			slidesPerGroup: 1,
			slidesOffsetBefore: 0,
			centeredSlides: true
		}
	},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'swiperBind',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}