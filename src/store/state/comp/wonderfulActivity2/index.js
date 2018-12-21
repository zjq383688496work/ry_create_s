/**
 * @Author: yawen
 * @Date:   2018-11-26
 */
let { authInit, deepCopy, extendRmSL } = require('state/common')
const list   = authInit(require('./content/list'))
const catg   = authInit(require('./content/catg'))
const reset   = authInit(require('./content/reset'))

const List = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			top:  85,
			left: 20
		}
	}
})
const Catg  = extendRmSL(deepCopy(catg), {
	data: {
		layout: {
			top:  36,
			left: 140
		}
	}
})
const Reset = extendRmSL(deepCopy(reset), {
	data: {
		layout: {
			top:  36,
			left: 20
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
		height:   880
	},
	style: {},
	content: {
		
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ Reset, Catg, List]
}

module.exports = {
	name: 'wonderfulActivity2',
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
		body: {
			page:   1,
			size:   6,
			total:  0
		}
	}
}