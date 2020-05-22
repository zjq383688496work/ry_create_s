import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Col, Row, Radio, Select, Input } from 'antd'
const { Option, OptGroup } = Select
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import StoreListModal from 'compEdit/EditCommon/StoreListModal'

const urlMap = {
	thirdApp: 1,
	back: 1
}

let paramMap = [
	{ name: '无',  value: '' },
	{ name: '业态', value: 'catg' },
	{ name: '楼层', value: 'floor' },
	{ name: '店铺', value: 'store' }
]
let typeMap = {
	catg:  '业态',
	floor: '楼层',
	store: '店铺'
}

class RouterJump extends React.Component {
	constructor(props) {
		super(props)
		const { content } = props
		const { param }   = content
		if (param === undefined) content.param = [{ type: '', value: '' }]
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {
		let { content } = this.props,
			{ param }   = content
		if (param === undefined) content.param = [{ type: '', value: '' }]
		// else {
		// 	let [{ type, value }] = param,
		// 		ipt = this.refs.input
		// 	content.param = param
		// 	if (type === 'app' && ipt) ipt.input.value = value
		// }
	}

	onChange = val => {
		let { data, content, actions, editConfig, from } = this.props
		let { curData, globalData } = editConfig
		let { parentComp } = curData
		content.type = 'router'
		content.url  = val
		if (/^p_\d+$/.test(val)) content.param = [{ type: '', value: '' }]
		if (val === 'thirdApp')  content.param  = [{ type: 'app', value: '' }]
		if(from && from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		} 
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeParam = (val, key, param) => {
		let { data, content, actions, editConfig, index, from } = this.props
		let { curData, globalData } = editConfig
		let { parentComp } = curData
		let content_arr = data.data.content
		param[key] = val
		content.param[0] = param
		if(index != undefined) content_arr[index].router = content;
		if (key === 'type') param.value = ''
		if(from && from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAppParam = ({ target }) => {
		let { data, content, actions, editConfig, from } = this.props
		let { curData, globalData } = editConfig
		let { parentComp } = curData
		content.param[0].value = target.value
		if(from && from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions, editConfig, from } = this.props,
			{ globalData } = editConfig
		data.auth.content[key] = val
		if(from && from === 'banner'){
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, data)
	}

	onSelect(newIdx) {
		let { data, parentKey, action, idx, actions } = this.props
		if (newIdx === idx) return
		data[parentKey].idx = newIdx
		if (action === 'updateComp') {
			data.style = { ...data[parentKey].list[newIdx].data }
			return actions[action](null, data)
		}
		else if (action === 'updateGlobal') return actions[action](data)
	}
	
	renderParamType() {
		let { param, url } = this.props.content
		if (!param || envType !== 'business' || !/^p_\d+$/.test(url)) return false
		let [ obj ] = param,
			{ type } = obj
		return (
			<Row style={{ marginTop: 8 }}>
				<Col span={7}>跳转类型</Col>
				<Col span={17}>
					<RadioGroup
						size="small"
						value={type}
						onChange={_ => this.onChangeParam(_.target.value, 'type', obj)}
					>
						{ paramMap.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
					</RadioGroup>
				</Col>
			</Row>
		)
	}
	renderAppValue() {
		let { param, url } = this.props.content
		if (!param || envType !== 'business' || url !== 'thirdApp') return false
		
		let [ obj ] = param,
			{ value } = obj

		return <Input placeholder={'请输入AppID'} style={{ marginTop: 8 }} value={value} onChange={this.onChangeAppParam} />
	}
	renderParamValue() {
		let { param, url } = this.props.content
		if (!param || envType !== 'business' || !/^p_\d+$/.test(url)) return false

		let [ obj ] = param,
			{ type, value } = obj

		if (!type || !this[`render_${type}`]) return false
		let dom = this[`render_${type}`](obj)
		return (
			<Row style={{ marginTop: 8 }}>
				<Col
					span={7}
				>{typeMap[type]}</Col>
				<Col span={17}>
					{ dom }
				</Col>
			</Row>
		)
	}
	render_catg(param) {
		let { type, value } = param
		let { catgList }   = storeData
		return <Select
			style={{ width: '100%' }}
			value={value}
			onChange={v => this.onChangeParam(v, 'value', param)}
		>
			<Option value={''}>无</Option>
			{ catgList.map((_, i) => <Option key={i} value={_.id}>{_.name}</Option>) }
		</Select>
	}
	render_floor(param) {
		let { type, value } = param
		let { floorList }   = storeData
		return <Select
			style={{ width: '100%' }}
			value={value}
			onChange={v => this.onChangeParam(v, 'value', param)}
		>
			<Option value={''}>无</Option>
			{ floorList.map((_, i) => <Option key={i} value={_.id}>{_.name}</Option>) }
		</Select>
	}
	render_store(param) {
		let { type, value, name } = param
		return <StoreListModal id={value} name={name} param={param} onOk={this.onOk} />
	}
	onOk = (row, param) => {
		let { id, name } = row
		this.onChangeParam(id, 'value', param)
		this.onChangeParam(name, 'name',  param)
	}

	render() {
		let { data, content, editConfig } = this.props
		let { url } = content
		let { pageList } = editConfig
		let pageGroup  = pageList.group
		let hasRouter  = false
		let selectNode = pageGroup.map((gp, i) => {
			let { name, pages } = gp
			let pageNode = pages.map((pg, j) => {
				let { router, title } = pg
				if (url === router) hasRouter = true
				return <Option key={j} value={router}>{ title }</Option>
			})
			return (
				<OptGroup key={i} label={name}>
					{ pageNode }
				</OptGroup>
			)
		})
		if (urlMap[url]) hasRouter = true
		if (!hasRouter) content.url = ''
		let featureNode = (
			<OptGroup label={'功能'}>
				<Option value="back">返回</Option>
				<Option value="thirdApp">第三方应用</Option>
			</OptGroup>
		)
		let paramType  = this.renderParamType()
		let paramValue = this.renderParamValue()
		let appValue   = this.renderAppValue()
		return (
			<div>
				<Select
					value={url || ''}
					style={{ width: '100%' }}
					onChange={this.onChange}
				>
					<Option value={''}>无</Option>
					{ selectNode }
					{ featureNode }
				</Select>
				{ paramType }
				{ paramValue }
				{ appValue }
			</div>
		)
	}
}

RouterJump.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouterJump)
