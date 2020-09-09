module.exports = {
	special: [
		{
			header: '通用',
			data: [
				{
					name: 'startDate',
					type: '日期',
					desc: '数据开始日期, 日期之前的数据不展示, 可以配合 endDate 使用, 默认为空.'
				},
				{
					name: 'endDate',
					type: '日期',
					desc: '数据结束日期, 超过的数据不展示, 可以配合 startDate 使用, 默认为空.'
				},
				{
					name: 'active',
					type: '布尔值',
					desc: '数据是否有效, 可以配合 startDate endDate 使用, 默认为关.'
				},
				{
					name: 'shop',
					type: '店铺',
					desc: '店铺关联专用字段, 精彩活动, 推荐店铺专用.'
				},
			],
		},
		{
			header: '店铺列表',
			data: [
			],
		},
		{
			header: '精彩活动',
			data: [
				{
					name: 'media',
					type: '媒体',
					desc: '活动素材来源.'
				},
			],
		},
		{
			header: '高级视图',
			data: [
				{
					name: 'media',
					type: '媒体',
					desc: '视频全屏类型判断素材来源.'
				},
			],
		},
	]
}
