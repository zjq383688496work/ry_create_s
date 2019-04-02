/**
 * @Author: Along
 * @Date:   2019-03-21T17:21:39+08:00
 * @Last modified by:   Along
 * @Last modified time: 2019-03-22
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import Rnd from 'react-rnd'

import SwiperImgAndVideo from 'compEdit/EditElement/SwiperImgAndVideo'

import * as actions from 'actions'
import { Icon, message } from 'antd'
import './index.less'

class Banner extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			choose:false
		}
	}
	selectComp(e, data) {
		e.stopPropagation()
		this.setState({choose:true}) 
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	} 
	//scale停止
	resizeFn(e, ref, delta, pos, item) {
		e.stopPropagation()
		let { actions,editConfig } = this.props,
			{ globalData } = editConfig,
			lay = item.data.layout
		lay.width  = +ref.offsetWidth
		lay.height = +ref.offsetHeight
		globalData.banner = item
		actions.updateGlobal(globalData)
	}   
	render() {
		let { actions, editConfig, location } = this.props
		let { globalData } = editConfig
		let { banner } = globalData
		let state  = this.state
		let compName  = banner.name,
			layout    = banner.data.layout,
			dragAxis = tempCfg.composeType == 'LANDSCAPE' ? "x" : "y"
		return envType === 'operate' ? (
			<Rnd
				className={`${state.choose ? 's-select': ''}`}
				size={{
					width:  layout.width || '100%',
					height: layout.height
				}}
				position={{
					x: layout.left,
					y: layout.top
				}}
				dragAxis={dragAxis}
				disableDragging={true} 
				onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, banner)}
			>
				<div className={`pge-layout`}
					onClick={e => {this.selectComp(e, banner)}}>
					<SwiperImgAndVideo 
						name={compName}
						data={banner}
						actions={actions}
						/>
				</div>
			</Rnd>
		) : (<div className={`pge-layout`} >
				<SwiperImgAndVideo 
					name={compName}
					data={banner}
					actions={actions}
					/>
			</div>)
	}
}

Banner.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Banner)


