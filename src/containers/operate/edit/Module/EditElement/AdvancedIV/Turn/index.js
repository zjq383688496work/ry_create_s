import React from 'react'
// import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class TurnByIV extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		if (newProps.drag != undefined) return newProps.drag
		return true
	}
	renderItem = () => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data,
			cl = componentLayout.filter(({ feature: { active } }) => active)
		return <Layout
			layout={layout}
			components={cl}
		/>
	}
	render() {
		return (
			<section className={`e-turn-by-iv scrollbar`}>
				{ this.renderItem() }
			</section>
		)
	}
}
