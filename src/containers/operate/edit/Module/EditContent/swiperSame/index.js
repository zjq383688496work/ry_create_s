import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch, Select
} from 'antd'
var { Panel }   = Collapse
var RadioButton = Radio.Button
var RadioGroup  = Radio.Group
var Option = Select.Option

var setOptions = {
	position: { name: '位置', type: 'Radio', option: [
		{ name: '顶部', value: 'top' },
		{ name: '底部', value: 'bottom' },
	]},
	loop:             { name: '开启循环', type: 'Switch', true: true, false: false },
	autoplay:         { name: '自动播放', type: 'Switch', true: true, false: false },
	delay:            { name: '停留时间', type: 'Number', min: 1000, max: 10000, step: 500 },
	reverseDirection: { name: '反向自动轮播', type: 'Switch', true: true, false: false },
	direction: { name: '轮播方向', type: 'Radio', option: [
		{ name: '水平', value: 'horizontal' },
		{ name: '垂直', value: 'vertical' },
	]},

	spaceBetween:   { name: '图片间距', type: 'Number', min: 0, max: 100, step: 1 },
	slidesPerView:  { name: '显示数量', type: 'Number', min: 1, max: 100, step: 1 },
	centeredSlides: { name: '居中显示', type: 'Switch', true: true, false: false },
	speedBig:       { name: '切换速度', type: 'Number', min: 1, max: 30, step: 1 },
	delayBig:       { name: '停留时长', type: 'Number', min: 1, max: 30, step: 1 },
	speed:  { name: '切换速度', type: 'Number', min: 1000, max: 10000, step: 500 },
	effect: { name: '切换方式', type: 'Select', option: [
		{ name: '普通切换', value: 'slide' },
		{ name: '淡入',    value: 'fade' },
		{ name: '方块',    value: 'cube' },
		{ name: '3d流',    value: 'coverflow' },
		{ name: '3d翻转',  value: 'flip' },
	]},

	layout :{name:'布局选择',type:'Select',option: [
		{ name: '方式一', value: 1 },
		{ name: '方式二', value: 2 },
	]},
}

export default class SwiperSame extends React.Component {
	constructor(props) {
		super(props)
		var ct = window.tempCfg.composeType
		if (ct !== 'PORTRAIT') {
			setOptions.position.option = [
				{ name: '左侧', value: 'left' },
				{ name: '右侧', value: 'right' },
			]
		}
	}
	onChange = (val,key) => { 
		let { data, actions, editConfig, from } = this.props.data
		let { curData,globalData } = editConfig
		let { parentComp } = curData 
		if (key == 'delay' || key == 'reverseDirection' || key == 'delayBig') {
			data.feature['swiperOptions']['autoplayOptions'][key] = val
		} else if (key == 'spaceBetween' || key == 'slidesPerView' || key == 'centeredSlides') {
			data.feature.swiperOptions.slideOptions[key] = val
		} else {  
			data.feature.swiperOptions[key] = val 
		}
		if (from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	// 数字
	renderNumber(cfg, data, val, key) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, key)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 多选项
	renderRadio(cfg, data, val, key) {
		let option = cfg.option;
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value,key,)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 选择
	renderSelect(cfg, data, val, key) {
		let option = cfg.option; 
		key == 'progressbarOpposite'? val = Number(val): null
		return (
			<Select defaultValue={val} style={{ width: 120 }} onChange={value => this.onChange(value, key)}>
				{
					option.map((item,index)=><Option value={item.value} key={index}>{item.name}</Option>)
				}
			</Select>
		)
	}
	// 滑动开关
	renderSwitch(cfg, data, val, key) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false,key)}
			/>
		)
	}
	renObj(data, content) {
		let childNode = Object.keys(content).map((p, i) => {
			if (!setOptions[p]) return false
			let cm     = setOptions[p]
			let val    = content[p]
			let render = this[`render${cm.type}`]
			if (!render) return false
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, data, val, p)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
				</div>
			)
		})
		return childNode
	}
	
	render() {
		var { data, from } = this.props.data,
			{ swiperOptions } = data.feature,
			{ autoplay, effect } = swiperOptions,
			dom_show_1 = this.renObj(data, swiperOptions),
			dom_show_2 = null,
			dom_show_3 = null
		if (autoplay) dom_show_2 = this.renObj(data, swiperOptions.autoplayOptions)
		if (effect == 'slide') dom_show_3 = this.renObj(data, swiperOptions.slideOptions)
		return (
			<Collapse activeKey={['0']}>
				<Panel header={`轮播设置${(data.name == 'swiperImgAndVideo' || from === 'banner')? '(仅支持纯图片轮播)': ''}`} key={0}>
					{ dom_show_1 }
					{ dom_show_2 }
					{ dom_show_3 }
				</Panel>
			</Collapse>
		)
	}
}
