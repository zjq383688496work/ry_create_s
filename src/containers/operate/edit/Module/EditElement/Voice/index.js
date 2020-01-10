import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class Voice extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ioInput: {} }
	}
	
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}

	ioOuter = ipt => {
		console.clear()
	}

	selectComp = (e, voice) => {
		e.stopPropagation()
		var { actions } = this.props
		actions.selectComp(voice)
	}

	render() {
		let { curPage, globalData: { voice } } = this.props.editConfig
		if (!voice) return null

		let Custom = cusMap[envType] || CustomV
		let { voiceCheck = true } = curPage.feature

		return voice.feature.visible && voiceCheck
			?
			(
			<div onClick={e => this.selectComp(e, voice)}>
				<Custom
					{...this.props}
					name={'voice'}
					csn={`handle-drag-${Math.random() * 1e9 | 0}`}
					data={voice}
					ioInput={this.state.ioInput}
					ioOuter={this.ioOuter.bind(this)}
				/>
			</div>
			): null
	}
}
