/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const weatherLogo = extend(deepCopy(require('../../../comp/picture')), {
	data: {
		layout: {
			top:    20,
			left:   390,
			width:  130,
			height: 60
		},
		style: {
			image:{
				borderRadius: {
					topLeft:     0,
					topRight:    0,
					bottomRight: 0,
					bottomLeft:  0
				}
			}
		},
		type: 'weatherLogo',
		content: {
			img: { type: 'logo', img: '' }
		},
		animation: {
			className: '',				// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	}
}) 

module.exports = weatherLogo