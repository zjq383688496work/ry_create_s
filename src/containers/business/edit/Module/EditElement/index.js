/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'


import Picture           from 'compEdit/EditElement/Picture'
import Web               from 'compEdit/EditElement/Web'
import Text              from 'compEdit/EditElement/Text'
import Button            from 'compEdit/EditElement/Button'
import Video             from 'compEdit/EditElement/Video'
import SwiperImage       from 'compEdit/EditElement/SwiperImage'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'
import Time              from 'compEdit/EditElement/Time'
import Weather           from 'compEdit/EditElement/Weather'
import StoreList         from 'compEdit/EditElement/StoreList'
import StoreDetails      from 'compEdit/EditElement/StoreDetails'
import StoreInstro       from 'compEdit/EditElement/StoreInstro'
import DateWeather       from 'compEdit/EditElement/DateWeather'
import Navigation        from 'compEdit/EditElement/Navigation'
import NavigationFloat   from 'compEdit/EditElement/NavigationFloat'
import SplitLine         from 'compEdit/EditElement/SplitLine'
import Map2D             from 'compEdit/EditElement/Map2D'

import RevokeRecovery    from 'compEdit/EditCommon/RevokeRecovery'

import * as actions from 'actions'

import './index.less'

import * as variable from 'var'

const ctMap = variable.composeTypeMap

const compContent = (name, data, actions, type, idx, csn) => {
	var props  = { data, actions, type, idx, csn },
		render = {
		picture:           <Picture           {...props} />,
		web:               <Web               {...props} />,
		video:             <Video             {...props} />,
		text:              <Text              {...props} />,
		button:            <Button            {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		time:              <Time              {...props} />,
		weather:           <Weather           {...props} />,
		navigation:        <Navigation        {...props} />,
		navigationFloat:   <NavigationFloat   {...props} />,
		storeList:         <StoreList         {...props} />,
		storeDetails:      <StoreDetails      {...props} />,
		storeInstro:       <StoreInstro       {...props} />,
		splitLine:         <SplitLine         {...props} />,
		dateWeather:       <DateWeather       {...props} />,
		map2D:             <Map2D             {...props} />
	}
	return render[name]
}

class EditElement extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

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

	render() {
		let { data, actions, editConfig, location } = this.props
		let ct     = tempCfg.composeType || 'PORTRAIT'
		let ads    = tempCfg.adsFlag? 'ads': ''
		if (!data || data.title === undefined) return (<div className={`pg-element-parent e-flex-box pg-element-${ct} ${ads}`}><section className="pg-element"></section></div>)
		let eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type
		ct = ctMap[ct]? ct: 'PORTRAIT'
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
				csn       = `ry-jimmy`,
				compCon   = compContent(compName, _, actions, `Style${styleIdx + 1}`, i, csn)
			
			if (!compCon) return false
				
			return (
				<div
					key={i}
					className={`pge-layout${i === editConfig.curData.compIdx? ' s-active': ''}`}
					style={layout}
					onClick={e => this.selectComp(e, _, i)}
				>
					{ compCon }
				</div>
			)
		})
		return (
			<div className={`pg-element-business e-flex-box pg-element-${ct} ${ads}`}>
				<div className="pg-element-box">
					{ ads
						? <div className="ads-placeholder">16:9广告位</div>
						: null
					}
					<section className="pg-element" style={bgStyle}>
						{ childNode }
					</section>
					<RevokeRecovery />
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
