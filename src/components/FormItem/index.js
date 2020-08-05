import React from 'react'
import { Form } from 'antd'

let { Item } = Form

class FormItem extends React.Component {
	getRule = (visible, rules = []) => {
		let hasError = false, errorMsg = ''
		if (!visible) return { hasError, errorMsg }
		for (let i = 0, l = rules.length; i < l; i++) {
			let [ vaild, msg ] = rules[i]
			if (vaild) {
				hasError = true
				errorMsg = msg
				break
			}
		}
		return { hasError, errorMsg }
	}
	render() {
		let { children, label, required = false, rules = [], visible, labelCol = {}, wrapperCol = {} } = this.props
		let { hasError, errorMsg } = this.getRule(visible, rules)
		return (
			<Item labelCol={labelCol} wrapperCol={wrapperCol} label={label} required={required} className={hasError? 'has-error': ''}>
				{ children }
				{
					hasError && errorMsg
					?
					<div className="ant-form-explain">{errorMsg}</div>
					: null
				}
			</Item>
		)
	}
}
export default FormItem