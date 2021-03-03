import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Select, Checkbox } from 'antd'
const { Option, OptGroup } = Select

import eventList from 'state/eventList'
import * as variable from 'var'
let compMap = variable.compMap.name
let relMap  = variable.compChildRelMap.storeList2

// 关联子组件
class CompChildBind extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {}

	onChange = (val, comp) => {
		let { data, content, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		if (envType === 'operate' && !parentComp) return
		if (val && relMap[comp.name] === 'only') this.removeOther(comp._id, parentComp || data, data)
		content[comp._id] = val
		return actions.updateComp(null, parentComp || data, data)
	}
	getComp({ name, data }, curData) {
		let { components } = data
		let comps = []
		components.forEach(comp => {
			if (!relMap[comp.name]) return
			comps.push(comp)
		})
		return comps
	}
	removeOther(clearCompId, { data }, { name, _id }) {
		data.components.forEach(comp => {
			if (comp.name != name || comp._id === _id) return
			let { compChildBind } = comp.data.content
			if (compChildBind[clearCompId] != undefined) {
				compChildBind[clearCompId] = false
			}
		})
	}
	renderComp = (data) => {
		let { data: curData, content } = this.props
		let list =  this.getComp(data, curData) || []
		if (!list.length) return null
		return list.map((comp, i) => {
			let { _id, name } = comp
			return (
				<Checkbox
					key={i}
					checked={content[_id] || false}
					onChange={v => this.onChange(v.target.checked, comp)}
				>{compMap[name]}</Checkbox>
			)
		})
	}
	render() {
		let { data, editConfig } = this.props,
			{ parentComp }  = editConfig.curData
		let checkNode = this.renderComp(parentComp || data)
		return (
			<div>
				{ checkNode }
			</div>
		)
	}
}

CompChildBind.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompChildBind)
