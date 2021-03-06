/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import * as actions from 'actions'

import { Icon, message } from 'antd'
 
class EditPageManage extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	addPage(groupIdx) {
		let { actions, editConfig,data } = this.props
		let pages = data.group[0].pages;
		actions.addPage(groupIdx, `页面${editConfig.pageList.group[groupIdx].pages.length + 1}`)
		this.selectPage(pages[pages.length-1].router,0,pages.length-1)
		message.success('添加页面!',1)
	}

	deletePage(router, groupIdx, idx) {
		let { data, actions, editConfig } = this.props
		let { pageContent, globalData }   = editConfig
		message.success(`删除页面: ${pageContent[router].title}!`,1)
		actions.deletePage(router, groupIdx, idx)
		let da    = globalData.data
		let group = data.group[0]
		let li    = group.pages[0]
		if (idx === 0) {
			da.homepage = li.router
			actions.updateGlobal(globalData)
		}
		this.selectPage( data.group[0].pages[idx-1].router,0,idx-1)
	}

	selectPage(router, groupIdx, idx) {
		let { actions, editConfig } = this.props
		editConfig.curData.pageGroupIdx = groupIdx
		editConfig.curData.pageIdx  = idx
		actions.updateCur(editConfig.curData)
		actions.selectPage(router)
	}

	copyPage(router, groupIdx) {
		let { actions, editConfig } = this.props
		let { pageContent }   = editConfig
		actions.copyPage(router, groupIdx)
		message.success(`复制页面: ${pageContent[router].title}!`,1)
	}

	setIndex(router, idx) {
		let { data, actions, editConfig } = this.props
		let { globalData } = editConfig
		let da    = globalData.data
		let group = data.group[0]
		let li    = group.pages[idx]
		da.homepage = globalData.feature.reviewRouter = router
		group.pages.splice(idx, 1)
		group.pages.unshift(li)
		actions.updateGlobal(globalData)
		actions.updatePageList(data)
	}

	render() {
		let { data, editConfig } = this.props
		let childNode = data.group[0].pages.map((_, i) => {
			return (
				<li
					key={i}
					className={`page-li${_.router === editConfig.curData.router? ' s-active': ''}`}
				>
					<div className="pl-name" onClick={this.selectPage.bind(this, _.router, 0, i)}>{ _.title }</div>
					<div className="pl-ctrl">
						<a
							style={{ display: i? 'block': 'none' }}
							onClick={this.setIndex.bind(this, _.router, i)}
						><Icon type="home" /></a>
						<a
							onClick={this.copyPage.bind(this, _.router, 0, i)}
						><Icon type="copy" /></a>
						<a
							style={{ display: data.group[0].pages.length > 1&&i? 'block': 'none' }}
							onClick={this.deletePage.bind(this, _.router, 0, i)}
						><Icon type="delete" /></a>
					</div>
				</li>
			)
		})
		return (
			<div className="pe-page-manage-operate">
				<div className="pem-add" onClick={this.addPage.bind(this, 0)}><Icon type="plus" /> 添加页面</div>
				<div className="page-list">
					<ul>{ childNode }</ul>
				</div>
			</div>
		)
	}
}


EditPageManage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPageManage)
