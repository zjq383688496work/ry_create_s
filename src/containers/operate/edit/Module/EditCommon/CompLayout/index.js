/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { Icon, message, Modal } from 'antd'

import * as variable from 'var'
var compMap = variable.compMap.name

export default class CompLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = { visible: false }
	}

	componentWillMount()   {}
	componentDidMount()    {}
	componentWillUnmount() {}

	showModal = () => {
		this.setState({ visible: true })
	}
	handleCancel = () => {
		this.setState({ visible: false })
	}

	render() {
		let { actions, editConfig } = this.props
		let { visible } = this.state

		return (
			<div className="comp-layout">
				<a onClick={this.showModal}>编辑布局</a>
				<Modal
					width={'80%'}
					visible={visible}
					title="编辑布局"
					onCancel={this.handleCancel}
					footer={null}
				>
					
				</Modal>
			</div>
		)
	}
}
