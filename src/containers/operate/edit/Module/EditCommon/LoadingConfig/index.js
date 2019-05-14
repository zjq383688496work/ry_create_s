import React from 'react'

import { Col, Row, Checkbox, Collapse } from 'antd'
const Panel = Collapse.Panel
import ImageUploadTheme from 'compEdit/EditCommon/ImageUploadTheme'

import './index.less'

var cfgArr = [
	{ name: '列表', key: 'list' },
	{ name: '网页', key: 'web' }
]

class LoadingConfig extends React.Component {
	constructor(props) {
		super(props)
	}
	onChangeAuth(val, item) {
		item.auth = val
		let { actions, action, data } = this.props
		actions[action](data)
	}
	uploadNode = item => {
		return (
			<div className="add_img">
				<ImageUploadTheme
					img={item.value}
					name={'value'}
					content={item}
					action={'updateGlobal'}
					style={{ width: '100%' }}
				/>
			</div>
		)
	}
	cfgNode = () => {
		var { loading } = this.props.data.data
		var nodeList = cfgArr.map(({ name, key }, i) => {
			var item = loading[key]
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{name}</div>
					<div className="pgsr-ctrl">
						<div className="pg-img-upload">
							<Row type="flex" align="middle" style={{ width: '100%' }}>
								<Col span={9}>
									{ this.uploadNode(item) }
								</Col>
							</Row>
						</div>
					</div>
					<div className="pgsr-auth">
						<Checkbox checked={item.auth || false} onChange={({ target }) => this.onChangeAuth(target.checked, item)} />
					</div>
				</div>
			)
		})
		return nodeList
	}
	render() {
		return (
			<Collapse defaultActiveKey={['0']}>
				<Panel header={`加载图配置`} key={0}>
					{ this.cfgNode() }
				</Panel>
			</Collapse>
		)
	}
}

export default LoadingConfig
