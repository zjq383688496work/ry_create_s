import React from 'react'

import SwiperImgAndVideo from 'compEdit/EditElement/SwiperImgAndVideo'
import SwiperIV          from 'compEdit/EditElement/SwiperIV'
import Voice             from 'compEdit/EditElement/Voice'

// import './index.less'

var positionMap = {
	top:    'unshift',
	left:   'unshift',
	bottom: 'push',
	right:  'push',
}
var oldMap = {
	bannerHorizontal: 1,
	bannerVertical:   1,
}
const compContent = (name, data, actions) => {
	var props  = { name, data, actions }
	var render = {
		bannerHorizontal:   <SwiperImgAndVideo  {...props} />,
		bannerVertical:     <SwiperImgAndVideo  {...props} />,
		bannerHorizontalIV: <SwiperIV           {...props} />,
		bannerVerticalIV:   <SwiperIV           {...props} />,
	}
	return render[name]
}

// const comp     = require('state/comp')

export default class Banner extends React.Component {
	selectComp(e, data) {
		e.stopPropagation()
		var { actions, editConfig } = this.props,
			{ curData } = editConfig
		curData.contentType = 'banner'
		curData.compIdx     = -1
		curData.cusCompIdx  = -1
		curData.parentComp  = null
		actions.updateCur(editConfig.curData)
	}
	getBanner = (banner, composeType) => {
		try {
			var { data, feature, name } = banner
			
			// if (!data.content.length) return false
			
			var { height, width } = data.layout,
				position,
				// { position }      = feature.swiperOptions,
				h = composeType === 'PORTRAIT'? height: '100%',
				w = composeType === 'LANDSCAPE'? width: '100%'

			if (oldMap[name]) {
				position = feature.swiperOptions.position
			} else {
				let { content } = data
				position = content.positionH || content.positionV
			}

			return {
				width:  w,
				height: h,
				name,
				position
			}
		} catch(e) {
			return false
		}
	}
	bannerDom = () => {
		var { actions, editConfig } = this.props,
			{ composeType = 'PORTRAIT' } = tempCfg,
			{ curData, curPage, globalData } = editConfig,
			{ banner } = globalData
		
		// comp
		var bannerEle = this.getBanner(banner, composeType)

		if (!bannerEle) return { position: 'top', DOM: null }

		var { width, height, name, position } = bannerEle,
			{ contentType } = curData,
			{ bannerCheck = true } = curPage.feature
		var DOM = (
			bannerCheck
			?
			<div className="bannerBox" style={{ height, width }}>
				<div
					className={`pge-banner ${contentType === 'banner'? 's-active': ''}`}
					onClick={e => this.selectComp(e, banner)}
				>
					{ compContent(name, banner, actions) }
				</div>
			</div>
			: null
		)

		return {
			position,
			DOM
		}
	}
	render() {
		var { children } = this.props

		var { position, DOM } = this.bannerDom()

		var dir = positionMap[position]

		return (
			<section id="pgElement" className={`pg-element pg-${envType === 'business'? 'business': 'operate'}`}>
				{ dir === 'unshift'? DOM: null }
				{ children }
				{ dir === 'push'? DOM: null }
				<Voice {...this.props} />
			</section>
		)
	}
}
