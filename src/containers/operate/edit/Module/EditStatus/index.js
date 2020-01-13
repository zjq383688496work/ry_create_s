import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Collapse, Icon, Input } from 'antd'

const { Panel } = Collapse

import ImageUploadTheme from 'compEdit/EditCommon/ImageUploadTheme'

import './index.less'

const statusLimit = 16

class EditStatus extends React.Component {
	constructor(props) {
		super(props)

		let { idx = 1 } = props.data.feature.status

		this.state = {
			idx,
			keyValue: '',
		}
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}
	selectIndex = idx => {
		let { actions, data, editConfig } = this.props,
			{ status } = data.feature,
			{ list }   = status,
			item = list[idx]

		data.data.components = item.components
		status.idx = idx
		actions.updateGlobal(editConfig.globalData)
		this.setState && this.setState({ idx })
	}
	onChangeValue(val, key) {
		var obj = {}
		obj[key] = val
		this.setState(obj)
	}
	addKey = () => {
		let { keyValue } = this.state,
			{ actions, data, editConfig } = this.props,
			{ status } = data.feature,
			{ list}    = status
		
		if (typeof keyValue === 'string' && !keyValue.replace(/\s+/, '')) return

		list[++status.max] = { name: keyValue, components: [] }
		actions.updateGlobal(editConfig.globalData)
		this.setState({ keyValue: '' })
	}
	onEditValue = ({ target }, idx) => {
		let { value } = target
		let { actions, data, editConfig } = this.props,
			{ list } = data.feature.status,
			item     = list[idx]

		if (!value.replace(/\s+/, '')) return target.value = item.name

		item.name = value

		actions.updateGlobal(editConfig.globalData)
	}
	removeKey(idx) {
		let { actions, data, editConfig } = this.props,
			{ list } = data.feature.status

		delete list[idx]
		this.selectIndex(1)
	}

	render() {
		let { props, state } = this,
			{ data, editConfig } = props,
			{ list }  = data.feature.status,
			keys      = Object.keys(list),
			activeKey = ['0', '1'],
			addNode
		if (keys.length < statusLimit) {
			addNode = (
				<div className="pgs-row">
					<div className="pgsr-name">状态名</div>
					<div className="pgsr-ctrl">
						<Input value={state.keyValue} onChange={e => this.onChangeValue(e.target.value, 'keyValue')} placeholder="名称" />
					</div>
					<div className="pgsr-auth" style={{ width: 30 }}>
						<div className="pgt-edit">
							<div className onClick={this.addKey}><Icon type="plus"/></div>
						</div>
					</div>
				</div>
			)
		}
		let childNode = keys.map((key, i) => {
			let { name } = list[key]
			return (
				<div className={`pgs-row${key == state.idx? ' s-select': ''}`} key={key}>
					<div className="pgsr-name" onClick={e => this.selectIndex(key)}>状态 {i + 1}</div>
					<div className="pgsr-ctrl">
						<Input value={name} onChange={e => this.onEditValue(e, key)} placeholder="名称" />
					</div>
					<div className="pgsr-auth" style={{ width: 30 }}>
						<div className="pgt-edit">
							{
								key != 1
								?
								<div className onClick={this.removeKey.bind(this, key)}><Icon type="close"/></div>
								: null
							}
						</div>
					</div>
				</div>
			)
		})
		return (
			<section className="pg-status">
				<Collapse defaultActiveKey={activeKey}>
					<Panel header={'状态编辑'}>
						<span>状态上限: {statusLimit}</span>
						{ addNode }
						{ childNode }
					</Panel>
				</Collapse>
			</section>
		)
	}
}

EditStatus.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditStatus)
