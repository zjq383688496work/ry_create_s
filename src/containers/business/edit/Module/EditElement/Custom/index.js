import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import './index.less'

import Rnd from 'react-rnd'

import Picture      from 'compEdit/EditElement/Picture'
import Web          from 'compEdit/EditElement/Web'
import Audio        from 'compEdit/EditElement/Audio'
import Video        from 'compEdit/EditElement/Video'
import Button       from 'compEdit/EditElement/Button'
import ButtonStatus from 'compEdit/EditElement/ButtonStatus'
import ButtonAuto   from 'compEdit/EditElement/ButtonAuto'
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
import PictureBind       from 'compEdit/EditElement/PictureBind'
import TextBind          from 'compEdit/EditElement/TextBind'
import SwiperBind        from 'compEdit/EditElement/SwiperBind'
import Area              from 'compEdit/EditElement/Area'
// import PictureListBind   from 'compEdit/EditElement/PictureListBind'
// import GoodsBar       from 'compEdit/EditElement/GoodsDetails/GoodsBar'
// import GoodsBlock     from 'compEdit/EditElement/GoodsDetails/GoodsBlock'
// import ChildElement   from 'compEdit/EditElement/ChildElement'
import TabByTabs         from 'compEdit/EditElement/Tabs/TabByTabs'
import SwiperIV          from 'compEdit/EditElement/SwiperIV'
// import SwiperByGoods  from 'compEdit/EditElement/GoodsList/SwiperByGoods'
// import CatgByGoods    from 'compEdit/EditElement/GoodsList/CatgByGoods'
// import ResetByGoods   from 'compEdit/EditElement/GoodsList/ResetByGoods'
import ListByStore2    from 'compEdit/EditElement/StoreList2/List'
import RecListByStore2 from 'compEdit/EditElement/StoreList2/RecList'
import CatgByStore2    from 'compEdit/EditElement/StoreList2/Catg'
import CatgSecByStore2 from 'compEdit/EditElement/StoreList2/CatgSec'
import ResetByStore2   from 'compEdit/EditElement/StoreList2/Reset'
import FloorByStore2   from 'compEdit/EditElement/StoreList2/Floor'
import BuildByStore2   from 'compEdit/EditElement/StoreList2/Build'
import LetterByStore2  from 'compEdit/EditElement/StoreList2/Letter'
import PageByStore2    from 'compEdit/EditElement/StoreList2/Page'
import TurnByStore2    from 'compEdit/EditElement/StoreList2/Turn'
import MapByStore2     from 'compEdit/EditElement/StoreList2/Map'
import NavByStore2     from 'compEdit/EditElement/StoreList2/Nav'
import VisibleByStore2 from 'compEdit/EditElement/StoreList2/Visible'
import PictureByStore2 from 'compEdit/EditElement/StoreList2/Picture'
import StoreBlock      from 'compEdit/EditElement/StoreDetails2/Block'
import QrcodeHui       from 'compEdit/EditElement/QrcodeHui'
import QrcodeNav       from 'compEdit/EditElement/QrcodeNav'
import ListByVoice     from 'compEdit/EditElement/Voice/List'
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

const compContent = (name, data, parent, editConfig, actions, type, ioInput, ioOuter, language) => {
	var props  = { data, parent, editConfig, actions, type, ioInput, ioOuter, language }
	var render = {
		picture:                 <Picture           {...props} />,
		web:                     <Web               {...props} />,
		audio:                   <Audio             {...props} />,
		video:                   <Video             {...props} />,
		button:                  <Button            {...props} />,
		buttonStatus:            <ButtonStatus      {...props} />,
		buttonAuto:              <ButtonAuto        {...props} />,
		text:                    <Text              {...props} />,
		time:                    <Time              {...props} />,
		weather:                 <Weather           {...props} />,
		address:                 <Address           {...props} />,
		swiperImage:             <SwiperImage       {...props} />,
		letter:                  <Letter            {...props} />,
		floor:                   <Floor             {...props} />,
		wonderfulActivity:       <WonderfulActivity {...props} />,
		catg:                    <Catg              {...props} />,
		page:                    <Page              {...props} />,
		floorMap:                <FloorMap          {...props} />,
		// splitLine:               <SplitLine         {...props} />,
		reset:                   <Reset             {...props} />,
		listByStore:             <ListByStore       {...props} />,
		// listByGoods:             <ListByGoods       {...props} />,
		pictureBind:             <PictureBind       {...props} />,
		textBind:                <TextBind          {...props} />,
		swiperBind:              <SwiperBind        {...props} />,
		area:                    <Area              {...props} />,
		// pictureListBind:         <PictureListBind   {...props} />,
		// goodsBar:                <GoodsBar          {...props} />,
		// goodsBlock:              <GoodsBlock        {...props} />,
		// childElement:            <ChildElement      {...props} />,
		tabByTabs:               <TabByTabs         {...props} />,
		swiperIV:                <SwiperIV          {...props} />,
		// swiperByGoods:           <SwiperByGoods     {...props} />,
		// catgByGoods:             <CatgByGoods       {...props} />,
		// resetByGoods:            <ResetByGoods      {...props} />,
		listByStore2:            <ListByStore2      {...props} />,
		recListByStore2:         <RecListByStore2   {...props} />,
		catgByStore2:            <CatgByStore2      {...props} />,
		catgSecByStore2:         <CatgSecByStore2   {...props} />,
		resetByStore2:           <ResetByStore2     {...props} />,
		floorByStore2:           <FloorByStore2     {...props} />,
		buildByStore2:           <BuildByStore2     {...props} />,
		letterByStore2:          <LetterByStore2    {...props} />,
		pageByStore2:            <PageByStore2      {...props} />,
		turnByStore2:            <TurnByStore2      {...props} />,
		mapByStore2:             <MapByStore2       {...props} />,
		navByStore2:             <NavByStore2       {...props} />,
		visibleByStore2:         <VisibleByStore2   {...props} />,
		pictureByStore2:         <PictureByStore2   {...props} />,
		storeBlock:              <StoreBlock        {...props} />,
		qrcodeHui:               <QrcodeHui         {...props} />,
		qrcodeNav:               <QrcodeNav         {...props} />,
		listByVoice:             <ListByVoice       {...props} />,
		buttonByActivity:        <ButtonByActivity  {...props} />,
		viewByActivity:          <ViewByActivity    {...props} />,
		listByActivity:          <ListByActivity    {...props} />,
		pageByIV:                <PageByIV               {...props} />,
		turnByIV:                <TurnByIV               {...props} />,
		swiperBlockByIV:         <SwiperBlockByIV        {...props} />,
		buttonFullScreenByIV:    <ButtonFullScreenByIV   {...props} />,
		listByScroll:            <ListByScroll           {...props} />,
	}
	return render[name]
}

class Custom extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	render() {
		let { data, actions, idx, csn, editConfig, ioInput, ioOuter, name } = this.props
		let { language } = editConfig.globalData.data
		let icomp = ioInput.comp
		let comp  = data.data.components
		let childNode = comp.map((_, i) => {
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				ani      = _.data.animation,
				aniCls   = '',
				aniSty   = {},
				isEdit   = true,
				compCon  = compContent(compName, _, data, editConfig, actions, `Style${styleIdx + 1}`, ioInput, ioOuter, language)

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

			if (!compCon) return false
				
			return (
				<div
					key={i}
					className={`pge-layout`}
					style={{ ...layout, ...aniSty }}
				>
					{ compCon }
				</div>
			)
		})
		return (
			<section className={`pg-custom pg-custom-business ele-${data.name} ${csn} scrollbar`}>
				{ childNode }
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
