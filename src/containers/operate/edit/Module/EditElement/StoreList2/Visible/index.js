import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class VisibleByStore2 extends React.Component {
	constructor(props) {
		super(props)
	}
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) return newProps.drag
		return true
	}
	renderDom = e => {
		let { data, ioInput } = this.props,
			{ catg } = ioInput.body,
			{ content, componentLayout, layout } = data.data,
			{ visibleSwitch = false } = content,
			cl = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((visibleSwitch && active) || (!visibleSwitch && !active)) {
				cl.push(_)
			}
		})
		let slide = (
			<Layout
				data={{}}
				layout={layout}
				components={cl}
			/>
		)
		return slide
	}
	render() {
		let dom = this.renderDom()

		return (
			<section
				className={`e-visible-by-store2`}
				style={cssColorFormat(this.props, 'filterBox')}
			>
				{ dom }
			</section>
		)
	}
}
