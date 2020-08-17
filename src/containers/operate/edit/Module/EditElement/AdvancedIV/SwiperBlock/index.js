import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import SwiperBox from './SwiperBox'

export default class SwiperBlockByIV extends React.Component {
	constructor(props) {
		super(props)
		var s = this.init(props, this.state)
		this.state = { ...s }
	}
	componentWillReceiveProps(props) {
		let { init, state } = this
		let s = init(props, state)
		let { rebuild } = s
		// 数据相等不渲染
		if (!rebuild && rebuild === state.rebuild) return false
		this.setState({ ...s })
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	init = (props, state) => {
		let { data, ioInput } = this.props,
			{ list = [] } = ioInput,
			{ content, componentLayout, layout } = data.data,
			{ swiperOptions } = content
		if (!state) return deepCopy({ list, swiperOptions, componentLayout, layout, rebuild: false })
		return deepCopy({
			list, swiperOptions, componentLayout, layout,
			rebuild: !(comObject(list, state.list) && comObject(swiperOptions, state.swiperOptions) && comObject(componentLayout, state.componentLayout) && comObject(layout, state.layout))
		})
	}
	renderList = e => {
		let { list = [], swiperOptions, componentLayout, layout, rebuild } = this.state
		let slide = list.map((_, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<Layout data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filterBox')} />
				</div>
			)
		})
		return (
			<SwiperBox
				props={this.props}
				options={swiperOptions}
				rebuild={rebuild}
			>{ slide }</SwiperBox>
		)
	}
	render() {
		let { type } = this.props
		let dom = this.renderList()
		return (
			<section className={`e-swiperblock-by-iv ${type}`}>
				{ dom }
			</section>
		)
	}
}

