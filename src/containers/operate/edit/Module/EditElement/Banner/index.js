import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import SwiperImgAndVideo from 'compEdit/EditElement/SwiperImgAndVideo'

import * as actions from 'actions'
import './index.less'

class Banner extends React.Component {
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
	render() {
		let { actions, editConfig, location } = this.props
		let { curData, globalData } = editConfig
		let { banner } = globalData
		let state    = this.state
		let compName = banner.name,
			layout   = banner.data.layout
		return (
			<div className={`pge-banner ${curData.contentType === 'banner'? 's-active': ''}`}
				onClick={e => { envType === 'operate'? this.selectComp(e, banner): null}}>
				<SwiperImgAndVideo
					name={compName}
					data={banner}
					actions={actions}
				/>
			</div>
		)
	}
}

Banner.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Banner)


