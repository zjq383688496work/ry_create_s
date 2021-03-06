let { authInit, deepCopy, extendRmSL } = require('state/common')
const p = authInit(require('state/comp/picture'))
const t = authInit(require('state/comp/text'))

const Pic = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:   0,
			left:  0,
			width:  75,
			height: 25
		},
		style: {
			image: {
			}
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202007081403136145.png' },
		}
	}
})

const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  75,
		height: 25
	},
	style: {
		filterBox: {
			width:  75,
			height: 25,
			borderWidth:     0,
			borderStyle:     'solid',
			borderColor:     { type: 'custom', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 },
			padding: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			},
			borderRadius: {
				topLeft:     1.5,
				topRight:    1.5,
				bottomLeft:  1.5,
				bottomRight: 1.5
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color: { type: 'custom', color: '#000' }
			}
		}
	},
	componentLayout: [ Pic ],
	content: {
		router: {}
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay:     0,		// 开始时间
		duration:  1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'buttonByActivity',
	type: 'layout',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
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