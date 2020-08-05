import React from 'react'
import { Form } from 'antd'

class FormParent extends React.Component {
	submit = () => {
		let error = 0, result = {}
		let { data, rules } = this.props
		Object.keys(rules).forEach(key => {
			let val     = data[key],
				rule    = rules[key]
			for (let i = 0, l = rule.length; i < l; i++) {
				let [ vaild, msg ] = rule[i]
				if (vaild) {
					result[key] = msg
					break
				}
			}
		})
		error = Object.keys(result).length
		return { error, result }
	}
	render() {
		let { children } = this.props
		return (
			<Form>
				{ children }
			</Form>
		)
	}
}
export default FormParent