import React from 'react'
import './index.less'

import SwiperElement from 'compEdit/EditCommon/SwiperElement'

export default class SwiperIV extends React.Component {
	constructor(props) {
		super(props)
		var s = this.init(props, this.state)
		this.state = { ...s }
	}
	componentWillReceiveProps(props) {
		var state = this.state
		var s = this.init(props, state)
		var { rebuild } = s
		// 数据相等不渲染
		if (!rebuild && rebuild === state.rebuild) return false
		this.setState({ ...s })
	}
	shouldComponentUpdate(newProps, newState) {
		if(newProps.drag != undefined) return newProps.drag
		else return true
	}
	init = (props, state) => {
		let { ioInput } = props
		let ipt = ioInput? ioInput: props
		let { data } = props
		let { item } = ipt
		let { media, swiperOptions } = data.data.content
		if (!state) return deepCopy({ media, swiperOptions, rebuild: false })
		return deepCopy({
			media,
			swiperOptions,
			rebuild: !(comObject(media, state.media) && comObject(swiperOptions, state.swiperOptions))
		})
	}
	renderDom = e => {
		let { media, swiperOptions, rebuild } = this.state
		if (!media.length) return null
		let slide = media.map((_, i) => {
			return <div className="swiper-slide" key={i}><img src={_}  style={cssColorFormat(this.props, 'swiperImage')} /></div>
		})
		return <SwiperElement props={this.props} options={swiperOptions} rebuild={rebuild}>{ slide }</SwiperElement>
	}
	render() {
		let dom = this.renderDom()

		return (
			<section className="e-swiper-vi" style={cssColorFormat(this.props, 'swiperImage')}>
				{ dom }
			</section>
		)
	}
}
