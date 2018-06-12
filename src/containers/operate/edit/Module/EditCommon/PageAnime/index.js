/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import * as variable from 'var'
var animeMap = variable.animePageMap,
	aStyle   = animeMap.style,
	aGroup   = animeMap.group,
	aMap     = animeMap.map

import './index.less'

class PageAnime extends React.Component {
	state = {
		aid:  `seeEffect_${Math.floor(Math.random()*1e9)}`,
		time: null
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() { clearTimeout(this.state.time) }

	aClick() {
		setTimeout(() => {
			let a = document.querySelector(`#${this.state.aid}`)
			a && a.click()
		}, 60)
	}
	onChange(val, key) {
		let { data, type, actions, editConfig } = this.props
		let { curData } = editConfig
		let { pageIdx, pageGroupIdx } = curData
		let ani = data.animation[type]
		ani[key] = val
		actions.updatePage(pageGroupIdx, pageIdx, data)
		this.aClick()
	}

	selectStyle(cls, item) {
		let { data, type, actions, editConfig } = this.props
		let { curData } = editConfig
		let { pageIdx, pageGroupIdx } = curData
		let ani = data.animation[type]
		let { direction } = ani
		ani.direction = ''
		if (cls === ani.className) {
			ani.className = ''
			return actions.updatePage(pageGroupIdx, pageIdx, data)
		}
		if (item.list) ani.direction = item.list[0] || ''
		ani.className = cls
		actions.updatePage(pageGroupIdx, pageIdx, data)
		this.aClick()
	}
	// 查看效果
	addEffect = () => {
		clearTimeout(this.state.time)
		let { data, type } = this.props
		let ani = data.animation[type]
		let { direction, duration } = ani
		let doc = document.querySelector('#pgElement')
		doc.className = 'pg-element'
		doc.style     = ''
		let item = aStyle[ani.className]
		if (!direction || !item.list) ani.direction = item.list? item.list[0] || '': ''
		let aniCls = `pg-element animate ${ani.className}${ani.direction}`
		let aniSty = `animation-duration: ${ani.duration}s`
		setTimeout(() => {
			doc.className = aniCls
			doc.style     = aniSty
		}, 60)
		this.setState({
			time: setTimeout(() => {
				doc.className = 'pg-element'
				doc.style     = ''
				clearTimeout(this.state.time)
			}, duration * 1e3 + 200)
		})
	}

	// 无限循环
	renderSwitch(cfg, val, key) {
		let option = cfg.option
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 滑块
	renderSlider(cfg, val, key) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}

	render() {
		let { data, type }  = this.props
		let ani = data.animation[type]
		let { className, direction, delay, duration, iterationCount } = ani
		let cls = className
		let dirList = aStyle[cls]? aStyle[cls].list || []: []
		let dir
		let headerName = type === 'in'? '进入': type === 'out'? '离开': ''
		let styleChild = aGroup[type].list.map((_, i) => {
			let node = aStyle[_]
			return (
				<li key={i} className={_ === cls? 's-active': ''} onClick={this.selectStyle.bind(this, _, node)}>{node.name}</li>
			)
		})

		if (aStyle[cls]) {
			let dirOpt = dirList.map((_, i) => { return { name: aMap[_], value: _ } })
			dir = this.renderSwitch({ option: dirOpt }, direction, 'direction')
		}
		let sTime = this.renderSlider({ max: 20, step: .1 }, delay,     'delay')
		let dTime = this.renderSlider({ max: 20, step: .1 }, duration,  'duration')
		return (
			<section className="pg-anime">
				<Collapse defaultActiveKey={'0'}>
					<Panel header={`${headerName}动画`}>
						<ul className="pga-style">{ styleChild }</ul>
						<div className="pgs-row">
							<div className="pgsr-name">持续时间</div>
							<div className="pgsr-ctrl">{ dTime }</div>
						</div>
						{
							dir
							?
							(<div className="pgs-row">
								<div className="pgsr-name">方向</div>
								<div className="pgsr-ctrl">{ dir }</div>
							</div>)
							: dir
						}
						{
							cls?
							(<div className="pgs-row">
								<div className="pgsr-ctrl">
									<a id={this.state.aid} onClick={this.addEffect}>点我看效果</a>
								</div>
							</div>)
							: null
						}
					</Panel>
				</Collapse>
			</section>
		)
						// <div className="pgs-row">
						// 	<div className="pgsr-name">延迟时间</div>
						// 	<div className="pgsr-ctrl">{ sTime }</div>
						// </div>
	}
}

PageAnime.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageAnime)
