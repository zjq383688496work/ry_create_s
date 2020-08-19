module.exports = {
	special: [
		{
			header: '通用',
			data: [
				{
					name: 'startData',
					type: '日期',
					desc: '数据开始日期, 日期之前的数据不展示, 可以配合 endData 使用, 默认为空.'
				},
				{
					name: 'endData',
					type: '日期',
					desc: '数据结束日期, 超过的数据不展示, 可以配合 startData 使用, 默认为空.'
				},
				{
					name: 'active',
					type: '日期',
					desc: '数据是否有效, 可以配合 startData endData 使用, 默认为关.'
				},
			],
		},
		{
			header: '店铺列表',
			data: [
				{
					name: 'shop',
					type: '店铺',
					desc: '店铺关联专用字段.'
				},
			],
		},
		{
			header: '精彩活动',
			data: [
				{
					name: 'activity',
					type: '活动',
					desc: '活动关联专用字段. 可以配合 shop 达到活动跳转店铺的效果.'
				},
			],
		},
		{
			header: '高级视图',
			data: [
				{
					name: 'media',
					type: '布尔值',
					desc: '视频全屏类型判断素材来源.'
				},
			],
		},
	]
}
