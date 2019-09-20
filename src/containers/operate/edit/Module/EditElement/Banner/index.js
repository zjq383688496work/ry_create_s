import React from 'react'

import SwiperImgAndVideo from 'compEdit/EditElement/SwiperImgAndVideo'

import './index.less'

var positionMap = {
	top:    'unshift',
	left:   'unshift',
	bottom: 'push',
	right:  'push',
}

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
	bannerDom = () => {
		var { actions, editConfig } = this.props,
			{ bannerAds, composeType = 'PORTRAIT' } = tempCfg,
			{ curData, curPage, globalData } = editConfig,
			{ contentType } = curData,
			{ banner } = globalData,
			{ data, feature, name } = banner,
			{ height, width } = data.layout,
			{ position }      = feature.swiperOptions,
			{ bannerCheck = true } = curPage.feature,
			h = composeType === 'PORTRAIT'? height: '100%',
			w = composeType === 'LANDSCAPE'? width: '100%'
		if (!banner || bannerAds != 1) return { position: 'top', DOM: null }

		var style = { height: h, width: w }
		var DOM = (
			bannerCheck
			?
			<div className="bannerBox" style={style}>
				<div
					className={`pge-banner ${contentType === 'banner'? 's-active': ''}`}
					onClick={e => this.selectComp(e, banner)}
				>
					<SwiperImgAndVideo
						name={name}
						data={banner}
						actions={actions}
					/>
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
			<section id="pgElement" className="pg-element pg-operate">
				{ dir === 'unshift'? DOM: null }
				{ children }
				{ dir === 'push'? DOM: null }
			</section>
		)
	}
}
