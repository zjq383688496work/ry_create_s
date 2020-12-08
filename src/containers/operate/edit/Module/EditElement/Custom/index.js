import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import './index.less'

import Rnd from 'react-rnd'
import { message } from 'antd'
import { InductionLine, nearPosSty } from 'compEdit/EditElement/InductionLine'

import Picture      from 'compEdit/EditElement/Picture'
import Web          from 'compEdit/EditElement/Web'
import Audio        from 'compEdit/EditElement/Audio'
import Video        from 'compEdit/EditElement/Video'
import Button       from 'compEdit/EditElement/Button'
import ButtonStatus from 'compEdit/EditElement/ButtonStatus'
import ButtonAuto   from 'compEdit/EditElement/ButtonAuto'
import EventTrigger from 'compEdit/EditElement/EventTrigger'
import Text         from 'compEdit/EditElement/Text'
import Time         from 'compEdit/EditElement/Time'
import Weather      from 'compEdit/EditElement/Weather'
import SwiperImage  from 'compEdit/EditElement/SwiperImage'
import Letter       from 'compEdit/EditElement/Letter'
import Floor        from 'compEdit/EditElement/Floor'
import Address      from 'compEdit/EditElement/Address'
import Catg         from 'compEdit/EditElement/Catg'
import Page         from 'compEdit/EditElement/Page'
import Reset        from 'compEdit/EditElement/Reset'
import FloorMap     from 'compEdit/EditElement/FloorMap'
import ListByStore  from 'compEdit/EditElement/ListByStore'
// import ListByGoods  from 'compEdit/EditElement/GoodsList/ListByGoods'
// import SplitLine         from 'compEdit/EditElement/SplitLine'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'
import CatgByActivity2   from 'compEdit/EditElement/WonderfulActivity2/Catg'
import ListByActivity2   from 'compEdit/EditElement/WonderfulActivity2/List'
import ResetByActivity2  from 'compEdit/EditElement/WonderfulActivity2/Reset'
import PictureBind       from 'compEdit/EditElement/PictureBind'
import TextBind          from 'compEdit/EditElement/TextBind'
import SwiperBind        from 'compEdit/EditElement/SwiperBind'
import Area              from 'compEdit/EditElement/Area'
// import PictureListBind   from 'compEdit/EditElement/PictureListBind'
// import GoodsBar       from 'compEdit/EditElement/GoodsDetails/GoodsBar'
// import GoodsBlock     from 'compEdit/EditElement/GoodsDetails/GoodsBlock'
import TabByTabs         from 'compEdit/EditElement/Tabs/TabByTabs'
import SwiperIV          from 'compEdit/EditElement/SwiperIV'
// import ChildElement   from 'compEdit/EditElement/ChildElement'
// import SwiperByGoods  from 'compEdit/EditElement/GoodsList/SwiperByGoods'
// import CatgByGoods    from 'compEdit/EditElement/GoodsList/CatgByGoods'
// import ResetByGoods   from 'compEdit/EditElement/GoodsList/ResetByGoods'
import ListByStore2      from 'compEdit/EditElement/StoreList2/List'
import RecListByStore2   from 'compEdit/EditElement/StoreList2/RecList'
import CatgByStore2      from 'compEdit/EditElement/StoreList2/Catg'
import CatgSecByStore2   from 'compEdit/EditElement/StoreList2/CatgSec'
import ResetByStore2     from 'compEdit/EditElement/StoreList2/Reset'
import FloorByStore2     from 'compEdit/EditElement/StoreList2/Floor'
import BuildByStore2     from 'compEdit/EditElement/StoreList2/Build'
import LetterByStore2    from 'compEdit/EditElement/StoreList2/Letter'
import PageByStore2      from 'compEdit/EditElement/StoreList2/Page'
import TurnByStore2      from 'compEdit/EditElement/StoreList2/Turn'
import MapByStore2       from 'compEdit/EditElement/StoreList2/Map'
import NavByStore2       from 'compEdit/EditElement/StoreList2/Nav'
import StoreBlock        from 'compEdit/EditElement/StoreDetails2/Block'
import QrcodeHui         from 'compEdit/EditElement/QrcodeHui'
import QrcodeNav         from 'compEdit/EditElement/QrcodeNav'
import ListByVoice       from 'compEdit/EditElement/Voice/List'
import ButtonByActivity  from 'compEdit/EditElement/Activity/Button'
import ViewByActivity    from 'compEdit/EditElement/Activity/View'
import ListByActivity    from 'compEdit/EditElement/Activity/List'
import PageByIV          from 'compEdit/EditElement/AdvancedIV/Page'
import TurnByIV          from 'compEdit/EditElement/AdvancedIV/Turn'
import SwiperBlockByIV   from 'compEdit/EditElement/AdvancedIV/SwiperBlock'
import ButtonFullScreenByIV from 'compEdit/EditElement/AdvancedIV/ButtonFullScreen'
import ListByScroll      from 'compEdit/EditElement/ScrollList/List'

import * as variable from 'var'
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, parent, editConfig, actions, type, ioInput, ioOuter, drag, language) => {
	var props  = { data, parent, editConfig, actions, type, ioInput, ioOuter, drag, language }
	var render = {
		picture:                 <Picture                {...props} />,
		web:                     <Web                    {...props} />,
		audio:                   <Audio                  {...props} />,
		video:                   <Video                  {...props} />,
		button:                  <Button                 {...props} />,
		buttonStatus:            <ButtonStatus           {...props} />,
		buttonAuto:              <ButtonAuto             {...props} />,
		eventTrigger:            <EventTrigger           {...props} />,
		text:                    <Text                   {...props} />,
		time:                    <Time                   {...props} />,
		weather:                 <Weather                {...props} />,
		address:                 <Address                {...props} />,
		swiperImage:             <SwiperImage            {...props} />,
		letter:                  <Letter                 {...props} />,
		floor:                   <Floor                  {...props} />,
		wonderfulActivity:       <WonderfulActivity      {...props} />,
		catgByActivity2:         <CatgByActivity2        {...props} />,
		listByActivity2:         <ListByActivity2        {...props} />,
		resetByActivity2:         <ResetByActivity2      {...props} />,
		catg:                    <Catg                   {...props} />,
		page:                    <Page                   {...props} />,
		floorMap:                <FloorMap               {...props} />,
		// splitLine:               <SplitLine              {...props} />,
		reset:                   <Reset                  {...props} />,
		listByStore:             <ListByStore            {...props} />,
		// listByGoods:             <ListByGoods            {...props} />,
		pictureBind:             <PictureBind            {...props} />,
		textBind:                <TextBind               {...props} />,
		swiperBind:              <SwiperBind             {...props} />,
		area:                    <Area                   {...props} />,
		// pictureListBind:         <PictureListBind        {...props} />,
		// goodsBar:                <GoodsBar               {...props} />,
		// goodsBlock:              <GoodsBlock             {...props} />,
		tabByTabs:               <TabByTabs              {...props} />,
		swiperIV:                <SwiperIV               {...props} />,
		// swiperByGoods:           <SwiperByGoods          {...props} />,
		// catgByGoods:             <CatgByGoods            {...props} />,
		// resetByGoods:            <ResetByGoods           {...props} />,
		listByStore2:            <ListByStore2           {...props} />,
		recListByStore2:         <RecListByStore2        {...props} />,
		catgByStore2:            <CatgByStore2           {...props} />,
		catgSecByStore2:         <CatgSecByStore2        {...props} />,
		resetByStore2:           <ResetByStore2          {...props} />,
		floorByStore2:           <FloorByStore2          {...props} />,
		buildByStore2:           <BuildByStore2          {...props} />,
		letterByStore2:          <LetterByStore2         {...props} />,
		pageByStore2:            <PageByStore2           {...props} />,
		turnByStore2:            <TurnByStore2           {...props} />,
		mapByStore2:             <MapByStore2            {...props} />,
		navByStore2:             <NavByStore2            {...props} />,
		storeBlock:              <StoreBlock             {...props} />,
		qrcodeHui:               <QrcodeHui              {...props} />,
		qrcodeNav:               <QrcodeNav              {...props} />,
		listByVoice:             <ListByVoice            {...props} />,
		buttonByActivity:        <ButtonByActivity       {...props} />,
		viewByActivity:          <ViewByActivity         {...props} />,
		listByActivity:          <ListByActivity         {...props} />,
		pageByIV:                <PageByIV               {...props} />,
		turnByIV:                <TurnByIV               {...props} />,
		swiperBlockByIV:         <SwiperBlockByIV        {...props} />,
		buttonFullScreenByIV:    <ButtonFullScreenByIV   {...props} />,
		listByScroll:            <ListByScroll           {...props} />,
	}
	return render[name]
}

class Custom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {v:false,h:false,vPosition:{left:0},hPosition:{top:0},nearPos:false,dragAxis:'both',drag:true}
	}
	componentWillMount() {}

	componentDidMount() {}
	componentWillReceiveProps() {
		let { data, editConfig } = this.props
		let { cusCompIdx } = editConfig.curData
		let state = {}
		let comp  = data.data.components || []
		if (cusCompIdx < 0 || !comp[cusCompIdx]) return
		state[cusCompIdx] = comp[cusCompIdx].data.layout
		this.state.drag ? this.setState(state) : null
	}
	
	selectComp(e, data, idx, parentIdx, parent) {
		e.stopPropagation()
		e.preventDefault()
		let { layout } = data.data
		this.setState({v:false,h:false,nearPos:false})
		this.state[idx] = deepCopy(layout)
		let { actions, editConfig, keyCtrl } = this.props
		let { globalData, curData } = editConfig
		let { compIdx, cusCompIdx } = curData
		let { type } = globalData.multiComp
		if (keyCtrl && (type === 'parent' || (type === 'child' && parentIdx !== compIdx))) return
		if (compIdx === parentIdx && cusCompIdx === idx) return
		curData.compIdx    = parentIdx
		curData.cusCompIdx = idx
		curData.parentComp = parent
		actions.updateCur(curData)		// 更新 当前数据
		actions.selectComp(data)
	}

	selectMulti(e, idx, parentIdx) {
		e.stopPropagation()
		let { actions, editConfig, keyCtrl } = this.props
		let { globalData, curData } = editConfig
		let { compIdx, cusCompIdx } = curData
		let { multiComp }   = globalData
		let { index, list, type } = multiComp
		if (keyCtrl) {
			if (type === 'parent' || (type === 'child' && parentIdx !== compIdx)) return message.success('不能跨级选组件!')
			if (index[idx]) {
				// delete index[idx]
				list.remove(idx)
			}
			index[idx] = true
			list.unshift(idx)
		} else {
			var s = {}
			s[idx] = true
			multiComp.index = s
			multiComp.list  = [idx]
		}
		multiComp.type = 'child'
		multiComp.parentIdx = parentIdx
		actions.updateGlobal(globalData)
	}

	resizeFn(e, ref, delta, pos, item, idx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let lay = item.data.layout
		lay.left   = +pos.x
		lay.top    = +pos.y
		lay.width  = +ref.offsetWidth
		lay.height = +ref.offsetHeight
		this.setState({v:false,h:false,nearPos:false}) 
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

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
	//显示提示线
	showLine = (param,_,i,obj) => {
		let { data, actions, editConfig } = this.props,
			{ globalData: { banner } } = editConfig,
			bannerData = banner,
			eles       = data.data.components || [],
			bodySty    = { ...data.data.layout, ...{left:0,top:0}},
			layout     = obj? { ..._.data.layout, ...obj}: _.data.layout,
			InductionLineObj = InductionLine(param,eles,layout,i,bodySty,eleKnock),
			v= InductionLineObj.v,h=InductionLineObj.h,eleKnock = InductionLineObj.eleKnock
		if (v)        this.setState( { v: true,  vPosition: { left:   `${v.left}px`, p_left: v.p_left } })
		else          this.setState( { v: false, vPosition: { p_left: param.x } })
		if (h)        this.setState( { h: true,  hPosition: { top:    `${h.top}px`, p_top: h.p_top } })
		else          this.setState( { h: false, hPosition: { p_top:  param.y } })
		if (eleKnock) this.setState( { nearPos: nearPosSty(eleKnock, bannerData) })
		else          this.setState( { nearPos: false})
	}
	// 拖拽
	dragMove(e, param, _, i) {
		e.stopPropagation()
		let lay = deepCopy(_.data.layout)
		if (this.props.shift) {
			if (Math.abs(lay.top - param.y) > Math.abs(lay.left - param.x)) {
				let layout = deepCopy(_.data.layout),
					pos = { x: param.x, y: param.y }
				pos.x = layout.left
				this.setState({ dragAxis: 'y', drag: false }, () => { this.showLine(pos,_,i) })
			} else {
				let layout = deepCopy(_.data.layout),
					pos = { x: param.x, y: param.y }
				pos.y = layout.top
				this.setState({ dragAxis: 'x', drag: false }, () => { this.showLine(pos,_,i) })
			}
		} else {
			this.setState({ dragAxis: 'both', drag: false }, () => { this.showLine(param,_,i) })
		} 
	}
	dragStop(e, d, item, idx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let lay = item.data.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = this.state.vPosition.p_left
		lay.top  = this.state.hPosition.p_top
		this.setState({v:false,h:false,nearPos:false,drag:true})
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	removeComp(e, idx, parent) {
		e.stopPropagation()
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		editConfig.curComp = {}
		curData.cusCompIdx = -1
		let { components } = data.data
		components.splice(idx, 1)
		actions.updateComp(editConfig.curData.compIdx, parent)
		actions.updateCur(curData)
		actions.selectComp(parent)
	}
	render() {
		let { data, actions, idx, csn, editConfig, ioInput, ioOuter, name } = this.props
		let { globalData, curData } = editConfig
		let { multiComp } = globalData
		let { language } = globalData.data
		let { index, type } = multiComp
		let state = this.state
		let { compIdx, cusCompIdx } = curData
		let icomp = ioInput.comp
		let comp  = data.data.components
		let childNode = comp.map((_, i) => {
			if (!_) return null
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				ani      = _.data.animation || {},
				aniCls   = '',
				aniSty   = {},
				compCon  = compContent(compName, _, data, editConfig, actions, `Style${styleIdx + 1}`, ioInput, ioOuter, state.drag, language)

			if (icomp && icomp[compName]) {
				let v   = icomp[compName],
					k   = v.key.split('.'),
					len = k.length,
					ob  = _

				k.map((__, l) => {
					if (l !== len - 1) ob = ob[__]
					else ob[__] = v.value
				})
			}

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
			let lay = compIdx === idx && i === cusCompIdx? sl? sl: layout: layout
			return (
				<Rnd
					key={i}
					bounds={`.${csn}`}
					className={`${compIdx === idx && (type === 'child' && index[i])? 's-select': ''} ${compIdx === idx && i === cusCompIdx? 's-active': ''}`}
					size={{
						width:  lay.width || '100%',
						height: lay.height
					}}
					position={{
						x: lay.left,
						y: lay.top
					}}
					dragAxis={state.dragAxis}
					style={{ position: lay.position }}
					onDragStart={e     => this.selectComp(e, _, i, idx, data)}
					onDrag={(e, param) => this.dragMove(e, param, _, i)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i, data)}
					onResizeStart={e   => this.selectComp(e, _, i, idx, data)}
					onResize={(e, dir, ref, delta, pos) => this.dragResize(e, ref, delta, pos, _, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i, data)}
				>
					<div
						className={`pge-layout ${compName} ${aniCls? aniCls: ''}`}
						style={aniSty}
						onClick={e => {this.selectComp(e, _, i, idx, data);this.selectMulti(e, i, idx)}}
						onContextMenu={e => this.selectComp(e, _, i, idx, data)}
					>{ compCon }</div>
				</Rnd>
			)
		})  
		return (
			<section className={`pg-custom ele-${data.name} ${csn} scrollbar`} id="pg-custom">
				{ childNode }
				{state.h ? <div className="inductionLine-h" style={state.hPosition}></div> : null}
				{state.v ? <div className="inductionLine-v" style={state.vPosition}></div> : null}
				{
					state.nearPos ? <div>
						<div className="lineNear_0" style={state.nearPos[0]}></div>
						<div className="lineNear_1" style={state.nearPos[1]}></div>
						<div className="lineNear_2" style={state.nearPos[2]}></div>
						<div className="lineNear_3" style={state.nearPos[3]}></div>
					</div> : null
				}  
			</section>
		)
	}
}

Custom.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Custom)
