import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class WonderfulActivity2 extends React.Component {
	constructor(props) {
		super(props)

		let ioInput = {
			list: [],
			idx:  0,
			item: null,
		}
		this.state = {
			ioInput
		}
	}
	componentWillMount() {
		this.getData()
	}
	componentDidMount() {}
	componentWillUnmount() {}

	ioOuter = ipt => {
	}

	getData = e => {
		let { data, db } = this.props,
			{ ioInput }  = this.state,
			{ content }  = data.data,
			{ current }  = ioInput,
			{ dbSource } = content
		let { list, field, types } = getDB(dbSource, db)
		list = deepCopy(list)
		let mediaType = types[2]
		list.forEach(item => {
			Object.keys(mediaType).forEach(key => {
				let med = item[key]
				if (!med) return item[key] = ''
				let { media } = med
				let { originalSizePreview, preview, url } = media
				item[key] = originalSizePreview || preview || url || ''
			})
		})
		Object.assign(ioInput, { list, field, item: list[0], types })
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
