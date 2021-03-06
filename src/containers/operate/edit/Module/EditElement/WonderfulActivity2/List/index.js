import React from 'react'
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './index.less'

export default class ListByActivity2 extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		random: parseInt(Math.random()*1000),
		realIndex: 0
	}
	componentWillReceiveProps(props) {
		this.init(props)
	}
	componentDidMount() {
		this.init(this.props)
	} 

	to(e) {
		e.preventDefault()
	}
	init(props) {
		let swiperOptions = props.data.feature.swiperOptions
		swiperOptions = this.formatObj(swiperOptions)
		const type = props.data.feature.layout
		this.mySwiper && this.mySwiper.destroy(false)
		this.initSwiper(swiperOptions)
	}
	initSwiper = (swiperOptions) => {
		this.mySwiper = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions)
	}
	formatObj(obj) {
		let new_obj = {};
		for(var key in obj){ 
			if(key == 'autoplay'&& obj[key]){
				new_obj.autoplay = obj['autoplayOptions']
			}else if(key == 'slideOptions'){
				for(var i in obj['slideOptions']){
					new_obj[i] = obj['slideOptions'][i]
				}  
			}else{
				if(key != 'autoplayOptions'){ 
					new_obj[key] = obj[key];
				} 
			}  
		} 
		new_obj.on = {
			slideChange:()=>{
				this.mySwiper ? this.setState({realIndex:this.mySwiper.realIndex}) : null
			}
		} 
		new_obj.watchSlidesProgress = true;
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj  
	}
	componentWillUnmount() {
		this.mySwiper.destroy(false)
	}
	render() {
		let { data } = this.props
		const content = data.data.content.list
		return ( 
			<div className="e-WonderfulActivity">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{
							content.map((item, i) => <div className="swiper-slide" key={i}>{/*<div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.title}</div>*/}<img src={item.img.img} style={cssColorFormat(this.props, 'swiperImage')} /></div>)
						}   
					</div>
				</div>
				<PageRY totalPage={content.length} currentPage={this.state.realIndex} props={this.props}></PageRY> 
			</div>
		)  
	}
}

class PageRY extends React.Component {
	
	renderDom(props, totalPage,currentPage) {
		let node = Array.from(new Array(totalPage)).map((_, i) => {
			let cur = i
			let nCss = cssColorFormat(props, 'pageSet')
			if (currentPage === cur) nCss = { ...nCss, ...cssColorFormat(props, 'filterActive') }
			return (
				<div
					key={i}
					style={nCss}
					className={`ep-item${currentPage === cur? ' s-active': ''}`}
				>
				</div>
			)
		})
		node = (
			<div className="ep-page">{node}</div>
		)
		return node
	}

	render() {
		let { totalPage,currentPage,props } = this.props
		return (
			<section className="e-page">
				{ this.renderDom.bind(this, props, totalPage,currentPage)() }
			</section>
		)
	}
}
