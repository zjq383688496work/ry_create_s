let { authInit, deepCopy, extend } = require('state/common')
const t  = authInit(require('./content/instroTitle'))
const p  = authInit(require('./content/instroPicture'))
const b  = authInit(require('./content/instroButton'))
const a  = authInit(require('./content/address'))
const e  = authInit(require('./content/phone'))
const data = {
	style:     {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   120
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	// 组件管理
	components: [t,p,b,a,e] 
} 

module.exports = {  
	name: 'storeDetails',
	type: 'advanced',
	// 样式管理
	data: deepCopy(data),
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


