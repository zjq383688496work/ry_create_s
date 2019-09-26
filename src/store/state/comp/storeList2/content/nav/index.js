const { deepCopy } = require('state/common')
const style_1 = require('./style_1')

module.exports = {
	name: 'navByStore2',
	type: 'layout',
	// 位置大小
	data: deepCopy(style_1),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '导航',
			img:  '',
			data: deepCopy(style_1)
		}]
	},
	// 功能特性
	feature: {
	}
}