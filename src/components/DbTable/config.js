module.exports = {
	formItemLayout: {
		labelCol: {
			sm: { span: 2 },
		},
		wrapperCol: {
			sm: { span: 8 },
		},
	},
	formItemView: {
		labelCol: {
			sm: { span: 6 },
		},
		wrapperCol: {
			sm: { span: 18 },
		},
	},
	// 类型默认值
	typeDefMap: {
		1: () => '',
		2: () => null,
		3: () => null,
		4: () => false
	},
	// 类型名称
	typeMap: {
		1: { key: 'text',    name: '文本',   def: () => '' },
		2: { key: 'media',   name: '媒体',   def: () => null },
		3: { key: 'date',    name: '日期',   def: () => null },
		4: { key: 'boolean', name: '布尔值', def: () => false }
	}
}
