import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class ResetByStore2 extends React.Component {
	constructor(props) {
		super(props)
	}
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	renderDom = e => {
		let { data, ioInput } = this.props,
			{ catg } = ioInput.body,
			{ componentLayout, layout } = data.data
		let cl = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((typeof catg != 'number' && active) || (typeof catg === 'number' && !active)) {
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
				className={`e-reset-by-store2`}
				style={cssColorFormat(this.props, 'filterBox')}
			>
				{ dom }
			</section>
		)
	}
}
