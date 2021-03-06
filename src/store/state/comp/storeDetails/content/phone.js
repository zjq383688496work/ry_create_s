let { deepCopy, extendRmSL } = require('state/common')

const phone = extendRmSL(deepCopy(require('./address')), {
	data: { 
		layout: {
			top:  54, 
			left: 172.5,
			width:120  
		},  
		type:'phone',
		content: { 
			text: '023-64538476',
			img:    { type: 'custom', img: "http://rongyi.b0.rongyi.com/commodity/text/202007011045563014.png" }
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

module.exports = phone