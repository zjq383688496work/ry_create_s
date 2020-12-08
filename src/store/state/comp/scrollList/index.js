let { authInit, deepCopy, extendRmSL } = require('state/common')
const list   = authInit(require('./content/list'))

const List = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			top:  30,
			left: 30,
		}
	}
})

// 精彩活动
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   540
	},
	style: {},
	content: {
		dbSource: -1,
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ List ]
}

module.exports = {
	name: 'scrollList',
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