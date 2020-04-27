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

	init = props => {
		let { data, feature } = props.data,
			{ status, tabs }  = feature,
			{ idx, list }     = status,
			curStatus = list[idx],
			comps
		if (!curStatus) comps = []
		comps = curStatus.components || []
		data.components = [ ...comps, ...tabs ]
		this.state = { ioInput: deepCopy(feature) }
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
