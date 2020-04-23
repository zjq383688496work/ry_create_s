import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class ListByStore2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = { list: [] }
	}
	componentWillMount() {
		this.getData()
	}
	componentWillReceiveProps(props) {
		var { size } = props.ioInput.body,
			size2 = this.state.size
		if (size2 != size) this.getData()
	}
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) return newProps.drag
		else return true
	}
	getData = e => {
		var { size } = this.props.ioInput.body
		Server.store.getList(size, o => {
			this.setState({ list: o, size: size })
		})
	}
	renderList = e => {
		let { data, ioInput } = this.props,
			{ list = [] } = this.state,
			{ componentLayout, layout } = data.data
		return list.map((_, i) => {
			if(i >= 6 ){_.featuredShop = false}
			return <Layout key={i} data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-list-by-store2`}>
				{ dom }
			</section>
		)
	}
}
