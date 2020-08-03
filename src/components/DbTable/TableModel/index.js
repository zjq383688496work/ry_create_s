import React from 'react'

import { Alert, Row, Col, Form, Button, Input, Select, Divider, Table } from 'antd'

import './index.less'

const { Item } = Form

const formItemLayout = {
	labelCol: {
		sm: { span: 2 },
	},
	wrapperCol: {
		sm: { span: 8 },
	},
}

const dataEmpty = () => ({ name: '', key: '', type: 1, desc: '' })

class TableModelEdit extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [
				dataEmpty()
			]
		}
	}
	columns = [
		{
			title: '名称',
			dataIndex: 'name',
			render: (name, data) => (
				<Input value={name} placeholder="请输入名称" />
			)
		},
		{
			title: 'key',
			dataIndex: 'key',
			render: (key, data) => (
				<Input value={key} placeholder="请输入key" />
			)
		},
		{
			title: '类型',
			dataIndex: 'type',
			render: (type, data, idx) => (
				<Select value={type}>
					<Option value={1}>文本</Option>
					<Option value={2}>媒体</Option>
					<Option value={3}>日期</Option>
					<Option value={4}>布尔值</Option>
				</Select>
			)
		},
		{
			title: '描述',
			dataIndex: 'desc',
			render: (name, data) => (
				<Input value={name} placeholder="请填写描述" />
			)
		},
		{
			title: '操作',
			render: (text, record) => (
				<div className={'tcf-ctrl'}>
					<a>上移</a>
					<a>下移</a>
					<a>删除</a>
				</div>
			),
		}
	]
	addField = () => {
		let { data } = this.state
		data.push(dataEmpty())
		this.setState({ data })
	}
	render() {
		let { data } = this.state
		return (
			<div className="table-custom-field">
				<Alert message="名称, key 未填写或重复者则视为无效字段" type="error" />
				<br/>
				<Form {...formItemLayout}>
					<Item label="名称">
						<Input placeholder="请填写" />
					</Item>
					<Item label="key">
						<Input placeholder="请填写" />
					</Item>
					<Item label="自定义字段" wrapperCol={{sm: { span: 22 }}}>
						<Button type="link" size="small" onClick={this.addField} disabled={data.length > 12}>新增字段</Button>
						<Table
							columns={this.columns}
							dataSource={data}
							pagination={false}
						/>
					</Item>
				</Form>
				<Divider/>
				<Button type="primary">确定</Button>
			</div>
		)
	}
}

class TableModel extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<TableModelEdit />
		)
	}
}

export default TableModel
