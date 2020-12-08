import React from 'react'

import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class ListByScroll extends React.Component {
	constructor(props) {
		super(props)
	}
	renderList = (list, types) => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data
		if (!list.length) return null

		return list.map((_, i) => {
			return <Layout key={i} data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
		})
	}
	render() {
		let { list, types } = this.props.ioInput
		let listDom = this.renderList(list, types)
		return ( 
			<div className="e-list-by-scroll" style={cssColorFormat(this.props, 'filterFlex')}>
				{ listDom }
			</div>
		)  
	}
}
