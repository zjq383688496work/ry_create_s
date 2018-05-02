// 图片
var style = {
	// 组件样式
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120,
	},
	image: {
		transform: '',
		animation: '0s 0s 1',			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
	},
}

module.exports = {
	name: 'picture',
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: {
		img: "http://oxwmr019d.bkt.clouddn.com/default.jpg",			// 图片url
		routerType: 0,		// 链接类型
		router: '',			// 路由
		url: '',	// 链接设置
	}, 
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	},
	styleList: [JSON.parse(JSON.stringify(style))],styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}],
	},
	// 功能特性
	feature: {
	},
}