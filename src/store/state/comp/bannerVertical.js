let { deepCopy } = require('state/common')

// 轮播图
const data = {
	style: {
		swiperImage: {
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		},
		filterActive: {
			borderWidth:     0,
			borderStyle:     'solid',
			borderColor:     { type: 'custom', color: '#a240ec' },
			background:      'center no-repeat',
			backgroundImage: { type: 'custom', img: '' },
			backgroundColor: { type: 'custom', color: '#cfad81' }
		}
	},
	layout: { 
		position: 'absolute',
		width:  540,
		height: 304,
	}, 
	content: [
		{
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201805231506216176.jpg' },
			router: {},
			type:'image',
		}, 
		{ 
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201805231506213816.jpg' },
			router: {},
			type:'image'
		}, 
		{   
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/201805231506215219.jpg' },
			router: {},
			type:'image'
		}
	],
}

module.exports = {
	name: 'bannerVertical',
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
		style: {
			layout: '0',	// 外观样式
			title:  '0'		// 标题样式
		},
		layout: 1,
		swiperOptions: {
			position:  'top',
			direction: 'horizontal',	// 轮播方向 vertical
			effect:    'slide',			// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			autoplay:  true,			// 播放开关
			loop:      true,			// 循环
			speedBig:  1,				// 切换速度
			slideOptions: {
				spaceBetween:   0,
				slidesPerView:  1,
				centeredSlides: true,
			},
			autoplayOptions: {
				delayBig: 5,					// 1秒切换一次
				disableOnInteraction: false,	// 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
			},
		}
	}
}