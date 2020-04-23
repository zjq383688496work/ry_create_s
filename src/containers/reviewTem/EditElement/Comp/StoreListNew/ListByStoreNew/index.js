import React from 'react'
import Swiper from 'swiper'
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import Layout from '../../Layout'
import aniTime from '../../Common/aniTime'
import './index.less'
import 'swiper/dist/css/swiper.css'

class ListByStoreNew extends React.Component {
	state = {
	}
	componentDidMount() {
		this.props.ioInput.loading? this.initSwiper(this.props): null
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ioInput.changePage) return
		const random = parseInt(Math.random()*1e5)
		nextProps.ioInput.loading && !nextProps.ioInput.clickStore? this.setState({ random }, () => this.initSwiper(nextProps,random)): null
	} 
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.ioInput.clickStore) return false
		else return nextProps.ioInput.changePage? nextProps.storeUpdate: true
	} 
	componentWillUnmount(){
		this.props.ioOuter({ type: 'list', value: null })
		this.myStoreSwiper && this.myStoreSwiper.destroy(false)
	}  
	initSwiper = props => {
		let { ioInput, ioOuter } = props,
			{ $swiper } = this.refs
		const swiperOptions = {
			direction : 'horizontal',
			on: {
				slideChangeTransitionEnd: function() {
					var currentPage = this.activeIndex + 1
					if (ioInput.currentPage === currentPage) return
					ioInput.currentPage = currentPage
					ioInput.changePage  = true
					ioOuter(ioInput)
				}
			} 
		} 
		this.myStoreSwiper && this.myStoreSwiper.destroy(false)
		this.myStoreSwiper = new Swiper($swiper, swiperOptions)
		ioOuter({ type: 'list', value: this.myStoreSwiper })
	} 
	toDetails = item => {
		const { data, ioInput, ioOuter } = this.props,
			shopNo = item.BERTH_NUMBER || item.berthNumber,
			router = data.data.content.router? data.data.content.router.url: '',
			id = item.recordId || item.id,
			dataStr = checkToJump(item,router,id,203)
		if (ioInput.haveFloorMap) ioOuter(ioInput, { type: 'shopNo', value: shopNo })
		else JumpRouter(dataStr)
	}
	render() {
		let { ioInput, shops, type } = this.props
		return ( 
			<section className={`e-list-by-store2 ${type}`} style={{ height: '100%', width: '100%' }}>
				<div style={{width:"100%",height:"100%"}} >
					{
						<div className="swiper-container" ref="$swiper">
							<div className="swiper-wrapper"> 
								{
									shops.data.map((item, i) => {
										return (
											<div className="swiper-slide" key={i}>
												<RenderDomNew props={this.props} list={item} toDetails={this.toDetails} />
											</div>
										)
									})
								}
							</div>    
						</div>
					}
				</div>
			</section>
		)
	}
}

//动画一
function RenderDomNew({ props, list, toDetails, opacity }) {
	let newArr = aniTime(props,list)
	let defaultStyle = cssColorFormat(props, 'filter')
	
	let node = newArr.map((_, i) => {
		if(_.show == 'none') return false
		return ( 
			<div
				key={i}
				className="outDom"
				style={defaultStyle}
				onClick={()=>{toDetails(_)}}>
				<div className="ep-item-two">
					<Layout itemList={_} data={props.data} refresh={true} type={'NewStore'} />
				</div>
			</div> 
		)
	})
	return <div className="boxStores">{ node }</div>
}

export default ListByStoreNew
