import React from 'react'
import { hashHistory } from 'react-router'

import { Row, Col, Form, Button, Divider, Input } from 'antd'

import { formItemView, typeDefMap } from '../config'

const { Item } = Form
 
class Views extends React.Component {
	constructor(props) {
		super(props)

		let { data, field, params } = props
		let curField = field[params.idx],
			{ id } = curField
		this.state = {
			field: curField,
			data: data[id] || []
		}
	}
	addData = () => {
		let { data, field } = this.state,
			obj = {}
		field.data.forEach(_ => {
			let { key, type } = _
			obj[key] = typeDefMap[type]()
		})
		data.push(obj)
		this.setState({ data })
	}
	// 渲染数据列表
	renderData = () => {
		let { field: { data: fields }, data } = this.state,
			len = data.length
		let tr = data.map((item, i) => {
			let { name, key, type } = item
			return (
				<tr key={i}>
					{
						fields.map((field, l) => {
							let { name, key, type } = field
							return (
								<td>
									<Input key={`${i}_${l}`} value={item[key]} placeholder={`请输入${name}`} />
								</td>
							)
						})
					}
					<td>
						<div className={'tcf-ctrl'}>
							<a disabled={!i}>上移</a>
							<a style={{ marginLeft: 10 }} disabled={i === len - 1}>下移</a>
							<a style={{ marginLeft: 10 }}>删除</a>
						</div>
					</td>
				</tr>
			)
		})
		return (
			<table className="tcf-table" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						{
							fields.map((field, i) => <th key={i}>{field.name}</th>)
						}
						<th width={140}>操作</th>
					</tr>
				</thead>
				<tbody>{ tr }</tbody>
			</table>
		)
	}
	render() {
		let { pageChange }  = this.props
		let { data, field } = this.state,
			{ id, title, key } = field
		let dataDom = this.renderData()
		return (
			<div className="table-custom-field">
				<Form>
					<Row gutter={24}>
						<Col span={8}>
							<Item {...formItemView} label="ID">
								{ id }
							</Item>
						</Col>
						<Col span={8}>
							<Item {...formItemView} label="标题">
								{ title }
							</Item>
						</Col>
						<Col span={8}>
							<Item {...formItemView} label="key">
								{ key }
							</Item>
						</Col>
						<Col span={8}>
							<Item {...formItemView} label="数据">
								<Button type="primary" size="small" onClick={this.addData} disabled={data.length > 20}>新增数据</Button>
							</Item>
						</Col>
					</Row>
				</Form>
				{ dataDom }
				<Divider />
				<Button type="primary">确定</Button>
				<Button style={{ marginLeft: 10 }} onClick={() => pageChange('tables', {})}>返回</Button>
			</div>
		)
	}
}

export default Views
