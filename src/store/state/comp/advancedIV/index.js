let { authInit, deepCopy, extend } = require('state/common')
const style_1 = require('./style_1')

module.exports = {
	name: 'advancedIV',
	type: 'advanced',
	data: deepCopy(style_1),
	// 动画设置
	styleList: {
		idx:  0,
		list: [
		{
			name: '样式一',
			img:  '',
			data: deepCopy(style_1)
		}
		]
	},
	// 功能特性
	feature: {
	}
}
