import React from 'react'
import './index.less'

import SwiperElement from 'compEdit/EditCommon/SwiperElement'

export default class SwiperBind extends React.Component {
	constructor(props) {
		super(props)
		var s = this.init(props, this.state)
		this.state = { ...s }
	}

	componentWillReceiveProps(props) {
		var { init, state } = this
		var s = init(props, state)
		var { rebuild } = s
		// 数据相等不渲染
		if (!rebuild && rebuild === state.rebuild) return false
		this.setState({ ...s })
	}
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	init = (props, state) => {
		let { ioInput } = props
		let ipt = ioInput? ioInput: props
		let { data } = props
		let { item } = ipt
		let { bind, swiperOptions } = data.data.content
		let imgs = bind? item[bind] || []: []
		if (getAttr(imgs) !== 'Array') imgs = []
		if (!state) return deepCopy({ imgs, swiperOptions, rebuild: false })
		return deepCopy({
			imgs, swiperOptions,
			rebuild: !(comObject(imgs, state.imgs) && comObject(swiperOptions, state.swiperOptions))
		})
	}
	renderDom = e => {
		let { imgs, swiperOptions, rebuild } = this.state,
			slide = imgs.map((_, i) => {
			return <div className="swiper-slide" key={i}><img src={_}  style={cssColorFormat(this.props, 'swiperImage')} /></div>
		})
		return <SwiperElement props={this.props} options={swiperOptions} rebuild={rebuild}>{ slide }</SwiperElement>
	}
	render() {
		let dom = this.renderDom()

		return (
			<section className="e-swiper-bind" style={cssColorFormat(this.props, 'swiperImage')}>
				{ dom }
			</section>
		)
	}
}
