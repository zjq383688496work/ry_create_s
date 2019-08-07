/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import './index.less'

import Rnd from 'react-rnd'
import { Icon } from 'antd'

import Picture      from 'compEdit/EditElement/Picture'
import Web          from 'compEdit/EditElement/Web'
import Button       from 'compEdit/EditElement/Button'
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
import ListByGoods  from 'compEdit/EditElement/GoodsList/ListByGoods'
import SplitLine         from 'compEdit/EditElement/SplitLine'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'
import PictureBind       from 'compEdit/EditElement/PictureBind'
import TextBind          from 'compEdit/EditElement/TextBind'
import SwiperBind        from 'compEdit/EditElement/SwiperBind'
import Area              from 'compEdit/EditElement/Area'
import PictureListBind   from 'compEdit/EditElement/PictureListBind'
import GoodsBar       from 'compEdit/EditElement/GoodsDetails/GoodsBar'
import GoodsBlock     from 'compEdit/EditElement/GoodsDetails/GoodsBlock'
import ChildElement   from 'compEdit/EditElement/ChildElement'
import SwiperByGoods  from 'compEdit/EditElement/GoodsList/SwiperByGoods'
import CatgByGoods    from 'compEdit/EditElement/GoodsList/CatgByGoods'
import ResetByGoods   from 'compEdit/EditElement/GoodsList/ResetByGoods'
import ListByStore2   from 'compEdit/EditElement/StoreList2/List'
import CatgByStore2   from 'compEdit/EditElement/StoreList2/Catg'
import ResetByStore2  from 'compEdit/EditElement/StoreList2/Reset'
import FloorByStore2  from 'compEdit/EditElement/StoreList2/Floor'
import BuildByStore2  from 'compEdit/EditElement/StoreList2/Build'
import LetterByStore2 from 'compEdit/EditElement/StoreList2/Letter'
import PageByStore2   from 'compEdit/EditElement/StoreList2/Page'
import MapByStore2    from 'compEdit/EditElement/StoreList2/Map'
import StoreBlock     from 'compEdit/EditElement/StoreDetails2/Block'
import QrcodeHui      from 'compEdit/EditElement/QrcodeHui'
import QrcodeNav      from 'compEdit/EditElement/QrcodeNav'

import * as variable from 'var'
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, parent, editConfig, actions, type, ioInput, ioOuter) => {
	var props  = { data, parent, editConfig, actions, type, ioInput, ioOuter }
	var render = {
		picture:           <Picture           {...props} />,
		web:               <Web               {...props} />,
		button:            <Button            {...props} />,
		text:              <Text              {...props} />,
		time:              <Time              {...props} />,
		weather:           <Weather           {...props} />,
		address:           <Address           {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		letter:            <Letter            {...props} />,
		floor:             <Floor             {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		catg:              <Catg              {...props} />,
		page:              <Page              {...props} />,
		floorMap:          <FloorMap          {...props} />,
		splitLine:         <SplitLine         {...props} />,
		reset:             <Reset             {...props} />,
		listByStore:       <ListByStore       {...props} />,
		listByGoods:       <ListByGoods       {...props} />,
		pictureBind:       <PictureBind       {...props} />,
		textBind:          <TextBind          {...props} />,
		swiperBind:        <SwiperBind        {...props} />,
		area:              <Area              {...props} />,
		pictureListBind:   <PictureListBind   {...props} />,
		goodsBar:          <GoodsBar          {...props} />,
		goodsBlock:        <GoodsBlock        {...props} />,
		childElement:      <ChildElement      {...props} />,
		swiperByGoods:     <SwiperByGoods     {...props} />,
		catgByGoods:       <CatgByGoods       {...props} />,
		resetByGoods:      <ResetByGoods      {...props} />,
		listByStore2:      <ListByStore2      {...props} />,
		catgByStore2:      <CatgByStore2      {...props} />,
		resetByStore2:     <ResetByStore2     {...props} />,
		floorByStore2:     <FloorByStore2     {...props} />,
		buildByStore2:     <BuildByStore2     {...props} />,
		letterByStore2:    <LetterByStore2    {...props} />,
		pageByStore2:      <PageByStore2      {...props} />,
		mapByStore2:       <MapByStore2       {...props} />,
		storeBlock:        <StoreBlock        {...props} />,
		qrcodeHui:         <QrcodeHui         {...props} />,
		qrcodeNav:         <QrcodeNav         {...props} />,
	}
	return render[name]
}

class Custom extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	render() {
		let { data, actions, idx, csn, editConfig, ioInput, ioOuter, name } = this.props
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
				compCon  = compContent(compName, _, data, editConfig, actions, `Style${styleIdx + 1}`, ioInput, ioOuter)

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
			<section className={`pg-custom ele-${data.name} ${csn} scrollbar`}>
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
