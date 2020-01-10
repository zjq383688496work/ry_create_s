
 
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import {
	Row, Col, Collapse,Radio, InputNumber, Slider, Icon,message,Checkbox
} from 'antd'
import './index.less'
const Panel  = Collapse.Panel
const RadioButton   = Radio.Button
const RadioGroup    = Radio.Group
let advertTime = { type: 'Slider', min: 10, max: 600, step: 10 }
let advertSwitch = { type:'Switch', option:[{name:'打开',value:true},{name:'关闭',value:false}]}

class Advert extends React.Component {
	componentDidMount(){
		
	}
	onChange(val, key) {
		let { data, action, actions } = this.props
		if(data.data.advert){
			data.data.advert[key]['value'] = val
		}else{
			data.data['advert'] = { switch:{auth:false,value:false}, time:{auth:false,value:30} }
			data.data.advert[key]['value'] = val
		}
		actions[action](data)
	} 
	onChangeAuth(val,key) {
		let { data, action, actions } = this.props
		if(data.data.advert){
			data.data.advert[key]['auth'] = val
		}else{
			data.data['advert'] = { switch:{auth:false,value:false}, time:{auth:false,value:30} }
			data.data.advert[key]['auth'] = val
		} 
		actions[action](data)
	} 
	// 滑块
	renderSlider(cfg, val, key) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 600} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						disabled
						min={cfg.min || 0} max={cfg.max || 600} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}
	// 筛选框
	renderRadio(cfg, val, key) {
		let { option } = cfg
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	cb = key => {
		console.log(key)
	}
	renderBus(advert){
		return (
				advert.switch.auth || (advert.time.auth&&advert.switch.value) ? <Collapse defaultActiveKey={['0']}>
					<Panel header={`全屏广告`} key={0}>
						{
							advert.switch.auth ? <div className="pgs-row" key={0}>
								<div className="pgsr-name">广告开关</div>
								<div className="pgsr-ctrl">
									{this.renderRadio.bind(this,advertSwitch,advert.switch.value,'switch')()}
								</div>
							</div> : null
						}
						{
							advert.time.auth&&advert.switch.value ? <div className="pgs-row" key={1}>
								<div className="pgsr-name">冷却时长</div>
								<div className="pgsr-ctrl">
									{this.renderSlider.bind(this,advertTime,advert.time.value,'time')()}
								</div>
							</div> : null
						} 
					</Panel>
				</Collapse> : null
			)
	}
	render() {
		let { data, action, actions } = this.props,
			activeKey = Array.from(new Array(1), (_, i) => `${i}`),
			advert = data.data.advert || { switch:{auth:false,value:false}, time:{auth:false,value:30} },
			btnNode
		if(envType === 'business'){
			return this.renderBus.bind(this,advert)()
		}else{
			return (
				 <Collapse defaultActiveKey={activeKey} onChange={this.cb}>
					<Panel header={`全屏广告`} key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">广告开关</div>
							<div className="pgsr-ctrl">
								{this.renderRadio.bind(this,advertSwitch,advert.switch.value,'switch')()}
							</div>
							<div className="pgsr-auth">
								<Checkbox checked={advert.switch.auth || false} onChange={_ => this.onChangeAuth(_.target.checked,'switch')} />
							</div>
						</div>
						{
							advert.switch.value ? <div className="pgs-row" key={1}>
								<div className="pgsr-name">冷却时长</div>
								<div className="pgsr-ctrl">
									{this.renderSlider.bind(this,advertTime,advert.time.value,'time')()}
								</div>
								<div className="pgsr-auth">
									<Checkbox checked={advert.time.auth || false} onChange={_ => this.onChangeAuth(_.target.checked,'time')} />
								</div>
							</div> : null
						} 
					</Panel>
				</Collapse>
			)
		}
		
	}
}

Advert.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Advert)
