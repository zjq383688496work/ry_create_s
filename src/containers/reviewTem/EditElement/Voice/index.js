import React from 'react'
import './index.less'

import Custom from '../Comp/Custom'

export default class Voice extends React.Component {
	constructor(props) {
		super(props)

		// let { voice } = props.editConfig.globalData
		this.state = {
			// voice,
			idx: 0,
			ioInput: {}
		}
	}

	componentWillMount() {
		// let { curPage, globalData: { voice } } = this.props.editConfig,
		// 	{ voiceCheck = true } = curPage.feature

		// if (!voice.feature.visible || !voiceCheck) return
	}

	ioOuter = ({ status, router }) => {
		let { idx } = this.state
		let { globalData } = this.props.editConfig,
			{ data, feature } = globalData.voice,
			{ status: { list }, statusIndex } = feature
		if (status && list[url]) {
			let { type, url } = status
		}
		data.components = list[url].components
		this.setState({ idx: ++idx })
	}

	// selectComp = (e, voice) => {
	// 	e.stopPropagation()
	// 	var { actions } = this.props
	// 	actions.selectComp(voice)
	// }

	render() {
		// let { voice } = this.state
		let { curPage, globalData: { voice } } = this.props.editConfig
		if (!voice) return null

		let { voiceCheck = true } = curPage.feature

		return voice.feature.visible && voiceCheck
			?
			(
			<div className="ele-voice">
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
