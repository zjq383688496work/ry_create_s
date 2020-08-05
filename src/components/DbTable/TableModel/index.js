import React from 'react'

import { Alert, Row, Col, Form, Button, Input, Select, Divider, Table, Modal } from 'antd'

import './index.less'

import FormItem from 'components/FormItem'
const { Item } = Form
const { Option } = Select

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
			...props.data,
			isSubmit: false
		}
	}
	addField = () => {
		let { data } = this.state
		data.push(dataEmpty())
		this.setState({ data })
	}
	delField = (item, idx) => {
		let { data } = this.state,
			len = 0
		Object.values(item).map(val => { if (val) ++len })
		if (len < 2) {
			data.splice(idx, 1)
			this.setState({ data })
		} else {
			Modal.confirm({
				title: '删除字段',
				content: '确定要删除该字段吗?',
				okText: '确认',
				cancelText: '取消',
				onOk: () => {
					data.splice(idx, 1)
					this.setState({ data })
				}
			})
		}
	}
	mainChange = (val, key) => {
		let obj = {}
		obj[key] = val
		this.setState(obj)
	}
	// 字段修改
	fieldChange = (val, item, key) => {
		let { data } = this.state
		item[key] = val
		this.setState({ data })
	}
	// 字段上下移动
	fieldMove = (idx, offset) => {
		let { data } = this.state
		let newIdx = idx + offset;
		[ data[idx], data[newIdx] ] = [ data[newIdx], data[idx] ];
		this.setState({ data })
	}
	// 字段值重复校验
	fieldCheck = (idx, val, key) => {
		let { data, isSubmit } = this.state,
			_data = deepCopy(data).splice(idx, 1)
		if (!isSubmit || !val) return true
		for (let i = 0, l = _data.length; i < l; i++) {
			let item = _data[i]
			if (_data[i][key] === val) {
				return false
			}
		}
		return true
	}
	submit = () => {
		this.setState({ isSubmit: true })
	}
	// 渲染自定义字段
	renderField = () => {
		let { data } = this.state,
			len = data.length
		let tr = data.map((item, idx) => {
			let { name, key, type, desc } = item
			return (
				<tr key={idx}>
					<td className={!this.fieldCheck(idx, name, 'name')? 'has-error': ''}>
						<Input value={name} placeholder="请输入名称" onChange={e => this.fieldChange(e.target.value, item, 'name')} />
					</td>
					<td className={!this.fieldCheck(idx, key, 'key')? 'has-error': ''}>
						<Input value={key} placeholder="请输入key" onChange={e => this.fieldChange(e.target.value, item, 'key')} />
					</td>
					<td>
						<Select value={type} onChange={val => this.fieldChange(val, item, 'type')}>
							<Option value={1}>文本</Option>
							<Option value={2}>媒体</Option>
							<Option value={3}>日期</Option>
							<Option value={4}>布尔值</Option>
						</Select>
					</td>
					<td>
						<Input value={desc} placeholder="请填写描述" onChange={e => this.fieldChange(e.target.value, item, 'desc')} />
					</td>
					<td>
						<div className={'tcf-ctrl'}>
							<a onClick={() => this.fieldMove(idx, -1)} disabled={!idx}>上移</a>
							<a onClick={() => this.fieldMove(idx, 1)} disabled={idx === len - 1}>下移</a>
							<a onClick={() => this.delField(item, idx)}>删除</a>
						</div>
					</td>
				</tr>
			)
		})
		return (
			<table className="tcf-table" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th>名称</th>
						<th>key</th>
						<th>类型</th>
						<th>描述</th>
						<th width={140}>操作</th>
					</tr>
				</thead>
				<tbody>{ tr }</tbody>
			</table>
		)
	}
	render() {
		let { title, key, data, isSubmit } = this.state
		let tableDom = this.renderField()
		return (
			<div className="table-custom-field">
				<Alert message="名称, key 未填写或存在重复则视为无效" type="error" />
				<br/>
				<Form>
					<FormItem required visible={isSubmit} {...formItemLayout} label="名称" rules={[
						[ !title, '名称不能为空!' ],
						[ !this.props.checkTitle(title), '名称不能重复!' ]
					]}>
						<Input value={title} placeholder="请填写" onChange={e => this.mainChange(e.target.value, 'title')} />
					</FormItem>
					<FormItem required visible={isSubmit} {...formItemLayout} label="key" rules={[
						[ !key, 'key不能为空!' ],
						[ !/^[a-zA-Z_]{3,32}$/.test(key), '格式必须是3-32位大小写字母跟下划线' ]
					]}>
						<Input value={key} placeholder="请填写" onChange={e => this.mainChange(e.target.value, 'key')} />
					</FormItem>
					<Item {...formItemLayout} label="自定义字段" wrapperCol={{sm: { span: 22 }}}>
						<Button type="primary" size="small" onClick={this.addField} disabled={data.length > 12}>新增字段</Button>
						{ tableDom }
					</Item>
				</Form>
				<Divider/>
				<Button type="primary" onClick={this.submit}>确定</Button>
			</div>
		)
	}
}

class TableModel extends React.Component {
	constructor(props) {
		super(props)

		let { data, params } = props,
			_data = { title: '', key: '', data: [dataEmpty()] },
			update = false
		if (data && params && params.index) {
			_data  = data[params.idx],
			update = true
		}
		this.state = {
			data: _data,
			update
		}
	}
	dataUpdate = data => {
		let { dataCreate, dataUpdate } = this.props,
			{ update } = this.state
		if (update) dataUpdate(data)
		else        dataCreate(data)
	}
	checkTitle = val => {
		if (!val) return true
		let { data, params } = this.props,
			{ update } = this.state,
			_data = data
		if (update) _data = data.filter((_, i) => i != params.idx)
		for (let i = 0, l = _data.length; i < l; i++) {
			if (_data[i].title === val) {
				return false
			}
		}
		return true
	}
	render() {
		let { data } = this.state
		return (
			<TableModelEdit data={data} dataUpdate={this.dataUpdate} checkTitle={this.checkTitle} />
		)
	}
}

export default TableModel
