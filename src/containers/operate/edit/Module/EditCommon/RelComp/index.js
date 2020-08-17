import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Select, Input } from 'antd'
const { Option, OptGroup } = Select

import eventList from 'state/eventList'
import * as variable from 'var'
let compMap = variable.compMap.name

class RelComp extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {}

	onChange = val => {
		let { data, content, field, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		if (!parentComp) return
		content[field] = val
		return actions.updateComp(null, parentComp)
	}
	get_relComp({ data }) {
		return data.components
	}
	get_relChildComp({ data }, { data: { content }}) {
		let childComp = data.components[content.relOptions.relComp]
		if (!childComp) return
		return childComp.data.componentLayout
	}
	renderOption(field, data, curData) {
		let getFun = this[`get_${field}`]
		if (!getFun) return null
		let list =  getFun(data, curData) || []
		if (!list.length) return null
		return list.map(({ name }, i) => <Option key={i} value={i}>{compMap[name]}</Option>)
	}
	render() {
		let { data, content, field, editConfig } = this.props,
			{ parentComp }  = editConfig.curData
		let selectNode = this.renderOption(field, parentComp || data, data)
		// let selectNode = list.map(({ name, key }) => <Option key={key} value={key}>{ name }</Option>)
		return (
			<div>
				<Select
					value={content[field]}
					style={{ width: '100%' }}
					onChange={this.onChange}
				>
					<Option key={-1} value={-1}>无</Option>
					{ selectNode }
				</Select>
			</div>
		)
	}
}

RelComp.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RelComp)
