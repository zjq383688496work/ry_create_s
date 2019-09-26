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

import { Row, Col, Collapse, Input, InputNumber, Slider, Checkbox } from 'antd'
const Panel = Collapse.Panel

import Color     from 'compEdit/EditCommon/Color'
// import PageAnime from 'compEdit/EditCommon/PageAnime'

import './index.less'

class EditPage extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(e, key) {
		let { actions, data, editConfig } = this.props,
			{ pageGroupIdx, pageIdx }     = editConfig.curData,
			da   = data,
			keys = key.split('.'),
			klen = keys.length
		keys.map((_, i) => {
			if (i === klen - 1) return da[_] = e
			da = da[_]
		})
		actions.updatePage(pageGroupIdx, pageIdx, data)
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
						disabled={cfg.disabled || false}
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}
	// 开关
	renderCheckbox({ defaultValue }, val, key) {
		var checked = val === undefined? defaultValue: val
		return (
			<Checkbox
				checked={checked} onChange={v => this.onChange(v.target.checked, key)}
			/>
		)
	}

	render() {
		// let ani = {
		// 	className: '',
		// 	direction: '',				// 方向
		// 	delay: 0,					// 开始时间
		// 	duration: 1,				// 持续时间
		// 	iterationCount: 1			// 循环次数
		// }
		var { data, editConfig } = this.props,
			{ curData, globalData } = editConfig,
			{ pageIdx } = editConfig.curData,
			{ banner }  = globalData
		
		if (!data || data.title === undefined) return false

		var { backgroundColor, bannerCheck = true, homeTime = 30 } = data.feature
		// if (data.animation === undefined) {
		// 	data.animation = {
		// 		in: deepCopy(ani),
		// 		out: deepCopy(ani),
		// 		interval: 0
		// 	}
		// }
		let activeKey = ['0', '1']
		return (
			<section className="pg-page">
				<Collapse defaultActiveKey={activeKey}>
					<Panel header={'管理'} key="0">
						<div className="pgs-row">
							<div className="pgsr-name">标题</div>
							<div className="pgsr-ctrl">
								<Input
									placeholder="页面标题"
									value={data.title}
									onChange={e => this.onChange(e.currentTarget.value, 'title')}
								/>
							</div>
							<div className="pgsr-auth"></div>
						</div>
					</Panel>
					<Panel header={'编辑'} key="1">
						<div className="pgs-row">
							<div className="pgsr-name">背景色</div>
							<div className="pgsr-ctrl">
								<Color
									data={data}
									color={backgroundColor}
									path={'backgroundColor'}
									action={'updatePage'}
									placement="bottomLeft"
								/>
							</div>
							<div className="pgsr-auth"></div>
						</div>
						{
							banner
							?
							<div className="pgs-row">
								<div className="pgsr-name">广告开关</div>
								<div className="pgsr-ctrl">
									{ this.renderCheckbox({
										defaultValue: true
									}, bannerCheck, 'feature.bannerCheck') }
								</div>
							</div>
							: null
						}
						{
							pageIdx
							?
							<div className="pgs-row">
								<div className="pgsr-name">返回时间</div>
								<div className="pgsr-ctrl">
									{ this.renderSlider({
										min: 10,
										max: 600,
										step: 10
									}, homeTime || 30, 'feature.homeTime') }
								</div>
							</div>
							: null
						}
					</Panel>
				</Collapse>
			</section>
		)
				// <PageAnime data={data} type={'in'} />
				// <PageAnime data={data} type={'out'} />
	}
}

EditPage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPage)
