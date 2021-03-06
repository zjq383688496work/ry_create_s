let { deepCopy } = require('state/common')

// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  75,
		left: 40,
		width:    440,
		height:   300
	},
	style:     {
		image: {
			width:  40,
			height: 40
		},
		posIcon: {
			width:  8,
			height: 8,
			marginRight: 2,
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundImage: { type: 'custom', img: 'http://rongyi.b0.rongyi.com/commodity/text/202007011045563094.png' },
			backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000' },
		},
		title: {
			color: { type: 'title', color: '#333' },
		},
		text: {
			color: { type: 'main', color: '#333' },
		},
		filterBox: {
			fontSize:       8,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
		},
		filter: {
			width:  100,
			height: 90,
			justifyContent: 'center',
			borderWidth:  1,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#cfad81' },
			color: { type: 'text', color: '#666' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000' },
			margin: {
				top:     0,
				right:   10,
				bottom:  10,
				left:    0,
			},
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
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
		router: {},
		animationType:1
	},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'listByStore',
	type: 'base',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}/*, {
			name: '样式2',
			img:  '',
			data: deepCopy(data)
		}, {
			name: '样式3',
			img:  '',
			data: deepCopy(data)
		}*/]
	},
	// 功能特性
	feature: {
	}
}