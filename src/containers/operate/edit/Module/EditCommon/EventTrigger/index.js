import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Select, Input } from 'antd'
const { Option, OptGroup } = Select

import eventList from 'state/eventList'

class EventTrigger extends React.Component {
	constructor(props) {
		super(props)
		const { content } = props
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {}

	onChange = val => {
		let { data, content, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		if (!parentComp) return
		content.url = val
		return actions.updateComp(null, parentComp)
	}

	render() {
		let { data, content, editConfig } = this.props,
			{ parentComp }  = editConfig.curData,
			name     = data.name,
			pName    = parentComp.name,
			{ url }  = content,
			list     = eventList[pName] || eventList[name] || []
		let selectNode = list.map(({ name, key }) => <Option key={key} value={key}>{ name }</Option>)
		return (
			<div>
				<Select
					value={url === undefined? 0: url}
					style={{ width: '100%' }}
					onChange={this.onChange}
				>
					<Option key={0} value={0}>无</Option>
					{ selectNode }
				</Select>
			</div>
		)
	}
}

EventTrigger.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventTrigger)
