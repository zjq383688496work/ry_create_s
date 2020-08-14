let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const mb = authInit(require('state/comp/mediaBind'))
const tb = authInit(require('state/comp/textBind'))
const Media = extendRmSL(deepCopy(mb), {
	data: {
		layout: {
			top:  0,
			left: 0,
			width:  540,
			height: 300
		},
	}
})
const Title = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  320,
			left: 20,
			width:  500,
			height: 20
		},
		style: {
			text: {
				textAlign:  'left',
				fontSize:   13, 
				lineHeight: 18,
				color:      { type: 'custom', color: '#000' }
			}
		}
	}
})
const Desc = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  400,
			left: 20,
			width:  500,
			height: 48
		},
		style: {
			text: {
				textAlign:  'left',
				fontSize:   10, 
				lineHeight: 16,
				color:      { type: 'custom', color: '#aaa' }
			}
		}
	}
})

const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  540,
		height: 300,
	},
	style: {
		filterFlex: {
			justifyContent: 'center',
			flexDirection: 'row',
			flexWrap: 'nowrap',
		},
		filterBox: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: 'rgba(255, 255, 255, 0)', rgb: '#fff', alpha: 0 },
			padding: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			},
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color: { type: 'custom', color: '#000' }
			}
		},
		filter: {
			width:  18,
			height: 18,
			margin: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			}
		}
	},
	// componentLayout: [ Point, PointAV ],
	componentLayout: [ Media, Title, Desc ],
	content: {
		swiperOptions: {
			direction: 'horizontal',
			effect:  'slide',
			autoplay: true,
			speed: 500,
			delay: 3000,
			spaceBetween:   150,
			slidesPerView:  2,
			slidesPerGroup: 1,
			slidesOffsetBefore: 0,
			centeredSlides: true,
			pagination: true
		},
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
	name: 'swiperBlockByIV',
	type: 'layout',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [
			{
				name: '圆点',
				data: deepCopy(data)
			},
			{
				name: '文本',
				data: {}
			}
		]
	},
	// 功能特性
	feature: {
	}
}