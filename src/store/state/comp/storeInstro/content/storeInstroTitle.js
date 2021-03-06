let { deepCopy, extendRmSL } = require('state/common')

const storeInstroTitle = extendRmSL(deepCopy(require('../../../comp/text')), {
	data: {
		layout: {
			top:  12, 
			left: 40,
			width:100   
		}, 
		style:{
			text:{
				textAlign:'left'
			}
		},    
		type:'storeInstroTitle',   
		content: {
			text: '店铺介绍'
		},
		animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	}  
})

module.exports = storeInstroTitle