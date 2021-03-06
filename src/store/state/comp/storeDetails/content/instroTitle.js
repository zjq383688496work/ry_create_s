let { deepCopy, extendRmSL } = require('state/common')

const instroTitle = extendRmSL(deepCopy(require('../../../comp/text')), {
	data: {
		layout: {
			top:  30, 
			left: 87.5  
		}, 
		style:{
			text:{
				textAlign:'left'
			}
		},   
		content: {
			text:  '优衣库/UNIQLO',
		},
		type:'instroTitle',
		animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	} 
}) 

module.exports = instroTitle