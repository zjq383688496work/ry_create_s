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
	}
	render() {
		let { visible } = this.state
		return (
			<Drawer
				title="数据库管理"
				visible={visible}
				placement="right"
				width={1000}
				onClose={this.handleClose}
			>
				<DbTable />
			</Drawer>
		)
	}
}

export default DbModel