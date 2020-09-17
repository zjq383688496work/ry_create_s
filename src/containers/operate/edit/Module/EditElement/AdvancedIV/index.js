import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'
import * as Server from 'server'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class AdvancedIV extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ioInput: {
				list:    [],
				field:   {},
				current: 1
			}
		}
	}
	componentWillMount() {
		this.getData()
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	componentWillReceiveProps() {
		this.getData()
	}

	ioOuter = ipt => {
		console.clear()
	}

	getData = () => {
		let { data, db } = this.props,
			{ ioInput }  = this.state,
			{ content }  = data.data,
			{ current }  = ioInput,
			{ dbSource } = content

		let { list, field } = getDB(dbSource, db)
		let item = { ...list[0], page: current, total: list.length }

		Object.assign(ioInput, { list, field, item })
		this.setState({ ioInput })
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}
