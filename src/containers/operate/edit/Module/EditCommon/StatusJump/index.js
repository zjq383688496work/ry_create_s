import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Select, Input } from 'antd'
const { Option, OptGroup } = Select

class StatusJump extends React.Component {
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
		content.type = 'status'
		content.url  = val
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	render() {
		let { data, content, editConfig } = this.props,
			{ parentComp } = editConfig.curData,
			{ url = 0 }  = content,
			status   = data.feature.status || (parentComp? parentComp.feature.status: {}),
			isParent = !data.feature.status,
			{ list = {} } = status
		url = ~~url
		let selectNode = Object.keys(list).map(key => {
			key = ~~key
			return <Option key={key} value={key}>{ list[key].name }</Option>
		})
		return (
			<div>
				<Select
					value={url}
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

StatusJump.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StatusJump)
