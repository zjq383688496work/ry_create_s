import React from 'react'

import { Alert, Row, Col, Form, Button, Input, Select, Divider, Table, Modal, Collapse } from 'antd'

// import './index.less'

import FormParent from 'components/FormParent'
import FormItem   from 'components/FormItem'

import { formItemLayout } from '../config'
import { special } from './var'

const { Item } = Form
const { Option } = Select
const { Panel } = Collapse

const dataEmpty = () => ({ name: '', key: '', type: 1 })

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
	// 主字段修改
	mainChange = (val, key) => {
		let obj = {}
		obj[key] = val
		this.setState(obj)
	}
	// 自定义字段修改
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
			_data = deepCopy(data)
		_data.splice(idx, 1)
		if (!isSubmit || !val) return true
			if (val.replace(/\s/g, '') != val) return false
		for (let i = 0, l = _data.length; i < l; i++) {
			let item = _data[i]
			if (_data[i][key] === val) {
				// console.log(idx, key, ': 校验失败')
				return false
			}
		}
		// console.log(idx, key, ': 校验成功')
		return true
	}
	// fieldNullCheck = val => {
	// 	let { isSubmit } = this.state
	// 	if (!isSubmit) return true
	// 	let newVal = val.replace(/\s/g, '')
	// 	if (!newVal || newVal != val) return false
	// 	return true
	// }
	// 字段批量校验重复
	fieldsCheck = () => {
		let { data } = this.state,
			error  = 0
		for (let i = 0, l = data.length; i < l; i++) {
			let { name, key } = data[i]
			if (!this.fieldCheck(i, name, 'name')) ++error
			if (!this.fieldCheck(i, key,  'key'))  ++error
		}
		return !error? true: false
	}
	// 字段批量校验重复
	// fieldsNullCheck = () => {
	// 	let { data } = this.state,
	// 		error  = 0
	// 	for (let i = 0, l = data.length; i < l; i++) {
	// 		let { name, key } = data[i]
	// 		if (!this.fieldNullCheck(name)) ++error
	// 		if (!this.fieldNullCheck(key))  ++error
	// 	}
	// 	return !error? true: false
	// }
	// 表单提交校验
	submit = () => {
		let { title, key, data } = this.state
		this.setState({ isSubmit: true }, () => {
			let { error, result } = this.refs.form.submit()
			if (error) {
				console.log(result)
				return false
			}
			let newData = this.clearNullData(data)
			this.props.dataUpdate({ title, key, data: newData })
		})
	}
	// 清除空字段
	clearNullData(data) {
		return data.filter(_ => {
			let { name, key } = _
			name = name.replace(/\s/g, '')
			key  = key.replace(/\s/g, '')
			return name && key
		})
	}
	// 校验规则
	rules = () => {
		let { title, key, data } = this.state
		return {
			title: [
				[ !title, '标题不能为空!' ],
				[ !/^\S+$/, '标题不能存在空格换行符之类字符!' ],
				[ !this.props.checkTitle(title), '标题不能重复!' ]
			],
			key: [
				[ !key, 'key不能为空!' ],
				[ !/^[a-zA-Z_]{3,32}$/.test(key), '格式必须是3-32位大小写字母跟下划线' ]
			],
			data: [
				// [ !this.fieldsNullCheck(), '数据不能为空重复!' ],
				[ !this.fieldsCheck(), '数据存在空格或重复!' ]
			]
		}
	}
	// 渲染自定义字段
	renderField = () => {
		let { filterMap } = this.props,
			{ data } = this.state,
			len = data.length
		let tr = data.map((item, idx) => {
			let { name, key, type } = item
			return (
				<tr key={idx}>
					<td className={!this.fieldCheck(idx, name, 'name')? 'has-error': ''}>
						{
							envType === 'operate'
							?
							<Input value={name} placeholder="请输入名称" onChange={e => this.fieldChange(e.target.value, item, 'name')} />
							: name
						}
					</td>
					<td className={!this.fieldCheck(idx, key, 'key')? 'has-error': ''}>
						{
							envType === 'operate'
							?
							<Input value={key} placeholder="请输入key" onChange={e => this.fieldChange(e.target.value, item, 'key')} />
							: key
						}
					</td>
					<td>
						{
							envType === 'operate'
							?
							<Select value={type} onChange={val => this.fieldChange(val, item, 'type')} disabled={filterMap[key]}>
								<Option value={1}>文本</Option>
								<Option value={2}>媒体</Option>
								<Option value={3}>日期</Option>
								<Option value={4}>布尔值</Option>
								<Option value={5}>店铺</Option>
								<Option value={6}>活动</Option>
							</Select>
							: ({ 1: '文本', 2: '媒体', 3: '日期', 4: '布尔值', 5: '店铺', 6: '活动', })[type]
						}
					</td>
					{
						envType === 'operate'
						?
						<td>
							<div className={'tcf-ctrl'}>
								<a onClick={() => this.fieldMove(idx, -1)} disabled={!idx}>上移</a>
								<a style={{ marginLeft: 10 }} onClick={() => this.fieldMove(idx, 1)} disabled={idx === len - 1}>下移</a>
								<a style={{ marginLeft: 10 }} onClick={() => this.delField(item, idx)}>删除</a>
							</div>
						</td>
						: null
					}
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
						{
							envType === 'operate'
							?
							<th width={200}>操作</th>
							: null
						}
					</tr>
				</thead>
				<tbody>{ tr }</tbody>
			</table>
		)
	}
	// 特殊说明
	specialRender() {
		return special.map(({ header, data }, i) => {
			let dataDom = data.map(({ name, type, desc }, j) => {
				return <p key={j}>{name}: ({type}) {desc}</p>
			})
			return (
				<Panel header={header} key={i}>
					{ dataDom }
				</Panel>
			)
		})
	}
	render() {
		let { title, key, data, isSubmit } = this.state
		let rules = this.rules()
		let tableDom = this.renderField()
		return (
			<div className="table-custom-field">
				<Alert message="自定义字段: 名称, key 未填写或存在重复则视为无效. 修改key值需谨慎, 修改后会导致数据被删除." type="error" />
				<br/>
				<FormParent ref="form" data={{ title, key, data }} rules={rules}>
					<FormItem required visible={isSubmit} {...formItemLayout} label="标题" rules={rules.title}>
						{
							envType === 'operate'
							?
							<Input value={title} maxLength={32} placeholder="请填写" onChange={e => this.mainChange(e.target.value, 'title')} />
							: title
						}
					</FormItem>
					<FormItem required visible={isSubmit} {...formItemLayout} label="key" rules={rules.key}>
						{
							envType === 'operate'
							?
							<Input value={key} maxLength={32} placeholder="请填写" onChange={e => this.mainChange(e.target.value, 'key')} />
							: key
						}
					</FormItem>
					<Item {...formItemLayout} label="自定义字段" wrapperCol={{sm: { span: 22 }}}>
						<Button type="primary" size="small" onClick={this.addField} disabled={data.length > 12}>新增字段</Button>
						<div style={{ color: 'red', lineHeight: 1.5, fontSize: 12, padding: 10 }}>特殊作用key</div>
						<Collapse>
							{ this.specialRender() }
						</Collapse>
						{ tableDom }
					</Item>
				</FormParent>
				<Divider/>
				{ envType === 'operate' && <Button type="primary" onClick={this.submit}>确定</Button> }
				<Button style={{ marginLeft: 10 }} onClick={this.props.back}>取消</Button>
			</div>
		)
	}
}

class TableModel extends React.Component {
	constructor(props) {
		super(props)

		let { field, params } = props,
			data    = { title: '', key: '', data: [dataEmpty()] },
			update  = false,
			filterMap = {}
		if (field && params.idx != undefined) {
			data   = field[params.idx],
			update = true
			if (!data.data.length) data.data.push(dataEmpty())
			let list = props.data[data.id]
			filterMap = this.getFilter(deepCopy(list))
		}
		this.state = {
			data,
			update,
			filterMap
		}
	}
	getFilter([ data ]) {
		if (!data) return {}
		delete data.id
		let filter = {}
		Object.keys(data).map(key => filter[key] = 1)
		return filter
	}
	dataUpdate = data => {
		let { fieldCreate, fieldUpdate, pageChange } = this.props,
			{ update } = this.state
		if (update) fieldUpdate({ field: data })
		else        fieldCreate(data)
		pageChange('tables', {})
	}
	checkTitle = val => {
		if (!val) return true
		let { field, params } = this.props,
			{ update } = this.state,
			_data = field
		if (update) _data = field.filter((_, i) => i != params.idx)
		for (let i = 0, l = _data.length; i < l; i++) {
			if (_data[i].title === val) {
				return false
			}
		}
		return true
	}
	render() {
		let { data, filterMap } = this.state
		let { pageChange } = this.props
		return (
			<TableModelEdit filterMap={filterMap} data={deepCopy(data)} dataUpdate={this.dataUpdate} back={() => pageChange('tables', {})} checkTitle={this.checkTitle} />
		)
	}
}

export default TableModel
