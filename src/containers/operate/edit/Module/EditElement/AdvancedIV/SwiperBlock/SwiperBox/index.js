import React from 'react'
import Swiper from 'react-id-swiper'
// import './index.less'

export default class SwiperBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			children: props.children
		}
		this.swiper = null
	}

	componentWillReceiveProps(props) {
		let { rebuild = false } = props
		if (!rebuild) return
		this.setState({ children: [] })
		setTimeout(() => {
			if (!this) return
			this.setState({
				children: props.children
			})
		})
	}

	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}

	swiperInit = node => {
		if (!node) return
		let { getSwiper, slideChange } = this.props
		let swiper = this.swiper = node.swiper
		// window.$swiper = swiper
		if (getSwiper) getSwiper(swiper)
		if (slideChange) slideChange()
	}

	optsFormat = len => {
		let me = this
		let {
				options = {
					direction: 'horizontal',
					effect:  'slide',
					autoplay: true,
					loop:  false,
					speed: 500,
					delay: 3000
				},
				slideChange,
			} = this.props,
			opts = deepCopy(options)
		delete opts.pagination
		if (len < 2) {
			opts.autoplay = false
			return opts
		}
		// opts.autoplay = false
		let { autoplay, delay } = opts
		if (autoplay) opts.autoplay = { delay, disableOnInteraction: false }
		opts.containerClass  = `swiper-box swiper-container`
		opts.on = {
			slideChange: function() {
				if (!me.swiper) return
				let { realIndex } = me.swiper
				if (slideChange) slideChange()
				me.setState({ current: realIndex })
			}
		}
		delete opts.delay
		return opts
	}

	render() {
		let { props, options = {} } = this.props,
			{ children } = this.state,
			len = children.length,
			{ pagination = false } = options,
			opts  = this.optsFormat(len)
		return children && len
		?
		(
			<div className="swiper-box">
				<Swiper {...opts} ref={this.swiperInit}>
					{ children }
				</Swiper>
			</div>
		): null
	}
}

class PageElement extends React.Component {
	renderDom(props, total, current = 0) {
		let css  = cssColorFormat(props, 'pagination')
		let node = Array.from(new Array(total)).map((_, i) => {
			let isCur = i === current,
				nCss  = { ...css }
			if (isCur) nCss = { ...nCss, ...cssColorFormat(props, 'paginationActive') }
			return (
				<div
					key={i}
					style={nCss}
					className={`ep-item${isCur? ' s-active': ''}`}
				>
				</div>
			)
		})
		return <div className="ep-page" style={cssColorFormat(props, 'paginationBox')}>{node}</div>
	}

	render() {
		let { total, current, props } = this.props
		return (
			<section className="e-page">
				{ this.renderDom(props, total, current) }
			</section>
		)
	}
}