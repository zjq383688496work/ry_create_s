import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import Activity           from 'compEdit/EditElement/Activity'
import Picture            from 'compEdit/EditElement/Picture'
import Web                from 'compEdit/EditElement/Web'
import Text               from 'compEdit/EditElement/Text'
import Biubiubiu          from 'compEdit/EditElement/Biubiubiu'
import Button             from 'compEdit/EditElement/Button'
import Video              from 'compEdit/EditElement/Video'
import SwiperImage        from 'compEdit/EditElement/SwiperImage'
import SwiperImgAndVideo  from 'compEdit/EditElement/SwiperImgAndVideo'
import SwiperIV           from 'compEdit/EditElement/SwiperIV'
import WonderfulActivity  from 'compEdit/EditElement/WonderfulActivity'
import WonderfulActivity2 from 'compEdit/EditElement/WonderfulActivity2'
import Time               from 'compEdit/EditElement/Time'
import Weather            from 'compEdit/EditElement/Weather'
import StoreList          from 'compEdit/EditElement/StoreList'
import StoreDetails       from 'compEdit/EditElement/StoreDetails'
import StoreInstro        from 'compEdit/EditElement/StoreInstro'
import StoreList2         from 'compEdit/EditElement/StoreList2'
import StoreDetails2      from 'compEdit/EditElement/StoreDetails2'
import GoodsList          from 'compEdit/EditElement/GoodsList'
import DateWeather        from 'compEdit/EditElement/DateWeather'
import Navigation         from 'compEdit/EditElement/Navigation'
import NavigationFloat    from 'compEdit/EditElement/NavigationFloat'
import SplitLine          from 'compEdit/EditElement/SplitLine'
import Map2D              from 'compEdit/EditElement/Map2D'
import Map3D              from 'compEdit/EditElement/Map3D'
import Html               from 'compEdit/EditElement/Html'
import GoodsDetails       from 'compEdit/EditElement/GoodsDetails'
import Area               from 'compEdit/EditElement/Area'
import Qrcode             from 'compEdit/EditElement/Qrcode'
import QrcodeHui          from 'compEdit/EditElement/QrcodeHui'
import QrcodeNav          from 'compEdit/EditElement/QrcodeNav'
import QrcodeBarrage      from 'compEdit/EditElement/QrcodeBarrage'
import Tabs               from 'compEdit/EditElement/Tabs'
import ScrollList         from 'compEdit/EditElement/ScrollList'

import Banner from 'compEdit/EditElement/Banner'

import * as actions from 'actions'

import { Icon } from 'antd'

import './index.less'

import * as variable from 'var'

const ctMap = variable.composeTypeMap

const compContent = (name, data, actions, type, idx, csn, language) => {
	var props  = { data, actions, type, idx, csn, language },
		render = {
		activity:           <Activity           {...props} />,
		picture:            <Picture            {...props} />,
		web:                <Web                {...props} />,
		video:              <Video              {...props} />,
		text:               <Text               {...props} />,
		biubiubiu:          <Biubiubiu          {...props} />,
		button:             <Button             {...props} />,
		swiperImage:        <SwiperImage        {...props} />,
		swiperImgAndVideo:  <SwiperImgAndVideo  {...props} />,
		swiperIV:           <SwiperIV           {...props} />,
		wonderfulActivity:  <WonderfulActivity  {...props} />,
		wonderfulActivity2: <WonderfulActivity2 {...props} />,
		time:               <Time               {...props} />,
		weather:            <Weather            {...props} />,
		navigation:         <Navigation         {...props} />,
		navigationFloat:    <NavigationFloat    {...props} />,
		storeList:          <StoreList          {...props} />,
		goodsList:          <GoodsList          {...props} />,
		storeDetails:       <StoreDetails       {...props} />,
		storeInstro:        <StoreInstro        {...props} />,
		splitLine:          <SplitLine          {...props} />,
		dateWeather:        <DateWeather        {...props} />,
		map2D:              <Map2D              {...props} />,
		map3D:              <Map3D              {...props} />,
		html:               <Html               {...props} />,
		goodsDetails:       <GoodsDetails       {...props} />,
		area:               <Area               {...props} />,
		qrcode:             <Qrcode             {...props} />,
		storeList2:         <StoreList2         {...props} />,
		storeDetails2:      <StoreDetails2      {...props} />,
		qrcodeHui:          <QrcodeHui          {...props} />,
		qrcodeNav:          <QrcodeNav          {...props} />,
		qrcodeBarrage:      <QrcodeBarrage      {...props} />,
		tabs:               <Tabs               {...props} />,
		scrollList:         <ScrollList         {...props} />,
	}
	return render[name]
}

class Element extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data, actions, editConfig, time, location } = this.props
		let ct     = tempCfg.composeType || 'PORTRAIT',
			ads    = tempCfg.adsFlag? 'ads': '',
			eles   = data.elements || [],
			{ globalData } = editConfig,
			{ data: { language }, theme, banner }  = globalData,
			bannerLayout    = banner && banner.data.layout,
			{ colors } = theme.list[theme.idx],
			color  = data.feature.backgroundColor,
			type   = color.type
		ct = ctMap[ct]? ct: 'PORTRAIT'
		window.curThemeColor = colors
		if (!colors[type] && type !== 'custom') {
			let curData = editConfig.curData
			color.type = 'custom'
			return actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
		}
		let bgStyle   = data.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
		let childNode = eles.map((_, i) => {
			var compName  = _.name,
				layout    = _.data.layout,
				styleIdx  = _.styleList.idx,
				csn       = `handle-drag-${Math.floor(Math.random()*1e9)}`,
				isEdit    = true,
				compCon   = compContent(compName, _, actions, `Style${styleIdx + 1}`, i, csn, language)
			
			if (!compCon) return false
			return (
				<div key={i} className="pge-layout" style={cssColorFormat({ data: _ }, 'layout')}>{ compCon }</div>
			)
		})
		return (
			<div className={`pg-element-view e-flex-box pg-element-${ct}`}>
				<div className="pg-element-box">
					{ /*ads
						? <div className="ads-placeholder"></div>
						: null*/
					}
					{
						tempCfg.bannerAds == 1 ? 
						<div className="bannerBox" style={{height:`${ct=="PORTRAIT"?bannerLayout.height+"px":"100%"}`,width:`${ct=="LANDSCAPE"?bannerLayout.width+"px":"100%"}`}}>
							<Banner {...this.props} />
						</div> : null
					}
					<section className="pg-element" style={bgStyle}>
						{ childNode }
					</section>
				</div>
			</div>
		)
	}
}

Element.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Element)
