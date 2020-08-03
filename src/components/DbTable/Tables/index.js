import React from 'react'
import { hashHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Button, Divider, Table } from 'antd'
// import Tables from './Tables'
 
class Tables extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			state: 'tables'
		}
	}
	columns = [
		{
			title: '名称',
			dataIndex: 'name',
		},
		{
			title: 'key',
			dataIndex: 'key',
		},
		{
			title: '描述',
			dataIndex: 'desc',
		},
		{
			title: '操作',
			render: (text, record) => (
				<div>
					<a>编辑</a>
					<a>删除</a>
				</div>
			),
		}
	]
	render() {
		let { data, state } = this.state
		return (
			<div>
				<Button type="primary" onClick={e => this.props.handlerPageChange('addTable')}>新建</Button>
				<Divider />
				<Table
					columns={this.columns}
					dataSource={data}
					pagination={false}
				/>
			</div>
		)
	}
}


Tables.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tables)
