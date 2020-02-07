import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Row, Col, Collapse, Radio, Icon, message } from 'antd'
const { Panel } = Collapse

const RadioButton = Radio.Button
const RadioGroup  = Radio.Group


import * as variable from 'var'
let { languages } = variable
let {
	indexs: languageIndexs,
	values: languageValues
} = languages



class LanguageChange extends React.Component {
	onChange = val => {
		let { actions, editConfig } = this.props,
			{ language = {} } = editConfig.globalData.data
		language.default = val
		actions.updateGlobal(editConfig.globalData)
	}
	renderLanguage = () => {
		let { language = {} } = this.props.editConfig.globalData.data,
			{ default: defaultValue, list = [] } = language

		if (list.length < 2) return null

		let domButton = list.map(({ key }, i) => (<RadioButton key={i} value={key}>{languageIndexs[key]}</RadioButton>))
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value)} value={defaultValue}>
				{ domButton }
			</RadioGroup>
		)
	}
	render() {
		var props = this.props.data

		let domLanguage = this.renderLanguage()

		if (!domLanguage) return null

		return (
			<div>
				<Collapse activeKey={['0']}>
					<Panel header={'语言切换'} key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">选择语言</div>
							<div className="pgsr-ctrl">
								{ domLanguage }
							</div>
						</div>
					</Panel>
				</Collapse>
			</div>
		)
	}
}

LanguageChange.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LanguageChange)
