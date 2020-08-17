let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const p = authInit(require('state/comp/picture'))
const picture = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:    0,
			left:   0,
			width:  48,
			height: 48,
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202004211737499426.png' }
		},
	},
	feature: {
		active: true
	}
})


const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  48,
		height: 48
	},
	style: {
	},
	componentLayout: [ picture ],
	content: {
		turn: 'prev',
		remarks: { text: '激活状态: 功能可用', color: 'red' }
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'turnByIV',
	type: 'layout',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: []
	},
	// 功能特性
	feature: {
	}
}