let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const a   = authInit(require('../area'))
const p   = authInit(require('../picture'))
const pb  = authInit(require('../pictureBind'))
const plb = authInit(require('../pictureListBind'))
const t   = authInit(require('../text'))
const tb  = authInit(require('../textBind'))
const sb = authInit(require('./content/storeBlock'))

/* 店铺详情 */
const GBINFO2 = extendRmSL(styleIdxChange(1, deepCopy(sb)), {
	data: {
		layout: {
			top:  240,
			left: 10
		}
	}
})

/* 店铺图 */
const GoodsPic = extendRmSL(deepCopy(plb), {
	data: {
		layout: {
			top:  320,
			left: 10,
			width:  520,
			height: 120
		},
		style:     {
			filterBox: {
				width: 520,
				padding: {
					left: 125
				},
				borderRadius: {
					topLeft:     6,
					topRight:    6,
					bottomRight: 6,
					bottomLeft:  6
				}
			},
			image: {
				width:  270,
				height: 270,
				margin: {
					bottom: 10
				}
			}
		},
		content: {
			bind: 'commodityPicList'
		}
	}
})

const data = {
	style: {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   960
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	// 组件管理
	components: [
		GBINFO2,
		GoodsPic
	]
}

module.exports = {
	name: 'storeDetails2',
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
	feature: {}
}


