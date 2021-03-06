import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import SwiperElement from 'compEdit/EditCommon/SwiperElement'
import * as Server from 'server'

export default class SwiperByGoods extends React.Component {
	constructor(props) {
		super(props)
		var s = this.init(props, this.state)
		this.state = { ...s }
	}
	componentWillMount() {
		this.getData()
	}
	componentWillReceiveProps(props) {
		var state = this.state
		var s = this.init(props, state)
		var { rebuild } = s
		// 数据相等不渲染
		if (!rebuild && rebuild === state.rebuild) return false
		this.setState({ ...s })
	}
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	init = (props, state) => {
		var { data } = props.data,
			{ content, componentLayout, layout } = data,
			{ swiperOptions } = content,
			list = state? state.list: []
		if (!state) return deepCopy({ list, swiperOptions, componentLayout, layout, rebuild: false })
		return deepCopy({
			list, swiperOptions, componentLayout, layout,
			rebuild: !(comObject(list, state.list) && comObject(swiperOptions, state.swiperOptions) && comObject(componentLayout, state.componentLayout) && comObject(layout, state.layout))
		})
	}

	getData = cb => {
		let { list } = this.state
		Server.goods.getRecGoodsList(o => {
			if (!comObject(list, o)) {
				this.setState({ list: o, rebuild: true })
			}
		})
	}

	renderDom = e => {
		let { list, swiperOptions, componentLayout, layout, rebuild } = this.state
		let slide = list.map((_, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<Layout
						data={_}
						layout={layout}
						components={componentLayout}
						autoplay={true}
						styleObj={cssColorFormat(this.props, 'filterBox')}
					/>
				</div>
			)
		})
		return <SwiperElement props={this.props} options={swiperOptions} rebuild={rebuild}>{ slide }</SwiperElement>
	}
	render() {
		let dom = this.renderDom()

		return (
			<section className={`e-swiper-by-goods`}>
				{ dom }
			</section>
		)
	}
}
