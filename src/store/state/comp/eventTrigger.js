/**
 * @Author: Along
 * @Date:   2018-05-07

 */
let { deepCopy } = require('state/common')

// 按钮
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    100,
		height:   40 
	},
	style: {
		text: {
			textAlign:       'center',
			fontSize:        16,
			lineHeight:      36,
			fontStyle:       'normal',
			fontWeight:      'normal',
			textDecoration:  'none',
			transform:       { rotate: 0 },
			opacity:         1, 
			color:           { type: 'custom', color: '#000' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundColor: { type: 'custom', color: '#fff' },
			backgroundImage: { type: 'custom', img: '' },
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			},
			borderWidth:     0,
			borderStyle:     'solid',  
			borderColor: 	 { type: 'custom', color: '#333' },
			boxShadow:       {
				h_shadow:    0,
				v_shadow:    0,
				blur_dis:    0,
				spread_dis:  0,
				color:       { type: 'custom', color: '#333' }
			},
			textShadow:      {
				h_shadow:    0,
				v_shadow:    0,
				blur_dis:    0,
				color:       { type: 'custom', color: '#333' }
			}
		}
	},
	content: {
		text:  '事件触发器',
		event: {} 			// 事件
	},	
	animation: {
		className: '',
		direction: '',
		delay: 0,
		duration: 1,
		iterationCount: 1
	}
}

module.exports = {
	name: 'eventTrigger',
	type: 'base',
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '样式1',
			img:   '',
			data:  deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}