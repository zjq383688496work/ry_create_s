import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class SwiperBlockByIV extends React.Component {
	constructor(props) {
		super(props)
		// let { current, data, fields } = props.ioInput
		// this.state = {
		// 	current,
		// 	data,
		// 	fields,
		// }
	}
	componentWillReceiveProps(props) {
		// let { current, data, fields } = props.ioInput
		// this.setState({ current, data, fields })
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	renderList = e => {
		let { data, ioInput } = this.props,
			{ list = [] } = ioInput,
			{ componentLayout, layout } = data.data
		let listDom = list.map((_, i) => {
			return (
				<div key={i}>
					<Layout data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
				</div>
			)
		})
		return listDom
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-swiperblock-by-iv`}>
				{ dom }
			</section>
		)
	}
}

