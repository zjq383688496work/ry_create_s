// 高级组件对应添加子组件
module.exports = {
	group: [
		{
			name: '进入类',
			list: ['fadeIn', 'bounceIn', 'translate', 'rotateIn', 'lightSpeedIn', 'zoomIn', 'pullIn', 'rollIn', 'scale', 'flipIn']
		},
		{
			name: '提醒类',
			list: ['swingLR']
		},
		{
			name: '离开类',
			list: ['fadeOut']
		}
	],
	style: {
		// 进入
		fadeIn: {
			name: '淡入',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		bounceIn: {
			name: '弹入',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		translate: {
			name: '平移',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		rotateIn: {
			name: '旋转',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		lightSpeedIn: {
			name: '光速',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		zoomIn: {
			name: '飞入',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		pullIn: {
			name: '展开',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		rollIn: {
			name: '翻滚',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		scale: {
			name: '缩放',
			list: ['ZoomIn', 'ZoomOut', 'X', 'Y']
		},
		flipIn: {
			name: '立体翻转',
			list: ['X', 'Y']
		},
		// 离开
		fadeOut: {
			name: '淡出',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		// 提醒
		swingLR: {
			name: '摇摆'
		}
	},
	map: {
		Center:  '中间',
		Top:     '上',
		Right:   '右',
		Bottom:  '下',
		Left:    '左',
		ZoomIn:  '向内',
		ZoomOut: '向外',
		X:       'X轴',
		Y:       'Y轴',
		CW:      '顺时针',
		AW:      '逆时针'
	}
}