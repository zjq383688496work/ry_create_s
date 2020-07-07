import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class CatgSecByStore2 extends React.Component {
	constructor(props) {
		super(props)
		var { catgSec = [] } = props.ioInput
		this.state = { list: catgSec }
	}
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) return newProps.drag
		return true
	}
	renderItem = (item, catgSec, idx) => {
		let { data } = this.props,
			{ id } = item,
			{ componentLayout, layout } = data.data,
			// isAV = id === catgSec,
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
			return <div key={i}>{this.renderItem(_, body.catgSec, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-catg2-by-store2 scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-catg2-by-store2-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
