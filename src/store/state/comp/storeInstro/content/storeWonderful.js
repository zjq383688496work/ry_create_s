/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const storeWonderful = extend(deepCopy(require('../../../comp/wonderfulActivity')), {
	data: {
		layout: {
			top:  170,
			left: 30,  
			width: 480, 
			height:286 
		},
		style:{
			swiperImage: {
				borderRadius:{
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				}
			}
		},
		type:'storeWonderful',
		animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	},
	feature:{
		swiperOptions:{
			slideOptions:{
				spaceBetween: 30,
				slidesPerView: 2,
				centeredSlides: true
			}
		}
	}
})

module.exports = storeWonderful