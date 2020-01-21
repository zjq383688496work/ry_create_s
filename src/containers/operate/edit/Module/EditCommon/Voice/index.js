import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

const comp = require('state/comp')

import { Row, Col, Collapse, Radio, Checkbox, Modal } from 'antd'
const { confirm } = Modal

// import './index.less'

const Panel       = Collapse.Panel
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group
let voiceSwitch   = { type: 'Switch', option: [{ name: '打开', value: true }, { name: '关闭', value: false }]}

class Voice extends React.Component {
	componentDidMount() {}

	onChange(val, key, name, is = false) {
		let { data, action, actions } = this.props,
			{ voice } = data.data
		if (voice) {
			if (!val && !is) return this.confirmVoice()
			voice[key][name] = val
		} else {
			data.data['voice'] = { switch: { auth: false, value: false } }
			voice[key][name] = val
		}
		if (data.data.voice.switch.value && !data.voice) data.voice = deepCopy(comp.voice)
		else data.voice = null
		if (data.voice) {
			var { data: _data, feature } = data.voice
			_data.components = feature.status.list[1].components
		}
		actions[action](data)
	}
	confirmVoice = () => {
		confirm({
			title:   '确认要关闭语音功能吗?',
			content: '关闭语音功能会清空之前语音的所有设置',
			onOk: () => {
				this.onChange(false, 'switch', 'value', true)
			},
			onCancel() {},
			okText: '确认',
			cancelText: '取消',
		})
	}
	// 筛选框
	renderRadio(cfg, val, key) {
		let { option } = cfg
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, 'value')} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	renderBus(voice) {
		return (
			voice.switch.auth || (voice.time.auth && voice.switch.value)? <Collapse defaultActiveKey={['0']}>
				<Panel header={`语音助手`} key={0}>
					{
						voice.switch.auth ? <div className="pgs-row" key={0}>
							<div className="pgsr-name">语音开关</div>
							<div className="pgsr-ctrl">
								{this.renderRadio.bind(this, voiceSwitch,voice.switch.value,'switch')()}
							</div>
						</div>: null
					}
				</Panel>
			</Collapse>: null
		)
	}
	render() {
		let { data, action, actions } = this.props,
			activeKey = Array.from(new Array(1), (_, i) => `${i}`),
			voice = data.data.voice || { switch: { auth: false, value: false } },
			btnNode
		if (envType === 'business') return this.renderBus.bind(this, voice)()
		else {
			return (
				 <Collapse defaultActiveKey={activeKey}>
					<Panel header={`语音助手`} key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">语音开关</div>
							<div className="pgsr-ctrl">
								{this.renderRadio.bind(this, voiceSwitch, voice.switch.value, 'switch')()}
							</div>
							<div className="pgsr-auth">
								<Checkbox checked={voice.switch.auth || false} onChange={_ => this.onChange(_.target.checked,'switch', 'auth')} />
							</div>
						</div>
					</Panel>
				</Collapse>
			)
		}
		
	}
}

Voice.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Voice)
