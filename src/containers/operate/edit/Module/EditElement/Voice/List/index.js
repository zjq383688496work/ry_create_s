import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class ListByVoice extends React.Component {
	constructor(props) {
		super(props)
		this.state = { list: [] }
	}
	componentWillMount() {
		this.getData()
	}
	componentWillReceiveProps(props) {
		this.getData()
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	getData = e => {
		let { size = 8 } = this.props.data.data.content
		Server.store.getList(size, o => {
			this.setState({ list: o })
		})
	}
	renderList = e => {
		let { props, state } = this,
			{ componentLayout, layout } = props.data.data,
			{ list } = state
		return list.map((_, i) => {
			if (i % 3) _.featuredShop = false
			return <Layout key={i} data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(props, 'filter')} />
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-list-by-voice`}>
				{ dom }
			</section>
		)
	}
}
