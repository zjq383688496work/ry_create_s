import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

import calcOffset from './util_offset'

export default class RecListByStore2 extends React.Component {
	constructor(props) {
		super(props)
		let { cols, rows } = this.getGrid(props)
		this.state = {
			list: [],
			cols,
			rows
		}
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
	getGrid = props => {
		let { data, parent, shops } = props,
			{ size } = parent.data.content,
			{ layout, style } = data.data,
			{ width }  = layout,
			{ filter } = style,
			{ width: cWidth, margin } = filter,
			{ right, left } = margin,
			rows = width / (cWidth + right + left) >> 0,
			cols = Math.ceil(size / rows)
		return { cols, rows }
	}
	getData = e => {
		var { size } = this.props.ioInput.body
		Server.store.getList(size, o => {
			this.setState({ list: o, size })
		})
	}
	renderList = e => {
		let { props, state } = this,
			{ data, ioInput } = props,
			{ list = [], cols, rows }   = state,
			{ componentLayout, layout } = data.data
			// defaultStyle = cssColorFormat(props, 'filter')
		let listDom = list.map((_, i) => {
				let styles = calcOffset(list, props, cols, rows)
				return (
					<div key={i} style={styles[i]}>
						<Layout data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
					</div>
				)
			})
		return listDom
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-reclist-by-store2`}>
				{ dom }
			</section>
		)
	}
}
