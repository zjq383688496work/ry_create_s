import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import Rnd from 'react-rnd'

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

import ContextMenu        from 'compEdit/EditCommon/ContextMenu'
import ShortcutKey        from 'compEdit/EditCommon/ShortcutKey'
import PostMessage        from 'compEdit/EditCommon/PostMessage'
import ToolsBar           from 'compEdit/EditCommon/ToolsBar'
import { InductionLine, nearPosSty } from 'compEdit/EditElement/InductionLine'

import Banner from 'compEdit/EditElement/Banner'

import * as actions from 'actions'
import { Icon, message } from 'antd'

import * as variable from 'var'

const ctMap  = variable.composeTypeMap
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, actions, type, idx, drag, csn, keyCtrl, contentEditable, shift, language) => {
	var props  = { data, actions, type, idx,drag, csn, keyCtrl, contentEditable, shift, language }
	var render = {
		picture:            <Picture            {...props} />,
		web:                <Web                {...props} />,
		video:              <Video              {...props} />,
		text:               <Text               {...props} />,
		audio:              <Audio              {...props} />,
		biubiubiu:          <Biubiubiu          {...props} />,
		button:             <Button             {...props} />,
		buttonLanguage:     <ButtonLanguage     {...props} />,
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
		// goodsList:          <GoodsList          {...props} />,
		storeDetails:       <StoreDetails       {...props} />,
		// goodsDetails:       <GoodsDetails       {...props} />,
		storeInstro:        <StoreInstro        {...props} />,
		// splitLine:          <SplitLine          {...props} />,
		dateWeather:        <DateWeather        {...props} />,
		map2D:              <Map2D              {...props} />,
		map3D:              <Map3D              {...props} />,
		html:               <Html               {...props} />,
		area:               <Area               {...props} />,
		qrcode:             <Qrcode             {...props} />,
		qrcodeHui:          <QrcodeHui          {...props} />,
		qrcodeNav:          <QrcodeNav          {...props} />,
		qrcodeBarrage:      <QrcodeBarrage      {...props} />,
		storeList2:         <StoreList2         {...props} />,
		storeDetails2:      <StoreDetails2      {...props} />,
		tabs:               <Tabs               {...props} />,
	}
	return render[name]
}
 
import './index.less'

class EditElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			keyCtrl:    false,
			shift:      false,
			v:          false,
			h:          false,
			vPosition:  { left: 0 },
			hPosition:  { top:  0 },
			nearPos:    false,
			drag:       true,
			dragAxis:   'both',
			editConfig: props.editConfig,
		}
	}
	componentWillReceiveProps(nextProps) {
		let { editConfig } = nextProps,
			{ curPage }    = editConfig,
			editConfigPrev = this.props.editConfig,
			curPagePrev    = editConfigPrev.curPage,
			elements       = deepCopy(curPage.elements)
		if (curPagePrev.router === curPage.router){
			this.setState({ editConfig })
		} else {
			curPage.elements = []
			this.setState({ editConfig })
			var t = setTimeout(() => {
				clearTimeout(t)
				curPage.elements = elements
				this.setState({ editConfig })
			}, 1)
		}
		this.state.drag? this.stateLayout(): null
	}
	stateLayout = () => {
		let { data, editConfig } = this.props
		let { compIdx } = editConfig.curData
		let state = {}
		let eles  = data.elements || []
		if (compIdx < 0 || !eles[compIdx]) return
		state[compIdx] = eles[compIdx].data.layout
		this.setState(state)
	}
	keyDown = (k, e) => {
		if (k === 'meta' || k === 'control') {
			this.setState({ keyCtrl: true })
		} else if (k === 'shift'){
			this.setState({ shift: true })
		}
	}
	keyUp = (k, e) => {
		if (k === 'meta' || k === 'control') {
			this.setState({ keyCtrl: false })
		}else if(k === 'shift'){
			this.setState({ shift: false })
		}
	}
	
	selectComp(e, data, idx) {
		e.stopPropagation()
		this.setState({v:false,h:false,nearPos:false}) 
		let { keyCtrl } = this.state
		let { actions, editConfig } = this.props
		let { curData, globalData } = editConfig
		let { type } = globalData.multiComp
		let { compIdx, cusCompIdx, contentType } = curData
		if (keyCtrl && type === 'child') return
		if (compIdx === idx && cusCompIdx < 0 && contentType === 'comp') return
		this.state[idx] = deepCopy(data.data.layout)
		curData.compIdx    = idx
		curData.parentComp = null
		if(data.name == 'text' || data.name == 'web'){
			data.feature.editStatus = false
		} 
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}
 
	selectMulti(e, idx) {
		e.stopPropagation()
		let { keyCtrl } = this.state
		let { actions, editConfig } = this.props
		let { globalData } = editConfig
		let { multiComp }  = globalData
		let { index, list, type } = multiComp
		if (keyCtrl) {
			if (type === 'child') return message.success('不能跨级选组件!')
			if (index[idx]) list.remove(idx)
			index[idx] = true
			list.unshift(idx)
		} else {
			var s = {}
			s[idx] = true
			multiComp.index = s
			multiComp.list  = [idx]
		}
		multiComp.type = 'parent'
		delete multiComp.parentIdx
		actions.updateGlobal(globalData)
	}
	//scale停止
	resizeFn(e, ref, delta, pos, item, idx) {
		e.stopPropagation()
		let { actions } = this.props
		let lay = item.data.layout
		lay.left   = +pos.x
		lay.top    = +pos.y
		lay.width  = +ref.offsetWidth
		lay.height = +ref.offsetHeight
		this.setState({v:false,h:false,nearPos:false}) 
		actions.updateComp(idx, item)
	} 
	//scale
	dragResize(e, ref, delta, pos, item, idx) {
		var o = {}
		o[idx] = {
			left:   +pos.x,
			top:    +pos.y,
			width:  +ref.offsetWidth,
			height: +ref.offsetHeight
		}
		this.showLine(pos,item,idx,{width:ref.offsetWidth,height:ref.offsetHeight})
		this.setState(o)
	} 
	//拖拽
	dragMove(e, param, _, i) {
		e.stopPropagation()
		let stateLay = {},lay = deepCopy(_.data.layout)
		if(this.state.shift){
			if(Math.abs(lay.top-param.y) > Math.abs(lay.left-param.x)){
				let layout = deepCopy(_.data.layout),
					pos = {x:param.x,y:param.y}
				pos.x = layout.left
				this.setState({...stateLay,dragAxis:'y',drag:false},()=>{ this.showLine(pos,_,i) })
			}else{
				let layout = deepCopy(_.data.layout),
					pos = {x:param.x,y:param.y}
				pos.y = layout.top
				this.setState({...stateLay,dragAxis:'x',drag:false},()=>{ this.showLine(pos,_,i) })
			}
		} else {
			this.setState({dragAxis:'both',drag:false},()=>{ this.showLine(param,_,i) })
		} 
	}
	// 拖拽停止
	dragStop(e, d, item, idx) {
		e.stopPropagation()
		// e.preventDefault()
		let { actions } = this.props
		let lay = item.data.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = this.state.vPosition.p_left
		lay.top  = this.state.hPosition.p_top
		this.setState({ v: false, h: false, nearPos: false, drag: true })   
		actions.updateComp(idx, item)
	} 
	// 显示提示线
	showLine = (param,_,i,obj) => {
		let { data, actions,editConfig } = this.props,
			{ globalData } = editConfig,
			{ multiComp, banner } = globalData,
			bannerData   = banner,
			bannerLayout = banner && banner.data.layout,
			eles   = data.elements || [],
			bodySty = tempCfg.composeType == 'LANDSCAPE'? { height: 539, width: 959, left: 0, top: 0 } :
			(tempCfg.bannerAds == 1? { width: 539, height: `${959 - bannerLayout.height}`, left: 0, top: 0 }: { width: 539, height: 959, left: 0, top: 0 }),
			layout = obj? { ..._.data.layout, ...obj }: _.data.layout,
			InductionLineObj = InductionLine(param,eles,layout,i,bodySty),
			v= InductionLineObj.v,h=InductionLineObj.h,eleKnock = InductionLineObj.eleKnock
		if (v) {
			this.setState({v:true,vPosition:{left:`${v.left}px`,p_left:v.p_left}})
		} else {
			this.setState({v:false,vPosition:{p_left:param.x}})
		}
		if (h) {
			this.setState({ h: true, hPosition: { top: `${tempCfg.bannerAds == 1? h.top + bannerLayout.height: h.top}px`, p_top: h.p_top } })
		} else {
			this.setState({ h: false, hPosition: { p_top: param.y } })
		}
		if (eleKnock) {
			this.setState({ nearPos: nearPosSty(eleKnock, bannerData) })
		} else {
			this.setState({ nearPos: false })
		}
	}
	changeEditable = (item, idx) => {
		let { actions } = this.props
		if (item.name == 'web') {
			let RP = /https?\:\/\/[-\w+&@#/%?=~_|!:,.;]+[-\w+&@#/%=~_|]/
			if(!RP.test(item.data.content.url)) return false
		} 
		this.setState({ drag: true })
		item.feature.editStatus != undefined? item.feature.editStatus = true: null
		actions.updateComp(idx, item)
	}
	removeComp(e, idx) {
		e.stopPropagation()
		let { actions } = this.props
		actions.deleteComp(idx)
	}

	render() {
		let { data, actions, editConfig, location } = this.props
		let { globalData, curData } = editConfig
		let { language } = globalData.data
		let { pageGroupIdx, pageIdx, compIdx } = curData
		let { multiComp } = globalData
		let { index } = multiComp
		let state  = this.state
		let ct     = tempCfg.composeType || 'PORTRAIT'
		if (!data || data.title === undefined) return <div className={`pg-element-parent e-flex-box pg-element-${ct}`}><section className="pg-element"></section></div>
		let eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type,
			disableDragging = false
		ct = ctMap[ct]? ct: 'PORTRAIT'
		if (!colors[type] && type !== 'custom') {
			color.type = 'custom'
			return actions.updatePage(pageGroupIdx, pageIdx, data)
		}
		let bgStyle   = data.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
		let childNode = eles.map((_, i) => {
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				csn      = `handle-drag-${Math.random() * 1e9 | 0}`,
				ani      = _.data.animation,
				aniCls   = '',
				aniSty   = {},
				lockAspectRatio = layout.lockAspectRatio,
				editStatus = _.feature&&_.feature.editStatus;
			i === compIdx ? disableDragging = editStatus : null
			let compCon = compContent(compName, _, actions, `Style${styleIdx + 1}`, i, state.drag, csn, state.keyCtrl, disableDragging, state.shift, language)
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
			let sl  = state[i]
			let lay = i === compIdx? sl? sl: layout: layout
			return (
				<Rnd
					key={i}
					// className={`${i in index? 's-select': ''} ${i === compIdx? 's-active': ''} `}
					className={`${i === compIdx? 's-select': ''} ${i === compIdx? 's-active': ''} `}
					size={{
						width:  lay.width || '100%',
						height: lay.height
					}}
					position={{
						x: lay.left,
						y: lay.top
					}}
					dragAxis={state.dragAxis}
					disableDragging={disableDragging} 
					lockAspectRatio={lockAspectRatio}
					onDragStart={e => this.selectComp(e, _, i)}
					onDrag={(e,param) => this.dragMove(e,param,_,i)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i)}
					onResizeStart={e => this.selectComp(e, _, i)}
					onResize={(e, dir, ref, delta, pos) => this.dragResize(e, ref, delta, pos, _, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i)}
				>
					<div
						className={`pge-layout ${aniCls? aniCls: ''}`}
						style={aniSty}
						onClick={e => {this.selectComp(e, _, i);this.selectMulti(e, i)}}
						onContextMenu={e => this.selectComp(e, _, i)}
						onDoubleClick={()=>this.changeEditable(_,i)}
					>{ compCon }</div>
				</Rnd>
			)
		})
		return (
			<div className={`pg-element-parent e-flex-box pg-element-${ct}`}>
				<div className="pg-element-box">
					<Banner {...this.props}>
						<div id="pgElementChild" className="pg-element-child" style={bgStyle}>
							{ childNode }
						</div>
						{state.h? <div className="inductionLine-h" style={state.hPosition}></div>: null}
						{state.v? <div className="inductionLine-v" style={state.vPosition}></div>: null}
						{
							state.nearPos
							?
							<div>
								<div className="lineNear_0" style={state.nearPos[0]}></div>
								<div className="lineNear_1" style={state.nearPos[1]}></div>
								<div className="lineNear_2" style={state.nearPos[2]}></div>
								<div className="lineNear_3" style={state.nearPos[3]}></div>
							</div>
							: null
						}
					</Banner>
					<ToolsBar />
				</div>
				<ContextMenu />
				<ShortcutKey keyDown={this.keyDown} keyUp={this.keyUp} disableDragging={disableDragging} />
				<PostMessage />
			</div>
		)
	}
}

EditElement.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditElement)


