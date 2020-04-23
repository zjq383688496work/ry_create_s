import React from 'react'
// import './index.less'

import Layout from '../../Layout'

export default class TabByTabs extends React.Component {
	constructor(props) {
		super(props)
	}
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) return newProps.drag
		return true
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {}

	selectVal = () => {
		let { data, ioInput, ioOuter } = this.props,
			{ url } = data.data.content.status

		if (!url || ioInput === url) return
		ioOuter(url)
	}

	renderDom = () => {
		let { data, ioInput } = this.props,
			{ componentLayout, content, layout } = data.data,
			{ url } = content.status,
			cl = componentLayout.filter(({ feature: { active } }) => ((active && ioInput == url) || (!active && ioInput != url)))

		let dataNew = JSON.parse(JSON.stringify(data))
		dataNew.data.componentLayout = cl

		return <Layout
			data={dataNew}
			components={cl}
			styleObj={cssColorFormat(this.props, 'filter')}
			refresh={true}
		/>
	}

	render() {

		return (
			<section className={`e-tab-by-tabs`} onClick={this.selectVal}>
				{ this.renderDom() }
			</section>
		)
	}
}
