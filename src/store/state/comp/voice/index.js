let { deepCopy } = require('state/common')
let status  = require('./status')
let style_1 = require('./style_1')

let _style_1 = deepCopy(style_1)

_style_1.components = status.list[1].components

module.exports = {
	name: 'voice',
	type: 'advanced',
	data: _style_1,
	styleList: {
		idx:  0,
		list: [
			{
				name: '语音助手',
				img:  '',
				data: _style_1
			},
		]
	},
	// 功能特性
	feature: {
		statusIndex: 1,
		status: status,
		visible: true
	}
}
