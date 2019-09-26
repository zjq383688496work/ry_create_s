import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class NavByStore2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let props = this.props,
			{ data, ioInput } = props,
			{ content, componentLayout = {}, layout = {} } = data.data,
			{ item } = ioInput,
			{ centerX, centerY } = content

		return (
			<section className={`e-nav-by-store2`} style={cssColorFormat(props, 'filterBox')}>
				<Layout data={item} layout={layout} components={componentLayout} />
				<div className="center-point" style={{ top: centerY, left: centerX }}></div>
			</section>
		)
	}
}
