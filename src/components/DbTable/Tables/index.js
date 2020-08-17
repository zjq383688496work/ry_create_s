import React from 'react'
import { hashHistory } from 'react-router'

import { Button, Divider, Table } from 'antd'
 
class Tables extends React.Component {
	constructor(props) {
		super(props)

		let { field = [] } = props
		this.state = {
			field,
		}
	}
	columns = [
		{
			title: '名称',
			dataIndex: 'title',
		},
		{
			title: 'key',
			dataIndex: 'key',
		},
		{
			title: '操作',
			render: (text, record, idx) => (
				<div>
					{ envType === 'operate' && <a onClick={e => this.props.pageChange('addTable', { idx })}>编辑</a> }
					<a style={{ marginLeft: 10 }} onClick={e => this.props.pageChange('views', { idx })}>查看</a>
					{ envType === 'operate' && <a style={{ marginLeft: 10 }}>删除</a> }
				</div>
			),
		}
	]
	render() {
		let { field } = this.state
		return (
			<div>
				{ envType === 'operate' && <Button type="primary" onClick={e => this.props.pageChange('addTable')}>新建</Button> }
				<Divider />
				<Table
					columns={this.columns}
					dataSource={field}
					pagination={false}
				/>
			</div>
		)
	}
}

export default Tables
