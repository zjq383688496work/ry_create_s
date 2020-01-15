let { authInit, deepCopy, extendRmSL } = require('state/common')
const area = authInit(require('state/comp/area'))
const list = authInit(require('./list'))

const shop_list = extendRmSL(deepCopy(list), {
	// data: {
	// 	layout: {
	// 		top:  75,
	// 		left: 40
	// 	}
	// }
})

const shop_bg = extendRmSL(deepCopy(area), {
	data: {
		layout: {
			top:  304,
			left: 19,
			width:  502,
			height: 390
		},
		style: {
			filterBox: {
				borderRadius: {
					topLeft:     10,
					topRight:    10,
					bottomRight: 10,
					bottomLeft:  10
				},
				backgroundColor: { type: 'custom', color: '#fff' }
			}
		},
	}
})

const bg = extendRmSL(deepCopy(area), {
	data: {
		layout: {
			top:  0,
			left: 0,
			width:  540,
			height: 960
		},
		style:     {
			filterBox: {
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0.4)', rgb: '#000', alpha: 40 }
			}
		},
	}
})

// 组件状态管理
module.exports = [
	bg,
	shop_bg,
	shop_list,
]