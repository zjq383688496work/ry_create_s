import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import Activity           from 'compEdit/EditElement/Activity'
import Picture            from 'compEdit/EditElement/Picture'
import Web                from 'compEdit/EditElement/Web'
import Text               from 'compEdit/EditElement/Text'
import Audio              from 'compEdit/EditElement/Audio'
import Biubiubiu          from 'compEdit/EditElement/Biubiubiu'
import Button             from 'compEdit/EditElement/Button'
import ButtonLanguage     from 'compEdit/EditElement/ButtonLanguage'
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
import DateWeather        from 'compEdit/EditElement/DateWeather'
import Navigation         from 'compEdit/EditElement/Navigation'
import NavigationFloat    from 'compEdit/EditElement/NavigationFloat'
// import SplitLine          from 'compEdit/EditElement/SplitLine'
import Map2D              from 'compEdit/EditElement/Map2D'
import Map3D              from 'compEdit/EditElement/Map3D'
import Html               from 'compEdit/EditElement/Html'
// import GoodsList          from 'compEdit/EditElement/GoodsList'
// import GoodsDetails       from 'compEdit/EditElement/GoodsDetails'
import Area               from 'compEdit/EditElement/Area'
import Qrcode             from 'compEdit/EditElement/Qrcode'
import QrcodeHui          from 'compEdit/EditElement/QrcodeHui'
import QrcodeNav          from 'compEdit/EditElement/QrcodeNav'
import QrcodeBarrage      from 'compEdit/EditElement/QrcodeBarrage'
import Tabs               from 'compEdit/EditElement/Tabs'

import Banner             from 'compEdit/EditElement/Banner'

import * as actions from 'actions'

import './index.less'

import * as variable from 'var'

const ctMap = variable.composeTypeMap
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, actions, type, idx, csn, contentEditable, language) => {
	var props  = { data, actions, type, idx, csn, contentEditable, language},
		render = {
		activity:           <Activity           {...props} />,
		picture:            <Picture           {...props} />,
		web:                <Web               {...props} />,
		video:              <Video             {...props} />,
		text:               <Text              {...props} />,
		biubiubiu:          <Biubiubiu         {...props} />,
		audio:              <Audio             {...props} />,
		button:             <Button            {...props} />,
		buttonLanguage:     <ButtonLanguage    {...props} />,
		swiperImage:        <SwiperImage       {...props} />,
		swiperImgAndVideo:  <SwiperImgAndVideo {...props} />,
		swiperIV:           <SwiperIV          {...props} />,
		wonderfulActivity:  <WonderfulActivity {...props} />,
		wonderfulActivity2: <WonderfulActivity2 {...props} />,
		time:               <Time              {...props} />,
		weather:            <Weather           {...props} />,
		navigation:         <Navigation        {...props} />,
		navigationFloat:    <NavigationFloat   {...props} />,
		storeList:          <StoreList         {...props} />,
		// goodsList:          <GoodsList         {...props} />,
		storeDetails:       <StoreDetails      {...props} />,
		storeInstro:        <StoreInstro       {...props} />,
		// splitLine:          <SplitLine         {...props} />,
		dateWeather:        <DateWeather       {...props} />,
		map2D:              <Map2D             {...props} />,
		map3D:              <Map3D             {...props} />,
		html:               <Html              {...props} />,
		// goodsDetails:       <GoodsDetails      {...props} />,
		area:               <Area              {...props} />,
		qrcode:             <Qrcode            {...props} />,
		qrcodeHui:          <QrcodeHui         {...props} />,
		qrcodeNav:          <QrcodeNav         {...props} />,
		qrcodeBarrage:      <QrcodeBarrage     {...props} />,
		storeList2:         <StoreList2        {...props} />,
		storeDetails2:      <StoreDetails2     {...props} />,
		tabs:               <Tabs              {...props} />,
	}
	return render[name]
}

class EditElement extends React.Component {
	state = {
		editConfig: this.props.editConfig
	}
	componentWillReceiveProps(nextProps) {
		let { editConfig } = nextProps,
			{ curPage } = editConfig,
			editConfigPrev = this.props.editConfig,
			curPagePrev = editConfigPrev.curPage,
			elements = deepCopy(curPage.elements)
		if(curPagePrev.router === curPage.router){
			this.setState({ editConfig })
		}else{
			curPage.elements = []
			this.setState({ editConfig })
			setTimeout(()=>{ 
				curPage.elements = elements
				this.setState({ editConfig })
			},1)
		}
	}
	selectComp(e, data, idx) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		let { compIdx, cusCompIdx, contentType } = curData
		if (compIdx === idx && cusCompIdx < 0 && contentType === 'comp') return
		curData.compIdx    = idx
		curData.parentComp = null
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}
	changeEditable = (item, idx) => {
		let { actions } = this.props
		item['feature'].editStatus != undefined ? item['feature'].editStatus = true : null
		actions.updateComp(idx, item)
	} 
	render() {
		let { data, actions, location } = this.props,
			{ editConfig } = this.state,
			{ curData, globalData } = editConfig,
			{ pageGroupIdx, pageIdx, compIdx } = curData,
			{ banner } = globalData,
			{ language } = globalData.data,
			bannerLayout    = banner && banner.data.layout
		let ct     = tempCfg.composeType || 'PORTRAIT'
		if (!data || data.title === undefined) return (<div className={`pg-element-parent e-flex-box pg-element-${ct}`}><section className="pg-element"></section></div>)
		let eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type
		ct = ctMap[ct]? ct: 'PORTRAIT'
		if (!colors[type] && type !== 'custom') {
			color.type = 'custom'
			return actions.updatePage(pageGroupIdx, pageIdx, data)
		}
		let bgStyle   = data.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
		let childNode = eles.map((_, i) => {
			var compName  = _.name,
				layout    = _.data.layout,
				styleIdx  = _.styleList.idx,
				csn       = `ry-jimmy-${Math.floor(Math.random()*1e9)}`,
				ani       = _.data.animation,
				aniCls    = '',
				aniSty    = {},
				editStatus = _.feature&&_.feature.editStatus,
				disableDragging = i === compIdx ? editStatus : false, 
				compCon   = compContent(compName, _, actions, `Style${styleIdx + 1}`, i, csn, disableDragging, language)
			
			if (!compCon) return false

			if (ani.className) {
				let item = aStyle[ani.className]
				let { direction, delay, iterationCount } = ani
				if (!direction || !item.list) ani.direction = item.list? item.list[0] || '': ''
				aniCls = `animate ${ani.className}${ani.direction}`
				aniSty = {
					animationDuration: `${ani.duration}s`,
					animationDelay:    `${delay}s`,
					animationIterationCount: iterationCount
				}
			}
				
			return (
				<div
					key={i}
					className={`pge-layout${i === compIdx? ' s-active': ''} ${aniCls? aniCls: ''}`}
					style={{ ...layout, ...aniSty }}
					onClick={e => this.selectComp(e, _, i)}
					onDoubleClick={()=>this.changeEditable(_,i)}
				>
					{ compCon }
				</div>
			)
		})
		return (
			<div className={`pg-element-business e-flex-box pg-element-${ct}`}>
				<div className="pg-element-box">
					<Banner {...this.props}>
						<div id="pgElementChild" className="pg-element-child" style={bgStyle}>
							{ childNode }
						</div>
					</Banner>
				</div>
			</div>
		)
	}
}

EditElement.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditElement)
