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
			backgroundColor: { type: 'custom', color: '#F58F8F' },
			backgroundImage: { type: 'custom', img: '' },
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			},
			borderWidth:     1,
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
		text:       '全屏',
		text2:      '',
		event:      { url: '' }, 			// 事件
		relOptions: {
			relComp:      -1,
			relChildComp: -1,
		},
		fixedX:     0,
		fixedY:     0,
		remarks:    { text: '屏幕坐标: 只有在退出全屏功能有效', color: 'red' }
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
	name: 'buttonFullScreenByIV',
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