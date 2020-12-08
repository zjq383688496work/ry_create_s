let { authInit, deepCopy, extendRmSL } = require('state/common')
const mb = authInit(require('state/comp/mediaBind'))

const PIC = extendRmSL(deepCopy(mb), {
	data: {
		layout: {
			left:   10,
			width:  90,
			height: 120
		},
		content: {
			bind: ''
		},
		style: {
		},
	}
})

// 精彩活动
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    480,
		height:   480
	},
	style:     {
		filterFlex: {
			flexDirection: 'row',
			flexWrap: 'nowrap'
		},
		filter: {
			width:  90,
			height: 120,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#cfad81' },
			backgroundColor: { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 },
			margin: {
				top:     0,
				right:   0,
				bottom:  5,
				left:    0,
			},
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		}
	},
	content: {
	},
	componentLayout: [ PIC ],
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
} 

module.exports = {
	name: 'listByScroll',
	type: 'layout',
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