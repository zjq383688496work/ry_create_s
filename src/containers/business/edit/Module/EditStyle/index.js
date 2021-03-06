import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import './index.less'

import Color       from 'compEdit/EditCommon/Color'
import ImageUpload from 'compEdit/EditCommon/ImageUpload'
import StyleManage from 'compEdit/EditCommon/StyleManage'

import {
	Row, Col,
	Card, Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import * as comp from 'state/comp'
import * as variable from 'var'

var styleMap = variable.styleMap.name,
	cssMap   = variable.styleMap.style,
	compMap  = variable.compMap.name,
	compNum  = variable.compMap.num,
	smAuth   = variable.styleMAuth
   

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, css, obj, node) { 
		let { data, actions, editConfig, from } = this.props
		let da = data.data
		let { curData, globalData } = editConfig
		let { parentComp } = curData
		if (node) {
			obj[css][node] = val
		} else {
			obj[css] = val
		}
		if(from && from === 'banner'){
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	/* 渲染组件开始 */
	// 数字
	renderNumber(cfg, data, obj, val, key, node) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val*2} onChange={v => {v=v/2;this.onChange(v, key, obj, node)}}
				style={{ width: '100%' }}
			/>
		)
	}
	// 复合样式
	renderComplex(cfg, data, obj, val, key) {
		const child     = cfg.child
		const keys      = Object.keys(val)
		const childNode = keys.map((_, i) => {
			let cm  = child[_],
				dom = this[`render${cm.type}`].bind(this, cm, data, obj, val[_], key, _)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name" style={{ width: 52 }}>{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
				</div>
			)
		})

		return (
			<div>{ childNode }</div>
		)
	}
	// 选择框偏移
	renderRadio(cfg, data, obj, val, key, node) {
		let option = cfg.option || [
			{ name: '左', value: 'left' },
			{ name: '中', value: 'center' },
			{ name: '右', value: 'right' }
		]
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, obj, node)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 颜色
	renderColor(cfg, data, obj, val, key, node) {
		return (
			<Color
				data={this.props.data}
				color={val}
				action={'updateComp'}
				placement="bottomLeft"
			/>
		)
	}
	// 开关
	renderCheckbox(cfg, data, obj, val, key, node) {
		return (
			<Checkbox
				checked={val === cfg.true} onChange={v => this.onChange(v.target.checked? cfg.true: cfg.false, key, obj, node)}
			/>
		)
	}
	// 滑动开关
	renderSwitch(cfg, data, obj, val, key, node) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false, key, obj, node)}
			/>
		)
	}
	// 滑块
	renderSlider(cfg, data, obj, val, key, node) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj, node)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj, node)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}
	// 背景图
	renderBGImage = (cfg, data, obj, val, key, node) => {
		return (
			<ImageUpload
				data={this.props.data}
				enter={url => this.onChange(url, key, obj, 'img')}
				img={val}
			/>
		)
	}

	styleObj(data, style, type) {
		let styles = Object.keys(style),
			comps  = data.data.components
		if (comps) {
			return comps.map((p, i) => {
				let da   = p.data
				let name = p.name
				let OK   = false
				let { style, layout } = da
				let cn = compMap[name]
				let map = deepCopy(compNum)
				if (!style) return false
				let cnode = this.styleObj.bind(this, p, style, 1)()
				cnode.map(_ => {
					if (_) OK = true
				})
				if (!OK) return false
				++map[name]
				return (
					<Panel header={`${cn}${map[name]}`} key={i}>
						{ cnode }
					</Panel>
				)
			})
		} else {
			return styles.map((p, i) => {
				if (!data.auth.style[p] || !styleMap[p]) return
				let ci    = 0
				let cnode = Object.keys(style[p]).map((q, j) => {
					if (!cssMap[q]) return false
					let cm  = cssMap[q],
						val = style[p][q],
						auth   = data.auth.style[p][q],
						render = this[`render${cm.type}`]
					// console.log(val, auth)
					if (!auth || !render) return
					++ci
					// 根据样式类型渲染对应组件
					let dom = this[`render${cm.type}`].bind(this, cm, data, style[p], val, q)()
					return (
						<div className="pgs-row" key={j}>
							<div className="pgsr-name">{ cm.name }</div>
							<div className="pgsr-ctrl">{ dom }</div>
						</div>
					)
				})
				if (ci === 0) return false
				if (type === 1) {
					return (
						<Card title={styleMap[p]} bordered={false} key={i}>
							{ cnode }
						</Card>
					)
				} else {
					return (
						<Panel header={styleMap[p]} key={i}>
							{ cnode }
						</Panel>
					)
				}
			})
		}
	}

	render() {
		let { data } = this.props
		let da       = data.data
		let { style, layout } = da
		if (!style) return false
		// let styleList  = data.styleList			// 样式列表
		// 除styleList代码 START
		let styleList  = comp[data.name].styleList	// 样式列表
		// 除styleList代码 END
		let styles     = Object.keys(style)		// 具体样式
		let comps      = data.data.components
		let activeKey  = Array.from(new Array(styles.length), (_, i) => `${i}`)
		if (comps) activeKey = comps.map((_, i) => `${i}`)
		// 子组件循环渲染
		let childNode = this.styleObj.bind(this, data, style)()
		let smChild   = smAuth[data.name]
			?
			(
				<StyleManage
					data={data}
					add={false}
					edit={false}
					list={styleList.list}
					idx={data.styleList.idx}
					parentKey={'styleList'}
					action={'updateComp'}
					name={'样式'}
				/>
			)
			:
			false
		return (
			<section className="pg-style-business">
				{ smChild }
				<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
					{ childNode }
				</Collapse>
			</section>
		)
	}
}

EditStyle.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditStyle)
