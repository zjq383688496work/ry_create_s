import React, { Fragment } from 'react'
import Swiper from 'swiper'
import JumpRouter  from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import Layout from '../../Layout'
import calcOffset from './util_offset'
import './index.less'
import 'swiper/dist/css/swiper.css'

export default class RecListByStore2 extends React.Component {
	constructor(props) {
		super(props)

		let { cols, rows } = this.getGrid(props)
		this.state = {
			cols,
			rows,
		}
	}
	curTimer  = null
	prevTimer = null
	waitTimer = null
	componentWillMount() {}
	componentDidMount() {
		this.props.ioInput.loading? this.initSwiper(this.props): null
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ioInput.changePage) return
		nextProps.ioInput.loading && !nextProps.ioInput.clickStore? this.initSwiper(nextProps): null
	}
	shouldComponentUpdate(nextProps, nextState) {
		return false
		// if (nextProps.ioInput.clickStore) return false
		// else return nextProps.ioInput.changePage? nextProps.storeUpdate: true
	}
	componentWillUnmount() {
		this.props.ioOuter({ type: 'list', value: null })
		this.myStoreSwiper && this.myStoreSwiper.destroy(false)
		clearTimeout(this.curTimer)
		clearTimeout(this.prevTimer)
		clearTimeout(this.waitTimer)
	}
	getGrid = props => {
		let { data, ioInput, shops } = props,
			{ size } = ioInput,
			{ layout, style } = data.data,
			{ width }  = layout,
			{ filter } = style,
			{ width: cWidth, margin } = filter,
			{ right, left } = margin,
			rows = width / (cWidth + right + left) >> 0,
			cols = Math.ceil(size / rows)
		return { cols, rows }
	}
	maskDisplay = status => {
		let { $current, $mask } = this.refs
		if (!$current) return
		if (!$mask) {
			let parent = $current.parentNode.parentNode.parentNode,
				mask   = parent.querySelector('.s-mask')
			$mask = this.refs.$mask = mask
		}
		$mask.style.display = status
	}
	initSwiper = props => {
		let self = this
		let { data, ioInput, ioOuter } = props,
			{ bufferOptions } = data.data.content,
			{ $swiper, $wrapper, $current } = this.refs
		let options = Object.assign({
			speed:  300,
			// loop:   true,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			// effect: 'fade',
			fadeEffect: 'false',
		}, {
			on: {
				slideChangeTransitionStart: function() {
					// self.maskDisplay('block')
				},
				slideChangeTransitionEnd: function() {
					var curPage  = this.activeIndex + 1,
						prevIdx = this.previousIndex
					if (ioInput.currentPage === curPage) return
					ioInput.currentPage = curPage
					ioInput.changePage  = true
					ioOuter(ioInput)

					/*self.addAnimate(curPage - 1, prevIdx, $wrapper, $wrapper.childNodes, bufferOptions, self.state, () => {
						self.maskDisplay('none')
					})*/
				}
			}
		})
		this.myStoreSwiper && this.myStoreSwiper.destroy(false)
		this.myStoreSwiper = new Swiper($swiper, options)
		ioOuter({ type: 'list', value: this.myStoreSwiper })
	}
	toDetails = item => {
		let { data, ioInput, ioOuter } = this.props,
			shopNo = item.BERTH_NUMBER || item.berthNumber,
			router = data.data.content.router? data.data.content.router.url: '',
			id = item.recordId || item.id,
			dataStr = checkToJump(item,router,id,203)
		if (ioInput.haveFloorMap) ioOuter(ioInput, { type: 'shopNo', value: shopNo })
		else JumpRouter(dataStr)
	}
	/*addAnimate = (curIdx, prevIdx, $wrapper, nodes, { delay, speed, offsetT }, { rows }, cb) => {
		let self     = this,
			curNode  = nodes[curIdx],
			prevNode = nodes[prevIdx],
			curList  = curNode.childNodes,
			prevList = prevNode.childNodes,
			isNext   = curIdx > prevIdx,//|| (curIdx < prevIdx && !curIdx)
			dir      = isNext? 'next': 'prev',
			clsIn    = `s-slide-in-${dir}`,
			clsOut   = `s-slide-out-${dir}`,
			wait     = delay * rows + speed,
			waitOff  = wait - offsetT,
			box      = $wrapper.querySelectorAll('.rec-box')

		nodes.forEach((node, i) => {
			node.classList.remove(clsIn, clsOut)
			node.style.opacity = i != curIdx && i != prevIdx? 0: 1
		})
		box.forEach(node => {
			node.style.removeProperty('animation-duration', 'animation-delay')
		})
		curList.forEach((node, i) => {
			let _delay = (isNext? i % rows: rows - i % rows - 1) * delay
			node.style.animationDelay    = `${_delay}ms`
			node.style.animationDuration = `${speed}ms`
		})
		prevList.forEach((node, i) => {
			let _delay = (isNext? i % rows: rows - i % rows - 1) * delay
			node.style.animationDelay    = `${_delay}ms`
			node.style.animationDuration = `${speed}ms`
		})
		prevNode.classList.add(clsOut)

		self.curTimer = setTimeout(() => {
			clearTimeout(self.curTimer)
			curNode.classList.remove(clsOut)
			curNode.classList.add(clsIn)
		}, waitOff)
		self.prevTimer = setTimeout(() => {
			clearTimeout(self.prevTimer)
			prevNode.classList.remove(clsOut)
			prevNode.style.opacity = 0
		}, wait)
		self.waitTimer = setTimeout(() => {
			cb && cb()
		}, wait + waitOff)
	}*/
	renderItem = (list, data, styles, defaultStyle) => {
		let node = list.map((_, i) => {
			return (
				<div
					key={i}
					className="rec-box"
					style={{ ...defaultStyle, ...styles[i] }}
					onClick={() => this.toDetails(_)}
				>
					<Layout itemList={_} data={data} refresh={true} type={'NewStore'} />
				</div>
			)
		})
		return node
	}
	renderSlide = () => {
		let { props, state } = this,
			{ data, shops }  = props,
			{ cols, rows }   = state,
			defaultStyle = cssColorFormat(props, 'filter')

		return shops.data.map((list, i) => {
			let styles = calcOffset(list, props, cols, rows)
			return (
				<div className={`swiper-slide`} key={i}>
					{ this.renderItem(list, data, styles, defaultStyle) }
				</div>
			)
				// <div className={`swiper-slide${!i? ' s-slide-in-next': ''}`} key={i}>
				// 	{ this.renderItem(list, data, styles, defaultStyle) }
				// </div>
		})
	}
	render() {
		let { ioInput, shops, type } = this.props,
			{ layout } = this.state,
			// { top, left, width, height } = layout,
			slide = this.renderSlide()
		return (
			<section ref="$current" className={`e-reclist-by-store2 ${type}`} style={{ height: '100%', width: '100%' }}>
				<div className="swiper-container" ref="$swiper">
					<div className="swiper-wrapper" ref="$wrapper"> 
						{ slide }
					</div>
				</div>
			</section>
		)
	}
}
