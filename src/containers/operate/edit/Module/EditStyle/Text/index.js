/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

import { SketchPicker } from 'react-color'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Color from 'compEdit/EditCommon/Color'

import { InputNumber, Card, Button, Select, Radio, Collapse } from 'antd'
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group
const Panel       = Collapse.Panel

 
var styleMap = {
	layout: '组件样式',
	image:  '图片样式',
	text:'文本样式' 
}
var cssMap = {
	top:               { name: '上',      type: 'number' },
	left:              { name: '左',      type: 'number' },
	width:             { name: '宽',      type: 'number' },
	height:            { name: '高',      type: 'number' },
	borderRadius:      { name: '圆角',    type: 'number' },
	borderWidth:       { name: '边宽',    type: 'number' },
	lineHeight:        { name: '行高',    type: 'number' },
	fontSize:          { name: '字号',    type: 'select' },
	textAlign:         { name: '对齐方式', type: 'textAlign' },
	color:             { name: '字体颜色', type: 'color' },
	fontWeight:        { name: '粗细',    type: 'two' },
} 
class Text extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange = (val, style, css) => {
		let { data, actions } = this.props
		data.style[style][css] = val
		actions.updateComp(null, data)
	}
	changeFontColor = color => {
		let { data, actions } = this.props
		data.style.text.color = color.hex
		actions.updateComp(null, data) 
	}
	changeFontSize = value => {
	   let { data, actions } = this.props
		data.style.text.fontSize = value 
		actions.updateComp(null, data) 
	} 
 
 	cb(key) {
 		console.log(key)
 	}

	render() {
		let { data, actions } = this.props;
		const fontSizeList = [
			{ value: '12px', label: '12px' },
			{ value: '13px', label: '13px' },
			{ value: '14px', label: '14px' },
			{ value: '15px', label: '15px' },
			{ value: '16px', label: '16px' },
			{ value: '17px', label: '17px' },
			{ value: '18px', label: '18px' },
			{ value: '20px', label: '20px' },
			{ value: '22px', label: '22px' },
			{ value: '26px', label: '26px' },
			{ value: '30px', label: '30px' },
			{ value: '34px', label: '34px' },
			{ value: '38px', label: '38px' },
			{ value: '42px', label: '42px' },
			{ value: '46px', label: '46px' },
			{ value: '50px', label: '50px' },
			{ value: '54px', label: '54px' },
			{ value: '58px', label: '58px' },
			{ value: '62px', label: '62px' },
			{ value: '66px', label: '66px' },
			{ value: '70px', label: '70px' },
			{ value: '80px', label: '80px' },
			{ value: '90px', label: '90px' },
		]
		let styles    = Object.keys(data.style)
		let activeKey = Array.from(new Array(styles.length), (_, i) => i + '')
		let childNode = styles.map((p, i) => {
			if (!styleMap[p]) return
			let cnode = Object.keys(data.style[p]).map((q, j) => {
				if (!cssMap[q]) return
				var cm  = cssMap[q],
					val = data.style[p][q]
				if (cm.type === 'number') {
					return (
						<div key={j}>
							{cm.name}
							<InputNumber
								defaultValue={val}
								value={val}
								onChange={v => this.onChange(v, p, q)}
							/>
						</div>
					)
				}else if(cm.type === 'select'){
					return (
						<div key={j}>
							 <Select defaultValue="16px" style={{ width: 120 }} onChange={this.changeFontSize}>
								{  
									fontSizeList.map((item, k) => <Option key={k} value={item.value}>{item.value}</Option>)
								}
							</Select>
						</div> 
					)
				}else if(cm.type === 'textAlign'){
					return (
						<div key={j}>
							<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, p, q)} defaultValue="left">
								<RadioButton value="left">居左</RadioButton>
								<RadioButton value="center">居中</RadioButton>
								<RadioButton value="right">居右</RadioButton>
							</RadioGroup>
						</div> 
					) 
				}else if(cm.type === 'color'){
						// <SketchPicker onChangeComplete={this.changeFontColor} color={val} />
					return (
						<div key={j}>
							<Color
								data={data}
								color={data.style[p][q]}
								path={`style.${p}.${q}`}
								action={'updateComp'}
								placement="bottomLeft"
							/>
						</div>
					) 
				}	
			}) 
			return ( 
				<Panel header={styleMap[p]} key={i}>
					{ cnode }
				</Panel>
			)
				// <Card key={p} title={styleMap[p]} style={{ width: 260 }}>
				// 	{ cnode }
				// </Card>
		})
		return (
			<div className="s-web">
				<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
					{ childNode }
				</Collapse>
			</div>
		)
	} 
}












Text.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Text)
