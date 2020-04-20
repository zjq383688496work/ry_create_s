let { deepCopy } = require('state/common')
let status  = require('./status')
let tabs    = require('./tabs')
let style_1 = require('./style_1')

let _style_1 = deepCopy(style_1)

_style_1.components = status.list[1].components
_style_1.componentsGlobal = []

// 标签切换
module.exports = {
	name: 'tabs',
	type: 'advanced',
	data: _style_1,
	styleList: {
		idx:  0,
		list: []
	},
	// 功能特性
	feature: {
		statusIndex: 1,
		status,
		tabs,
		visible: true
	}
}
