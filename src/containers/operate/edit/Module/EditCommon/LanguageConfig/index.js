import React from 'react'
import { Collapse, Icon, Select } from 'antd'

const { Panel } = Collapse
const { Option } = Select

import { languages } from 'var'

const { indexs, values } = languages

const languageLimit = 2

export default class LanguageConfig extends React.Component {
	constructor(props) {
		super(props)
		var { data } = props.data
		if (!data.language) data.language = { default: 1, list: [{ key: 1 }] }
	}
	changeLanguage(val, item) {
		item.key = val
		this.update()
	}
	selectLanguage = (item, idx) => {
		return (
			<Select value={item.key || -1} onChange={e => this.changeLanguage(e, item)} style={{ width: '100%' }}>
				{ idx > 0 && <Option key={0} value={-1}>请选择</Option> }
				{ values.map(({ name, key }) => <Option key={key} value={key}>{name}</Option>) }
			</Select>
		)
	}
	addKey = () => {
		let { list } = this.props.data.data.language
		list.push({ key: -1 })
		this.update()
	}
	removeKey(idx) {
		let { list } = this.props.data.data.language
		list.splice(idx, 1)
		this.update()
	}
	update = () => {
		let { actions, action, data } = this.props
		actions[action](data)
		this.setState({ idx: 0 })
	}
	cfgNode = () => {
		var { language } = this.props.data.data,
			{ list = [] } = language,
			length = list.length
		if (!length) return null
		var nodeList = list.map((item, i) => {
			return (
				envType === 'operate'
				?
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">语言 {i + 1}</div>
					<div className="pgsr-ctrl">
						{ this.selectLanguage(item, i) }
					</div>
					<div className="pgsr-auth" style={{ width: 30 }}>
						<div className="pgt-edit">
							{
								!i && length < languageLimit &&
								<div className onClick={this.addKey}><Icon type="plus"/></div>
							}
							{
								i > 0 &&
								<div className onClick={this.removeKey.bind(this, i)}><Icon type="close"/></div>
							}
						</div>
					</div>
				</div>
				: null
			)
		})
		return nodeList
	}
	render() {
		return (
			<Collapse defaultActiveKey={['0']}>
				<Panel header={`多语言配置`} key={0}>
					{ this.cfgNode() }
				</Panel>
			</Collapse>
		)
	}
}
