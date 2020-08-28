import React from 'react'
import { Drawer } from 'antd'

import DbTable from 'components/DbTable'

class DbModel extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			visible: false
		}
	}
	show = () => {
		this.setState({ visible: true })
	}
	hide = () => {
		this.setState({ visible: false })
	}
	handleClose = () => {
		this.hide()
		// this.refs.db.pageChange('tables', {})
	}
	render() {
		let { visible } = this.state,
			width = parseInt(document.documentElement.clientWidth * .7)
		return (
			<Drawer
				title="数据库管理"
				visible={visible}
				placement="right"
				width={width}
				onClose={this.handleClose}
			>
				<DbTable ref="db" db={this.props.db} />
			</Drawer>
		)
	}
}

export default DbModel