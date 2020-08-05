import React from 'react'
import { hashHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Tables     from './Tables'
import TableModel from './TableModel'

class DbTable extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data:  [],
			state: 'tables'
		}
	}
	// 页面切换
	pageChange = (state, params) => {
		let obj = { state }
		obj.params = params? params: null
		this.setState(obj)
	}
	dataUpdate = data => {
		debugger
	}
	dataCreate = data => {
		debugger
	}
	render() {
		let { data, params, state } = this.state
		let comp = compState(state, data, params, this.pageChange)

		return comp
	}
}

function compState(state, data, params, handlerPageChange) {
	let props = { data, params, handlerPageChange }
	let comp = {
		tables:   <Tables     { ...props } />,
		addTable: <TableModel { ...props } />,
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
