import React from 'react'
import { hashHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Tables     from './Tables'
import TableModel from './TableModel'
import Views      from './Views'
import { Modal }  from 'antd'
// import TableModel from './TableModel'

import { typeMap } from './config'

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
	// 校验更新数据
	checkUpdateData(list, { data }) {
		if (!list.length) return
		let first = deepCopy(list[0]),	// 第一个数据
			field = {},		// 新增字段&索引
			del   = {}		// 多余字段
		
		data.forEach(_ => field[_.key] = _.type)	// 建立字段索引
		delete first.id		// 清除多余字段

		// 排除已有字段
		Object.keys(first).forEach(key => {
			if (field[key]) {
				delete field[key]
			} else {
				del[key] = 1
			}
		})

		list.forEach(item => {
			// 去除多余字段
			Object.keys(del).forEach(key => {
				delete item[key]
			})
			// 新增字段赋值
			Object.keys(field).forEach(key => {
				let type  = field[key],
					obj   = typeMap[type]
				item[key] = obj.def()
			})
		})
	}
	// 表更新
	fieldUpdate = ({ data: _data, field: _field }) => {
		let { field, data, params: { idx } } = this.state,
			{ id } = field[idx]
		if (_field) Object.assign(field[idx], _field)
		if (_data)  data[id] = _data
		if (data[id]) this.checkUpdateData(data[id], _field)
		this.setState({ data, field }, this.globalUpdate)
	}
	// 表创建
	fieldCreate = item => {
		let { field, maxId = 0 } = this.state
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
	removeTable = ({ idx }) => {
		Modal.confirm({
			title:   '确认要删除该表吗?',
			content: '删除表会连带删除删除表对应的所有数据哦',
			onOk: () => {
				let { data, field, maxId } = this.state,
					{ actions, editConfig } = this.props,
					{ id } = field.splice(idx, 1),
					{ globalData } = editConfig
				delete data[id]
				Object.assign(globalData.data.db, { data, field })
				actions.updateGlobal(globalData)
			},
			onCancel() {},
			okText: '确认',
			cancelText: '取消',
		})
	}
	render() {
		let { data, field, params, state } = this.state
		let comp = compState(state, data, field, params, this.pageChange, this.fieldCreate, this.fieldUpdate, this.removeTable)
		return comp
	}
}

function compState(state, data, field, params, pageChange, fieldCreate, fieldUpdate, removeTable) {
	let props = { data, field, params, pageChange, fieldCreate, fieldUpdate, removeTable }
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
