/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import Swiper from 'swiper'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class SwiperByGoods extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			random: Date.now() + parseInt(Math.random() * 1e9)
		}
	}
	componentWillReceiveProps(props) {
		this.init(props)
	}
	componentDidMount() {
		this.init(this.props)
	}
	componentWillUnmount() {
		this.swiper.destroy(false)
	}
	init = props => {
		this.initSwiper()
	}
	initSwiper = (opts) => {
		if (this.swiper) this.swiper.destroy()
		let { random } = this.state
		let { data } = this.props,
			{ feature } = data,
			{ width, height } = data.data.layout,
			{ swiperOptions } = feature
		let params = {
			width,
			height,
			autoplay: true,
			delay: 3000,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			},
			// spaceBetween: 0
		}
		this.swiper && this.swiper.destroy(false)
		this.swiper = new Swiper(`.swiper-container_${random}`, params) 
	}
	renderDom = (list) => {
		if (!list) return null
		let { random } = this.state,
			{ data }   = this.props,
			{ componentLayout, layout } = data.data
		let slide = list.map((_, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<Layout
						data={_}
						layout={layout}
						components={componentLayout}
						styleObj={cssColorFormat(this.props, 'filterBox')}
					/>
				</div>
			)
		})
		return (
			<div className={`swiper-container swiper-container_${random}`}>
				<div className="swiper-wrapper">
					{ slide }
				</div>
				<div className={`swiper-pagination swiper-pagination_${random}`}></div>
			</div>
		)
	}
	render() {
		let { ioInput } = this.props
		let { list } = ioInput
		let dom = this.renderDom(list)
		return (
			<section className={`e-swiper-by-goods`}>
				{ dom }
			</section>
		)
	}
}
