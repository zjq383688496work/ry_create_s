import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Col, Row, Radio, Switch, Input } from 'antd'
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

let paramMap = [
	{ name: '无',  value: '' },
	{ name: '布尔值', value: 'bool' },
]
let typeMap = {
	bool:  '布尔值',
}
let defaultValues = {
	bool: () => false
}

class VisibleSwitch extends React.Component {
	constructor(props) {
		super(props)
		const { content } = props
		const { param }   = content
		if (param === undefined) {
			content.allow = false
			content.param = [{ type: '', value: '' }]
		}
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {
		let { content } = this.props,
			{ param }   = content
		if (param === undefined) content.param = [{ type: '', value: '' }]
	}

	onChangeType = (val, param) => {
		let { data, content, actions, editConfig } = this.props
		let { parentComp } = editConfig.curData
		let fun = defaultValues[val]
		param.type  = val
		param.value = fun? fun(): ''
		content.param[0] = param
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeValue = (val, param) => {
		let { data, content, actions, editConfig } = this.props
		let { parentComp } = editConfig.curData
		param.value = val
		content.param[0] = param
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAllow = val => {
		let { data, content, actions, editConfig } = this.props
		let { parentComp } = editConfig.curData
		content.allow = val
		return actions.updateComp(null, parentComp? parentComp: data)
	}
	renderParamType() {
		let { param, url } = this.props.content
		let [ obj ] = param,
			{ type } = obj
		return (
			<Row style={{ marginTop: 8 }}>
				<Col span={24}>
					<RadioGroup
						size="small"
						value={type}
						onChange={_ => this.onChangeType(_.target.value, obj)}
					>
						{ paramMap.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
					</RadioGroup>
				</Col>
			</Row>
		)
	}
	renderParamValue() {
		let { param, url } = this.props.content

		let [ obj ] = param,
			{ type, value } = obj

		if (!type || !this[`render_${type}`]) return false
		let dom = this[`render_${type}`](obj)
		return (
			<Row style={{ marginTop: 8 }}>
				<Col
					span={7}
				>{typeMap[type]}</Col>
				<Col span={17}>
					{ dom }
				</Col>
			</Row>
		)
	}
	render_bool(param) {
		let { type, value = false, name } = param
		return (
			<Switch
				size="small"
				checked={value || false}
				onChange={v => this.onChangeValue(v, param)}
			/>
		)
	}
	// 是否影响开关
	renderVisibleSwitch = () => {
		let { allow } = this.props.content
		return (
			<Row>
				<Col span={7}>同步修改</Col>
				<Col span={17}>
					<Switch
						size="small"
						checked={allow || false}
						onChange={this.onChangeAllow}
					/>
				</Col>
			</Row>
		)
	}
	render() {
		let { data, content, editConfig } = this.props
		let rvs        = this.renderVisibleSwitch()
		let paramType  = this.renderParamType()
		let paramValue = this.renderParamValue()
		return (
			<div>
				{ rvs }
				{ paramType }
				{ paramValue }
			</div>
		)
	}
}

VisibleSwitch.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisibleSwitch)
