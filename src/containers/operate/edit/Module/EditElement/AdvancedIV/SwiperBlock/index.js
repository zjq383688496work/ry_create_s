import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import SwiperBox  from './SwiperBox'
import calcOffset from './util_offset'

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
		if (!rebuild && rebuild === state.rebuild) return
		// this.slideChange()
		this.$swiper = null
		this.setState({ ...s })
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	init = (props, state) => {
		let { data, ioInput } = this.props,
			{ list = [] } = ioInput,
			{ content, componentLayout, layout } = data.data,
			{ swiperOptions, bufferOptions } = content
		if (!state) return deepCopy({ list, swiperOptions, bufferOptions, componentLayout, layout, rebuild: false })
		return deepCopy({
			list, swiperOptions, bufferOptions, componentLayout, layout,
			rebuild: !(comObject(list, state.list) && comObject(swiperOptions, state.swiperOptions) && comObject(bufferOptions, state.bufferOptions) && comObject(componentLayout, state.componentLayout) && comObject(layout, state.layout))
		})
	}
	getSwiper = $swiper => {
		this.$swiper = $swiper
	}
	slideChange = () => {
		if (!this.$swiper) return
		let { bufferOptions } = this.props.data.data.content
		let { realIndex, slides } = this.$swiper
		calcOffset(realIndex, slides, bufferOptions)
	}
	renderList = e => {
		let { list = [], swiperOptions, componentLayout, layout, rebuild } = this.state
		let slide  = list.map((_, i) => {
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
				getSwiper={this.getSwiper}
				slideChange={this.slideChange}
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

