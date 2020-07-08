import React from 'react'

import './index.less'

import OneNewActive from '../../StoreListNew/OneNewActive'

export default class ListByActivity extends React.Component {
	constructor(props) {
		super(props)
	}
	renderList = (idx, list) => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data
		if (!list.length) return null
		return list.map((_, i) => {
			let cl   = [],
				isAV = !i
			componentLayout.map(__ => {
				var { active } = __.feature
				if ((isAV && active) || (!isAV && !active)) {
					cl.push(__)
				}
			})
			return <Layout data={dataNew} refresh={true} />
			// return <Layout key={i} data={_} layout={layout} components={cl} styleObj={cssColorFormat(this.props, 'filter')} />
		})
	}
	render() {
		let { idx, list } = this.props.ioInput
		let listDom = this.renderList(idx, list)
		return ( 
			<div className="e-list-by-activity">
				{ listDom }
			</div>
		)  
	}
}
