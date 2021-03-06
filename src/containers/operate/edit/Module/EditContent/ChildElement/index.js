/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import { Row, Col, Collapse, Checkbox, Icon, Input, Select } from 'antd'
const  { TextArea } = Input
const  { Option, OptGroup } = Select
const  { Panel }  = Collapse

import ImageUpload from 'compEdit/EditCommon/ImageUpload'

import * as cElement from 'state/childElement'
import * as variable from 'var'

const comp  = require('state/comp')
var compMap = variable.compMap,
	cmName  = compMap.name,
	cmNum   = compMap.num,
	conMap  = variable.contentMap,
	fieldMap  = variable.fieldMap,
	activeMap = variable.childElementActiveMap,
	languages = variable.languages

var fMap = {
	img:  1,
	text: 1,
	bind: 1
}

export default class ChildElement extends React.Component {
	state = { key: '' }

	componentWillMount() {}

	componentDidMount() {}

	update = () => {
		this.props.updateComp()
	}
	onChange = v => {
		this.setState({ key: v })
	}
	addElement = () => {
		var { layout, updateComp, globalData } = this.props,
			{ key } = this.state
		if (!key) return
		layout.push(compIdCreate(deepCopy(comp[key]), globalData))
		updateComp()
	}
	removeElement = idx => {
		var { layout, updateComp } = this.props
		layout.splice(idx, 1)
		updateComp()
	}
	selList(comps) {
		var { key } = this.state
		if (key && !comps[key]) return this.setState({ key: '' })
		var opts = Object.keys(comps).map((_, i) => {
			return <Option key={i} value={_}>{cmName[_]}</Option>
		})
		return (
			<Select
				value={this.state.key}
				style={{ width: '60%', marginRight: 10 }}
				onChange={this.onChange}
			>
				<Option value={''}>无</Option>
				{ opts }
			</Select>
		)
	}
	onActive = (v, feature) => {
		feature.active = v
		this.update()
	}
	childList(layout, isActive) {
		var num = deepCopy(cmNum)
		return layout.map((_, i) => {
			var { name, data, feature } = _,
				{ content } = data
			num[name] += 1
			var numN = num[name]
			var node = Object.keys(content).map((p, j) => {
				if (!fMap[p]) return false
				let cm     = conMap[p]
				let val    = content[p]
				let render = this[`render${cm.type}`]
				if (!render) return false
				let dom = render.bind(this, cm, content, val, p, i, _)()
				return (
					<div key={j} style={{ display: 'inline-block', width: '86%' }}>
						{ dom }
					</div>
				)
			})
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{cmName[name]}{numN}</div>
					<div className="pgsr-ctrl">
						<Row>
							<Col span={21}>
								{ node }
								{
									isActive
									?
									<Checkbox
										style={{ marginLeft: 5 }}
										title="激活状态开关"
										checked={feature.active || false}
										onChange={v => this.onActive(v.target.checked, feature)}
									/>
									: null
								}
							</Col>
							<Col span={1}></Col>
							<Col span={2}>
								<span onClick={() => { this.removeElement(i) }}><Icon type="close" /></span>
							</Col>
						</Row>
					</div>
				</div>
			)
		})
	}
	// 文本
	renderTextarea(cfg, con, val, key) {
		var { language = {} } = this.props,
			{ default: defaultValue, list = []} = language,
			{ indexs, values } = languages,
			[ lang1, lang2 ] = list

		if (list.length === 1) {
			return (
				<TextArea
					min={cfg.min || 0} max={cfg.max || 100}
					placeholder={cfg.placeholder || '请填入内容'}
					autosize={cfg.autosize || false}
					value={val}
					onChange={v => { con[key] = v.target.value; this.update() }}
					style={{ width: '100%' }}
				/>
			)
		} else if (list.length === 2) {
			let key2 = 'text2'
			return (
				<div>
					<Row>
						<Col span={6}>{ indexs[lang1.key] }</Col>
						<Col span={18}>
							<TextArea
								min={cfg.min || 0} max={cfg.max || 100}
								placeholder={cfg.placeholder || '请填入内容'}
								autosize={cfg.autosize || false}
								value={val}
								onChange={v => { con[key] = v.target.value; this.update() }}
								style={{ width: '100%' }}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={6}>{ indexs[lang2.key] }</Col>
						<Col span={18}>
							<TextArea
								min={cfg.min || 0} max={cfg.max || 100}
								placeholder={cfg.placeholder || '请填入内容'}
								autosize={cfg.autosize || false}
								value={con[key2]}
								onChange={v => { con[key2] = v.target.value; this.update() }}
								style={{ width: '100%' }}
							/>
						</Col>
					</Row>
				</div>
			)
		}

	}
	// 图片
	renderImage(cfg, con, val, name, idx, data) {
		return (
			<ImageUpload
				data={data}
				enter={this.update}
				img={val}
			/>
		)
	}
	// 绑定
	renderBind(cfg, con, val, key, idx) {
		let { name, map, db, parent } = this.props
		let dataMap = fieldMap[name]
		if (parent) {
			let da = getFieldById(parent.data.content.dbSource, db) || {}
			if (!dataMap) dataMap = da
			Object.assign(dataMap, da)
		}
		if (!dataMap) return
		let opts = Object.keys(dataMap).map((_, i) => {
			return <Option key={i} value={_}>{dataMap[_]}</Option>
		})
		return (
			<Select
				value={val}
				style={{ width: '80%' }}
				onChange={v => { con[key] = v; this.update() }}
			>
				<Option value={''}>无</Option>
				{ opts }
			</Select>
		)
	}

	render() {
		var { name, layout } = this.props,
			{ key } = this.state,
			comps = cElement[name] || {},
			selList = this.selList(comps),
			childAdd = (
				<div className="pgs-row">
					<div className="pgsr-name">添加元素</div>
					<div className="pgsr-ctrl">
						{ selList }
						<a onClick={this.addElement} disabled={!key || layout.length > 19}>添加</a>
					</div>
				</div>
			),
			childList = this.childList(layout, activeMap[name])
		return (
			<div>
				{ childAdd }
				{ childList }
			</div>
		)
	}
}
