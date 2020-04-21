import React from 'react'
// import './index.less'

import Layout from 'compEdit/EditElement/Layout'

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

	renderDom = () => {
		let { data, parent } = this.props,
			{ componentLayout, content, layout } = data.data,
			{ url: pUrl } = parent.data.content.tab_default,
			{ url } = content.status,
			cl = componentLayout.filter(({ feature: { active } }) => ((active && pUrl == url) || (!active && pUrl != url)))
		return <Layout
			data={{}}
			layout={layout}
			components={cl}
			styleObj={cssColorFormat(this.props, 'filter')}
		/>
	}

	render() {

		return (
			<section className={`e-tab-by-tabs`}>
				{ this.renderDom() }
			</section>
		)
	}
}
