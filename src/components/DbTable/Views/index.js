import React from 'react'
import { hashHistory } from 'react-router'

import { Row, Col, Form, Button, Divider, Input, Modal, DatePicker, Switch } from 'antd'
import moment from 'moment'

import { formItemView, typeMap } from '../config'
import StoreListModal from 'compEdit/EditCommon/StoreListModal'
import IV             from 'compEdit/EditCommon/IV'

const { Item } = Form
const dateFormat = 'YYYY-MM-DD'
 
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
	// 添加数据
	addData = () => {
		let { data, field } = this.state,
			obj = { id: ++field.maxId }
		field.data.forEach(_ => {
			let { key, type } = _
			obj[key] = typeMap[type].def()
		})

		data.push(obj)
		this.setState({ data, field })
	}
	// 删除数据
	delData = (item, idx) => {
		let { data } = this.state,
			len = 0
		Object.values(item).map(val => { if (getAttr(val) != 'Boolean' && val) ++len })
		if (len) {
			Modal.confirm({
				title: '删除数据',
				content: '确定要删除该数据吗?',
				okText: '确认',
				cancelText: '取消',
				onOk: () => {
					data.splice(idx, 1)
					this.setState({ data })
				}
			})
		} else {
			data.splice(idx, 1)
			this.setState({ data })
		}
	}
	// 字段上下移动
	dataMove = (idx, offset) => {
		let { data } = this.state
		let newIdx = idx + offset;
		[ data[idx], data[newIdx] ] = [ data[newIdx], data[idx] ];
		this.setState({ data })
	}
	// 数据修改
	dataChange = (val, item, key, idx) => {
		let { data } = this.state,
			oldVal   = data[idx][key]
		item[key] = val
		this.setState({ data })
	}
	// 提交
	submit = () => {
		let { fieldUpdate, pageChange } = this.props,
			{ data, field } = this.state
		// if (update) fieldUpdate(data)
		// debugger
		fieldUpdate({ data, field })
		pageChange('tables', {})
	}
	// 文本输入
	render_text = (item, { name, key }, idx) => {
		return (
			<Input
				onChange={e => this.dataChange(e.target.value, item, key, idx)}
				maxLength={200}
				value={item[key]}
				placeholder={`请输入${name}`}
				size="small"
			/>
		)
	}
	// 日期选择
	render_date = (item, { name, key }, idx) => {
		let date = item[key]
		debugger
		return (
			<DatePicker
				value={moment(date)}
				size="small"
				onChange={(d, str) => this.dataChange(str, item, key, idx)}
			/>
		)
	}
	// 媒体选择
	render_media = (item, { name, key }, idx) => {
		let media = item[key]
		let prev  = null
		if (media) {
			let { originalSizePreview, preview, url } = media.media
			prev = (
				<div className="add_img" style={{ backgroundImage: `url('${originalSizePreview || preview || url}')` }}>
				</div>
			)
		}
		return (
			<IV
				media={media? [ media ]: []}
				max={1}
				single={true}
				onChange={({ media, type }) => {
					console.log({ media, type })
					this.dataChange({ media, type }, item, key, idx)
				}}
			>{ prev }</IV>
		)
	}
	// 开关
	render_boolean = (item, { name, key }, idx) => {
		return (
			<Switch
				size="small"
				checked={item[key] || false} onChange={v => this.dataChange(v, item, key, idx)}
			/>
		)
	}
	// 店铺
	render_shop = (item, { name, key }, idx) => {
		if (envType === 'operate') return '商家后台操作'
		return (
			<StoreListModal {...item[key]} onOk={(row, param) => {
				this.dataChange({ id: row.id, name: row.name }, item, key, idx)
			}} />
		)
	}
	// 活动
	render_activity = (item, { name, key }, idx) => {
		if (envType === 'operate') return '商家后台操作'
		debugger
		return null
	}
	// 渲染数据列表
	renderData = () => {
		let { field: { data: fields }, data } = this.state,
			len = data.length
		let tr = data.map((item, i) => {
			let { id, name, key, type } = item
			return (
				<tr key={i}>
					<td>{id}</td>
					{
						fields.map((field, l) => {
							let { name, key, type } = field
							let render = this[`render_${typeMap[type].key}`]
							let comp   = ''
							if (render) comp = render(item, field, i)
							return (
								<td key={`${i}_${l}`}>{ comp }</td>
							)
						})
					}
					<td>
						<div className={'tcf-ctrl'}>
							<a onClick={() => this.dataMove(i, -1)} disabled={!i}>上移</a>
							<a style={{ marginLeft: 10 }} onClick={() => this.dataMove(i, 1)} disabled={i === len - 1}>下移</a>
							<a style={{ marginLeft: 10 }} onClick={() => this.delData(item, i)}>删除</a>
						</div>
					</td>
				</tr>
			)
		})
		return (
			<table className="tcf-table" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th>ID</th>
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
				<Button type="primary" onClick={this.submit}>确定</Button>
				<Button style={{ marginLeft: 10 }} onClick={() => pageChange('tables', {})}>返回</Button>
			</div>
		)
	}
}

export default Views
