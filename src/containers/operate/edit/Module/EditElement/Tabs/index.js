import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class Tabs extends React.Component {
	constructor(props) {
		super(props)
		this.dataInit(props)
		this.init(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps(props) {
		let { feature } = props.data,
			ipt = deepCopy(feature)
		this.init(props)
		this.ioOuter(ipt)
	}

	ioOuter = ipt => {
		this.setState({ ioInput: ipt })
	}

	dataInit = props => {
		let { data, feature } = props.data,
			{ components, content } = data,
			{ url = 1 } = content.tab_default,
			{ list }  = feature.status,
			curStatus = list[url]
		if (!curStatus) data.components = []
		data.components = deepCopy(curStatus.components || [])
	}

	init = props => {
		let { data, feature } = props.data,
			{ components } = data,
			{ tabs } = feature,
			ipt = deepCopy(feature),
			comps = components.filter(({ name }) => name !== 'tabByTabs')

		// data.components = [ ...comps, ...tabs ]
		data.components = [ ...comps, ...tabs ]
		this.state = { ioInput: ipt }
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter}
			/>
		)
	}
}
