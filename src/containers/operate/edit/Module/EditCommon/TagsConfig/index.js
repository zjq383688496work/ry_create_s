import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Select } from 'antd'

const { Option } = Select

import { tags } from 'var'

class TagsConfig extends React.Component {
	constructor(props) {
		super(props)
	}
	changeTag = val => {
		let { actions, data, editConfig }      = this.props,
			{ pageGroupIdx, pageIdx } = editConfig.curData
		data.feature.tag = val
		actions.updatePage(pageGroupIdx, pageIdx, data)
	}
	selectTag = () => {
		let { tag } = this.props.data.feature
		return (
			<Select value={tag} onChange={this.changeTag} style={{ width: '100%' }}>
				<Option value={-1}>请选择</Option>
				{ tags.map(({ name, key }) => <Option key={key} value={key}>{name}</Option>) }
			</Select>
		)
	}
	render() {
		return (
			envType === 'operate'
			?
			<div className="pgs-row">
				<div className="pgsr-name">标签</div>
				<div className="pgsr-ctrl">
					{ this.selectTag() }
				</div>
			</div>
			: null
		)
	}
}

TagsConfig.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TagsConfig)
