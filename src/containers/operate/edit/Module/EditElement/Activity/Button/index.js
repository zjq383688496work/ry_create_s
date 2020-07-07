import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class ButtonByActivity extends React.Component {
	constructor(props) {
		super(props)
	}
	renderDom = e => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data
		let slide = (
			<Layout
				data={{}}
				layout={layout}
				components={componentLayout}
			/>
		)
		return slide
	}
	render() {
		let dom = this.renderDom()
		return (
			<section className={`e-button-by-activity`} style={cssColorFormat(this.props, 'filterBox')}>
				{ dom }
			</section>
		)
	}
}
