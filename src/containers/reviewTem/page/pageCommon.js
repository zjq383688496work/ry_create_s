import React from 'react'

import PictureShow              from 'reviewTem/EditElement/Picture'
import AreaShow                 from 'reviewTem/EditElement/Area'
import AudioShow                from 'reviewTem/EditElement/Audio'
import WebShow                  from 'reviewTem/EditElement/Web'
import TextShow                 from 'reviewTem/EditElement/Text'
import QrcodeRYShow             from 'reviewTem/EditElement/QrcodeRY'
import Biubiubiu                from 'reviewTem/EditElement/Biubiubiu'
import ButtonShow               from 'reviewTem/EditElement/Button'
import VideoShow                from 'reviewTem/EditElement/Video'
import SwiperImageShow          from 'reviewTem/EditElement/SwiperImage'
import SwiperImgAndVideoShow    from 'reviewTem/EditElement/SwiperImgAndVideo'
import SwiperIV                 from 'reviewTem/EditElement/SwiperIV'
import WonderfulActivityShow    from 'reviewTem/EditElement/WonderfulActivity'
import WonderfulActivityNewShow from 'reviewTem/EditElement/Comp/WonderfulActivityNew'  
import TimeShow                 from 'reviewTem/EditElement/Comp/Common/Time' 
import WeatherShow              from 'reviewTem/EditElement/Comp/Common/Weather'
// import SplitLineShow         from 'reviewTem/EditElement/SplitLine'
import Map2DShow                from 'reviewTem/EditElement/Map2D'
import Map3DShow                from 'reviewTem/EditElement/Map3D'
import NavigationShow           from 'reviewTem/EditElement/Navigation'
import NavigationFloatShow      from 'reviewTem/EditElement/NavigationFloat'
import DateWeatherShow          from 'reviewTem/EditElement/Comp/DateWeather'
import StoreListShow            from 'reviewTem/EditElement/Comp/StoreList' 
import StoreListNewShow         from 'reviewTem/EditElement/Comp/StoreListNew'
import StoreDetailsShow         from 'reviewTem/EditElement/Comp/StoreDetails'
import StoreDetailsNewShow      from 'reviewTem/EditElement/Comp/StoreDetailsNew'
import StoreInstroShow          from 'reviewTem/EditElement/Comp/StoreInstro'
// import GoodsListShow         from 'reviewTem/EditElement/Comp/GoodsList'
// import GoodsDetailsShow      from 'reviewTem/EditElement/Comp/GoodsDetails'

import Tabs from 'reviewTem/EditElement/Comp/Tabs'

import addAnimate from 'reviewTem/page/animateAdd'
import 'reviewTem/page/index.less'

class EditElementCommon extends React.Component {
	state = {
		name: '',
		page: ''
	}
	componentWillMount() {
		let pageEle = this.props.pageContent
		this.setState({page:pageEle})
		window.RY_page_router = pageEle.router
	}
	componentDidMount(){
		let { globalData,pageContent } = this.props
		const { homepage } = globalData.data;
		pageContent.feature.homeTime? backHomeTime = pageContent.feature.homeTime: null;
		window.RYTimer? clearInterval(window.RYTimer): null;
		//homepage != pageContent.router ? funcIn() : null
	}
	render() {
		let { actions, globalData, categories, floors, builds, pageList } = this.props,
			{ updateGlobal } = actions,
			page    = this.state.page,
			eles    = page.elements.length > 0? page.elements: [],
			theme   = globalData.theme,
			colors  = theme.list[theme.idx].colors,
			feature = page.feature,
			color   = feature.backgroundColor,
			type    = color.type
		window.curThemeColor = colors
		let bgStyle   = page.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {},
			action    = { updateGlobal, globalData }
		let childNode = eles.map((element, i) => {
			let layout   = element.data.layout, 
				styleIdx = element.styleList.idx,
				compCon
			switch (element.name) {
				case 'picture':            compCon = (<PictureShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'area':               compCon = (<AreaShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'biubiubiu':          compCon = (<Biubiubiu data={element} type={`Style${styleIdx + 1}`} />); break
				case 'audio':              compCon = (<AudioShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'qrcode':             compCon = (<QrcodeRYShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'qrcodeHui':          compCon = (<QrcodeRYShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'qrcodeNav':          compCon = (<QrcodeRYShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'web':                compCon = (<WebShow data={element} type={`Style${styleIdx + 1}`} pageList={pageList} action={action} />); break
				case 'text':               compCon = (<TextShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'button':             compCon = (<ButtonShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'video':              compCon = (<VideoShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'swiperImage':        compCon = (<SwiperImageShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'swiperImgAndVideo':  compCon = (<SwiperImgAndVideoShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'swiperIV':           compCon = (<SwiperIV data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'wonderfulActivity':  compCon = (<WonderfulActivityShow activities={element.data.content} data={element} type={`Style${styleIdx + 1}`} />); break
				case 'wonderfulActivity2': compCon = (<WonderfulActivityNewShow data={element} type={`Style${styleIdx + 1}`} action={action}/>); break
				case 'time':               compCon = (<TimeShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'weather':            compCon = (<WeatherShow data={element} type={`Style${styleIdx + 1}`} />); break
				// case 'splitLine':          compCon = (<SplitLineShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'map2D':              compCon = (<Map2DShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'map3D':              compCon = (<Map3DShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'navigation':         compCon = (<NavigationShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'navigationFloat':    compCon = (<NavigationFloatShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'dateWeather':        compCon = (<DateWeatherShow data={element} type={`Style${styleIdx + 1}`} />); break
				case 'storeList':          compCon = (<StoreListShow data={element} categories={categories} floors={floors} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'storeDetails':       compCon = (<StoreDetailsShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'storeList2':         compCon = (<StoreListNewShow data={element} categories={categories} floors={floors} builds={builds} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'storeDetails2':      compCon = (<StoreDetailsNewShow data={element} type={`Style${styleIdx + 1}`} action={action} />); break
				case 'storeInstro':        compCon = (<StoreInstroShow data={element} type={`Style${styleIdx + 1}`} />); break
				// case 'goodsList':          compCon = (<GoodsListShow data={element} type={`Style${styleIdx + 1}`} action={action} query={this.props.query}/>); break
				// case 'goodsDetails':       compCon = (<GoodsDetailsShow data={element} type={`Style${styleIdx + 1}`} top={layout.top} action={action} />); break
				case 'tabs':                compCon = <Tabs data={element} type={`Style${styleIdx + 1}`} action={action} />;break
				default: ; break
			}
			return (
				<div className={`pge-layout`} style={layout} key={i}>{ compCon }</div>
			)
		})
		return(
			<div className={`${tempCfg.composeType=='LANDSCAPE'?'pg-element-parent-show-l':'pg-element-parent-show-p'} ${this.state.name}`}> 
				<section className={`pg-element`} style={bgStyle}>{ childNode }</section>
			</div>
		)
	}
}
 

export default EditElementCommon
