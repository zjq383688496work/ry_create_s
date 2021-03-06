import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import './index.less'

import Color       from 'compEdit/EditCommon/Color'
import ImageUpload from 'compEdit/EditCommon/ImageUpload'
import StyleManage from 'compEdit/EditCommon/StyleManage'
import { imageAdaptation,bigStyle,lineHightAdaptation } from './StyleFilter'
import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import * as comp from 'state/comp'
import * as variable from 'var'

var { styleMap: sMap, languages } = variable
var styleMap = sMap.name
var cssMap   = sMap.style
let {
	indexs: languageIndexs,
	values: languageValues
} = languages
   

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, css, obj, cfg, node, attribute) {
		let { data, actions, editConfig, from } = this.props
		data = lineHightAdaptation(data,val,css)
		data = imageAdaptation(data,attribute)
		let da = data.data
		let { curData, globalData } = editConfig
		let { parentComp } = curData
		if(getAttr(val) == 'Number'){
			val = val > cfg.max ? cfg.max : val
		} 
		if (node) {
			obj[css][node] = val
		} else {
			obj[css] = val
		}
		if(from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, style, css) {
		let { data, actions, editConfig, from } = this.props
		let { curData, globalData }    = editConfig
		let { parentComp } = curData
		data.auth.style[style][css] = val
		if(from === 'banner') {
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
				value={val*2} onChange={v => {v=v/2;this.onChange(v, key, obj,cfg, node)}}
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
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, obj,cfg, node)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 颜色
	renderColor(cfg, data, obj, val, key, node) {
		return (
			<Color
				data={data}
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
				checked={val === cfg.true} onChange={v => this.onChange(v.target.checked? cfg.true: cfg.false, key, obj,cfg, node)}
			/>
		)
	}
	// 滑动开关
	renderSwitch(cfg, data, obj, val, key, node) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false, key, obj,cfg, node)}
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
						value={val} onChange={v => this.onChange(v, key, obj,cfg, node)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj,cfg, node)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}
	// 背景图
	renderBGImage = (cfg, data, obj, val, key, node) => {
		let onImage = url => this.onChange.bind(this, url, key, obj, {}, 'img')()
		return (
			<ImageUpload
				data={this.props.data}
				enter={url => this.onChange(url, key, obj, {}, 'img')}
				img={val}
			/>
		)
	}

	render() {
		let { data, editConfig, from } = this.props
		let da = data.data
		if (!da) return null
		let { style, layout } = da
		let styles     = Object.keys(style)	// 具体样式
		let styleList  = comp[data.name].styleList        // 样式列表
		let activeKey  = Array.from(new Array(styles.length), (_, i) => `${i}`)
		// 位置大小
		let layoutNode = Object.keys(layout).map((q, j) => {
			if (!cssMap[q]) return
			if(from === 'banner') {
				if(tempCfg.composeType == 'LANDSCAPE'){
					if(q != 'width') return false
				}else{
					if(q != 'height') return false
				}
			}
			let cm     = cssMap[q],
				val    = layout[q],
				render = this[`render${cm.type}`]
			if (!render) return
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, data, layout, val, q)()
			return (
				<div className="pgs-row" key={j}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					<div className="pgsr-auth"></div>
				</div>
			)
		})
		// 子组件循环渲染
		let childNode = styles.map((p, i) => {
			let cname = styleMap[p]
			if (!cname) return
			let ci    = 0
			let cnode = Object.keys(style[p]).map((q, j) => {
				if (!cssMap[q]) return
				++ci
				let cm     = cssMap[q],
					val    = style[p][q],
					render = this[`render${cm.type}`]
				if (!render) return
				// 根据样式类型渲染对应组件
				let dom = this[`render${cm.type}`].bind(this, cm, data, style[p], val, q)()
				try { data.auth.style[p][q] } catch(e) {
					data.auth.style[p] = {}
					let s = style[p]
					for (let kk in s) {
						data.auth.style[p][kk] = false
					}
				}
				return (
					<div className="pgs-row" key={j}>
						<div className="pgsr-name">{ cm.name }</div>
						<div className="pgsr-ctrl">{ dom }</div>
						<div className="pgsr-auth">
							<Checkbox checked={data.auth.style[p][q]} onChange={_ => this.onChangeAuth(_.target.checked, p, q)}></Checkbox>
						</div>
					</div>
				)
			})

			if (ci === 0) return

			// 判断文本内容名称
			if (cname === '语言') {
				let { list } = editConfig.globalData.data.language,
					len = list.length
				let [ text1, text2 ] = list
				if (text1 && p === 'language') cname = languageIndexs[text1.key]
				else if (text2 && p === 'language2') cname = languageIndexs[text2.key]
			}

			return (
				<Panel header={cname} key={i}>
					{ cnode }
				</Panel>
			)
		})
		return (
			<section className="pg-style">
				<Collapse defaultActiveKey={['0']}>
					<Panel header={'组件样式'} key={0}>
						{ layoutNode }
					</Panel>
				</Collapse>
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
