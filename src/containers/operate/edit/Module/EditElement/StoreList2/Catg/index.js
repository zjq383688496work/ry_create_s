import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class CatgByStore2 extends React.Component {
	constructor(props) {
		super(props)
		var { catg = [] } = props.ioInput
		this.state = { list: catg }
	}
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) return newProps.drag
		return true
	}
	renderItem = (item, catg, idx) => {
		let { data } = this.props,
			{ id } = item,
			{ componentLayout, layout } = data.data,
			// isAV = id === catg,
			isAV = !idx,
			cl   = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((isAV && active) || (!isAV && !active)) {
				cl.push(_)
			}
		})
		return <Layout
			data={item}
			layout={layout}
			components={cl}
			styleObj={cssColorFormat(this.props, 'filter')}
		/>
	}
	renderList = () => {
		let { body } = this.props.ioInput,
			{ list } = this.state
		return list.map((_, i) => {
			return <div key={i}>{this.renderItem(_, body.catg, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-catg-by-store2 scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-catg-by-store2-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
