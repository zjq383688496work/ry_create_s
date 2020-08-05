import React from 'react'
import { hashHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Tables     from './Tables'
import TableModel from './TableModel'
import Views      from './Views'
// import TableModel from './TableModel'

import './index.less'

class DbTable extends React.Component {
	constructor(props) {
		super(props)

		let { db } = props
		this.state = {
			field:  db.field || [],
			data:   db.data  || {},
			maxId:  db.maxId,
			state:  'tables',
			params: {},
		}
	}
	componentWillReceiveProps(props) {
		let { db } = props
		this.setState({
			field:  db.field || [],
			data:   db.data  || {},
			maxId:  db.maxId,
		})
	}
	// 页面切换
	pageChange = (state, params) => {
		let obj = { state }
		obj.params = params? params: {}
		this.setState(obj)
	}
	// 数据更新
	fieldUpdate = item => {
		let { field, params: { idx } } = this.state
		field[idx] = item
		this.setState({ field }, this.globalUpdate)
	}
	// 数据创建
	fieldCreate = item => {
		let { field, maxId } = this.state
		Object.assign(item, {
			id: ++maxId,
			maxId: 0
		})
		field.push(item)
		this.setState({ field, maxId }, this.globalUpdate)
	}
	// 全局数据更新
	globalUpdate = () => {
		let { data, field, maxId } = this.state,
			{ actions, editConfig } = this.props,
			{ globalData } = editConfig
		globalData.data.db = { data, field, maxId }
		actions.updateGlobal(globalData)
	}
	render() {
		let { data, field, params, state } = this.state
		let comp = compState(state, data, field, params, this.pageChange, this.fieldCreate, this.fieldUpdate)
		return comp
	}
}

function compState(state, data, field, params, pageChange, fieldCreate, fieldUpdate) {
	let props = { data, field, params, pageChange, fieldCreate, fieldUpdate }
	let comp = {
		tables:   <Tables     { ...props } />,		// 数据库列表
		addTable: <TableModel { ...props } />,		// 数据模型
		views:    <Views      { ...props } />,		// 数据详情
	}
	return comp[state] || null
}


DbTable.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DbTable)
