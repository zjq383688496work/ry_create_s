import React from 'react'
import './index.less'
import Custom from '../Custom'

export default class Tabs extends React.Component {
	constructor(props) {
		super(props)

		let { data } = props
		this.state = {
			ioInput: deepCopy(data.data.content.tab_default.url),
			data: deepCopy(data)
		}
	}
	componentWillMount() {
		this.init()
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps(props) {}

	ioOuter = ipt => {
		this.init(ipt)
	}

	init = _url => {
		let { data, feature } = this.state.data,
			url = _url || this.state.ioInput,
			{ status: { list }, tabs } = feature,
			curStatus = list[url]

		if (!curStatus) data.components = []
		else data.components = deepCopy(curStatus.components || [])

		let { components } = data,
			comps = components.filter(({ name }) => name !== 'tabByTabs')
		data.components = [ ...comps, ...tabs ]
		this.setState({ ioInput: url })
	}

	render() {
		let { action } = this.props
		let { data } = this.state
		return (
			<Custom
				data={data}
				action={action}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}
