let { authInit, deepCopy } = require('state/common')

// 轮播图
const data = {
	style: {
		swiperImage: {
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		},
		paginationBox: {
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
			},
			backgroundColor: { type: 'high', color: '#f6efe5' }
		},
		pagination: {
			width:  6,
			height: 6,
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
			},
			backgroundColor: { type: 'high', color: '#f6efe5' },
			margin: {
				top:     10,
				right:   5
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		},
		paginationActive: {
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#a240ec' },
			backgroundColor: { type: 'custom', color: '#cfad81' }
		}
	},
	layout: {
		position: 'absolute',
		top:    0,
		left:   0,
		width:  540,
		height: 304
	},
	content: {
		media: [],
		swiperOptions: {
			direction: 'horizontal',
			effect:  'slide',
			// autoplay: true,
			loop:  true,
			speed: 300,
			// delay: 5000,
			spaceBetween:   0,
			slidesPerView:  1,
			slidesPerGroup: 1,
			slidesOffsetBefore: 0,
			centeredSlides: true,
			pagination: false
		},
		remarks: { text: '首帧不建议视频哦<br><br>轮播配置: 媒体数量大于1并且所有素材都是图片时有效', color: 'red' }
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'swiperIV',
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