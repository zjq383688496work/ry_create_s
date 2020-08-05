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
	typeDefMap: {
		1: () => '',
		2: () => null,
		3: () => null,
		4: () => false
	}
}
